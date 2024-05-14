const domain = "http://127.0.0.1:8081/"

const shelter_api = "shelter/findAll"
const interim_housing = "interimHousing/findAll"

let lisss = []

function getShelters() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", domain + shelter_api, false); // 동기(false) ,비동기(true)
    //헤더 정보가 필요한 경우에만 추가
    xhr.send();
    let list = [];
    if (xhr.status == 200) { //GET 요청에 대해 성공적인경우
        list = JSON.parse(xhr.responseText); // 서버로부터 받은 데이터를 출력
    }

    return list;
}

function fetchShelters() {
    try {
        const response = axios.get(domain + shelter_api)
        .then((response) => {
            lisss = response.data;
        });
        // console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// function test() {
//     console.log(lisss);
// }