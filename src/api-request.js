import axios from "axios";

export default class ApiRequest {
  static getcharacters(){

    return axios.get('https://gateway.marvel.com:443/v1/public/characters?limit=30&offset=100&ts=1&apikey=16502948f6a5f4bb90e250ed81ee8dd3&hash=a94275d15ea202629360e71a4abcb0b4')
    .then(response => response.data.data.results)
    // .then(response => console.log(response.data.data.results))
    .catch((error) => console.error(error));

  }
}