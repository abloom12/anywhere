```ts
import { Form, field, action, type DataFromFields } from '@/shared/components/Form';

const fields = [
  field.text('username', 'Login Name').$,
  field.password('password', 'Password').$,
  field.checkbox('testing', 'test').$,
] as const;

type FormData = DataFromFields<typeof fields>;

export function getLoginForm(
  onSubmit: (args: { data: FormData; resp: LoginResult }) => any,
) {
  return new Form({
    name: 'loginForm',
    fields,
    buttons: [action.button('Login').$],
    onSubmit: async (data, formInstance) => {
      const resp = await loginUser(data.username as string, data.password as string);
      onSubmit({ data, resp });
    },
  });
}
```
