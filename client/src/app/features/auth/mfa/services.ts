import { authenticateLogin } from './api';

const AUTH_ERRORS = {
  'Too many failed attempts':
    'Too many failed attempts. Your account has been disabled. Please contact a system administrator.',
  'Expired key':
    'The verification code entered has expired. Please go back to the login screen and enter your credentials to generate a new code.',
  'Invalid key': 'Invalid Code. Please try again.',
};
