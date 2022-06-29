export interface Account {
  id: string
  cpf: string
  password: string
  agency: number
  agencyDigit: number
  account: number
  accountDigit: number
  balance: number
  createdAt?: string
};
