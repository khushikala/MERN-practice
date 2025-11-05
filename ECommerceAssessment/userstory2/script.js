//DOM Elements
const productContainer = document.getElementById('productContainer');
const loading = document.getElementById('loading');
const categoryFilter = document.getElementById('categoryFilter');
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const sortBtn = document.getElementById('sortBtn');

let allProducts = [];
let filteredProducts = [];
let sortAsc = true;

//Fetch Products Once
async function fetchProducts() {
  try {
    loading.style.display = 'block';
    productContainer.innerHTML = '';

    const response = await fetch('products.json');
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

    allProducts = await response.json();
    filteredProducts = [...allProducts];

    // Set price range dynamically
    const maxPrice = Math.ceil(Math.max(...allProducts.map(p => p.price)) / 100) * 100;
    priceRange.max = maxPrice;
    priceRange.value = maxPrice;
    priceValue.textContent = `₹${maxPrice}`;

    loading.style.display = 'none';
    renderProducts(filteredProducts);
  } catch (error) {
    console.error(error);
    loading.innerHTML = `<span class="text-danger">⚠️ Unable to load products. Please refresh.</span>`;
  }
}

//Render Products
function renderProducts(list) {
  productContainer.innerHTML = '';

  if (!list.length) {
    productContainer.innerHTML = `<div class="text-center text-muted">No products found.</div>`;
    return;
  }

  list.forEach(p => {
    const col = document.createElement('div');
    col.className = 'col-md-4 col-sm-6 col-lg-3';
    col.innerHTML = `
      <div class="card product-card h-100">
        <img src="${p.image}" class="card-img-top" alt="${p.title}"
             onerror="this.src='https://via.placeholder.com/300x200?text=No+Image';">
        <div class="card-body text-center">
          <h5 class="card-title">${p.title}</h5>
          <p class="fw-bold">₹${p.price}</p>
          <span class="badge bg-secondary mb-2">${p.category}</span><br>
          <button class="btn btn-outline-primary btn-sm">View</button>
        </div>
      </div>
    `;
    productContainer.appendChild(col);
  });
}

//Filter Logic
function applyFilters() {
  const selectedCategory = categoryFilter.value.toLowerCase();
  const maxPrice = parseInt(priceRange.value);
  priceValue.textContent = `₹${maxPrice}`;

  filteredProducts = allProducts.filter(p => {
    const inCategory = selectedCategory === 'all' || p.category.toLowerCase() === selectedCategory;
    const inPrice = p.price <= maxPrice;
    return inCategory && inPrice;
  });

  // Apply current sort order
  filteredProducts.sort((a, b) => sortAsc ? a.price - b.price : b.price - a.price);

  renderProducts(filteredProducts);
}

//Sort Logic
function toggleSort() {
  sortAsc = !sortAsc;
  sortBtn.textContent = sortAsc ? 'Sort by Price ↑' : 'Sort by Price ↓';
  filteredProducts.reverse();
  renderProducts(filteredProducts);
}

//Event Listeners
categoryFilter.addEventListener('change', applyFilters);
priceRange.addEventListener('input', applyFilters);
sortBtn.addEventListener('click', toggleSort);

fetchProducts();