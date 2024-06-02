function display_shelter() {
    const safe_zone_list = document.getElementById("safe_zone_list");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            axios.get(domain + near_shelter_api + "?latitude=" + latitude + "&longitude=" + longitude).then((response) => {
                if (response.data.length === 0) {
                    safe_zone_list.innerHTML = '<h1 class="text-[#6F6864] mt-10">회원님의 근처엔<br>긴급대피소가 없네요 :(</h1>';
                } else {
                    let phone;
                    let shelter_list_html = '';
                    for (let shelter of response.data) {
                        if (shelter.mngpsTelno != "") {
                            phone = '<a href="tel:' + shelter.mngpsTelno + '">'+
                            '            <div class="flex justify-center items-center w-[50px] h-[50px] bg-[#66cc54] rounded-[14px] cursor-pointer hover:bg-[#148300]">'+
                            '                <i class="fa fa-phone" aria-hidden="true" style="color: #ffffff; font-size: 30px;"></i>'+
                            '            </div>'+
                            '        </a>'
                        } else {
                            phone = ''
                        }

                        shelter_list_html += '<a href="/?id=' + shelter.id + '">'+
                            '    <div class="bg-[#e6e6e6] rounded-[15px] px-6 py-3 mb-2">'+
                            '            <div class="flex justify-between items-end">'+
                            '            <p class="text-[25px]">' + shelter.vtAcmdfcltyNm + '</p>'+
                            '            <p class="text-[15px] text-[#707070]">' + Math.round(shelter.distance) / 1000 + 'KM</p>'+
                            '        </div>'+
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
                        }
                    safe_zone_list.innerHTML = shelter_list_html;
                }
                hide_loading_box()
            });
        });
    } else {
        safe_zone_list.innerHTML = '<h1 class="text-[#6F6864] mt-10">GPS가 차단되었거나<br>찾을 수 없어요. :(</h1>';
        hide_loading_box()
    }
}

function hide_loading_box() {
    const loading_box = document.getElementById("loading_box");

    loading_box.style.opacity = "0";
    setTimeout(() => {
        loading_box.style.display = "none";
    }, 1500);
}