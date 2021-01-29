import { Db } from 'mongodb'
import connect from './database'

interface accResp {
  id: String,
  agencia: number,
  conta: number,
  balance: number,
  name: String
}
interface agcont {
  agencia: number,
  conta: number,
}

export default async function (
  db: Db,
  agconta: agcont
): Promise<accResp> {

  const filter = agconta
  const response = await db.collection('accounts').findOne(filter)
  return (response)
}