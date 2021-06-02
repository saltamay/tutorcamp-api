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