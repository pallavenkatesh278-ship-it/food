
const foods = [
  {
    id: 1,
    name: "Classic Burger",
    category: "Burger",
    price: 149,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
    description: "Juicy burger with fresh vegetables."
  },
  {
    id: 2,
    name: "Cheese Pizza",
    category: "Pizza",
    price: 249,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
    description: "Delicious pizza with extra cheese."
  },
  {
    id: 3,
    name: "French Fries",
    category: "Burger",
    price: 99,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500",
    description: "Crispy and golden french fries."
  },
  {
    id: 4,
    name: "Cold Coffee",
    category: "Drinks",
    price: 119,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500",
    description: "Refreshing chilled coffee."
  },
  {
    id: 5,
    name: "Chocolate Cake",
    category: "Dessert",
    price: 159,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
    description: "Rich and creamy chocolate cake."
  },
  {
    id: 6,
    name: "Pepperoni Pizza",
    category: "Pizza",
    price: 299,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500",
    description: "Hot pizza with delicious toppings."
  },
  {
    id: 7,
    name: "Strawberry Shake",
    category: "Drinks",
    price: 129,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500",
    description: "Fresh strawberry milkshake."
  },
  {
    id: 8,
    name: "Donut",
    category: "Dessert",
    price: 79,
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500",
    description: "Soft and sweet glazed donut."
  },
  {
    id: 9,
    name: "Chicken Burger",
    category: "Burger",
    price: 189,
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500",
    description: "Delicious crispy chicken burger."
  }
];

let cart = [];
let currentCategory = "All";

function displayFoods(items) {
  const foodList = document.getElementById("food-list");

  if (items.length === 0) {
    foodList.innerHTML = "<p>No food items found.</p>";
    return;
  }

  foodList.innerHTML = items.map(food => `
    <div class="food-card">
      <img src="${food.image}" alt="${food.name}">
      <div class="food-info">
        <h3>${food.name}</h3>
        <p>${food.description}</p>
        <div class="food-bottom">
          <span class="food-price">₹${food.price}</span>
          <button class="add-btn" onclick="addToCart(${food.id})">
            + Add
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

function filterFood(category, button) {
  currentCategory = category;

  document.querySelectorAll(".categories button")
    .forEach(btn => btn.classList.remove("active"));

  button.classList.add("active");
  searchFood();
}

function searchFood() {
  const search = document.getElementById("search").value.toLowerCase();

  const filtered = foods.filter(food => {
    const matchesCategory =
      currentCategory === "All" ||
      food.category === currentCategory;

    const matchesSearch =
      food.name.toLowerCase().includes(search);

    return matchesCategory && matchesSearch;
  });

  displayFoods(filtered);
}

function addToCart(id) {
  const food = foods.find(item => item.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({...food, quantity: 1});
  }

  updateCart();
}

function changeQuantity(id, amount) {
  const item = cart.find(item => item.id === id);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(item => item.id !== id);
  }

  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");

  const count = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  document.getElementById("cart-count").textContent = count;
  document.getElementById("cart-total").textContent = "₹" + total;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty!</p>";
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>
        <h4>${item.name}</h4>
        <p>₹${item.price} × ${item.quantity}</p>
        <strong>₹${item.price * item.quantity}</strong>
      </div>
      <div class="quantity">
        <button onclick="changeQuantity(${item.id},-1)">−</button>
        ${item.quantity}
        <button onclick="changeQuantity(${item.id},1)">+</button>
      </div>
    </div>
  `).join("");
}

function toggleCart() {
  document.getElementById("cart-panel")
    .classList.toggle("show");

  document.getElementById("cart-overlay")
    .classList.toggle("show");
}

function checkout() {
  if (cart.length === 0) {
    alert("Please add food to your cart first!");
    return;
  }

  document.getElementById("checkout-modal")
    .classList.add("show");
}

function closeCheckout() {
  document.getElementById("checkout-modal")
    .classList.remove("show");
}

document.getElementById("checkout-form")
  .addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("customer-name").value;
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity, 0
    );

    document.getElementById("order-message").textContent =
      `Thank you ${name}! Your order of ₹${total} has been received.`;

    cart = [];
    updateCart();
    this.reset();
  });

displayFoods(foods);
updateCart();
