// cars.js
/* scripts specific to cars page (cars.html) */
// Logic to load and display cars dynamically in the listings page
// Responsibilities:
// - Render all car cards dynamically from a data array or JSON
// - Handle filtering by brand, type, year, fuel, transmission, price
// - Sort cars by price, year, or recommended
// - Handle "Favorite" button toggling
// - Handle "View Details" button to go to car-details page with selected car
// write your code below
// cars.js
/* scripts specific to cars page (cars.html) */

// Sample data array for demonstration
const cars = [
    {
        id: 1,
        brand: "Toyota",
        model: "Corolla",
        year: 2023,
        fuel: "Petrol",
        transmission: "Automatic",
        price: 20000,
        img: "images/cars/toyota-corolla.jpg"
    },
    {
        id: 2,
        brand: "Honda",
        model: "Civic",
        year: 2022,
        fuel: "Diesel",
        transmission: "Manual",
        price: 22000,
        img: "images/cars/honda-civic.jpg"
    },
    {
        id: 3,
        brand: "Tesla",
        model: "Model 3",
        year: 2024,
        fuel: "Electric",
        transmission: "Automatic",
        price: 40000,
        img: "images/cars/tesla-model3.jpg"
    },
    // add more car objects as needed
];

const carListingsContainer = document.getElementById("car-listings");

// Render all cars dynamically
function renderCars(carsArray) {
    carListingsContainer.innerHTML = ""; // clear previous listings
    carsArray.forEach(car => {
        const carCard = document.createElement("div");
        carCard.className = "car-card";

        carCard.innerHTML = `
            <img src="${car.img}" alt="${car.brand} ${car.model}" class="car-img">
            <h3>${car.brand} ${car.model}</h3>
            <p>Year: ${car.year}</p>
            <p>Fuel: ${car.fuel} | Transmission: ${car.transmission}</p>
            <p>Price: $${car.price.toLocaleString()}</p>
            <button class="favorite-btn" data-id="${car.id}">❤️ Favorite</button>
            <button class="view-details-btn" data-id="${car.id}">View Details</button>
        `;
        carListingsContainer.appendChild(carCard);
    });

    addEventListeners();
}

// Handle filtering
function filterCars(filters) {
    let filteredCars = [...cars];

    if (filters.brand) {
        filteredCars = filteredCars.filter(car => car.brand === filters.brand);
    }
    if (filters.fuel) {
        filteredCars = filteredCars.filter(car => car.fuel === filters.fuel);
    }
    if (filters.transmission) {
        filteredCars = filteredCars.filter(car => car.transmission === filters.transmission);
    }
    if (filters.minPrice) {
        filteredCars = filteredCars.filter(car => car.price >= filters.minPrice);
    }
    if (filters.maxPrice) {
        filteredCars = filteredCars.filter(car => car.price <= filters.maxPrice);
    }
    if (filters.minYear) {
        filteredCars = filteredCars.filter(car => car.year >= filters.minYear);
    }
    if (filters.maxYear) {
        filteredCars = filteredCars.filter(car => car.year <= filters.maxYear);
    }

    renderCars(filteredCars);
}

// Handle sorting
function sortCars(carsArray, sortBy) {
    let sortedCars = [...carsArray];
    switch(sortBy) {
        case "price-asc":
            sortedCars.sort((a, b) => a.price - b.price);
            break;
        case "price-desc":
            sortedCars.sort((a, b) => b.price - a.price);
            break;
        case "year-asc":
            sortedCars.sort((a, b) => a.year - b.year);
            break;
        case "year-desc":
            sortedCars.sort((a, b) => b.year - a.year);
            break;
        case "recommended":
            // For demo, just keep the original order
            break;
    }
    renderCars(sortedCars);
}

// Handle button clicks
function addEventListeners() {
    // Favorite button
    document.querySelectorAll(".favorite-btn").forEach(btn => {
        btn.addEventListener("click", e => {
            const carId = e.target.dataset.id;
            alert(`Car ${carId} added to favorites!`);
            // You can implement saving favorites to localStorage or backend here
        });
    });

    // View Details button
    document.querySelectorAll(".view-details-btn").forEach(btn => {
        btn.addEventListener("click", e => {
            const carId = e.target.dataset.id;
            window.location.href = `car-details.html?id=${carId}`;
        });
    });
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
    renderCars(cars);

    // Example of filter usage
    const filters = {
        brand: null,       // e.g., "Toyota"
        fuel: null,
        transmission: null,
        minPrice: null,
        maxPrice: null,
        minYear: null,
        maxYear: null
    };

    // Example sort usage
    // sortCars(cars, "price-asc");
});
