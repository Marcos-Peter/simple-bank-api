export interface Transference {
  id: string
  cpf: string
  originPassword: string
  originAgency: string
  originAgencyDigit: string
  originAccount: string
  originAccountDigit: string
  destinyCpf: string
  destinyAgency: string
  destinyAgencyDigit: string
  destinyAccount: string
  destinyAccountDigit: string
  value: string
  createdAt?: string
};
