const products = [

    {
        id: 1,
        name: "Mateen X1",
        category: "technology",
        price: 45000,
        description: "Premium next-generation mobile technology.",
        art: "phone-art",
        bg: "art-blue"
    },

    {
        id: 2,
        name: "Mateen Pro Headphones",
        category: "technology",
        price: 18500,
        description: "Immersive sound with premium comfort.",
        art: "headphone-art",
        bg: "art-purple"
    },

    {
        id: 3,
        name: "Mateen Smart Watch",
        category: "technology",
        price: 22000,
        description: "Smart technology for your everyday life.",
        art: "watch-art",
        bg: "art-green"
    },

    {
        id: 4,
        name: "Mateen Classic",
        category: "fashion",
        price: 8500,
        description: "Clean modern fashion with premium style.",
        art: "shoe-art",
        bg: "art-orange"
    },

    {
        id: 5,
        name: "Mateen Elite Bag",
        category: "fashion",
        price: 12500,
        description: "Elegant design for modern lifestyles.",
        art: "bag-art",
        bg: "art-pink"
    },

    {
        id: 6,
        name: "Mateen Signature",
        category: "accessories",
        price: 6500,
        description: "A premium accessory made to stand out.",
        art: "sunglasses-art",
        bg: "art-gold"
    }

];


let cart =
    JSON.parse(
        localStorage.getItem("abdulMateenCart")
    ) || [];


let selectedCategory = "all";


const grid =
    document.getElementById("productsGrid");

const search =
    document.getElementById("search");

const cartBtn =
    document.getElementById("cartBtn");

const cartPanel =
    document.getElementById("cartPanel");

const overlay =
    document.getElementById("overlay");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutBtn =
    document.getElementById("checkoutBtn");

const checkoutModal =
    document.getElementById("checkoutModal");

const closeCheckout =
    document.getElementById("closeCheckout");


function money(value) {

    return "Rs. " +
        value.toLocaleString("en-PK");

}


function renderProducts() {

    const query =
        search.value
            .trim()
            .toLowerCase();


    const filtered =
        products.filter(product => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(query) ||

                product.description
                    .toLowerCase()
                    .includes(query);


            const matchesCategory =
                selectedCategory === "all" ||
                product.category === selectedCategory;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    grid.innerHTML = "";


    if (!filtered.length) {

        grid.innerHTML = `
            <div style="
                grid-column:1/-1;
                text-align:center;
                color:#777783;
                padding:60px;
            ">
                No products found.
            </div>
        `;

        return;

    }


    filtered.forEach(product => {

        const card =
            document.createElement("article");

        card.className =
            "product-card";


        card.innerHTML = `

            <div class="
                product-art
                ${product.bg}
            ">

                <div
                    class="
                        art-object
                        ${product.art}
                    ">
                </div>

            </div>

            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${product.description}
                </p>

                <div class="product-bottom">

                    <span class="price">
                        ${money(product.price)}
                    </span>

                    <button
                        class="add-btn"
                        aria-label="Add to cart"
                        onclick="
                            addToCart(${product.id})
                        ">

                        +

                    </button>

                </div>

            </div>

        `;


        grid.appendChild(card);

    });

}


function addToCart(id) {

    const product =
        products.find(
            p => p.id === id
        );


    if (!product) return;


    const existing =
        cart.find(
            item => item.id === id
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    saveCart();

    updateCart();

    openCart();

}


function removeItem(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );

    saveCart();

    updateCart();

}


function changeQuantity(id, amount) {

    const item =
        cart.find(
            product => product.id === id
        );


    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        removeItem(id);

        return;

    }


    saveCart();

    updateCart();

}


