import { AuthProviders, AuthMethods } from "angularfire2";

export const facebookConfig = {
  provider: AuthProviders.Facebook,
  method: AuthMethods.Redirect
};
