const CART_KEY = "jara_cart";

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Error while Reading Cart", error);
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(product, qty) {
  qty = Math.max(1, parseInt(qty, 10) || 1);
  const cart = getCart();
  const exsiting = cart.find((item) => item.id === product.id);

  if (exsiting) {
    exsiting.qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      brand: product.brand,
      image: product.image,
      cost: product.cost,
      qty: qty,
    });
  }
  saveCart(cart);
  return cart;
}

function removeFromCart(id) {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
  return cart;
}

function updateCartItemQty(id, qty) {
  qty = parseInt(qty, 10);
  const cart = getCart();

  if (!qty || qty <= 0) {
    return removeFromCart(id);
  }

  const item = cart.find((i) => i.id === id);
  if (item) {
    item.qty = qty;
    saveCart(cart);
  }
  return cart;
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.cost * item.qty, 0);
}

function updateCartCount() {
  const badges = document.querySelectorAll(".cart-count");
  badges.forEach((element) => (element.textContent = getCartCount()));
}

document.addEventListener("DOMContentLoaded", updateCartCount);