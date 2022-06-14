export class User {
  constructor(
    public username: string,
    public email: string,
    public _id: string,
    public _token: string,
    public _tokenExpirationDate: Date
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    } else {
      return this._token;
    }
  }
}
