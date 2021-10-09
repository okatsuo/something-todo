import { account } from '.prisma/client';

export interface ILoadAccountByEmail {
  loadAccountByEmail: (email: string) => Promise<account | null>
}
