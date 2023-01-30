$.ajax({
    url: 'http://vti-ecommerce.foxcode.site/api/v1/products',
    type: 'GET',
    success: function(data) {
        const productsList = data.content;
        
        productsList.forEach((val, i) => {
            const tempProduct = `
            <div class="col-12	col-sm-6 col-md-6 col-lg-4 col-xl-3"><div class="product__item"><div class="product__img"><img src="${val.image}" alt="sản phẩm"></div><div class="product__details"> 
                <h1>${val.productName}</h1>
                <h4>Hãng sản xuất: ${val.brand}</h4>
                <h4 class="star__rated__${i}">
                <i class="fa fa-thin fa-star"></i>
                 <i class="fa fa-thin fa-star"></i> 
                 <i class="fa fa-thin fa-star"></i> 
                 <i class="fa fa-thin fa-star"></i> 
                 <i class="fa fa-thin fa-star"></i>
                </h4> 
                <div class="price__cart"><h4>${val.price}đ</h4><a href="#"><i class="fa fa-sharp fa-solid fa-cart-arrow-down"></i></a></div></div></div></div>
            `;  

            $('.productsList').append(tempProduct);

            for(let j = 0; j < val.rated; j++) {
                $('.star__rated__'+i+' i:nth-child('+(j+1)+')')[0].style.color = '#ffa500';
                console.log($('.star__rated__'+i+' i:nth-child('+(j+1)+')'))
            }
        })
    },

    error: function(e) {
        //do sth...
    } 
    
})

//set slider động
const arr = ['./img/slider.webp', './img/slider2.webp'];
let i = 0;

setInterval(() => {
    if(i >= arr.length) {
        i = 0;
    }
    $('#slider').css("background-image", 'url('+arr[i++]+')');
}, 2000)