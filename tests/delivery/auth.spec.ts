import { expect, test } from '@playwright/test'
import { Login } from '../../dto/login-dto'
import { createOrder, fetchJwt, getOrderById } from '../../helpers/api-helper'

let loginDto: Login
export const baseUrl = 'https://backend.tallinn-learning.ee'
export const loginEndpoint = '/login/student'
export const ordersEndpoint = '/orders'

// unskip when ready to use
test.describe('Authorization flow', () => {
  //only once - read credentials and init dto
  test.beforeAll(() => {
    //1st - read .env file and get DL_USERNAME and DL_PASSWORD
    //2nd - ti build login DTO
    loginDto = new Login(process.env['DL_USERNAME']!, process.env['DL_PASSWORD']!)
  })

  test('should login and receive authorization token', async ({ request }) => {
    const token = await fetchJwt(request, loginDto)
    expect(token).toBeDefined()
    console.log(token)
  })

  test('should create order', async ({ request }) => {
    const token = await fetchJwt(request, loginDto)
    const orderId = await createOrder(request, token)
    expect(orderId).toBeDefined()
    console.log(orderId)
  })

  test('should create order and validate order by Id', async ({ request }) => {
    const token = await fetchJwt(request, loginDto)
    const orderId = await createOrder(request, token)

    await getOrderById(request, token, orderId)
  })

  test('should get orders with authorization token', async ({ request }) => {
    const token = await fetchJwt(request, loginDto)

    const response = await request.get(baseUrl + ordersEndpoint, {
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    })

    expect(response.status()).toBe(200)
    const orders = await response.json()
    console.log('Orders:', JSON.stringify(orders, null, 2))
    expect(orders).toBeTruthy()
  })
})
