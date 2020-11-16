// data product
let productList = [
    {
        id: "product1",
        name: "product1",
        price: 10000,
        pcs: 10,
        imageUrl: "assets/img/bandung-badge.png"
    },
    {
        id: "product2",
        name: "product2",
        price: 20000,
        pcs: 20,
        imageUrl: "assets/img/bandung-badge.png"
    },
    {
        id: "product1",
        name: "product1",
        price: 10000,
        pcs: 10,
        imageUrl: "assets/img/bandung-badge.png"
    },
    {
        id: "product2",
        name: "product2",
        price: 20000,
        pcs: 20,
        imageUrl: "assets/img/bandung-badge.png"
    },
    {
        id: "product1",
        name: "product1",
        price: 10000,
        pcs: 10,
        imageUrl: "assets/img/bandung-badge.png"
    },
    {
        id: "product2",
        name: "product2",
        price: 20000,
        pcs: 20,
        imageUrl: "assets/img/bandung-badge.png"
    },
    {
        id: "product1",
        name: "product1",
        price: 10000,
        pcs: 10,
        imageUrl: "assets/img/bandung-badge.png"
    },
    {
        id: "product2",
        name: "product2",
        price: 20000,
        pcs: 20,
        imageUrl: "assets/img/bandung-badge.png"
    },
    {
        id: "product1",
        name: "product1",
        price: 10000,
        pcs: 10,
        imageUrl: "assets/img/bandung-badge.png"
    },
    {
        id: "product2",
        name: "product2",
        price: 20000,
        pcs: 20,
        imageUrl: "assets/img/bandung-badge.png"
    }
];

let myProduct = [];

// menampilkan product list
function showProducts() {
    let productSelector = document.getElementById("products");
    productSelector.innerHTML = "";

    let products = productList.map(p => p);
    for (let product of products) {
        let section = document.createElement('section');
        let img = document.createElement('img');
        img.setAttribute("src", product.imageUrl);

        let title = document.createElement('h2');
        title.innerText = product.name;

        let article = document.createElement('article');
        let ul = document.createElement('ul');
        let liPrice = document.createElement('li');
        liPrice.innerText = "Rp." + Number(product.price).toLocaleString('id');

        let liPcs = document.createElement('li');
        liPcs.innerText = product.pcs + " pcs";

        let buyBtn = document.createElement('button');
        buyBtn.innerText = "Beli";

        // event beli
        buyBtn.addEventListener("click", function (e) {
            if (product.pcs === 0) {
                alert("Stok Habis");
            } else {
                let foundProduct = myProduct.find(value => product.id === value.id);
                if (foundProduct === undefined) {
                    let newProduct = {
                        id: product.id,
                        name: product.name,
                        pcs: 1,
                    };
                    myProduct.push(newProduct);
                } else {
                    foundProduct.pcs = foundProduct.pcs + 1;
                }

                --product.pcs;
                liPcs.innerText = product.pcs + " pcs";

                showCart();
            }
        });

        ul.appendChild(liPrice);
        ul.appendChild(liPcs);

        article.appendChild(ul);

        section.appendChild(img);
        section.appendChild(title);
        section.appendChild(article);
        section.appendChild(buyBtn);

        // append element product
        productSelector.appendChild(section);
    }
}

// menampilkan cart
function showCart() {
    let cartList = document.querySelector("#cartList");
    cartList.innerHTML = "";

    for (let i = 0; i < myProduct.length; i++) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + (i + 1) + "</td>";
        row.innerHTML += "<td>" + myProduct[i].name + "</td>";
        row.innerHTML += "<td>" + myProduct[i].pcs + "</td>";

        cartList.appendChild(row);
    }

    showResetBtn();
}

// menampilkan btn reset
function showResetBtn() {
    let resetCart = document.querySelector("#resetCart");
    if (myProduct.length === 0) {
        resetCart.style.display = "none";
    } else {
        resetCart.style.display = "block";
    }
}

// reset cart
function resetCart() {
    let resetCart = document.querySelector("#resetCart");
    resetCart.addEventListener("click", function (e) {
        myProduct = [];
        productList = [];
        showProducts()
        showCart();
    });
}

showProducts();
showResetBtn();
resetCart();


