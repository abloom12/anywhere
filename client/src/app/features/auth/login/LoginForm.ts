import { Form, field, action } from '@/shared/components/Form';
import { loginUser } from './services';

export const loginForm = new Form({
  name: 'loginForm',
  fields: [
    field.text('username', 'Login Name').$,
    field.password('password', 'Password').$,
    field.checkbox('testing', 'test').$,
  ] as const,
  buttons: [action.button('Login').$],
  onSubmit: async (data, formInstance) => {
    console.log(data);
    const loginResp = await loginUser('ash', 'ash');
    //? if success
    //? - store token
    //? - get permissions and settings
    //? - navigate to home page with router
    //? -
  },
});
