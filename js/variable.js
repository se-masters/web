const domain = window.location.origin + "/api/"
// const domain = "http://localhost:9000/"

const shelter_api = "shelter/findAll"
const interim_housing_api = "interimHousing/findAll"

const near_shelter_api = "shelter/findNear"

axios.defaults.baseURL = window.location.origin;