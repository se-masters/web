let currentPolyline = null; // 기존 polyline을 저장할 변수

async function getCarDirection() {
    let origin_x, origin_y;

    close_safe_zone_box();

    if (currentPos) {
        // Use current position if available
        //console.log("Success");
        origin_x = currentPos.getLat();
        origin_y = currentPos.getLng();
    } else {
        alert("위치정보를 가져올 수 없습니다");
    }
    const origin = `${origin_y},${origin_x}`;
    const destination = `${destination_y},${destination_x}`
    const url = 'https://apis-navi.kakaomobility.com/v1/directions';

    const headers = {
        Authorization: `KakaoAK ${REST_API_KEY}`,
        'Content-Type': 'application/json'
    };

    const queryParams = new URLSearchParams({
        origin: origin,
        destination: destination
    });

    const requestUrl = `${url}?${queryParams}`;

    try {
        const response = await fetch(requestUrl, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        //console.log(data);

        const linePath = [];
        data.routes[0].sections[0].roads.forEach(router => {
            router.vertexes.forEach((vertex, index) => {
                if (index % 2 === 0) {
                    linePath.push(new kakao.maps.LatLng(router.vertexes[index + 1], router.vertexes[index]));
                }
            });
        });

        // 기존 polyline을 제거
        if (currentPolyline) {
            currentPolyline.setMap(null);
        }

        // 새로운 polyline을 생성하고 저장
        currentPolyline = new kakao.maps.Polyline({
            path: linePath,
            strokeWeight: 8,
            strokeColor: '#FEA443',
            strokeOpacity: 0.9,
            strokeStyle: 'solid'
        });

        currentPolyline.setMap(map);

    } catch (error) {
        console.error('Error:', error);
    }
}
