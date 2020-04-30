class apiHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
    this.apiKey = "433360b1ec5781819e23e50d07d7a637";
    this.hash = "b0132f2f27fc290beac6e4d0a4931683";
    this.axiosServer = axios.create({
            baseUrl: "http://localhost:3000"
        })
  }
     

  getCharacter(name) {
    return axios.get(this.BASE_URL + "/characters?name=" + name + "&ts=1561464418685&apikey=" + this.apiKey + "&hash=" + this.hash);
  }
  getCharDetails(id) {
    return axios.get(this.BASE_URL + "/characters/" + id + "&ts=1561464418685&apikey=" + this.apiKey + "&hash=" + this.hash);
  }
  getFileCharacteres() {
        return this.axiosServer.get("/characters/characterList.txt")
    }
}