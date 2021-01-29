import { NextApiRequest, NextApiResponse } from 'next';
import {Db} from 'mongodb'
import connect  from '../../utils/database'
export default async function deposito(
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
  const newbalance = +response.balance + valor 
  const update = await db.collection('accounts').updateOne(
    filter ,
    { $set: {balance : newbalance }}
  )
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ conta, agencia, newbalance }));
}
