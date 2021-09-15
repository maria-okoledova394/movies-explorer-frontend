class MoviesApi{
    constructor(config) {
      this._url = config.url;
      this._headers = config.headers;
    }

    _checkResponse = (res) =>{
      if(res.ok){
        return res.json();    
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    getSearcheddCards() {
      return fetch(`${this._url}`, {
          method: "GET",
          headers: this._headers
        }).then(this._checkResponse)
    }
}

const moviesApi = new MoviesApi({
  url: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "content-type": "application/json",
    "Authorization": ""
  }
})


export default moviesApi;