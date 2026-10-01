/* =====================================================
   KIISI'S STORE
   MAIN JAVASCRIPT
   ===================================================== */


/* =====================================================
   1. GET WEBSITE ELEMENTS
   ===================================================== */

const featuredProductsContainer =
    document.getElementById("featuredProducts");

const newProductsContainer =
    document.getElementById("newProducts");

const shopProductsContainer =
    document.getElementById("shopProducts");

const searchInput =
    document.getElementById("searchInput");

const shopSearch =
    document.getElementById("shopSearch");

const sortProducts =
    document.getElementById("sortProducts");

const filterButtons =
    document.querySelectorAll(".filter-button");


/* =====================================================
   2. FORMAT PRICE
   ===================================================== */

function formatPrice(price) {

    return "₦" + price.toLocaleString("en-NG");

}


/* =====================================================
   3. CREATE PRODUCT CARD
   ===================================================== */

function createProductCard(product) {

    return `
        <article class="product-card">

            <button
                class="wishlist-button"
                onclick="addToWishlist(${product.id})"
                aria-label="Add ${product.name} to wishlist"
            >
                ♡
            </button>


            <img
                src="${product.image}"
                alt="${product.name}"
                class="product-image"
            >


            <div class="product-info">

                <h3 class="product-name">
                    ${product.name}
                </h3>


                <p class="product-price">
                    ${formatPrice(product.price)}
                </p>


                <button
                    class="add-to-cart"
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>

            </div>

        </article>
    `;
}


/* =====================================================
   4. DISPLAY FEATURED PRODUCTS
   ===================================================== */

function displayFeaturedProducts() {

    if (!featuredProductsContainer) {
        return;
    }


    const featuredProducts =
        products.filter(
            product => product.featured === true
        );


    featuredProductsContainer.innerHTML =
        featuredProducts
            .map(product => createProductCard(product))
            .join("");

}


/* =====================================================
   5. DISPLAY NEW ARRIVALS
   ===================================================== */

function displayNewProducts() {

    if (!newProductsContainer) {
        return;
    }


    const newProducts =
        products.filter(
            product => product.newArrival === true
        );


    newProductsContainer.innerHTML =
        newProducts
            .map(product => createProductCard(product))
            .join("");

}


/* =====================================================
   6. SHOP PAGE
   ===================================================== */


/*
   These variables remember what the customer
   is currently searching/filtering.
*/

let currentCategory = "all";

let currentSearch = "";

let currentSort = "default";


/*
   Display products on the Shop page.
*/

function displayShopProducts() {

    if (!shopProductsContainer) {
        return;
    }


    let filteredProducts = [...products];


    /* -------------------------
       CATEGORY FILTER
       ------------------------- */

    if (currentCategory !== "all") {

        filteredProducts =
            filteredProducts.filter(
                product =>
                    product.category === currentCategory
            );

    }


    /* -------------------------
       SEARCH FILTER
       ------------------------- */

    if (currentSearch !== "") {

        filteredProducts =
            filteredProducts.filter(product => {

                const productName =
                    product.name.toLowerCase();

                const productCategory =
                    product.category.toLowerCase();

                const productDescription =
                    product.description.toLowerCase();


                return (
                    productName.includes(currentSearch) ||
                    productCategory.includes(currentSearch) ||
                    productDescription.includes(currentSearch)
                );

            });

    }


    /* -------------------------
       SORT PRODUCTS
       ------------------------- */

    if (currentSort === "low") {

        filteredProducts.sort(
            (a, b) => a.price - b.price
        );

    }


    if (currentSort === "high") {

        filteredProducts.sort(
            (a, b) => b.price - a.price
        );

    }


    if (currentSort === "name") {

        filteredProducts.sort(
            (a, b) =>
                a.name.localeCompare(b.name)
        );

    }


    /* -------------------------
       SHOW PRODUCTS
       ------------------------- */

    if (filteredProducts.length === 0) {

        shopProductsContainer.innerHTML = `
            <div class="no-products">

                <h3>
                    No products found
                </h3>

                <p>
                    Try another search or category.
                </p>

            </div>
        `;

        return;
    }


    shopProductsContainer.innerHTML =
        filteredProducts
            .map(product => createProductCard(product))
            .join("");

}


