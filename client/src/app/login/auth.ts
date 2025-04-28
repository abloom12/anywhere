import { md5 } from '@/shared/lib/crypto';
import { parseXml } from '@/shared/lib/parse-xml';
import { fetchData } from '@/core/fetch';

export async function authenticateUser(
  user: string,
  password: string,
): Promise<string> {
  const authResp = await fetchData('getLogIn', {
    userId: user,
    hash: md5('ash'),
  });

  if (!authResp) {
    //! Please enter a valid username.
  }

  if (authResp.indexOf('609')) {
    //? custom password change
  }
  if (authResp.indexOf('608')) {
    //? user name does not exist
  }

  const resXML = parseXml(authResp);
  const windowName = resXML.getElementsByTagName('window_name')[0];

  if (windowName.innerHTML === 'Token') {
    // $.session.isPSI = username === 'PSI'
  }

  if (windowName.innerHTML === '2FA') {
  }

  if (windowName.innerHTML === 'Invalid username') {
  }
  if (windowName.innerHTML === 'Failed attempts') {
    const count =
      resXML.getElementsByTagName('special_data')[0].innerHTML;
  }
  if (windowName.innerHTML === 'Expired password') {
  }
  if (windowName.innerHTML === 'Not active') {
  }
  if (windowName.innerHTML === 'No demogrphics record') {
  }
  if (windowName.innerHTML === 'No recipient') {
  }

  return 'hey';
}
