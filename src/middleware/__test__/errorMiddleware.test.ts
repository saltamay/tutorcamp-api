import { ErrorResponse } from './../../utils/ErrorResponse';
import { errorMiddleware } from './../errorMiddleware';

test('Returns custom error message and status code', () => {
  const req: any = {}
  const res: any = {
    json: jest.fn(() => res),
    status: jest.fn(() => res),
  }
  const next = jest.fn()
  const error = new ErrorResponse('Fake Error Message', 500);
  
  errorMiddleware(error, req, res, next)
  expect(next).not.toHaveBeenCalled()
  expect(res.status).toHaveBeenCalledWith(error.statusCode)
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.json).toHaveBeenCalledWith({
    success: false,
    message: error.message
  })
  expect(res.json).toHaveBeenCalledTimes(1)
})

test('Responds with 404 for mongoose CastError', () => {
  const req: any = { params: { id: 1 } }
  const res: any = {
    json: jest.fn(() => res),
    status: jest.fn(() => res),
  }
  const next = jest.fn()

  const error = new ErrorResponse('fake_error', 404);
  error.name = 'CastError';

  errorMiddleware(error, req, res, next)
  expect(next).not.toHaveBeenCalled()
  expect(res.status).toHaveBeenCalledWith(404)
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.json).toHaveBeenCalledWith({
    success: false,
    message: `Resource not found`,
  })
  expect(res.json).toHaveBeenCalledTimes(1)
})