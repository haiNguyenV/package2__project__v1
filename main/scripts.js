const PRODUCTS_PER_PAGE = 10;

const paging = (page, pagingBarSize, totalPage) => {
    const middle = pagingBarSize % 2 === 0 ? pagingBarSize/2 : (pagingBarSize-1)/2;
    const startOfPaging = pagingBarSize % 2 == 0 ? page - middle + 1 : page - middle;
    const endOfPaging = page + middle;

    let pages = [];

    if (startOfPaging >= 1 && endOfPaging <= totalPage) {
        for (let p = startOfPaging; p <= endOfPaging; p++) {
            pages.push(p);
        }
        return pages;
    }

    if (startOfPaging < 1) {
        if (pagingBarSize <= totalPage) {
            for (let p = 1; p <= pagingBarSize; p++) {
                pages.push(p);
            }
        } else {
            for (let p = 1; p <= totalPage; p++) {
                pages.push(p);
            }
        }
        return pages;
    }

    if (endOfPaging >= totalPage) {
        if (pagingBarSize <= totalPage) {
            for (let offset = pagingBarSize - 1; offset >= 0; offset--) {
                pages.push(totalPage - offset);
            }
        } else {
            for (let offset = totalPage - 1; offset >= 0; offset--) {
                pages.push(totalPage - offset);
            }
        }
        return pages;
    }
}

/*hàm xảy ra khi bấm vào trang tương ứng thì truyền trang đó vào getProducts()*/
$(document).on("click",".page-link", function (){
    const page = $(this).html()
    getProducts(Number(page) - 1, PRODUCTS_PER_PAGE);
});

const getProducts = (page, size) => {
    $.ajax({
        url: `http://vti-ecommerce.foxcode.site/api/v1/products?page=${page}&size=${size}`,
        type: 'GET',
        success: function(data) {
            const productsList = data.content;
            $('.productsList').empty();
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

            //pagination
            const totalPages = data.totalPages;
            const pages = paging(page+1, 5, totalPages);
            $('.pagination').empty();
            for(let i = 0; i< pages.length; i++){
                let pageElementTemplate = `<li class="page-item"><span class="page-link">${pages[i]}</span></li>`;
                if(pages[i] -1 === page){
                    pageElementTemplate = `<li class="page-item active"><span class="page-link">${pages[i]}</span></li>`;
                }
                $('.pagination').append(
                    $.parseHTML(
                        pageElementTemplate
                    )
                )
            }
        },
    
        error: function(e) {
            //do sth...
        }  
    })
}

getProducts(0, PRODUCTS_PER_PAGE);

//set slider động
const arr = ['./img/slider.webp', './img/slider2.webp'];
let i = 0;

setInterval(() => {
    if(i >= arr.length) {
        i = 0;
    }
    $('#slider').css("background-image", 'url('+arr[i++]+')');
}, 2000)