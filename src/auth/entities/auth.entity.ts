export interface Payload {
  userId: string;
  login: string;
}

export class Auth {
  accessToken: string;
  refreshToken: string;
}
