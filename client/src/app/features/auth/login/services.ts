import { login, type LoginResp } from './api';

export async function getLogin(user: string, password: string) {
  try {
    const responseXML: LoginResp = await login(user, password);
    const windowNameNode = responseXML.getElementsByTagName('window_name')[0];
    const windowName = windowNameNode?.innerHTML;

    //? Do we do all the checks here and then return some obj. Or just return window_name and special_data?

    if (!windowNameNode) {
      //TODO: idk yet (this would be responseXML === "<results></results>\")
      // if (''.indexOf('609')) {
      //   //? custom password change
      // }
      // if (''.indexOf('608')) {
      //   //? user name does not exist
      // }
    }

    if (windowName === 'Token') {
      const token = responseXML.getElementsByTagName('special_data')[0].innerHTML;
      //TODO: set Token in permission store

      if (user === 'psi') {
        //TODO: set isPSI permission to TRUE
      }
    }

    if (windowName === '2FA') {
      const deviceId = responseXML.getElementsByTagName('special_data')[0].innerHTML;
      //TODO: mfa stuff (there is a mfa function)
    }

    //TODO: anything past this point means we have a login error coming back via windowName
    const specialData = responseXML.getElementsByTagName('special_data')[0].innerHTML;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'xml') {
      }
      if (error.name === 'network') {
      }
    }
  }
}
