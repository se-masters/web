const urlParams = new URLSearchParams(window.location.search);
let x = urlParams.get('x');
let y = urlParams.get('y');
let id = urlParams.get('id');

if (x == null || y == null) {
    x = 36.1455;
    y = 128.3926;
}

if (id == null) {
    id = "";
} else {
    document.getElementsByClassName('loading_box')[0].style.display = "flex";
}

var mapContainer = document.getElementById('map'), mapOption = {
    center: new kakao.maps.LatLng(x, y), // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
    mapTypeId : kakao.maps.MapTypeId.ROADMAP // 지도종류
};

// 지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places();

let my_location_marker = new kakao.maps.Marker();

// 내 위치 마커 START
function locationLoadSuccess(pos) {
    // 현재 위치 받아오기
    var currentPos = new kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

    // 지도 이동(기존 위치와 가깝다면 부드럽게 이동)
    map.panTo(currentPos);

    var imageSrc = './icons/me_color.png', // 마커이미지의 주소입니다
    imageSize = new kakao.maps.Size(50, 60) // 마커이미지의 크기입니다

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize),
    markerPosition = new kakao.maps.LatLng(pos.coords.latitude,pos.coords.longitude); // 마커가 표시될 위치입니다

    // 이전에 있던 마커 제거
    my_location_marker.setMap(null);
    // 마커 생성
    my_location_marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage // 마커이미지 설정 
    });
    // 마커가 지도 위에 표시되도록 설정합니다
    my_location_marker.setMap(map);
};

function locationLoadError(pos) {
    alert('위치 정보를 가져오는데 실패했습니다.');
};

// 위치 가져오기 버튼 클릭시
function getCurrentPosBtn() {
    navigator.geolocation.getCurrentPosition(locationLoadSuccess,locationLoadError);
};
// 내 위치 마커 END


// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

let default_location = {
    "seoul": new kakao.maps.LatLng(37.5659436, 126.9778288),
    "incheon": new kakao.maps.LatLng(37.4560939, 126.703727),
    "gwangju": new kakao.maps.LatLng(35.1587263, 126.8497696),
    "ulsan": new kakao.maps.LatLng(35.5390653, 129.3103105),
    "busan": new kakao.maps.LatLng(35.1793999, 129.0739666),
    "daegu": new kakao.maps.LatLng(35.8712121, 128.6010165),
    "gangwon": new kakao.maps.LatLng(37.8306817, 127.6797105),
    "gyeonggi": new kakao.maps.LatLng(37.2749107, 127.0070014),
    "gyeongsangnam": new kakao.maps.LatLng(35.2382949, 128.6902093),
    "gyeongsangbuk": new kakao.maps.LatLng(36.5773712, 128.503755),
    "jeonnam": new kakao.maps.LatLng(34.6959784, 125.9375888),
    "jeonbuk": new kakao.maps.LatLng(35.8160554, 127.111812),
    "chungnam": new kakao.maps.LatLng(36.4937087, 126.9066248),
    "chungbuk": new kakao.maps.LatLng(36.6358136, 127.4891451),
    "jeju": new kakao.maps.LatLng(33.4889923, 126.4973843),
    "daejeon": new kakao.maps.LatLng(36.3490194, 127.3842079),
    "sejong": new kakao.maps.LatLng(36.4779772, 127.2864818)
};

function set_location(location) {
    map.panTo(default_location[location]);
}
 
// 지도 레벨은 지도의 확대 수준을 의미합니다
// 지도 레벨은 1부터 14레벨이 있으며 숫자가 작을수록 지도 확대 수준이 높습니다
function zoomIn() {        
    // 현재 지도의 레벨을 얻어옵니다
    var level = map.getLevel();

    // 지도를 1레벨 내립니다 (지도가 확대됩니다)
    map.setLevel(level - 1);
}    

function zoomOut() {
    // 현재 지도의 레벨을 얻어옵니다
    var level = map.getLevel();

    // 지도를 1레벨 올립니다 (지도가 축소됩니다)
    map.setLevel(level + 1);
}

// 키워드 검색을 요청하는 함수입니다
function searchPlaces() {

    var keyword = document.getElementsByClassName('search')[0].value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch(keyword, function (data, status) {
        if (status === kakao.maps.services.Status.OK) {

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            var bounds = new kakao.maps.LatLngBounds();

            for (var i = 0; i < data.length; i++) {
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            map.setBounds(bounds);
        }
    });

}

// 지도타입 컨트롤의 지도 또는 스카이뷰 버튼을 클릭하면 호출되어 지도타입을 바꾸는 함수입니다
function setMapType() {
    const satelite_grey = document.getElementById('satelite_grey');
    const satelite_selected = document.getElementById('satelite_selected');
    if (satelite_grey.style.display === 'none') {
        // 지도뷰
        satelite_grey.style.display = 'block';
        satelite_selected.style.display = 'none';
        map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);

        let divs = document.getElementsByClassName('bg_color_change');
        for (let d of divs) {
            d.style.backgroundColor = '#dadadabd';
        }
    } else {
        // 위성뷰
        satelite_grey.style.display = 'none';
        satelite_selected.style.display = 'block';
        map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);

        let divs = document.getElementsByClassName('bg_color_change');
        for (let d of divs) {
            d.style.backgroundColor = '#f3f3f3bd';
        }
    }
}


