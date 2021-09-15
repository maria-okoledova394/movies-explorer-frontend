getSavedCards() {
    return fetch(`${this._url}/movies`, {
        method: "GET",
        headers: this._headers
      }).then(this._checkResponse)
  }

  getProfileInfo() {
    return fetch(`${this._url}/users/me`, {
        method: "GET",
        headers: this._headers
      }).then(this._checkResponse)
  }

  changeProfileInfo(data) {
    return fetch(`${this._url}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify(data)
      }).then(this._checkResponse)
  }

  removeFromSaved(_id) {
    return fetch(`${this._url}/movies/${_id}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  addToSaved(_id) {
    return fetch(`${this._url}/cards/${_id}`, {
      method: "PUT",
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  changeLikeCardStatus(_id, isLiked) {
    if (isLiked) {
      return this.likeCard(_id);
    }
    else {        
      return this.removeLike(_id);
    }
  }

  setToken(token) {
    this._headers.Authorization = token;
  }