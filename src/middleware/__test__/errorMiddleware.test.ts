import { errorMiddleware } from './../errorMiddleware';

test('responds with 500 for server error', () => {
  const req: any = {}
  const res: any = {
    json: jest.fn(() => res),
    status: jest.fn(() => res),
  }
  const next = jest.fn()
  const error = new Error('Fake Error Message');
  
  errorMiddleware(error, req, res, next)
  expect(next).not.toHaveBeenCalled()
  expect(res.status).toHaveBeenCalledWith(500)
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.json).toHaveBeenCalledWith({
    success: false,
    message: error.message
  })
  expect(res.json).toHaveBeenCalledTimes(1)
})