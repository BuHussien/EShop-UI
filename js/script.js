const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
  bar.addEventListener('click', () => {
    nav.classList.add('active');
  });
}

if (close) {
  close.addEventListener('click', (e) => {
    e.preventDefault();
    nav.classList.remove('active');
  });
}

document.getElementById('exploreBtn').addEventListener('click', () => {
  window.location.href = '../subPages/shop.html';
});
document.getElementById('shop-now').addEventListener('click', () => {
  window.location.href = '../subPages/shop.html';
});