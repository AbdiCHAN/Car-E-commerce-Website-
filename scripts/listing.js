
        const cars = [
            {
                id: 1,
                brand: "Mercedes-Benz",
                model: "S-Class 2022",
                price: 115000,
                year: 2022,
                type: "Sedan",
                fuel: "Gasoline",
                transmission: "Automatic",
                mileage: "12,500",
                horsepower: "496 HP",
                imageColor: "#1c3a5f",
                badge: "Premium Plus"
            },
            {
                id: 2,
                brand: "BMW",
                model: "X7 M50i",
                price: 105000,
                year: 2023,
                type: "SUV",
                fuel: "Gasoline",
                transmission: "Automatic",
                mileage: "8,200",
                horsepower: "523 HP",
                imageColor: "#2d5066",
                badge: "New"
            },
            {
                id: 3,
                brand: "Audi",
                model: "RS7 Sportback",
                price: 125000,
                year: 2021,
                type: "Sports",
                fuel: "Gasoline",
                transmission: "Automatic",
                mileage: "18,400",
                horsepower: "591 HP",
                imageColor: "#333333",
                badge: "Performance"
            },
            {
                id: 4,
                brand: "Porsche",
                model: "911 Carrera S",
                price: 135000,
                year: 2020,
                type: "Coupe",
                fuel: "Gasoline",
                transmission: "Semi-Auto",
                mileage: "15,300",
                horsepower: "443 HP",
                imageColor: "#c41e3a",
                badge: "Classic"
            },
            {
                id: 5,
                brand: "Mercedes-Benz",
                model: "GLE 63 S Coupe",
                price: 122000,
                year: 2022,
                type: "SUV",
                fuel: "Hybrid",
                transmission: "Automatic",
                mileage: "10,800",
                horsepower: "603 HP",
                imageColor: "#1e3d59",
                badge: "AMG"
            },
            {
                id: 6,
                brand: "BMW",
                model: "M8 Competition",
                price: 145000,
                year: 2023,
                type: "Coupe",
                fuel: "Gasoline",
                transmission: "Automatic",
                mileage: "5,500",
                horsepower: "617 HP",
                imageColor: "#0066b3",
                badge: "New"
            },
            {
                id: 7,
                brand: "Audi",
                model: "e-tron GT",
                price: 110000,
                year: 2023,
                type: "Sedan",
                fuel: "Electric",
                transmission: "Automatic",
                mileage: "3,200",
                horsepower: "522 HP",
                imageColor: "#0d2330",
                badge: "Electric"
            },
            {
                id: 8,
                brand: "Jaguar",
                model: "F-Type R",
                price: 98000,
                year: 2021,
                type: "Convertible",
                fuel: "Gasoline",
                transmission: "Automatic",
                mileage: "16,700",
                horsepower: "575 HP",
                imageColor: "#1f3a3d",
                badge: "R Dynamic"
            },
            {
                id: 9,
                brand: "Lexus",
                model: "LC 500",
                price: 102000,
                year: 2022,
                type: "Coupe",
                fuel: "Gasoline",
                transmission: "Automatic",
                mileage: "9,400",
                horsepower: "471 HP",
                imageColor: "#003366",
                badge: "Luxury"
            },
            {
                id: 10,
                brand: "Mercedes-Benz",
                model: "EQS 580",
                price: 118000,
                year: 2023,
                type: "Sedan",
                fuel: "Electric",
                transmission: "Automatic",
                mileage: "4,100",
                horsepower: "516 HP",
                imageColor: "#222222",
                badge: "Electric"
            },
            {
                id: 11,
                brand: "BMW",
                model: "i7 xDrive60",
                price: 128000,
                year: 2023,
                type: "Sedan",
                fuel: "Electric",
                transmission: "Automatic",
                mileage: "2,800",
                horsepower: "536 HP",
                imageColor: "#2a3439",
                badge: "New"
            },
            {
                id: 12,
                brand: "Audi",
                model: "Q8 55 TFSI",
                price: 89000,
                year: 2021,
                type: "SUV",
                fuel: "Gasoline",
                transmission: "Automatic",
                mileage: "22,500",
                horsepower: "335 HP",
                imageColor: "#3c3c3c",
                badge: "Premium"
            }
        ];

        // DOM elements
        const carsGrid = document.getElementById('cars-grid');
        const resultsCount = document.getElementById('results-count');
        const resetFiltersBtn = document.getElementById('reset-filters');
        const sortSelect = document.getElementById('sort-by');
        const minPriceInput = document.getElementById('min-price');
        const maxPriceInput = document.getElementById('max-price');
        const priceSlider = document.getElementById('price-slider');

        // Filters
        let filters = {
            brands: ['Mercedes-Benz', 'BMW', 'Audi'],
            types: ['Sedan', 'SUV'],
            years: ['2021-2022', '2019-2020'],
            fuels: ['Gasoline', 'Hybrid'],
            transmissions: ['Automatic'],
            minPrice: 0,
            maxPrice: 150000
        };

        // pg initialize
        document.addEventListener('DOMContentLoaded', function() {
            renderCars();
            setupEventListeners();
            setupFilterToggles();
        });

        // Render cars 
        function renderCars() {
           //grid clear
            carsGrid.innerHTML = '';
            
            // Filter cars
            let filteredCars = cars.filter(car => {
                // Check brand
                if (!filters.brands.includes(car.brand)) return false;
                
                // Check type
                if (!filters.types.includes(car.type)) return false;
                
                // Check year
                let yearRange = '';
                if (car.year >= 2023) yearRange = '2023-2024';
                else if (car.year >= 2021) yearRange = '2021-2022';
                else if (car.year >= 2019) yearRange = '2019-2020';
                else yearRange = '2017-2018';
                
                if (!filters.years.includes(yearRange)) return false;
                
                // Check fuel
                if (!filters.fuels.includes(car.fuel)) return false;
                
                // Check transmsion
                if (!filters.transmissions.includes(car.transmission)) return false;
                
                // Check price range
                if (car.price < filters.minPrice || car.price > filters.maxPrice) return false;
                
                return true;
            });
            
            // car sortinggg.
            const sortValue = sortSelect.value;
            filteredCars.sort((a, b) => {
                switch(sortValue) {
                    case 'price-low':
                        return a.price - b.price;
                    case 'price-high':
                        return b.price - a.price;
                    case 'year-new':
                        return b.year - a.year;
                    case 'year-old':
                        return a.year - b.year;
                    default:
                        return a.id - b.id;
                }
            });
            
            // Update results count
            resultsCount.textContent = filteredCars.length;
            
            // Render cars
            filteredCars.forEach(car => {
                const carCard = document.createElement('div');
                carCard.className = 'car-card';
                carCard.innerHTML = `
                    <div class="car-image" style="background-color: ${car.imageColor}">
                        <div class="car-badge">${car.badge}</div>
                        <i class="fas fa-car fa-3x"></i>
                    </div>
                    <div class="car-info">
                        <div class="car-header">
                            <div class="car-title">
                                <h3>${car.brand} ${car.model}</h3>
                                <p>${car.year} • ${car.fuel} • ${car.transmission}</p>
                            </div>
                            <div class="car-price">$${car.price.toLocaleString()}<span>/tax incl.</span></div>
                        </div>
                        <div class="car-details">
                            <div class="car-detail">
                                <i class="fas fa-tachometer-alt"></i>
                                <span>${car.mileage} mi</span>
                            </div>
                            <div class="car-detail">
                                <i class="fas fa-horse-head"></i>
                                <span>${car.horsepower}</span>
                            </div>
                            <div class="car-detail">
                                <i class="fas fa-car-side"></i>
                                <span>${car.type}</span>
                            </div>
                        </div>
                        <div class="car-actions">
                            <button class="btn btn-details">View Details</button>
                            <button class="btn btn-favorite" data-id="${car.id}">
                                <i class="far fa-heart"></i>
                            </button>
                        </div>
                    </div>
                `;
                carsGrid.appendChild(carCard);
            });
            
            // Add event listeners to favorite buttons
            document.querySelectorAll('.btn-favorite').forEach(button => {
                button.addEventListener('click', function() {
                    const icon = this.querySelector('i');
                    icon.classList.toggle('far');
                    icon.classList.toggle('fas');
                    icon.classList.toggle('favorite-active');
                });
            });
            
            // Add event listeners to view details buttons
            document.querySelectorAll('.btn-details').forEach(button => {
                button.addEventListener('click', function() {
                    alert('This would open a detailed view of the car in a real application.');
                });
            });
        }

        //  event listeners for filters
        function setupEventListeners() {
            // Reset filters button
            resetFiltersBtn.addEventListener('click', function() {
                // Reset all checkboxes
                document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(checkbox => {
                    checkbox.checked = true;
                });
                
                // Reset price range
                minPriceInput.value = 0;
                maxPriceInput.value = 150000;
                priceSlider.value = 150000;
                
                // Reset filter state
                filters = {
                    brands: ['Mercedes-Benz', 'BMW', 'Audi', 'Porsche', 'Jaguar', 'Lexus'],
                    types: ['Sedan', 'SUV', 'Coupe', 'Convertible', 'Sports'],
                    years: ['2023-2024', '2021-2022', '2019-2020', '2017-2018'],
                    fuels: ['Gasoline', 'Diesel', 'Hybrid', 'Electric'],
                    transmissions: ['Automatic', 'Manual', 'Semi-Auto'],
                    minPrice: 0,
                    maxPrice: 150000
                };
                
                renderCars();
            });
            
            // Sort select
            sortSelect.addEventListener('change', renderCars);
            
            // Price inputs
            minPriceInput.addEventListener('change', function() {
                filters.minPrice = parseInt(this.value) || 0;
                if (filters.minPrice > filters.maxPrice) {
                    filters.minPrice = filters.maxPrice - 10000;
                    this.value = filters.minPrice;
                }
                renderCars();
            });
            
            maxPriceInput.addEventListener('change', function() {
                filters.maxPrice = parseInt(this.value) || 150000;
                if (filters.maxPrice < filters.minPrice) {
                    filters.maxPrice = filters.minPrice + 10000;
                    this.value = filters.maxPrice;
                }
                priceSlider.value = filters.maxPrice;
                renderCars();
            });
            
            // Price slider
            priceSlider.addEventListener('input', function() {
                filters.maxPrice = parseInt(this.value);
                maxPriceInput.value = filters.maxPrice;
                renderCars();
            });
            
            // Brand checkboxes
            document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    updateFilters();
                });
            });
        }

        // Setup filter section toggles
        function setupFilterToggles() {
            document.querySelectorAll('.filter-title').forEach(title => {
                title.addEventListener('click', function() {
                    this.parentElement.classList.toggle('active-filter');
                });
            });
        }

    
        function updateFilters() {
            // Brands
            filters.brands = [];
            if (document.getElementById('brand-mercedes').checked) filters.brands.push('Mercedes-Benz');
            if (document.getElementById('brand-bmw').checked) filters.brands.push('BMW');
            if (document.getElementById('brand-audi').checked) filters.brands.push('Audi');
            if (document.getElementById('brand-porsche').checked) filters.brands.push('Porsche');
            if (document.getElementById('brand-jaguar').checked) filters.brands.push('Jaguar');
            if (document.getElementById('brand-lexus').checked) filters.brands.push('Lexus');
            
            // Types
            filters.types = [];
            if (document.getElementById('type-sedan').checked) filters.types.push('Sedan');
            if (document.getElementById('type-suv').checked) filters.types.push('SUV');
            if (document.getElementById('type-coupe').checked) filters.types.push('Coupe');
            if (document.getElementById('type-convertible').checked) filters.types.push('Convertible');
            if (document.getElementById('type-sports').checked) filters.types.push('Sports');
            
            // Years
            filters.years = [];
            if (document.getElementById('year-2023').checked) filters.years.push('2023-2024');
            if (document.getElementById('year-2021').checked) filters.years.push('2021-2022');
            if (document.getElementById('year-2019').checked) filters.years.push('2019-2020');
            if (document.getElementById('year-2017').checked) filters.years.push('2017-2018');
            
            // Fuels
            filters.fuels = [];
            if (document.getElementById('fuel-gasoline').checked) filters.fuels.push('Gasoline');
            if (document.getElementById('fuel-diesel').checked) filters.fuels.push('Diesel');
            if (document.getElementById('fuel-hybrid').checked) filters.fuels.push('Hybrid');
            if (document.getElementById('fuel-electric').checked) filters.fuels.push('Electric');
            
            // Transmissions
            filters.transmissions = [];
            if (document.getElementById('trans-automatic').checked) filters.transmissions.push('Automatic');
            if (document.getElementById('trans-manual').checked) filters.transmissions.push('Manual');
            if (document.getElementById('trans-semiauto').checked) filters.transmissions.push('Semi-Auto');
            
            renderCars();
        }
