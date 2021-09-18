class MainApi{
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse = (res) =>{
    if(res.ok){
      return res.json();    
    }
    console.log("Ошибка");
    console.log(res.status);
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  register(name, password, email) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name, password, email})
    })
    .then(this._checkResponse)
  };
  
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
}

const mainApi = new MainApi({
  url: "https://api.movies.box.nomoredomains.club",
  headers: {
    "content-type": "application/json",
    "Authorization": ""
  }
})

export default mainApi;