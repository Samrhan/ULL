export interface AuthorizationCode {
  code: string;
  scope: string;
  authuser: string;
  prompt: string;
}
