let lists = document.createElement("div")
const obj = document.getElementsByClassName("safe_zone_list")[0];

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        
        axios.get(domain + near_shelter_api + "?latitude=" + latitude + "&longitude=" + longitude).then((response) => {
            if (response.data.length === 0) {
                lists.innerHTML = '<h1 class="text-[#6F6864] mt-10">회원님의 근처엔<br>긴급대피소가 없네요 :(</h1>'
                obj.appendChild(lists);
            } else {
                let phone;
                for (let shelter of response.data) {
                    let lists = document.createElement("div")

                    if (shelter.mngpsTelno != "") {
                        phone = '<a href="tel:' + shelter.mngpsTelno + '">'+
                        '            <div class="flex justify-center items-center w-[50px] h-[50px] bg-[#66cc54] rounded-[14px] cursor-pointer hover:bg-[#148300]">'+
                        '                <i class="fa fa-phone" aria-hidden="true" style="color: #ffffff; font-size: 30px;"></i>'+
                        '            </div>'+
                        '        </a>'
                    } else {
                        phone = ''
                    }

                    lists.innerHTML = '<a href="/?id=' + shelter.id + '">'+
                        '    <div class="bg-[#e6e6e6] rounded-[15px] px-6 py-3 mb-2">'+
                        '        <p class="text-[25px]">' + shelter.vtAcmdfcltyNm + '</p>'+
                        '        <p class="text-[15px] text-[#707070]">' + shelter.dtlAdres + '</p>'+
                        '        <div class="mt-3">'+
                        '            <p class="text-[15px] text-[#707070]">분류</p>'+
                        '            <p class="text-[20px]">' + shelter.acmdfcltySENm + '</p>'+
                        '        </div>'+
                        '        <div class="flex justify-between mt-2">'+
                        '            <div>'+
                        '                <p class="text-[15px] text-[#707070]">담당자</p>'+
                        '                <p class="manager_name text-[20px]">' + shelter.mngpsNm + '</p>'+
                        '            </div>'+
                                     phone+
                        '        </div>'+
                        '    </div>'
                        '</a>'
                    obj.appendChild(lists);
                }
            }
        });
    });
} else {
    // alert('GPS가 차단되었거나 찾을 수 없습니다.');
    lists.innerHTML = '<h1 class="text-[#6F6864] mt-10">GPS가 차단되었거나<br>찾을 수 없어요. :(</h1>'
    obj.appendChild(lists);
}