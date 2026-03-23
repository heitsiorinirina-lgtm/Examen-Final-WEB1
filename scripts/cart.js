let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
function addToCart(productId) {
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}
function loadCart() {
  const savedCart = JSON.parse(localStorage.getItem("shoppingCart"));
  if (savedCart) {
    savedCart.forEach((item) => {
      console.log(`Item: ${item.name} - $${item.price}`);
    });
  }
}
