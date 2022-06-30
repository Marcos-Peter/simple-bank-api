export interface Transference {
  id: string
  originCPF: string
  originPassword: string
  originAgency: string
  originAgencyDigit: string
  originAccount: string
  originAccountDigit: string
  destinyCPF: string
  destinyAgency: string
  destinyAgencyDigit: string
  destinyAccount: string
  destinyAccountDigit: string
  value: string
  createdAt?: string
};
