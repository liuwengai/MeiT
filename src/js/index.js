//渲染列表swiper
$.ajax({
    url: '/api/list',
    dataType: 'json',
    success: function(data) {
        if (data.code == 0) {
            for (var i in data.data) {
                var str = `<div class="swiper-slide"><ul>`;
                data.data[i].forEach(function(item) {
                    str += `<li><img src="${item.img}" alt=""><span>${item.span}</span></li>`;
                });
                str += `</ul></div>`;
                $('.swiper-wrapper').append(str);
            }
            var banner = new Swiper('.swiper-container', {
                pagination: {
                    el: '.swiper-pagination'
                }
            });
        }
    }
});
//渲染下面菜单
$.ajax({
    url: '/api/hotlist',
    dataType: 'json',
    success: function(hotdata) {
        if (hotdata.code == 0) {
            var str = '';
            hotdata.data.forEach(function(item) {
                str += `<li>
                            <img src="${item.img}" alt="">
                            <div class="content">
                                <h4>${item.h4}</h4>
                                <p>${item.pp}</p>
                                <h5><span><em>${item.price}</em>门市价：20元</span><label>${item.span}</label></h5>
                            </div>
                        </li>`;
            });
            $('.classify ul').append(str);
        }
    }
});

var Bscroll = new BScroll('section', {
    scroll: true
});