function updateCart() {

    cartItems.innerHTML = "";


    let total = 0;
    let count = 0;


    if (!cart.length) {

        cartItems.innerHTML = `
            <div style="
                text-align:center;
                padding:70px 10px;
                color:#777783;
            ">
                Your cart is empty.
            </div>
        `;

    }


    cart.forEach(item => {

        total +=
            item.price *
            item.quantity;

        count +=
            item.quantity;


        const row =
            document.createElement("div");

        row.className =
            "cart-item";


        row.innerHTML = `

            <div>

                <strong>
                    ${item.name}
                </strong>

                <br>

                <small>
                    ${money(item.price)}
                </small>

            </div>

            <div class="quantity">

                <button
                    onclick="
                        changeQuantity(
                            ${item.id},
                            -1
                        )
                    ">
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="
                        changeQuantity(
                            ${item.id},
                            1
                        )
                    ">
                    +
                </button>

                <button
                    class="remove"
                    onclick="
                        removeItem(
                            ${item.id}
                        )
                    ">
                    ×
                </button>

            </div>

        `;


        cartItems.appendChild(row);

    });


    cartCount.textContent =
        count;

    cartTotal.textContent =
        money(total);

}


function saveCart() {

    localStorage.setItem(
        "abdulMateenCart",
        JSON.stringify(cart)
    );

}


function openCart() {

    cartPanel.classList.add("open");

    overlay.classList.add("show");

}


function closeCartPanel() {

    cartPanel.classList.remove("open");

    overlay.classList.remove("show");

}


cartBtn.addEventListener(
    "click",
    openCart
);


closeCart.addEventListener(
    "click",
    closeCartPanel
);


overlay.addEventListener(
    "click",
    closeCartPanel
);


document
    .querySelectorAll(".filter")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".filter")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );


                button.classList.add("active");


                selectedCategory =
                    button.dataset.category;


                renderProducts();

            }
        );

    });


search.addEventListener(
    "input",
    renderProducts
);


checkoutBtn.addEventListener(
    "click",
    () => {

        if (!cart.length) {

            alert(
                "Please add a product to your cart first."
            );

            return;

        }


        checkoutModal.classList.add("open");

    }
);


closeCheckout.addEventListener(
    "click",
    () => {

        checkoutModal.classList.remove("open");

    }
);


document
    .getElementById("checkoutForm")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document
                .getElementById("customerName")
                .value
                .trim();


            const phone =
                document
                .getElementById("customerPhone")
                .value
                .trim();


            const address =
                document
                .getElementById("customerAddress")
                .value
                .trim();


            let message =
                "Hello Abdul Mateen Business!%0A%0A";


            message +=
                "NEW ORDER%0A";

            message +=
                "--------------------%0A";


            message +=
                "Customer: " +
                encodeURIComponent(name) +
                "%0A";


            message +=
                "Phone: " +
                encodeURIComponent(phone) +
                "%0A";


            message +=
                "Address: " +
                encodeURIComponent(address) +
                "%0A%0A";


            message +=
                "PRODUCTS%0A";


            let total = 0;


            cart.forEach(item => {

                const subtotal =
                    item.price *
                    item.quantity;


                total += subtotal;


                message +=
                    encodeURIComponent(
                        item.name
                    ) +

                    " x " +

                    item.quantity +

                    " = " +

                    encodeURIComponent(
                        money(subtotal)
                    ) +

                    "%0A";

            });


            message +=
                "%0ATOTAL: " +

                encodeURIComponent(
                    money(total)
                );


            /*
                Abdul Mateen Business
                WhatsApp number:
                03335270771

                International format:
                923335270771
            */

            const businessWhatsApp =
                "923335270771";


            window.open(
                "https://wa.me/" +
                businessWhatsApp +
                "?text=" +
                message,
                "_blank"
            );


            cart = [];

            saveCart();

            updateCart();

            checkoutModal.classList.remove("open");

            closeCartPanel();

            event.target.reset();

        }
    );


/* PAGE LOADER */

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                document
                    .querySelector(".loader")
                    .classList.add("hidden");

            },
            700
        );

    }
);


/* CURSOR GLOW */

const glow =
    document.querySelector(".cursor-glow");


document.addEventListener(
    "mousemove",
    event => {

        glow.style.left =
            event.clientX + "px";

        glow.style.top =
            event.clientY + "px";

    }
);


renderProducts();

updateCart();
