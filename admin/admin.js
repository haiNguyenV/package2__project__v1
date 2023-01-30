$(document).ready(()=> {
    const checkLogin = ()=> {
        const accessToken = localStorage.getItem('accessToken');
        if(accessToken) {
            return;
        } else {
            const userName = window.prompt('Xin mời nhập userName: ');
            const passWord = window.prompt('Xin mời nhập passWord: ');
            login(userName, passWord);
        }
    }

    const login = (username, password) => {
        $.ajax({
            url: 'http://vti-ecommerce.foxcode.site/api/v1/auth/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({username, password}),
            success: (data) => {
                localStorage.setItem('accessToken', data.accessToken);
            }, 
            error: (error) => {                
                alert('Đã có lỗi xảy ra, vui lòng thử lại!');
            }
        })
    }

    checkLogin();


    /*xây dựng giao diện trang quản trị*/
    $.ajax({
        url: 'http://vti-ecommerce.foxcode.site/api/v1/products',
        type: 'GET',
        success: function(data) {
            const productsList = data.content;
            
            productsList.forEach((val, i) => {
                const tempProduct = `<tr>
                        <td>${val.id}</td>
                        <td>${val.productName}</td>
                        <td>${val.price}.đ</td>
                        <td>Màn hình: OLED6.7"Super Retina XDR
                            Hệ điều hành: iOS 16
                        <td>
                            Camera sau: Chính 48 MP & Phụ 12 MP, 12 MP</td>
                        <td>${val.rated}</td>
                        <td>${val.image}</td>
                        <td>${val.brand}</td>
                        <td>dien thoai</td>
                        <td><button class='edit__btn'>Edit</button></td>
                        <td><button class='delete__btn'>Delete</button></td>
                    </tr>`;
                
                $('.content__products-table').append(tempProduct);
            })

            localStorage.setItem("productsList", JSON.stringify(productsList));
            const test = localStorage.getItem("productsList");
            console.log(JSON.parse(test))

            /*sự kiện edit một sản phẩm*/
            $('.edit__btn').click(() => {
                alert('edit sản phẩm');
            })
            
            /*sự kiện delete một sản phẩm*/
            $('.delete__btn').click(() => {
                alert('delete sản phẩm');
            })
        },

        error: function(e) {
            //do sth...
        } 
    })


    /*sự kiện tìm kiếm tên sản phẩm*/
    $('#search').click(() => {
        $('.content__products-table').html(`
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Info</th>
                <th>Detail</th>
                <th>Star</th>
                <th>Image</th>
                <th>NSX</th>
                <th>Category</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        `);
        const textField = $('#textField').val().trim();
        $.ajax({
            url: 'http://vti-ecommerce.foxcode.site/api/v1/products',
            type: 'GET',
            success: function(data) {
                const productsList = data.content;
                const newProductsList = productsList.filter((val, index) => {
                    var re = new RegExp(textField, "i");
                    return val.productName.search(re) != -1;
                })
                newProductsList.forEach((val, i) => {
                    const tempProduct = `<tr>
                        <td>${val.id}</td>
                        <td>${val.productName}</td>
                        <td>${val.price}.đ</td>
                        <td>Màn hình: OLED6.7"Super Retina XDR
                            Hệ điều hành: iOS 16
                        <td>
                            Camera sau: Chính 48 MP & Phụ 12 MP, 12 MP</td>
                        <td>${val.rated}</td>
                        <td>${val.image}</td>
                        <td>${val.brand}</td>
                        <td>dien thoai</td>
                        <td><button class='edit__btn'>Edit</button></td>
                        <td><button class='delete__btn'>Delete</button></td>
                    </tr>`;
                    
                    $('.content__products-table').append(tempProduct);
                })

                /*sự kiện edit một sản phẩm*/
                $('.edit__btn').click(() => {
                    alert('edit sản phẩm');
                })
                
                /*sự kiện delete một sản phẩm*/
                $('.delete__btn').click(() => {
                    alert('delete sản phẩm');
                })
            },

            error: function(e) {
                //do sth...
            } 
        })
    })

    /*Sự kiện thêm mới một sản phẩm*/
    $('#content__add-new-btn').click(() => {
        $('body').append(`<div class="add__new-item">
                <button id='close' class='add__new-item__close'><i class="fa fa-sharp fa-solid fa-arrow-right"></i></button>
                <h1>Nhập thông tin sản phẩm cần thêm mới</h1>
                <h4>Id</h4>
                <input id="product__id" class="product__id product__input" type="text" placeholder="Nhap id...">
                <h4>Tên sản phẩm</h4>
                <input id="product__name" class="product__name product__input" type="text" placeholder="Nhap tên sản phẩm...">
                <h4>Thương hiệu</h4>
                <input id="product__brand" class="product__brand product__input" type="text" placeholder="Nhap thương hiệu...">
                <h4>Sao đánh giá</h4>
                <input id="product__rated" class="product__rated product__input" type="text" placeholder="Nhap số sao đánh giá...">
                <h4>Giá sản phẩm</h4>
                <input id="product__price" class="product__price product__input" type="text" placeholder="Nhập giá...">
                <h4>Chọn hình ảnh</h4>
                <input id="product__img" class="product__img product__input" type="file">
                <div class="add__new-item__btn">
                    <button id='add__new-product'>Add</button>
                    <button id='reset__new-product'>Reset</button>    
                </div>
            </div>`);
        $('.container').css('opacity', 0.5);

        /*sự kiện khi chọn add (thêm mới) một sản phẩm*/
        $('#add__new-product').click(() => {
            const productId = $('#product__id').val().trim();
            const productName = $('#product__name').val().trim();
            const productBrand = $('#product__brand').val().trim();
            const productRated = $('#product__rated').val().trim();
            const productPrice = $('#product__price').val().trim();
            const productImg = $('#product__img').val().trim();

            // $.ajax({
            //     url: 'http://vti-ecommerce.foxcode.site/api/v1/auth/login',
            //     type: 'POST',
            //     contentType: 'application/json',
            //     data: JSON.stringify({productId, productName, productBrand, productRated, productPrice, productImg}),
            //     success: (data) => {
            //         alert('thêm mới sản phẩm thành công!')
            //     }, 
            //     error: (error) => {                
            //         alert('Đã có lỗi xảy ra, vui lòng thử lại!');
            //     }
            // })
            alert('add new product')
        })

        /*sự kiện reset trong cửa sổ thêm mới sản phẩm*/
        $('#reset__new-product').click(() => {
            $('.product__input').val('');
        })  

        /*sự kiện xảy ra khi nhấn nút đóng cửa sổ thêm mới sản phẩm*/
        $('#close').click(() => {
            $('.add__new-item').remove();
            $('.container').css('opacity', 1);
        })
    })    
    
    /*sự kiện log out khỏi trang quản trị*/
    $('#logout__btn').click(() => {
        alert('logout')
    })
});