let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("AllProducts")) || [];

let generateShop = () => {
    return (shop.innerHTML=shopItemsdata
        .map((x)=>{
            let {id, name, price, desc, img} = x;
            let search = basket.find((x) => x.id === id) || [];
        return `
            <div id=product-id-${id} class="item">
            <img src="${img}" alt="" width="100%" height="40%">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price-quantity">
                        <h2>$ ${price}</h2>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi-dash-lg"></i>
                            <div id=${id} class="quantity">
                            ${search.item === undefined? 0: search.item}
                            </div>
                            <i onclick="increment(${id})" class="bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            </div>
            `
        ;
    }).join(""));
};

generateShop();

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
    
    //console.log(basket)
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
    localStorage.setItem("data", JSON.stringify(basket));
  };

  let update = (id) => {
    let search = basket.find((x) => x.id === id);
    if (search) {
      document.getElementById(id).innerHTML = search.item;
    } else {
      document.getElementById(id).innerHTML = 0;
    }
  };
