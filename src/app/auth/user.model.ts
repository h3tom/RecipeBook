export class User {

    constructor(
        public id: number,
        public username: string,
        public name: string,
        public email: string,
        private _accessToken: string,
        private _tokenExpirationDate: Date
    ) { }

    get accessToken() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._accessToken;
    }
}