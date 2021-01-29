import { NextApiRequest, NextApiResponse } from 'next';
import { Db } from 'mongodb'
import connect from '../../utils/database'
export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {

  const { agencia } = req.body

  const db = (await connect()).db
  const filter = { agencia }
  const response = await db.collection('accounts').findOne(filter)

  if (!response) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ response: "Agencia não encontrada" }));
    return // cai fora
  }

  const pipeline = [
    {
      '$project': {
        '_id': 1,
        'balance': 1
      }
    }, {
      '$match': {
        'agencia': +agencia
      }
    }, {
      '$group': {
        '_id': '$agencia',
        'medio': {
          '$avg': '$balance'
        }
      }
    }
  ]
  console.log({ pipeline })
  const resultMedio = db.collection('accounts').aggregate(pipeline)
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ agencia, resultMedio }));
}