/* =====================================================
   7. CATEGORY FILTER BUTTONS
   ===================================================== */

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        function () {


            /*
               Remove active state from
               all buttons.
            */

            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            /*
               Make the clicked button active.
            */

            this.classList.add("active");


            /*
               Get selected category.
            */

            currentCategory =
                this.dataset.category;


            /*
               Update products.
            */

            displayShopProducts();

        }
    );

});


/* =====================================================
   8. SHOP SEARCH
   ===================================================== */

if (shopSearch) {

    shopSearch.addEventListener(
        "input",
        function () {

            currentSearch =
                this.value
                    .toLowerCase()
                    .trim();


            displayShopProducts();

        }
    );

}


/* =====================================================
   9. HOMEPAGE SEARCH
   ===================================================== */

if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        function (event) {

            /*
               Search when the customer
               presses Enter.
            */

            if (event.key === "Enter") {

                const searchTerm =
                    this.value
                        .trim();


                if (searchTerm !== "") {

                    window.location.href =
                        "shop.html?search=" +
                        encodeURIComponent(searchTerm);

                }

            }

        }
    );

}


/* =====================================================
   10. SORT PRODUCTS
   ===================================================== */

if (sortProducts) {

    sortProducts.addEventListener(
        "change",
        function () {

            currentSort =
                this.value;


            displayShopProducts();

        }
    );

}


/* =====================================================
   11. READ SEARCH FROM URL
   ===================================================== */

function readSearchFromURL() {

    if (!shopSearch) {
        return;
    }


    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const searchTerm =
        urlParams.get("search");


    if (searchTerm) {

        currentSearch =
            searchTerm
                .toLowerCase()
                .trim();


        shopSearch.value =
            searchTerm;

    }

}


/* =====================================================
   12. SHOPPING CART
   ===================================================== */

let cart =
    JSON.parse(
        localStorage.getItem("kiisisCart")
    ) || [];


/*
   Add product to cart.
*/

function addToCart(productId) {

    const product =
        products.find(
            product => product.id === productId
        );


    if (!product) {
        return;
    }


    const existingProduct =
        cart.find(
            item => item.id === productId
        );


    if (existingProduct) {


        if (
            existingProduct.quantity <
            product.stock
        ) {

            existingProduct.quantity++;

        } else {

            alert(
                "Sorry, there is no more stock available."
            );

            return;

        }


    } else {

        cart.push({

            id: product.id,

            quantity: 1

        });

    }


    saveCart();


    alert(
        product.name +
        " has been added to your cart."
    );

}


/*
   Save cart.
*/

function saveCart() {

    localStorage.setItem(
        "kiisisCart",
        JSON.stringify(cart)
    );

}


/* =====================================================
   13. WISHLIST
   ===================================================== */

let wishlist =
    JSON.parse(
        localStorage.getItem("kiisisWishlist")
    ) || [];


/*
   Add product to wishlist.
*/

function addToWishlist(productId) {

    const product =
        products.find(
            product => product.id === productId
        );


    if (!product) {
        return;
    }


    const alreadySaved =
        wishlist.includes(productId);


    if (alreadySaved) {

        alert(
            "This product is already in your wishlist."
        );

        return;

    }


    wishlist.push(productId);


    localStorage.setItem(
        "kiisisWishlist",
        JSON.stringify(wishlist)
    );


    alert(
        product.name +
        " has been added to your wishlist."
    );

}


/* =====================================================
   14. START WEBSITE
   ===================================================== */

displayFeaturedProducts();

displayNewProducts();

readSearchFromURL();

displayShopProducts();
        
