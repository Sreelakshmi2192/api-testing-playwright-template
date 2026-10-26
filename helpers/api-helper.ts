import { APIRequestContext } from 'playwright-core'
import { Login } from '../dto/login-dto'
import { baseUrl, loginEndpoint, ordersEndpoint } from '../tests/delivery/auth.spec'
import { StatusCodes } from 'http-status-codes'
import { expect } from '@playwright/test'

export async function fetchJwt(request: APIRequestContext, login: Login): Promise<string> {
  //send request POST/login
  const authResponse = await request.post(baseUrl + loginEndpoint, {
    data: login,
  })
  // check response and extract token
  if (authResponse.status() !== StatusCodes.OK) {
    throw new Error(`Authorization failed. Status: ${authResponse.status()}`)
  }
  return await authResponse.text()
}

export async function createOrder(request: APIRequestContext, jwt: string): Promise<number> {
  const response = await request.post(baseUrl + ordersEndpoint, {
    data: {
      "status": "OPEN",
      "courierId": 0,
      "customerName": "vladimir",
      "customerPhone": "55445566",
      "comment": "hello",
      "id": 0
    },
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  expect(response.status()).toBe(StatusCodes.OK)
  const responseBody = await response.json()
  return responseBody.id
}

export async function getOrderById(request: APIRequestContext, jwt: string, orderId: number): Promise<number> {
  const response = await request.get(baseUrl + ordersEndpoint + '/' + orderId, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  expect(response.status()).toBe(StatusCodes.OK)
  const responseBody = await response.json()
  console.log(responseBody)
  return responseBody.id
}