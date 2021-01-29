import { NextApiRequest, NextApiResponse } from 'next';
import {Db} from 'mongodb'
import connect  from '../../utils/database'
export default async function (
  req: NextApiRequest,
  res: NextApiResponse
) : Promise<void> {

  const { agencia, conta, valor } = req.body

  const  db  = (await connect()).db
  const filter = { agencia , conta }
  const response = await db.collection('accounts').findOne( filter  )

  if (!response) { 
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ response : "Conta não encontrada" }));
    return // cai fora
}
  const {balance} = response
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ conta, agencia, balance }));
}
