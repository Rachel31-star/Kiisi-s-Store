/* =====================================================
   KIISI'S STORE
   MAIN JAVASCRIPT
   ===================================================== */


/* =========================
   1. GET WEBSITE ELEMENTS
   ========================= */

const featuredProductsContainer =
    document.getElementById("featuredProducts");

const newProductsContainer =
    document.getElementById("newProducts");

const searchInput =
    document.getElementById("searchInput");


/* =========================
   2. FORMAT PRICE
   ========================= */

function formatPrice(price) {

    return "₦" + price.toLocaleString("en-NG");

}


/* =========================
   3. CREATE PRODUCT CARD
   ========================= */

function createProductCard(product) {

    return `
        <article class="product-card">

            <!-- Wishlist button -->

            <button
                class="wishlist-button"
                onclick="addToWishlist(${product.id})"
                aria-label="Add ${product.name} to wishlist"
            >
                ♡
            </button>


            <!-- Product image -->

            <img
                src="${product.image}"
                alt="${product.name}"
                class="product-image"
            >


            <!-- Product information -->

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


/* =========================
   4. DISPLAY FEATURED PRODUCTS
   ========================= */

function displayFeaturedProducts() {

    if (!featuredProductsContainer) {
        return;
    }


    const featuredProducts =
        products.filter(product => product.featured === true);


    featuredProductsContainer.innerHTML =
        featuredProducts
            .map(product => createProductCard(product))
            .join("");

}


/* =========================
   5. DISPLAY NEW ARRIVALS
   ========================= */

function displayNewProducts() {

    if (!newProductsContainer) {
        return;
    }


    const newProducts =
        products.filter(product => product.newArrival === true);


    newProductsContainer.innerHTML =
        newProducts
            .map(product => createProductCard(product))
            .join("");

}


/* =========================
   6. SHOPPING CART
   ========================= */


/*
   Get the cart from the browser.

   If the customer has never added
   anything, create an empty cart.
*/

let cart =
    JSON.parse(localStorage.getItem("kiisisCart")) || [];


/*
   Add product to cart
*/

function addToCart(productId) {

    const product =
        products.find(product => product.id === productId);


    if (!product) {
        return;
    }


    const existingProduct =
        cart.find(item => item.id === productId);


    if (existingProduct) {

        if (existingProduct.quantity < product.stock) {

            existingProduct.quantity++;

        } else {

            alert("Sorry, there is no more stock available.");

            return;
        }

    } else {

        cart.push({

            id: product.id,

            quantity: 1

        });

    }


    saveCart();


    alert(product.name + " has been added to your cart.");

}


/*
   Save cart
*/

function saveCart() {

    localStorage.setItem(
        "kiisisCart",
        JSON.stringify(cart)
    );

}


/* =========================
   7. WISHLIST
   ========================= */

let wishlist =
    JSON.parse(localStorage.getItem("kiisisWishlist")) || [];


/*
   Add product to wishlist
*/

function addToWishlist(productId) {

    const product =
        products.find(product => product.id === productId);


    if (!product) {
        return;
    }


    const alreadySaved =
        wishlist.includes(productId);


    if (alreadySaved) {

        alert("This product is already in your wishlist.");

        return;

    }


    wishlist.push(productId);


    localStorage.setItem(
        "kiisisWishlist",
        JSON.stringify(wishlist)
    );


    alert(product.name + " has been added to your wishlist.");

}


/* =========================
   8. SEARCH
   ========================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            const searchTerm =
                searchInput.value
                    .toLowerCase()
                    .trim();


            /*
               If we're on the homepage,
               search will take the customer
               to the shop page.
            */

            if (searchTerm.length > 0) {

                window.location.href =
                    "shop.html?search=" +
                    encodeURIComponent(searchTerm);

            }

        }
    );

}


/* =========================
   9. START WEBSITE
   ========================= */

displayFeaturedProducts();

displayNewProducts();
