// const domain = window.location.origin + "/api/"
const domain = "http://localhost:9000/"

const shelter_api = "shelter/findAll"
const interim_housing_api = "interimHousing/findAll"

const near_shelter_api = "shelter/findNear"

const REST_API_KEY = '9de65e9890d6d914473bc48ff9ec67c0';

const earthquake_api = "earthquakeInfo"

axios.defaults.baseURL = window.location.origin;