// 마커 이미지의 이미지 주소입니다
let shelterImageSrc = "icons/shelter_color.png";
let residenceImageSrc = "icons/residence_color.png";

// 마커 이미지의 이미지 크기 입니다
var imageSize = new kakao.maps.Size(25, 30);

var cafeteria_list_box = document.getElementById('cafeteria_list_box')

// 마커 이미지를 생성합니다
let shelterMarkerImage = new kakao.maps.MarkerImage(shelterImageSrc, imageSize);
let residenceMarkerImage = new kakao.maps.MarkerImage(residenceImageSrc, imageSize);

let marker;
let shelter_marker_list = []
let interim_housing_list = []

// 대피소 마커 생성
let marker_json;
axios.get(domain + shelter_api).then((response) => {
    for (let shelter of response.data) {
        marker_json = {
            dtlAdres: shelter.dtlAdres, // 주소
            vtAcmdfcltyNm: shelter.vtAcmdfcltyNm, // 시설 이름
            mngpsNm: shelter.mngpsNm, // 관리자 이름
            mngpsTelno: shelter.mngpsTelno, // 관리자 번호
            acmdfcltySENm: shelter.acmdfcltySENm, // 분류
            safe_zone_type: "shelter",
            latlng: new kakao.maps.LatLng(Number(shelter.ycord), Number(shelter.xcord)) // 위도, 경도
        }

        if (id === shelter.id.toString()) {
            open_safe_zone_box(marker_json)
            map.panTo(marker_json.latlng);

            document.getElementsByClassName('loading_box')[0].style.opacity = "0";
            setTimeout(() => {
                document.getElementsByClassName('loading_box')[0].style.display = "none";
            }, 1500);
        }
        
        marker = displayMarker(marker_json)

        shelter_marker_list.push(marker);
    }
});

// 임시주거시설 마커 생성
axios.get(domain + interim_housing_api).then((response) => {
    for (let shelter of response.data) {
        marker = displayMarker({
            dtlAdres: shelter.rn_adres, // 주소
            vtAcmdfcltyNm: shelter.vt_acmdfclty_nm, // 시설 이름
            mngpsNm: shelter.mngps_nm, // 관리자 이름
            mngpsTelno: shelter.mngps_telno, // 관리자 번호
            acmdfcltySENm: shelter.acmdfclty_dtl_cn, // 분류
            safe_zone_type: "interim_housing",
            latlng: new kakao.maps.LatLng(Number(shelter.ycord), Number(shelter.xcord)) // 위도, 경도
        })

        // 숨겨두기
        marker.setVisible(false);

        interim_housing_list.push(marker);
    }
});

function displayMarker(location) {
    if (location.safe_zone_type == "shelter") {
        var markerImage = shelterMarkerImage;
    } else {
        var markerImage = residenceMarkerImage;
    }
    
    var marker = new kakao.maps.Marker({
        map: map,
        position: location.latlng, // 마커를 표시할 위치
        image : markerImage, // 마커 이미지
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function() {
        open_safe_zone_box(location)
    });

    return marker;
}


function open_safe_zone_box(location) {
    document.getElementsByClassName('safe_zone_box')[0].style.display = "flex";
    document.getElementsByClassName('safe_zone_name')[0].innerText = location.vtAcmdfcltyNm;
    document.getElementsByClassName('address')[0].innerText = location.dtlAdres;
    document.getElementsByClassName('category')[0].innerText = location.acmdfcltySENm;
    if (location.mngpsTelno != "") {
        document.getElementsByClassName('manager_name')[0].innerText = location.mngpsNm;
        document.getElementsByClassName('manager_box')[0].style.display = "block";
    } else {
        document.getElementsByClassName('manager_box')[0].style.display = "none";
    }

    if (location.mngpsTelno != "") {
        document.getElementsByClassName('manager_phnum')[0].href = "tel:" + location.mngpsTelno;
        document.getElementsByClassName('manager_phnum')[0].style.display = "block";
    } else {
        document.getElementsByClassName('manager_phnum')[0].style.display = "none";
    }
}

function close_safe_zone_box() {
    document.getElementsByClassName('safe_zone_box')[0].style.display = "none";
}


// interim_housing
let now_pin = "shelter"



function change_pin() {
    const shelter_button = document.getElementById('shelter_button');
    const residence_button = document.getElementById('residence_button');
    
    if (now_pin === "shelter") {
        for (let shelter of shelter_marker_list) {
            shelter.setVisible(false);
        }

        for (let shelter of interim_housing_list) {
            shelter.setVisible(true);
        }

        now_pin = "interim_housing";

        shelter_button.style.display = "none";
        residence_button.style.display = "block";

    } else if (now_pin === "interim_housing") {
        for (let shelter of shelter_marker_list) {
            shelter.setVisible(true);
        }

        for (let shelter of interim_housing_list) {
            shelter.setVisible(false);
        }

        now_pin = "shelter";

        shelter_button.style.display = "block";
        residence_button.style.display = "none";
    }
}