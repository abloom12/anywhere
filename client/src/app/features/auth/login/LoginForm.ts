import { Form, field, action } from '@/shared/components/Form';

export const loginForm: Form = new Form({
  name: 'loginForm',
  fields: [
    field.text('username', 'Login Name').$,
    field.password('password', 'Password').$,
  ],
  buttons: [action.button('Login').$],
  onSubmit: (data: Record<string, FormDataEntryValue>) => {
    // call getLogin from /api
  },
});
