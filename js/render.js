function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function createProductCard(p, options = {}) {
  const ProductPAgePath = options.productPagePath || "sproduct.html";

  const card = document.createElement("div");
  card.className = "product";
  card.dataset.id = p.id;
  card.innerHTML = `
  <img src="${p.image}" alt="${p.name}"/>
  <div class="description">
    <span class="brand-name">${p.brand}</span>
    <h5>${p.name}</h5>
    <div class="stars">
      ${'<i class="fas fa-star"></i>'.repeat(p.stars)}
    </div>
    <h4 class="price">${p.cost}$</h4>
  </div>
  <a href="#" class="add-cart-icon"><i class="fal fa-shopping-cart cart"></i></a>
  `;

  card.addEventListener("click", () => {
    window.location.href = `${ProductPAgePath}?id=${encodeURIComponent(p.id)}`;
  });

  const cartIcon = card.querySelector(".add-cart-icon");
  cartIcon.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(p, 1);
    cartIcon.classList.add("added");
    setTimeout(() => cartIcon.classList.remove("added"), 600);
  });
  return card;
}

function renderProducts(list, containerId, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";
  list.forEach((p) => {
    container.appendChild(createProductCard(p, options));
  });
}

function renderShopProducts(list, containerId, options = {}) {
  renderProducts(list, containerId, options);
}
