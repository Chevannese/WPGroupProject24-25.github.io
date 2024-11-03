let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateCartItems = () => {
    if (basket.length !== 0) {
        ShoppingCart.innerHTML = basket.map((x) => {
            let{id, item} = x;
            let search = shopItemsdata.find((y) => y.id === id) || []
            return `<div class="cart-item">
                        <img  src=${search.img} alt="" width="100%":>
                        <div class=details>
                            <div class="title-price-x">
                            <h4 class=title-price>
                                <p>${search.name}</p>
                                <p class="cart-item-price">$${search.price}</p>
                            </h4>
                            <i onclick="removeItem(${id})" class="bi-x-lg"></i>
                            </div>

                            <div class="buttons">
                                <i onclick="decrement(${id})" class="bi-dash-lg"></i>
                                <div id=${id} class="quantity">${item}</div>
                                <i onclick="increment(${id})" class="bi-plus-lg"></i>
                                <h3>$ ${item*search.price}</h3>
                            </div>
                        </div>    
                    </div>`;
        }).join('');
        label.innerHTML = `<h2>Your Shopping Cart</h2>`;
    } else {
        ShoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is empty</h2>
        <a href="copyindex.html">
        <button class="HomeBtn">Back to Home</button>
        </a>
        `;
    }
};

generateCartItems();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
  
    if (search === undefined) {
      basket.push({
        id: selectedItem.id,
        item: 1,
      });
    } else {
      search.item += 1;
    }
    
    generateCartItems();
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
  };

  let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
  
    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
      search.item -= 1;
    }
  
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
  };

  let update = (id) => {
    let search = basket.find((x) => x.id === id);
    if (search) {
      document.getElementById(id).innerHTML = search.item;
    } else {
      document.getElementById(id).innerHTML = 0;
    }
    totalAmount();
  };

  let removeItem = (id) => {
    let selectedItem = id
    //console.log(selectedItem.id)
    basket = basket.filter ((x) => x.id !== selectedItem.id);
    generateCartItems();
    totalAmount();
    localStorage.setItem("data", JSON.stringify(basket));
  }

  let totalAmount =() => {
    if (basket.length !== 0){
        let amount = basket.map((x) => {
          let { item, id} = x;
          let search = shopItemsdata.find((y) => y.id === id) || []
          return item *  search.price

        }).reduce((x,y) => x+y,0)
        label.innerHTML = `
        <h2> Total Bill : $ ${amount}
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()"class="removeAll">Clear Cart</button>`
        
        //console.log(amount)
    } else return;
  }

  totalAmount();

  let clearCart = () => {
    basket = [];
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
  };
