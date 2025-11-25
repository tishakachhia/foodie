let cart = [];

function addToCart(name, price) {
    cart.push({ name, price });
    displayCart();
}

function displayCart() {
    const cartList = document.getElementById("cart-list");
    const total = document.getElementById("total");

    cartList.innerHTML = "";

    let sum = 0;

    cart.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price}`;
        cartList.appendChild(li);
        sum += item.price;
    });

    total.textContent = "Total: $" + sum.toFixed(2);
}

