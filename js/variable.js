const domain = window.location.origin + "/api/"

const shelter_api = "shelter/findAll"
const interim_housing_api = "interimHousing/findAll"

const near_shelter_api = "shelter/findNear"

const earthquake_api = "earthquakeInfo"

axios.defaults.baseURL = window.location.origin;