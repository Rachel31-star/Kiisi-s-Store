/* =====================================================
   KIISI'S STORE
   PRODUCT DATABASE
   ===================================================== */


/*
   Each product is an object.

   You can add as many products as you want.

   IMPORTANT:
   - Give every product a unique id.
   - price is written as a number, without ₦ or commas.
   - image is the location of the product picture.
*/


const products = [

    /* =========================
       PRODUCT 1
       ========================= */

    {
        id: 1,

        name: "Elegant Mini Handbag",

        price: 15000,

        category: "fashion",

        image: "images/products/mini-handbag.jpg",

        description:
            "A stylish and elegant mini handbag that adds a beautiful touch to any outfit.",

        stock: 10,

        featured: true,

        newArrival: true
    },


    /* =========================
       PRODUCT 2
       ========================= */

    {
        id: 2,

        name: "Pearl Necklace",

        price: 8500,

        category: "accessories",

        image: "images/products/pearl-necklace.jpg",

        description:
            "A delicate pearl necklace designed for a simple and elegant look.",

        stock: 15,

        featured: true,

        newArrival: false
    },


    /* =========================
       PRODUCT 3
       ========================= */

    {
        id: 3,

        name: "Luxury Body Mist",

        price: 7000,

        category: "beauty",

        image: "images/products/body-mist.jpg",

        description:
            "A sweet and refreshing body mist for an everyday luxurious feel.",

        stock: 20,

        featured: true,

        newArrival: true
    },


    /* =========================
       PRODUCT 4
       ========================= */

    {
        id: 4,

        name: "Cute Jewelry Box",

        price: 12000,

        category: "home",

        image: "images/products/jewelry-box.jpg",

        description:
            "A beautiful jewelry storage box for keeping your favorite pieces organized.",

        stock: 8,

        featured: false,

        newArrival: true
    },


    /* =========================
       PRODUCT 5
       ========================= */

    {
        id: 5,

        name: "Minimalist Watch",

        price: 18000,

        category: "accessories",

        image: "images/products/minimalist-watch.jpg",

        description:
            "A simple and stylish watch that works beautifully with everyday outfits.",

        stock: 12,

        featured: true,

        newArrival: false
    },


    /* =========================
       PRODUCT 6
       ========================= */

    {
        id: 6,

        name: "Satin Hair Bow",

        price: 3500,

        category: "fashion",

        image: "images/products/satin-hair-bow.jpg",

        description:
            "A soft satin hair bow that gives your hairstyle a cute and feminine finish.",

        stock: 25,

        featured: false,

        newArrival: true
    },


    /* =========================
       PRODUCT 7
       ========================= */

    {
        id: 7,

        name: "Aesthetic Room Lamp",

        price: 22000,

        category: "home",

        image: "images/products/room-lamp.jpg",

        description:
            "A decorative room lamp designed to create a warm and cozy atmosphere.",

        stock: 7,

        featured: true,

        newArrival: false
    },


    /* =========================
       PRODUCT 8
       ========================= */

    {
        id: 8,

        name: "Glossy Lip Oil",

        price: 5000,

        category: "beauty",

        image: "images/products/lip-oil.jpg",

        description:
            "A glossy lip oil that gives your lips a smooth and shiny finish.",

        stock: 30,

        featured: false,

        newArrival: true
    }

];
