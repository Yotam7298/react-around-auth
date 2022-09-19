class Api {
  constructor(options) {
    this._options = options;
  }

  _verifyResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }

  reportError(err) {
    console.log(`Something went wrong, Error: ${err.status}`);
  }

  _logInfo(res) {
    console.log("Request was successful:");
    console.log(res);
  }

  _request(endPoint, method, body) {
    return fetch(`${this._options.baseUrl + endPoint}`, {
      method: method,
      headers: this._options.headers,
      body: JSON.stringify(body),
    })
      .then(this._verifyResponse)
      .then((res) => {
        this._logInfo(res);
        return res;
      });
  }

  getUserInfo() {
    return this._request("/users/me", "GET");
  }

  loadCards() {
    return this._request("/cards", "GET");
  }

  getAllInfo() {
    return Promise.all([this.getUserInfo(), this.loadCards()]).then(
      (values) => {
        return values;
      }
    );
  }

  editProfileInfo(userNewInfo) {
    return this._request("/users/me", "PATCH", {
      name: userNewInfo.name,
      about: userNewInfo.about,
    });
  }

  editProfileAvatar(avatarUrl) {
    return this._request("/users/me/avatar", "PATCH", { avatar: avatarUrl });
  }

  addNewCard(cardNewInfo) {
    return this._request("/cards", "POST", {
      name: cardNewInfo.title,
      link: cardNewInfo.link,
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, "DELETE");
  }

  changeCardLike(cardId, method) {
    return this._request(`/cards/likes/${cardId}`, method);
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "f800af66-4bca-42fd-8139-117d10b5a510",
    "Content-Type": "application/json",
  },
});

export default api;
