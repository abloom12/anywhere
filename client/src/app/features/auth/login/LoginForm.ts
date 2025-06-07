import { Form, field, action, type DataFromFields } from '@/shared/components/Form';
import { loginUser, type LoginResult } from './services';

const fields = [
  field.text('username', 'Login Name').$,
  field.password('password', 'Password').$,
] as const;

type FormData = DataFromFields<typeof fields>;

export function getLoginForm(props: {
  onSubmit: (args: { data: FormData; resp: LoginResult }) => any;
}) {
  return new Form({
    name: 'loginForm',
    fields,
    buttons: [action.button('Login').$],
    onSubmit: async (data, formInstance) => {
      const resp = await loginUser(data.username as string, data.password as string);
      props.onSubmit({ data, resp });
    },
  });
}
