/*

Group Members
Student Name - Student ID - Contribution(s):

Chevannese Ellis - 2301109 - Cart Page and Checkout Pages

Daniel Lowe - 2300734 - Invoice and Additional Functions

Rajay Tomlinson - 2304909 - Product Catalogue

Craig Williamson - 2301516 - Login, Registration, and Reset Pages  */

// Retrieves stored information on local storage of current User
const data = JSON.parse(localStorage.getItem('currentUser'));
const result = data.firstName;
// Displays the first name of user on the page
document.getElementsByClassName('Login')[0].innerText = result;
const id = data.trn;

// Ensures that the DOM Content is loaded to perform the function ready()
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    // Dynamically display of shop items
    // Array of dynamic shop items

 //   2.	Product Catalogue:
//a.	Product List (Using Arrays & Objects)
//i.	Create an array of product objects in JavaScript. Each product should have:
//`name`
//`price`
//`description`
//`image`

const shopItems =
[
    //Item 1
    {
        image: 'https://image4.cdnsbg.com/2/10/419867_1599515255854.jpg',
        name: 'GG01840',
        desc: 'The Gucci Unisex Eyewear, manufactured by Kering Eyewear in 2018, is a timeless and versatile accessory that combines sophistication with practicality. Featuring a black full-rim square frame, this pair of glasses is made from durable acetate, offering a sleek and classic design that suits both oval and round face shapes. The clear lenses are customizable, allowing wearers to adapt them to their specific needs while maintaining a polished appearance.',
        price: 2400
    },
    //Item 2
    {
        image: 'https://image4.cdnsbg.com/2/10/610525_1688966471608.jpg',
        name: 'GG12220',
        desc: 'With Gucci GG1222O glasses, vision correction is no longer an ugly essential item, but a fashion forward accessory that will enhance your style and bring a look together. Finely constructed from Metal , the Gold coloured frames will look great for any occasion. Easily add RX prescription lenses that are custom-made for you to your order for unbeatable prices.',
        price: 47000
    },
    //Item 3
    {
        image: 'https://image4.cdnsbg.com/2/10/573503_1660662396934.jpg',
        name: 'GG10850',
        desc: 'The classic Gucci GG1085O are a fantastic choice for glasses. With a range of frame shapes which are finely crafted from Acetate , colours Shiny Transparent Azure and lens Customisable they are suitable for any wearer. At SmartBuyGlasses , we offer special deals on premium prescription lenses to go with your Shiny Transparent Azure frames.',
        price: 41000
    },
    //Item 4
    {
        image: 'https://image4.cdnsbg.com/2/10/626754_1694180735440.jpg',
        name: 'GG13180',
        desc: 'The Gucci Women’s Eyewear from 2023, manufactured by Kering Eyewear, is a stylish and eco-conscious choice for modern fashion lovers. The square frame shape complements oval and round face shapes, offering a bold yet elegant look.',
        price: 34000
    },
    //Item 5
    {
        image: 'https://image4.cdnsbg.com/2/10/626760_1693562907628.jpg',
        name: 'GG13200',
        desc: 'Gucci ’s GG1320O appear with a dynamic Eco-Acetate eyeglass frame. The SmartBuyGlasses prescription lenses option is a perfect alternative for when your eyeglasses happen to arrive on your doorstep, ready to try on. Most of our lenses are coated with a unique and advanced coating, which provides them with an anti-glare and scratch resistant cover. This product features Tortoise frame and standard lenses.',
        price: 34000
    },

    //Item 6 
    {
        image: 'https://image4.cdnsbg.com/2/10/657438_1700573529023.jpg',
        name: 'GG1474OJ',
        desc: 'The classic Gucci Gucci GG1474OJ Asian Fit are a fantastic choice for glasses. With a range of frame shapes which are finely crafted from Acetate , colours Tortoise and lens Customisable they are suitable for any wearer.',
        price: 34000
    },

    //Item 7 
    {
        image: 'https://image4.cdnsbg.com/2/10/610410_1680591570621.jpg',
        name: 'GG0737O',
        desc: 'This season, the Gucci GG1117O glasses are a fashionable favourite from the Gucci eyeglasses collection. For optimal clarity in vision, we offer professional prescription RX lens to match your Transparent Green frames made from Injected Plastic .'
        ,price: 34000
    },

    //Item 8
    {
        image: 'https://image4.cdnsbg.com/2/10/653787_1705232982434.jpg',
        name: 'GG0737O',
        desc: 'This season, the Gucci GG0737O glasses are a fashionable favourite from the Gucci eyeglasses collection. For optimal clarity in vision, we offer professional prescription RX lens to match your Transparent Green frames made from Acetate.',
        price: 39000
    },

    //Item 9 
    {
        image: 'https://image4.cdnsbg.com/2/10/599462_1660850881977.jpg',
        name: 'GG1150O',
        desc: 'Try on the GG1150O eyeglasses without going to the store with our Virtual 3D Try On system that lets you digitally try on our collection of eyewear. Expertly crafted from Customisable , the eyeglasses in Gold compliments a range of different facial shapes and can match many outfits.'
        ,price: 40000
    }


];

