$(document).ready(()=> {
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
                        <td><button class='edit__btn' editId = "${val.id}">Edit</button></td>
                        <td><button class='delete__btn' deleteId = "${val.id}">Delete</button></td>
                    </tr>`;
                
                $('.content__products-table').append(tempProduct);
            })

            localStorage.setItem("productsList", JSON.stringify(productsList));
            const test = localStorage.getItem("productsList");

            /*sự kiện edit một sản phẩm*/
            $('.edit__btn').click(() => {
                $('body').append(`<div class="edit__product">
                        <button id='edit-product__close' class='edit-product__close'><i class="fa fa-sharp fa-solid fa-arrow-right"></i></button>
                        <h1>Thông tin sản phẩm</h1>
                        <h4>Id</h4>
                        <input id="edit-product__id" class="product__id product__input" type="text" readonly>
                        <h4>Tên sản phẩm</h4>
                        <input id="edit-product__name" class="product__name product__input" type="text">
                        <h4>Thương hiệu</h4>
                        <input id="edit-product__brand" class="product__brand product__input" type="text">
                        <h4>Sao đánh giá</h4>
                        <input id="edit-product__rated" class="product__rated product__input" type="text">
                        <h4>Giá sản phẩm</h4>
                        <input id="edit-product__price" class="product__price product__input" type="text">
                        <h4>Hình ảnh</h4>
                        <input id="edit-product__img" class="product__img product__input" type="text">
                        <div class="edit__product__btn">
                            <button id='edit__product'>Update</button>
                            <button id='reset__edit-product'>Reset</button>    
                        </div>
                        </div>`);
                $('.container').css('opacity', 0.5);



                //truyền thông tin của sản phẩm cần sửa vào các ô input tương ứng
                $.ajax({
                    url: `http://vti-ecommerce.foxcode.site/api/v1/products`,
                    type: 'GET',
                    success: function(data) {
                        const editProductId = $(".edit__btn").attr("editId");
                        const productsList = data.content;
                        productsList.forEach((val, ind) => {
                            if(val.id == editProductId) {
                                $('#edit-product__id').val(val.id);
                                $('#edit-product__name').val(val.productName);
                                $('#edit-product__brand').val(val.brand);
                                $('#edit-product__rated').val(val.rated);
                                $('#edit-product__price').val(val.price);
                                $('#edit-product__img').val(val.image);
                            }
                        });
                        
                    },
                    error: function(e) {
                        alert('đã có lỗi xảy ra')
                    }

                })

                /*sự kiện reset trong cửa sổ thêm mới sản phẩm*/
                $('#reset__edit-product').click(() => {
                    $('.product__input').val('');
                })  

                //sự kiện khi nhấn nút update để hoàn tất cập nhật thông tin sản phẩm 
                $('#edit__product').click(() => {
                    if(confirm('Bạn chắc chắn muốn cập nhật thông tin của sản phẩm này chứ?')) {
                        const productId = $('#edit-product__id').val().trim();
                        const productName = $('#edit-product__name').val().trim();
                        const productBrand = $('#edit-product__brand').val().trim();
                        const productRated = $('#edit-product__rated').val().trim();
                        const productPrice = $('#edit-product__price').val().trim();
                        const productImg = $('#edit-product__img').val().trim();

                        if(productId == '' || productName == '' || productBrand == '' || productRated == '' || productPrice == '' || productImg == '') {
                            alert('Vui lòng điền đầy đủ thông tin của sản phẩm!');
                        } else {
                            $.ajax({
                                url: `http://vti-ecommerce.foxcode.site/api/v1/products/${productId}`,
                                type: 'PUT',
                                contentType: 'application/json',
                                data: JSON.stringify({
                                    brand: productBrand,
                                    id: productId,
                                    image: productImg,
                                    price: productPrice,
                                    productName: productName,
                                    rated: productRated
                                }),
                                success: () => {
                                    alert('cập nhật sản phẩm thành công!');
                                    location.reload();
                                }, 
                                error: () => {                
                                    alert('Đã có lỗi xảy ra, vui lòng thử lại!');
                                }
                            })
                        }
                    }
                })

                /*sự kiện xảy ra khi nhấn nút đóng cửa sổ thêm mới sản phẩm*/
                $('#edit-product__close').click(() => {
                    $('.edit__product').remove();
                    $('.container').css('opacity', 1);
                })
            })
            
            /*sự kiện delete một sản phẩm*/
            $('.delete__btn').click(() => {
                const productId = $(".delete__btn").attr("deleteId");
                if(confirm("Bạn chắc chắn muốn xóa sản phẩm này chứ!")) {
                    $.ajax({
                        url: `http://vti-ecommerce.foxcode.site/api/v1/products/${productId}`,
                        type: 'DELETE',
                        contentType: 'application/json',
                        data: JSON.stringify({id: productId}),
                        success: () => {
                            alert('Đã xóa sản phẩm thành công!');
                            location.reload();
                        }, 
                        error: (error) => {    
                            alert('Đã có lỗi xảy ra, vui lòng thử lại!');
                        }
                    })
                }
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
                const newProductsList = productsList.filter((val) => {
                    var re = new RegExp(textField, "i");
                    return val.productName.search(re) != -1;
                })
                newProductsList.forEach((val) => {
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

    /*Sự kiện hiển thị cửa sổ để thêm mới sản phẩm*/
    $('#content__add-new-btn').click(() => {
        $('body').append(`<div class="add__new-item">
                <button id='close' class='add__new-item__close'><i class="fa fa-sharp fa-solid fa-arrow-right"></i></button>
                <h1>Nhập thông tin sản phẩm cần thêm mới</h1>
                <h4>Id</h4>
                <input id="product__id" class="product__id product__input" type="text" readonly>
                <h4>Tên sản phẩm</h4>
                <input id="product__name" class="product__name product__input" type="text" placeholder="Nhap tên sản phẩm...">
                <h4>Thương hiệu</h4>
                <input id="product__brand" class="product__brand product__input" type="text" placeholder="Nhap thương hiệu...">
                <h4>Sao đánh giá</h4>
                <input id="product__rated" class="product__rated product__input" type="text" placeholder="Nhap số sao đánh giá...">
                <h4>Giá sản phẩm</h4>
                <input id="product__price" class="product__price product__input" type="text" placeholder="Nhập giá...">
                <h4>Chọn hình ảnh</h4>
                <input id="product__img" class="product__img product__input" type="text" placeholder="Nhập url của hình ảnh...">
                <div class="add__new-item__btn">
                    <button id='add__new-product'>Add</button>
                    <button id='reset__new-product'>Reset</button>    
                </div>
            </div>`);
        $('.container').css('opacity', 0.5);

        

        /*thêm mới một sản phẩm*/
        $('#add__new-product').click(() => {
            const productId = $('#product__id').val().trim();
            const productName = $('#product__name').val().trim();
            const productBrand = $('#product__brand').val().trim();
            const productRated = $('#product__rated').val().trim();
            const productPrice = $('#product__price').val().trim();
            const productImg = $('#product__img').val().trim();

            if(productName == '' || productBrand == '' || productRated == '' || productPrice == '' || productImg == '') {
                alert('Vui lòng điền đầy đủ thông tin của sản phẩm!');
            } else {
                $.ajax({
                    url: 'http://vti-ecommerce.foxcode.site/api/v1/products',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        brand: productBrand,
                        image: productImg,
                        price: productPrice,
                        productName: productName,
                        rated: productRated
                      }),
                    success: (data) => {
                        alert('thêm mới sản phẩm thành công!')
                    }, 
                    error: (error) => {                
                        alert('Đã có lỗi xảy ra, vui lòng thử lại!');
                    }
                })
            }

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
        localStorage.removeItem("accessToken");
        window.location.replace("login.html");
    })
});