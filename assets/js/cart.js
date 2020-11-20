// data product
let productList = [
    {
        id: "product1",
        name: "product1",
        price: 10000,
        pcs: 10,
        imageUrl: "assets/img/bandung-badge.png",
        type: "NEW"
    },
    {
        id: "product2",
        name: "product2",
        price: 20000,
        pcs: 20,
        imageUrl: "assets/img/bandung-badge.png",
        type: "NEW"
    },
    {
        id: "product1",
        name: "product1",
        price: 10000,
        pcs: 10,
        imageUrl: "assets/img/bandung-badge.png",
        type: "NEW"
    },
    {
        id: "product2",
        name: "product2",
        price: 20000,
        pcs: 20,
        imageUrl: "assets/img/bandung-badge.png",
        type: "NEW"
    },
    {
        id: "product1",
        name: "product1",
        price: 10000,
        pcs: 10,
        imageUrl: "assets/img/bandung-badge.png",
        type: "NEW"
    },
    {
        id: "product2",
        name: "product2",
        price: 20000,
        pcs: 20,
        imageUrl: "assets/img/bandung-badge.png",
        type: "NEW"
    },
    {
        id: "product1",
        name: "product1",
        price: 10000,
        pcs: 10,
        imageUrl: "assets/img/bandung-badge.png",
        type: "NEW"
    },
    {
        id: "product2",
        name: "product2",
        price: 20000,
        pcs: 20,
        imageUrl: "assets/img/bandung-badge.png",
        type: "MAN"
    },
    {
        id: "product1",
        name: "product1",
        price: 10000,
        pcs: 10,
        imageUrl: "assets/img/bandung-badge.png",
        type: "MAN"
    },
    {
        id: "product2",
        name: "product2",
        price: 20000,
        pcs: 20,
        imageUrl: "assets/img/bandung-badge.png",
        type: "WOMAN"
    }
];

const productKey = "PRODUCT";
const userProductKey = "USER_PRODUCT";

let myProduct = [];

function navigation() {
    let currentProductList = JSON.parse(localStorage.getItem(productKey));

    let homeNav = document.getElementById("home")
    homeNav.addEventListener("click", function (e) {
        clearActiveAttribute();
        homeNav.setAttribute("class", "active");

        productList = currentProductList;
        showProducts();
    });

    let newNav = document.getElementById("new")
    newNav.addEventListener("click", function (e) {
        clearActiveAttribute();
        newNav.setAttribute("class", "active");

        productList = currentProductList.filter(p => p.type === 'NEW');
        showProducts();
    });

    let manNav = document.getElementById("man")
    manNav.addEventListener("click", function (e) {
        clearActiveAttribute();
        manNav.setAttribute("class", "active");

        productList = currentProductList.filter(p => p.type === 'MAN');
        showProducts();
    });

    let womanNav = document.getElementById("woman")
    womanNav.addEventListener("click", function (e) {
        clearActiveAttribute();
        manNav.setAttribute("class", "active");

        productList = currentProductList.filter(p => p.type === 'WOMAN');
        showProducts();
    });
}

function clearActiveAttribute() {
    document.getElementById("home").removeAttribute("class");
    document.getElementById("new").removeAttribute("class");
    document.getElementById("man").removeAttribute("class");
    document.getElementById("woman").removeAttribute("class");
}

function initProduct() {
    if (typeof (Storage) !== "undefined") {
        if (localStorage.getItem(userProductKey) === 'undefined'
            || localStorage.getItem(userProductKey) === null) {
            localStorage.setItem(userProductKey, JSON.stringify(myProduct));
        } else {
            myProduct = JSON.parse(localStorage.getItem(userProductKey));
            showCart();
        }

        if (localStorage.getItem(productKey) === "undefined"
            || localStorage.getItem(productKey) === null) {
            localStorage.setItem(productKey, JSON.stringify(productList));
        } else {
            productList = JSON.parse(localStorage.getItem(productKey));

            showProducts();
        }
    } else {
        alert("Browser tidak support storage")
    }
}

function storeUserProduct(data) {
    localStorage.setItem(userProductKey, JSON.stringify(data));
}

function removeUserProduct() {
    localStorage.removeItem(userProductKey);
}

// menampilkan product list
function showProducts() {
    let productSelector = document.getElementById("products");
    productSelector.innerHTML = "";

    for (let product of productList) {
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
                        price: product.price,
                    };
                    myProduct.push(newProduct);
                } else {
                    foundProduct.pcs = foundProduct.pcs + 1;
                    foundProduct.price = foundProduct.price + product.price;
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
        row.innerHTML += "<td>" + "Rp." + Number(myProduct[i].price).toLocaleString('id');
        +"</td>";

        cartList.appendChild(row);
    }

    showResetBtn();
    showSumCart();
    storeUserProduct(myProduct);
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

// menampilkan sum cart
function showSumCart() {
    let sumCart = document.querySelector("#sumCart");
    sumCart.innerHTML = "";

    if (myProduct.length === 0) {
        sumCart.style.display = "none";
    } else {
        sumCart.style.display = "block";
    }

    let sum = myProduct.map(p => p.price).reduce(getSum, 0);
    sumCart.innerHTML = "Rp." + Number(sum).toLocaleString('id');
}

// reset cart
function resetCart() {
    let resetCart = document.querySelector("#resetCart");
    resetCart.addEventListener("click", function (e) {
        productList = [];
        myProduct = [];
        removeUserProduct();
        showCart();
        initProduct();
    });
}

function getSum(total, num) {
    return total + num;
}

initProduct();
navigation();
showProducts();
showResetBtn();
resetCart();


