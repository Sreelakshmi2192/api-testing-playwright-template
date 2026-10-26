export class AccountDto {
  owner: string
  currency: string

  constructor(owner: string, currency: string) {
    this.owner = owner
    this.currency = currency
  }
}
