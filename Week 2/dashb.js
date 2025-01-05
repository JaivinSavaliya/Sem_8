let products = [];
let categories = [];

// Fetch products and categories
fetch("https://dummyjson.com/products?limit=21")
    .then((response) => response.json())
    .then((fetchedData) => {
        console.log("Fetched data:", fetchedData);
        products = fetchedData.products;

        // Fetch categories
        categories = [...new Set(products.map(product => product.category))];
        populateCategories(categories);
        displayProducts(products);
    })
    .catch((error) => console.error("Error fetching data:", error));

function populateCategories(categories) {
    const categoryDropdown = document.getElementById('categoryDropdown');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryDropdown.appendChild(option);
    });
}

function displayProducts(products) {
    const masterCard = document.getElementById('masterCard');
    masterCard.innerHTML = ''; // Clear existing cards
    products.forEach(product => {
        const containerCard = document.createElement('div');
        containerCard.className = 'containerCard';

        const wrapperCard = document.createElement('div');
        wrapperCard.className = 'wrapperCard';

        const cardImage = document.createElement('img');
        cardImage.className = 'card-image';
        cardImage.src = product.thumbnail;
        cardImage.alt = product.title;

        const titleCard = document.createElement('h1');
        titleCard.className = 'title-card';
        titleCard.textContent = product.title;

        const detailsCard = document.createElement('p');
        detailsCard.className = 'details-card';
        detailsCard.textContent = product.description;

        const buttonWrapper = document.createElement('div');
        buttonWrapper.className = 'button-wrapperCard';

        const detailsButton = document.createElement('button');
        detailsButton.className = 'btn-details';
        detailsButton.textContent = 'DETAILS';

        const buyButton = document.createElement('button');
        buyButton.className = 'btn-buy';
        buyButton.textContent = 'BUY NOW';

        buttonWrapper.appendChild(detailsButton);
        buttonWrapper.appendChild(buyButton);

        wrapperCard.appendChild(cardImage);
        wrapperCard.appendChild(titleCard);
        wrapperCard.appendChild(detailsCard);

        containerCard.appendChild(wrapperCard);
        containerCard.appendChild(buttonWrapper);

        masterCard.appendChild(containerCard);
    });
}

document.getElementById('categoryDropdown').addEventListener('change', (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory === "") {
        displayProducts(products); // Show all products if no category is selected
    } else {
        const filteredProducts = products.filter(product => product.category === selectedCategory);
        displayProducts(filteredProducts);
    }
});

document.getElementById('searchBar').addEventListener('input', (event) => {
    const searchWord = event.target.value.toLowerCase();
    const filteredProducts = products.filter(product => {
        return product.category.toLowerCase().includes(searchWord) ||
        product.title.toLowerCase().includes(searchWord)
        // product.description.toLowerCase().includes(searchWord) || 
        // product.category.toLowerCase().includes(searchWord);
    });
    displayProducts(filteredProducts);
})

