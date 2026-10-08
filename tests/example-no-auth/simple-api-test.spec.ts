import { StatusCodes } from 'http-status-codes'
import { expect, test } from '@playwright/test'

test('get product with correct id should receive code 200', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://shop.tl-academy.ee/api/products/1')

  // parse raw response body to json
  const responseBody = await response.json()
  const statusCode = response.status()

  // Log the response status, body and headers
  console.log('response body:', responseBody)
  // Check if the response status is 200
  expect(statusCode).toBe(StatusCodes.OK)
})

test('get non existing product with should receive code 404', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://shop.tl-academy.ee/api/products/99')

  // parse raw response body to json
  // const responseBody = await response.json()
  const statusCode = response.status()

  // Log the response status, body and headers
  //console.log('response body:', responseBody)
  // Check if the response status is 200
  expect(statusCode).toBe(StatusCodes.NOT_FOUND)
})
test('get product with invalid id should receive code 400', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://shop.tl-academy.ee/api/products/abc')

  // parse raw response body to json
  // const responseBody = await response.json()
  const statusCode = response.status()

  // Log the response status, body and headers
  //console.log('response body:', responseBody)
  // Check if the response status is 200
  expect(statusCode).toBe(StatusCodes.BAD_REQUEST)
})

test('post product with correct mandatory only data should receive code 201', async ({
  request,
}) => {
  // prepare request body
  const requestBody = {
    name: 'Orange',
    category: 'Fruit',
    price: 2.39,
  }
  // Send a POST request to the server
  const response = await request.post('https://shop.tl-academy.ee/api/products', {
    data: requestBody,
  })
  // parse raw response body to json
  const responseBody = await response.json()
  const statusCode = response.status()

  // Log the response status and body
  console.log('response status:', statusCode)
  console.log('response body:', responseBody)
  expect(statusCode).toBe(StatusCodes.CREATED)
  // check that body.name is string type
  expect(typeof responseBody.name).toBe('string')
  expect(responseBody.name).toBe('Orange')
  // check that body.price is number type
  expect(typeof responseBody.price).toBe('number')
})
test('post product with correct mandatory data and quantity should receive code 201', async ({
  request,
}) => {
  // prepare request body
  const requestBody = {
    name: 'Kiwi',
    category: 'Fruit',
    price: 2.39,
    quantity: 25, //optional field set explicitly
  }
  // Send a POST request to the server
  const response = await request.post('https://shop.tl-academy.ee/api/products', {
    data: requestBody,
  })
  // parse raw response body to json
  const responseBody = await response.json()
  const statusCode = response.status()

  // Log the response status and body
  console.log('response status:', statusCode)
  console.log('response body:', responseBody)
  expect(statusCode).toBe(StatusCodes.CREATED)
  expect(responseBody.quantity).toBe(25)
  expect(responseBody.available).toBeTruthy()
})
test('post product with missing mandatory name should receive code 400', async ({ request }) => {
  // prepare request body
  const requestBody = {
    category: 'Fruit',
    price: 2.39,
  }
  // Send a POST request to the server
  const response = await request.post('https://shop.tl-academy.ee/api/products', {
    data: requestBody,
  })
  // parse raw response body to json
  //const responseBody = await response.json()
  const statusCode = response.status()

  // Log the response status and body
  console.log('response status:', statusCode)
  //console.log('response body:', responseBody)
  expect(statusCode).toBe(StatusCodes.BAD_REQUEST)
  //expect(responseBody.quantity).toBe(25)
  //expect(responseBody.available).toBeTruthy()
})
