export class ProductDto {

  //let's define fields
  name: string
  category: string
  price: number
  quantity: number

  constructor(name: string, category: string, price: number, quantity: number) {
    this.name = name
    this.category = category
    this.price = price
    this.quantity = quantity
  }
}