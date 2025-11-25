const foodList = document.getElementById("food-list");
const cartList = document.getElementById("cart");
const orderBtn = document.getElementById("order-btn");

let cart = [];

async function loadFoods() {
  const res = await fetch("http://localhost:5000/foods");
  const foods = await res.json();

  foods.forEach(food => {
    const div = document.createElement("div");
    div.className = "food";
    div.innerHTML = `
      <img src="${food.img}" width="100" />
      <p>${food.name}</p>
      <p>$${food.price}</p>
      <button onclick='addToCart(${JSON.stringify(food)})'>Add</button>
    `;

    foodList.appendChild(div);
  });
}

function addToCart(food) {
  cart.push(food);
  displayCart();
}

function displayCart() {
  cartList.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

orderBtn.onclick = async () => {
  const res = await fetch("http://localhost:5000/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cart })
  });

  const data = await res.json();
  alert(data.message + " Total: $" + data.total.toFixed(2));
};

loadFoods();
