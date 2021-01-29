import { NextApiRequest, NextApiResponse } from 'next';
import { Db } from 'mongodb'
import connect from '../../utils/database'
import checaconta from '../../utils/checaconta'

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {

  const { origem, destino, valor } = req.body
  const db = (await connect()).db
  const respOrigem = await db.collection('accounts').findOne(origem)

  if (!respOrigem) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ response: "Conta Origem não encontrada" }));
    return // cai fora
  }
  const respDestino = await db.collection('accounts').findOne(destino)

  if (!respDestino) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ response: "Conta Destino não encontrada" }));
    return // cai fora
  }
  const tarifa: number = (origem.agencia != destino.agencia) ? 8 : 0

  if (respOrigem.balance < (valor + tarifa)) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ response: "Saldo Insuficiente" }));
    return // cai fora
  }
  // se chegou aqui então as contas existem, tem saldo, agora é mandar ver

  const nbOrigem = +respOrigem.balance - (valor + tarifa)
  const nbDestino = +respDestino.balance + valor

  const updateOrigem = await db.collection('accounts').updateOne(
    origem,
    { $set: { balance: nbOrigem } }
  )
  const updateDestino = await db.collection('accounts').updateOne(
    destino,
    { $set: { balance: nbDestino } }
  )

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ origem, nbOrigem }));
}
