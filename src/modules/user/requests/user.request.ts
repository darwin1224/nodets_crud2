import { check } from 'express-validator'

export const validate = [
  check('username', 'Username is required').isEmpty(),
  check('password', 'Password is required').isEmpty()
]