//Generates all shopItems on Page
const shopContainer = document.getElementById('shop-container');
//2 c.	Display the product list dynamically on the website. 
shopItems.forEach(item => {
    const shopItem = document.createElement('div');
    shopItem.className = 'shop-item';
    shopItem.innerHTML = `
        <img class="shop-item-image" src="${item.image}" width="100%">
        <div class="shop-item-details">
            <center>
                <span class="shop-item-title">${item.name}</span>
            </center>
            <div class="desc">${item.desc}</div>
            <span class="dollar">$<span class="shop-item-price">${item.price}</span></span>
            <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
        </div>
    `;
    shopContainer.appendChild(shopItem);
});

    //2. d.	Each product should have an “Add to Cart” button.
    // For Loop to loop through add-to-cart buttons to find the specific button that was clicked by user
    const addToCartButtons = document.getElementsByClassName('shop-item-button');
    for (let i = 0; i < addToCartButtons.length; i++) {
        const button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }
}

//2. i 1.	When a user clicks the “Add to Cart” button, add the selected product to the user’s shopping cart. 
// This collects title, price, and imageSrc that resides with the add-to-cart button
function addToCartClicked(event) {
    const button = event.target;
    const shopItem = button.parentElement.parentElement;
    const title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    const imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    price = parseFloat(price);

    addCartItemToLocalStorage(title, price, imageSrc);
}

// Stores title, price, and imageSrc of item to local storage
function addCartItemToLocalStorage(title, price, imageSrc) {
    // Append the key AllProducts if the object already exists, initialize otherwise
    let cart = JSON.parse(localStorage.getItem('AllProducts')) || [];

    // Check if the item already exists in the cart
    const existingItem = cart.find(item => item.title === title);
    if (existingItem) {
        alert('This item is already added to the cart');
        return;
    }

    // Calculate prices with tax and discount
    const gctPerc = 0.15;
    const discountPerc = 0.30;
    const subTotal = price;
    const gctPrice = gctPerc * subTotal;
    const afterTax = subTotal + gctPrice;
    const discountPrice = discountPerc * afterTax;
    const total = afterTax - discountPrice;


    // 2. i 2.	Shopping cart must include,{ product details} along with the {taxes, discounts, subtotal and current total cost}. 
    // Define the new item to add
    const newItem = {
        title: title,
        price: price,
        imageSrc: imageSrc,
        quantity: 1,
        subTotal: subTotal,
        gct: gctPrice,
        discount: discountPrice,
        total: total
    };

    // Add the item to the cart array
    cart.push(newItem);
    //2.b.	An updated product list must be kept on localStorage, as AllProducts. 
    localStorage.setItem('AllProducts', JSON.stringify(cart)); // Save updated cart to localStorage

    // Retrieve registration data and update user's cart
    const registrations = JSON.parse(localStorage.getItem('RegistrationData'));
    const user = registrations.find(record => record.trn === id);

    if (user) {
        if (!Array.isArray(user.cart)) {
            user.cart = []; // Initialize user cart if it doesn't exist
        }

        user.cart.push(newItem); // Add the new item to the user's cart
        localStorage.setItem('RegistrationData', JSON.stringify(registrations)); // Save updated registrations to localStorage
    } else {
        alert('User is not found');
    }
}
