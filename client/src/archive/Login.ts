import { Form } from "../../../client/src/components/form/Form";
import { field } from "@/components/form/_configurator";
import { md5 } from "@/util/crypto";
import { fetchData } from "@/util/fetch";
import { parseXml } from "@/util/parseXML";

const LOGIN_ERRORS = {
  "Failed attempts": "",
  "Not active": `Your account is inactive. Please contact your System Administrator to enable your account.`,
  "Invalid username": `Invalid user name or password.`,
  "No demographics record": `There is no Name in Demographics defined for your user. Please contact your system administrator to login to Anywhere.`,
  "No recipient": `Two-Factor authentication is enabled for your organization. There was no valid email address or cell phone number found for your account. Please contact your system administrator to login to Anywhere.`,
  "Expired password": "",
};

const form = new Form({
  name: "login",
  fields: [
    field.text("userId", "Login Name").$,
    field.password("password", "Password").$,
    field.textarea("aboutYou", "About You...").$,
  ],
});

async function onLogin() {
  const resp = await fetchData("getLogIn", {
    userId: "ash",
    hash: md5("ash"),
  });

  if (!resp) {
    //! Please enter a valid username.
  }

  const resXML = parseXml(resp);
  const windowName = resXML.getElementsByTagName("window_name")[0];

  if (windowName.innerHTML === "Token") {
  }

  if (windowName && windowName.innerHTML === "2FA") {
  }
}
