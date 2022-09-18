class Auth {
  constructor(options) {
    this._options = options;
  }

  _verifyResponse(res) {
    if (res.ok) {
      console.log("Request was successful:");
      console.log(res);
      return res.json();
    }
    return Promise.reject(res);
  }

  _logInfo(res) {}

  reportError(err) {
    if (err.constructor === Response) {
      err.json().then((data) => console.log(`${err.status} - ${data.message}`));
    } else {
      console.log(err);
    }
  }

  signUpUser({ email, password }) {
    return fetch(`${this._options.baseUrl}/signup`, {
      method: "POST",
      headers: this._options.headers,
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then(this._verifyResponse)
      .then((res) => {
        this._logInfo(res);
        return res;
      });
  }

  signInUser({ email, password }) {
    return fetch(`${this._options.baseUrl}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then(this._verifyResponse)
      .then((res) => {
        this._logInfo(res);
        return res;
      });
  }

  getMyInfo(jwt) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: "GET",
      headers: { ...this._options.headers, Authorization: `Bearer ${jwt}` },
    })
      .then(this._verifyResponse)
      .then((res) => {
        this._logInfo(res);
        return res;
      });
  }
}

const auth = new Auth({
  baseUrl: "https://register.nomoreparties.co",
  headers: { "Content-Type": "application/json" },
});

export default auth;
