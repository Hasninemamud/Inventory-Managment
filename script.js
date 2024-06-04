document.addEventListener("DOMContentLoaded", function () {
  const productForm = document.getElementById("productForm");
  const productTableBody = document.getElementById("productTableBody");
  let products = [];
  let editIndex = null;

  productForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const productId = document.getElementById("productId").value;
    const productName = document.getElementById("productName").value;
    const productQuantity = document.getElementById("productQuantity").value;
    const productPrice = document.getElementById("productPrice").value;
    const productVendor = document.getElementById("productVendor").value;
    const productCategory = document.getElementById("productCategory").value;

    const product = {
      id: productId || Date.now().toString(),
      name: productName,
      quantity: parseInt(productQuantity),
      price: parseFloat(productPrice),
      vendor: productVendor,
      category: productCategory,
    };

    if (editIndex !== null) {
      products[editIndex] = product;
      editIndex = null;
    } else {
      products.push(product);
    }

    productForm.reset();
    displayProducts();
  });

  function displayProducts() {
    productTableBody.innerHTML = "";

    products.forEach((product, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td class="py-2 px-4 border-b text-center">${product.name}</td>
        <td class="py-2 px-4 border-b text-center">${product.quantity}</td>
        <td class="py-2 px-4 border-b text-center">${product.price}</td>
        <td class="py-2 px-4 border-b text-center">${product.vendor}</td>
        <td class="py-2 px-4 border-b text-center">${product.category}</td>
        <td class="py-2 px-4 border-b text-center">
          <button class="bg-yellow-500 text-white px-2 py-1 rounded" onclick="editProduct(${index})">Edit</button>
          <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="deleteProduct(${index})">Delete</button>
        </td>
      `;

      productTableBody.appendChild(row);
    });
  }

  window.editProduct = function (index) {
    const product = products[index];

    document.getElementById("productId").value = product.id;
    document.getElementById("productName").value = product.name;
    document.getElementById("productQuantity").value = product.quantity;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productVendor").value = product.vendor;
    document.getElementById("productCategory").value = product.category;

    editIndex = index;
  };

  window.deleteProduct = function (index) {
    products.splice(index, 1);
    displayProducts();
  };

  displayProducts();
});
