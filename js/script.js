import { toursData } from './toursData.js';
import { egyptData } from './egyptData.js';
import { maldivesData } from './maldivesData.js';
import { japanData } from './japanData.js';

document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const pageContent = document.getElementById('page-content');
    const countrySelectionPage = document.getElementById('country-selection-page');
    const toursPage = document.getElementById('tours-page');
    const toursGrid = document.getElementById('tours-grid'); // Grid dentro da tours-page
    const countriesGrid = document.getElementById('countries-grid');
    const subcategoryButtonsContainer = document.getElementById('subcategory-buttons-container');

    const cartButton = document.getElementById('cart-button');
    const closeCartButton = document.getElementById('close-cart-button');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');
    const whatsappQuoteButton = document.getElementById('whatsapp-quote-button');
    const generateItineraryButton = document.getElementById('generate-itinerary-button');
    const backToCountryButton = document.getElementById('back-to-country-button');
    const customerNameInput = document.getElementById('customer-name'); // Get customer name input
    const numberOfPeopleInput = document.getElementById('number-of-people'); // Get number of people input

    const itineraryModalOverlay = document.getElementById('itinerary-modal-overlay');
    const itineraryModalContentArea = document.getElementById('itinerary-modal-content-area');
    const closeItineraryModalButton = document.getElementById('close-itinerary-modal-button');

    const enhancedDescModalOverlay = document.getElementById('enhanced-desc-modal-overlay');
    const enhancedDescModalTitle = document.getElementById('enhanced-desc-modal-title');
    const enhancedDescModalContentArea = document.getElementById('enhanced-desc-modal-content-area');
    const closeEnhancedDescModalButton = document.getElementById('close-enhanced-desc-modal-button');

    const pdfModalOverlay = document.getElementById('pdf-modal-overlay');
    const pdfViewer = document.getElementById('pdf-viewer');
    const closePdfModalButton = document.getElementById('close-pdf-modal-button');

    const confirmationMessageGlobal = document.getElementById('confirmation-message-global');
    const travelStyleButtonsContainer = document.getElementById('travel-style-buttons-container');
    const clearTravelStyleButton = document.getElementById('clear-travel-style-button');
    const headerLogo = document.getElementById('header-logo'); // Get the logo element
    const toursPageTitle = document.getElementById('tours-page-title'); // Get the tours page title element
    const toursPageHero = document.getElementById('hero-section'); // Get the hero section element
    const tourSearchInput = document.getElementById('tour-search-input'); // Get the search input element
    const loadingOverlay = document.getElementById('loading-overlay'); // Loading overlay

    // Estado da Aplicação
    let allTours = []; // This will now hold data for the selected country
    let cart = [];
    let currentPage = 'countrySelection'; // 'countrySelection' ou 'tours'
    let selectedSubcategory = 'all';
    let selectedTravelStyle = '';
    let currentCountry = null; // Track the currently selected country
    let searchQuery = ''; // New state variable for search query
    let currentAbortController = null; // To manage ongoing API requests





    // Define subcategories per country
    const countrySubcategories = {
        'Dubai e Abu Dhabi': [
            { label: "Todos", value: "all" },
            { label: "TOUR PRIVATIVO", value: "TOUR PRIVATIVO" },
            { label: "DESERTO", value: "DESERTO" },
            { label: "TRASLADO", value: "TRASLADO" },
            { label: "CARRO COM MOTORISTA", value: "CARRO COM MOTORISTA" },
            { label: "AVENTURAS AQUÁTICAS", value: "AVENTURAS AQUÁTICAS" },
            { label: "EXPERIÊNCIAS AÉREAS", value: "EXPERIENCIAS AÉREAS" },
            { label: "DUBAI TICKETS", value: "DUBAI TICKETS" },
            { label: "DUBAI PARKS", value: "DUBAI PARKS" },
            { label: "ABU DHABI TICKETS", value: "ABU DHABI TICKETS" },
            { label: "ABU DHABI PARKS", value: "ABU DHABI PARKS" },
            { label: "PORTARE SERVIÇOS", value: "PORTARE SERVIÇOS" },
        ],
        'Egito': [
             { label: "Todos", value: "all" }, { label: "Tour em grupo", value: "Tour em grupo" }, { label: "Tour privativo", value: "Tour privativo" },
        ],
        'Maldivas': [
            { label: "Todos", value: "all" }
        ],
        'Japão': [
            { label: "Todos", value: "all" }
        ],

    };

    const travelStyles = [
        { label: "Aventura", value: "Aventura" }, { label: "Relaxante", value: "Relaxante" }, { label: "Cultural", value: "Cultural" }, { label: "Romântico", value: "Romântico" }, { label: "Família", value: "Família com crianças" }, { label: "Luxo", value: "Luxo" },
    ];

    // Funções de Loading e UX
    function showLoadingOverlay(message = 'Carregando...') {
        const loadingText = loadingOverlay.querySelector('p');
        if (loadingText) {
            loadingText.textContent = message;
        }
        loadingOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function hideLoadingOverlay() {
        loadingOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function animateElement(element, animationClass, delay = 0) {
        setTimeout(() => {
            element.classList.add(animationClass);
        }, delay);
    }

    function addStaggeredAnimation(elements, animationClass, staggerDelay = 100) {
        elements.forEach((element, index) => {
            animateElement(element, animationClass, index * staggerDelay);
        });
    }

    // Funções Auxiliares
    function showConfirmationMessage(message) {
        confirmationMessageGlobal.textContent = message;
        confirmationMessageGlobal.classList.remove('opacity-0', 'pointer-events-none');
        confirmationMessageGlobal.classList.add('opacity-100');
        setTimeout(() => {
            confirmationMessageGlobal.classList.remove('opacity-100');
            confirmationMessageGlobal.classList.add('opacity-0', 'pointer-events-none');
        }, 3000);
    }

    function showLoading(element, message) {
        element.innerHTML = `
            <div class="flex flex-col items-center justify-center py-10">
                <div class="loader"></div>
                <p class="mt-4 text-lg text-gray-600 font-geologica-light">${message}</p>
            </div>`;
    }

    function showError(element, message) {
        element.innerHTML = `<p class="text-red-500 text-center text-lg py-10 font-geologica-light">${message}</p>`;
    }

    function formatAIResponse(text) {
        let html = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^- (.*)/gm, '<li>$1</li>');

        html = html.replace(/(<li>.*<\/li>)+/gs, '<ul>$&</ul>');
        html = html.replace(/\n/g, '<br />');
        return html;
    }

    // Funções de Renderização da UI
    function renderPage() {
        if (currentPage === 'countrySelection') {
            countrySelectionPage.style.display = 'flex';
            toursPage.style.display = 'none';
            cartButton.style.display = 'none';
            backToCountryButton.style.display = 'none';
            renderCountries();
        } else if (currentPage === 'tours') {
            countrySelectionPage.style.display = 'none';
            toursPage.style.display = 'block';
            cartButton.style.display = 'flex';
            backToCountryButton.style.display = 'flex';
            renderSubcategoryButtons();
            renderTours();
            updateToursPageHeader();
        }
    }

    function renderCountries() {
        countriesGrid.innerHTML = '';
        const countriesData = [
            // Update image paths to point to your local img folder with correct filenames and extension
            { name: "Dubai e Abu Dhabi", image: "img/dubai.jpg", data: toursData, targetPage: 'tours', heroImage: 'img/dubaideserto.jpg', heroTitle: 'Sua Aventura em Dubai Começa Aqui!', heroSubtitle: 'Passeios inesquecíveis e experiências únicas.<br>Você sabia que o nome do País é Emirados Árabes Unidos?<br>São 7 Emirados para explorar:<br>Dubai – Abu Dhabi – Sharjah – Ras Al Khaimah (RAK) – Ajman – Fujairah – Umm Al Quwain' }, // Using dubai.jpg
            { name: "Egito", image: "img/egito.jpg", data: egyptData, targetPage: 'tours', heroImage: 'img/egito.jpg', heroTitle: 'Descubra os Mistérios do Egito!', heroSubtitle: 'Uma jornada pela terra dos faraós, pirâmides e templos ancestrais.' }, // Using egito.jpg
            { name: "Maldivas", image: "img/maldivas.jpg", data: maldivesData, targetPage: 'message', message: 'Passeios para Maldivas em breve!', heroImage: 'img/maldivas.jpg', heroTitle: 'Paraíso nas Maldivas!', heroSubtitle: 'Descubra as ilhas mais deslumbrantes do mundo.' },
            { name: "Japão", image: "img/japao.jpg", data: japanData, targetPage: 'message', message: 'Passeios para Japão em breve!', heroImage: 'img/japao.jpg', heroTitle: 'Terra do Sol Nascente!', heroSubtitle: 'Uma jornada pela cultura milenar japonesa.' },

        ];

        const countryElements = [];

        countriesData.forEach(country => {
            const countryDiv = document.createElement('div');
            countryDiv.className = "country-card bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-center text-center p-4";
            countryDiv.onclick = () => {
                if (country.targetPage === 'tours') {
                    showLoadingOverlay('Carregando destinos...');
                    setTimeout(() => {
                                currentCountry = country;
        allTours = country.data;
        selectedSubcategory = 'all';
                        currentPage = country.targetPage;
                        renderPage();
                        hideLoadingOverlay();
                    }, 500);
                } else if (country.message) {
                    showConfirmationMessage(country.message);
                }
            };

            const img = document.createElement('img');
            img.src = country.image;
            img.alt = country.name;
            img.className = "w-full h-40 object-cover object-center rounded-lg mb-4";
                    img.onerror = (e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x250/CCCCCC/333333?text=${country.name.replace(/\s/g, '+')}`; };

            const h3 = document.createElement('h3');
            h3.className = "text-2xl sm:text-3xl font-bold text-[#0D7C6C] font-geologica-bold";
            h3.textContent = country.name;

            countryDiv.appendChild(img);
            countryDiv.appendChild(h3);
            countriesGrid.appendChild(countryDiv);
            countryElements.push(countryDiv);
        });

        addStaggeredAnimation(countryElements, 'animate-fade-in-scale', 150);
    }

    function updateToursPageHeader() {
        if (currentCountry) {
            toursPageHero.style.backgroundImage = `url('${currentCountry.heroImage}')`;

            const heroTitleElement = toursPageHero.querySelector('h2');
            const heroSubtitleElement = toursPageHero.querySelector('p');
            if (heroTitleElement) heroTitleElement.innerHTML = currentCountry.heroTitle;
            if (heroSubtitleElement) heroSubtitleElement.innerHTML = currentCountry.heroSubtitle;

            if (toursPageTitle) {
                 toursPageTitle.textContent = `Nossos Passeios em ${currentCountry.name}`;
            } else {
                 const mainH2 = document.querySelector('#tours-page main h2');
                 if (mainH2) mainH2.textContent = `Nossos Passeios em ${currentCountry.name}`;
            }

        }
    }


    function renderSubcategoryButtons() {
        subcategoryButtonsContainer.innerHTML = '';
        const currentSubcategories = currentCountry && countrySubcategories[currentCountry.name] ? countrySubcategories[currentCountry.name] : [{ label: "Todos", value: "all" }];

        currentSubcategories.forEach(cat => {
            const button = document.createElement('button');
            button.className = `subcategory-button px-3 py-2 sm:px-5 sm:py-2 rounded-full font-semibold text-xs sm:text-sm transition duration-300 ease-in-out font-geologica-light ${selectedSubcategory === cat.value ? 'bg-[#0D7C6D] text-white shadow-md' : 'bg-[#33C4B6] text-[#0D7C6D] hover:bg-[#0D7C6C] hover:text-white'}`;
            button.textContent = cat.label;
            button.onclick = () => {
                selectedSubcategory = cat.value;
                renderSubcategoryButtons();
                renderTours();
            };
            subcategoryButtonsContainer.appendChild(button);
        });
    }

    const tourDubaiMeioPeriodoPriceTable = [
        { min: 1, max: 1, price: 1284.50 },
        { min: 2, max: 2, price: 642.25 },
        { min: 3, max: 3, price: 428.17 },
        { min: 4, max: 11, price: 321.13 },
        { min: 12, max: 20, price: 293.60 }
    ];

    function getTourDubaiMeioPeriodoPrice(numPeople) {
        numPeople = parseInt(numPeople, 10);
        for (const entry of tourDubaiMeioPeriodoPriceTable) {
            if (numPeople >= entry.min && numPeople <= entry.max) {
                return entry.price;
            }
        }
        // Se acima de 47, retorna o maior valor
        return tourDubaiMeioPeriodoPriceTable[tourDubaiMeioPeriodoPriceTable.length - 1].price;
    }

    const tourDubaiDiaTodoPriceTable = [
        { min: 1, max: 1, price: 2018.50 },
        { min: 2, max: 2, price: 1009.25 },
        { min: 3, max: 3, price: 672.83 },
        { min: 4, max: 11, price: 504.63 },
        { min: 12, max: 20, price: 477.10 }
    ];

    function getTourDubaiDiaTodoPrice(numPeople) {
        numPeople = parseInt(numPeople, 10);
        for (const entry of tourDubaiDiaTodoPriceTable) {
            if (numPeople >= entry.min && numPeople <= entry.max) {
                return entry.price;
            }
        }
        return tourDubaiDiaTodoPriceTable[tourDubaiDiaTodoPriceTable.length - 1].price;
    }

    const tourAbuDhabiDiaTodo10hPriceTable = [
        { min: 1, max: 1, price: 2513.95 },
        { min: 2, max: 2, price: 1256.98 },
        { min: 3, max: 3, price: 840.43 },
        { min: 4, max: 11, price: 631.24 },
        { min: 12, max: 20, price: 587.20 }
    ];

    function getTourAbuDhabiDiaTodo10hPrice(numPeople) {
        numPeople = parseInt(numPeople, 10);
        for (const entry of tourAbuDhabiDiaTodo10hPriceTable) {
            if (numPeople >= entry.min && numPeople <= entry.max) {
                return entry.price;
            }
        }
        return tourAbuDhabiDiaTodo10hPriceTable[tourAbuDhabiDiaTodo10hPriceTable.length - 1].price;
    }

    const tourJebelHattaDiaTodo10hPriceTable = [
        { min: 1, max: 1, price: 2513.95 },
        { min: 2, max: 2, price: 1256.97 },
        { min: 3, max: 3, price: 834.00 },
        { min: 4, max: 11, price: 631.24 },
        { min: 12, max: 20, price: 587.20 }
    ];

    function getTourJebelHattaDiaTodo10hPrice(numPeople) {
        numPeople = parseInt(numPeople, 10);
        for (const entry of tourJebelHattaDiaTodo10hPriceTable) {
            if (numPeople >= entry.min && numPeople <= entry.max) {
                return entry.price;
            }
        }
        return tourJebelHattaDiaTodo10hPriceTable[tourJebelHattaDiaTodo10hPriceTable.length - 1].price;
    }

    const transporteDubaiMeioPeriodo5hPriceTable = [
        { min: 1, max: 5, price: 800.00 },
        { min: 6, max: 11, price: 950.00 },
        { min: 12, max: 20, price: 1600.00 },
        { min: 21, max: 30, price: 1760.00 },
        { min: 31, max: 47, price: 2090.00 }
    ];

    function getTransporteDubaiMeioPeriodo5hPrice(numPeople) {
        numPeople = parseInt(numPeople, 10);
        for (const entry of transporteDubaiMeioPeriodo5hPriceTable) {
            if (numPeople >= entry.min && numPeople <= entry.max) {
                return entry.price;
            }
        }
        return transporteDubaiMeioPeriodo5hPriceTable[transporteDubaiMeioPeriodo5hPriceTable.length - 1].price;
    }

    const transporteDubaiDiaTodo10hPriceTable = [
        { min: 1, max: 5, price: 1200.00 },
        { min: 6, max: 11, price: 1400.00 },
        { min: 12, max: 20, price: 1800.00 },
        { min: 21, max: 30, price: 2530.00 },
        { min: 31, max: 47, price: 2750.00 }
    ];

    function getTransporteDubaiDiaTodo10hPrice(numPeople) {
        numPeople = parseInt(numPeople, 10);
        for (const entry of transporteDubaiDiaTodo10hPriceTable) {
            if (numPeople >= entry.min && numPeople <= entry.max) {
                return entry.price;
            }
        }
        return transporteDubaiDiaTodo10hPriceTable[transporteDubaiDiaTodo10hPriceTable.length - 1].price;
    }

    const transporteAbuDhabiDiaTodo10hPriceTable = [
        { min: 1, max: 5, price: 1450.00 },
        { min: 6, max: 11, price: 1950.00 },
        { min: 12, max: 20, price: 2650.00 },
        { min: 21, max: 30, price: 2530.00 },
        { min: 31, max: 47, price: 2750.00 }
    ];

    function getTransporteAbuDhabiDiaTodo10hPrice(numPeople) {
        numPeople = parseInt(numPeople, 10);
        for (const entry of transporteAbuDhabiDiaTodo10hPriceTable) {
            if (numPeople >= entry.min && numPeople <= entry.max) {
                return entry.price;
            }
        }
        return transporteAbuDhabiDiaTodo10hPriceTable[transporteAbuDhabiDiaTodo10hPriceTable.length - 1].price;
    }

    function renderTours() {
        const toursGridTarget = document.getElementById('tours-grid');
        if (!toursGridTarget) return;
        

        toursGridTarget.innerHTML = `
            <div class="col-span-full">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${Array(6).fill().map(() => `
                        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div class="loading-skeleton h-48"></div>
                            <div class="p-6">
                                <div class="loading-skeleton h-6 mb-2"></div>
                                <div class="loading-skeleton h-4 mb-2"></div>
                                <div class="loading-skeleton h-4 mb-4"></div>
                                <div class="loading-skeleton h-8 w-24"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        setTimeout(() => {
            toursGridTarget.innerHTML = '';

        let filteredTours = allTours.filter(tour => {
            if (tour.id === 19 || tour.id === 20 || tour.id === 21 || tour.id === 111 || 
                tour.id === 30 || tour.id === 31 || tour.id === 32 || 
                tour.id === 115 || tour.id === 116 || tour.id === 117 || tour.id === 118 || 
                tour.id === 119 || tour.id === 120 || tour.id === 121 || tour.id === 122 || tour.id === 123 ||
                tour.id === 56 || tour.id === 57 || tour.id === 58 || tour.id === 59 || 
                tour.id === 60 || tour.id === 61 || tour.id === 62 || tour.id === 63 || 
                tour.id === 64 || tour.id === 65 || tour.id === 66 ||
                tour.id === 52 || tour.id === 53 || tour.id === 54 || tour.id === 55 ||
                tour.id === 69 || tour.id === 72 ||
                tour.id === 110 || tour.id === 27 || tour.id === 303 || tour.id === 400 || tour.id === 401 || tour.id === 112 ||
                // Oculta variações antigas dos Safáris Gold/Platinum Privativos (unificação em cards dinâmicos)
                tour.id === 206 || // Safari Gold Compartilhado (unificado com privativo)
                tour.id === 207 || tour.id === 208 || tour.id === 209 || // Gold Privativo 2p/3p/4-5p
                tour.id === 210 || // Safari Platinum Compartilhado (unificado com privativo)
                tour.id === 211 || tour.id === 212 || tour.id === 213 || // Platinum Privativo 2p/3p/4-5p
                tour.id === 78 || tour.id === 79 || tour.id === 86 || tour.id === 87 || tour.id === 88 || tour.id === 89 || tour.id === 95 || tour.id === 951 ||
                tour.id === 96 || tour.id === 961 || tour.id === 97 || tour.id === 971) return false;
            if (!(selectedSubcategory === 'all' || tour.category === selectedSubcategory)) return false;
            if (searchQuery && !(
                tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tour.description.toLowerCase().includes(searchQuery.toLowerCase())
            )) return false;
            return true;
        });

        function dynamicCardMatches(name, desc) {
            if (!searchQuery) return true;
            const q = searchQuery.toLowerCase();
            return name.toLowerCase().includes(q) || desc.toLowerCase().includes(q);
        }

        const dynamicCards = [];
        if (
            currentCountry && currentCountry.name === "Dubai e Abu Dhabi" &&
            (selectedSubcategory === 'all' || selectedSubcategory === 'TOUR PRIVATIVO') &&
            dynamicCardMatches("Tour Dubai Meio Periodo (4h)", "Incluso: Veículo Toyota Previa 7 assentos, Motorista, Guia Licenciado(a) e recomendação de Itinerário (ingressos vendidos separadamente). Hora Extra: AED 220 (Toyota) / AED 350 (Ônibus)")
        ) {
            dynamicCards.push(() => {
                const tourCard = document.createElement('div');
                tourCard.className = 'tour-card bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col';

                const img = document.createElement('img');
                img.src = "img/toursdubai/19.jpg";
                img.alt = "Tour Dubai Meio Periodo (4h)";
                img.className = 'w-full h-48 object-cover object-center';
                img.onerror = () => { img.src = `https://placehold.co/400x250/CCCCCC/333333?text=Tour+Dubai+Meio+Periodo`; };

                const contentDiv = document.createElement('div');
                contentDiv.className = 'p-5 sm:p-6 flex-grow flex flex-col justify-between';

                const textDiv = document.createElement('div');
                const nameH3 = document.createElement('h3');
                nameH3.className = 'text-xl sm:text-2xl font-bold text-[#0D7C6C] font-geologica-bold mb-2';
                nameH3.textContent = "Tour Dubai Meio Periodo (4h)";

                const descP = document.createElement('p');
                descP.className = 'text-gray-700 mb-4 text-sm font-geologica-light leading-relaxed';
                descP.innerHTML = `Incluso: Veículo Toyota Previa 7 assentos, Motorista, Guia Licenciado(a) e recomendação de Itinerário (ingressos vendidos separadamente).<br>
                Hora Extra: AED 220 (Toyota) / AED 350 (Ônibus)<br>
                <span class="font-bold">Selecione o número de pessoas para calcular o valor:</span>`;

                textDiv.appendChild(nameH3);
                textDiv.appendChild(descP);

                const actionDiv = document.createElement('div');
                actionDiv.className = 'mt-auto pt-4 border-t border-gray-100';

                const priceAndButtonDiv = document.createElement('div');
                priceAndButtonDiv.className = 'flex flex-col sm:flex-row justify-between items-center mb-3';

                const priceSpan = document.createElement('span');
                priceSpan.className = 'text-lg sm:text-xl font-extrabold text-[#0D7C6C] font-geologica-bold mb-2';


                const quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.value = 1;
                quantityInput.min = 1;
                quantityInput.max = 47;
                quantityInput.className = 'w-16 text-center border border-gray-300 rounded-md px-2 py-1 text-sm mr-2';

                function updatePrice() {
                    const numPeople = parseInt(quantityInput.value, 10);
                    const price = getTourDubaiMeioPeriodoPrice(numPeople);
                    priceSpan.textContent = `AED ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} por pessoa`;
                }
                quantityInput.addEventListener('input', updatePrice);
                quantityInput.addEventListener('change', updatePrice);
                quantityInput.addEventListener('blur', updatePrice);
                updatePrice();

                const addButton = document.createElement('button');
                addButton.className = 'w-full sm:w-auto bg-[#33C4B6] hover:bg-[#0D7C6D] text-white font-semibold py-2 px-4 sm:px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#33C4B6] focus:ring-opacity-50 text-sm';
                addButton.textContent = 'Adicionar';
                addButton.onclick = (e) => {
                    e.stopPropagation();
                    const numPeople = parseInt(quantityInput.value, 10);
                    if (numPeople > 0 && numPeople <= 47) {
                        const price = getTourDubaiMeioPeriodoPrice(numPeople);
                        handleAddToCart({
                            id: 'tour-dubai-meio-periodo',
                            name: 'Tour Dubai Meio Periodo (4h)',
                            description: 'Incluso: Veículo e motorista conforme o tamanho do grupo, Guia Brasileiro(a) Licenciado(a) e recomendação de Itinerário (ingressos vendidos separadamente). Hora Extra: AED 220 (Toyota) / AED 350 (Ônibus)',
                            price: price,
                            imageUrl: "img/toursdubai/19.jpg",
                            category: "TOUR PRIVATIVO"
                        }, numPeople);
                    } else {
                        showConfirmationMessage("Selecione entre 1 e 47 pessoas.");
                    }
                };

                const quantityControlDiv = document.createElement('div');
                quantityControlDiv.className = 'flex items-center mb-2 sm:mb-0';
                quantityControlDiv.appendChild(quantityInput);
                quantityControlDiv.appendChild(addButton);

                priceAndButtonDiv.appendChild(priceSpan);
                priceAndButtonDiv.appendChild(quantityControlDiv);
                actionDiv.appendChild(priceAndButtonDiv);

                contentDiv.appendChild(textDiv);
                contentDiv.appendChild(actionDiv);
                tourCard.appendChild(img);
                tourCard.appendChild(contentDiv);
                toursGridTarget.appendChild(tourCard);
            });
        }


        if (
            currentCountry && currentCountry.name === "Dubai e Abu Dhabi" &&
            (selectedSubcategory === 'all' || selectedSubcategory === 'TOUR PRIVATIVO') &&
            dynamicCardMatches("Tour Dubai Dia Todo (8h)", "Incluso: Veículo Toyota Previa 7 assentos, Motorista, Guia Brasileiro(a) Licenciado(a) e recomendação de Itinerário (ingressos vendidos separadamente). Hora Extra: AED 220 (Toyota) / AED 350 (Ônibus)")
        ) {
            dynamicCards.push(() => {
                const tourCard = document.createElement('div');
                tourCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col';

                const img = document.createElement('img');
                img.src = "img/toursdubai/20.jpg";
                img.alt = "Tour Dubai Dia Todo (8h)";
                img.className = 'w-full h-48 object-cover object-center';
                img.onerror = () => { img.src = `https://placehold.co/400x250/CCCCCC/333333?text=Tour+Dubai+Dia+Todo`; };

                const contentDiv = document.createElement('div');
                contentDiv.className = 'p-5 sm:p-6 flex-grow flex flex-col justify-between';

                const textDiv = document.createElement('div');
                const nameH3 = document.createElement('h3');
                nameH3.className = 'text-xl sm:text-2xl font-bold text-[#0D7C6C] font-geologica-bold mb-2';
                nameH3.textContent = "Tour Dubai Dia Todo (8h)";

                const descP = document.createElement('p');
                descP.className = 'text-gray-700 mb-4 text-sm font-geologica-light leading-relaxed';
                descP.innerHTML = `Incluso: Veículo Toyota Previa 7 assentos, Motorista, Guia Brasileiro(a) Licenciado(a) e recomendação de Itinerário (ingressos vendidos separadamente).<br>
                Hora Extra: AED 220 (Toyota) / AED 350 (Ônibus)<br>
                <span class="font-bold">Selecione o número de pessoas para calcular o valor:</span>`;

                textDiv.appendChild(nameH3);
                textDiv.appendChild(descP);

                const actionDiv = document.createElement('div');
                actionDiv.className = 'mt-auto pt-4 border-t border-gray-100';

                const priceAndButtonDiv = document.createElement('div');
                priceAndButtonDiv.className = 'flex flex-col sm:flex-row justify-between items-center mb-3';

                const priceSpan = document.createElement('span');
                priceSpan.className = 'text-lg sm:text-xl font-extrabold text-[#0D7C6C] font-geologica-bold mb-2';

                const quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.value = 1;
                quantityInput.min = 1;
                quantityInput.max = 20;
                quantityInput.className = 'w-16 text-center border border-gray-300 rounded-md px-2 py-1 text-sm mr-2';

                function updatePrice() {
                    const price = getTourDubaiDiaTodoPrice(quantityInput.value);
                    priceSpan.textContent = `AED ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} por pessoa`;
                }
                quantityInput.addEventListener('input', updatePrice);
                updatePrice();

                const addButton = document.createElement('button');
                addButton.className = 'w-full sm:w-auto bg-[#33C4B6] hover:bg-[#0D7C6D] text-white font-semibold py-2 px-4 sm:px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#33C4B6] focus:ring-opacity-50 text-sm';
                addButton.textContent = 'Adicionar';
                addButton.onclick = (e) => {
                    e.stopPropagation();
                    const numPeople = parseInt(quantityInput.value, 10);
                    if (numPeople > 0 && numPeople <= 20) {
                        const price = getTourDubaiDiaTodoPrice(numPeople);
                        handleAddToCart({
                            id: 'tour-dubai-dia-todo',
                            name: 'Tour Dubai Dia Todo (8h)',
                            description: 'Incluso: Veículo Toyota Previa 7 assentos, Motorista, Guia Brasileiro(a) Licenciado(a) e recomendação de Itinerário (ingressos vendidos separadamente). Hora Extra: AED 220 (Toyota) / AED 350 (Ônibus)',
                            price: price,
                            imageUrl: "img/toursdubai/20.jpg",
                            category: "TOUR PRIVATIVO"
                        }, numPeople);
                    } else {
                        showConfirmationMessage("Selecione entre 1 e 20 pessoas.");
                    }
                };

                const quantityControlDiv = document.createElement('div');
                quantityControlDiv.className = 'flex items-center mb-2 sm:mb-0';
                quantityControlDiv.appendChild(quantityInput);
                quantityControlDiv.appendChild(addButton);

                priceAndButtonDiv.appendChild(priceSpan);
                priceAndButtonDiv.appendChild(quantityControlDiv);
                actionDiv.appendChild(priceAndButtonDiv);

                contentDiv.appendChild(textDiv);
                contentDiv.appendChild(actionDiv);
                tourCard.appendChild(img);
                tourCard.appendChild(contentDiv);
                toursGridTarget.appendChild(tourCard);
            });
        }


        if (
            currentCountry && currentCountry.name === "Dubai e Abu Dhabi" &&
            (selectedSubcategory === 'all' || selectedSubcategory === 'TOUR PRIVATIVO') &&
            dynamicCardMatches("Tour Abu Dhabi Dia Todo (10h)", "Incluso: Veículo Toyota Previa 7 assentos, Motorista e Guia Brasileiro(a) Licenciado(a), reserva da Grande Mesquita e recomendação de Itinerário (outros ingressos vendidos separadamente). Hora Extra: AED 220 (Toyota) / AED 350 (Ônibus)")
        ) {
            dynamicCards.push(() => {
                const tourCard = document.createElement('div');
                tourCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col';

                const img = document.createElement('img');
                img.src = "img/toursdubai/21.jpg";
                img.alt = "Tour Abu Dhabi Dia Todo (10h)";
                img.className = 'w-full h-48 object-cover object-center';
                img.onerror = () => { img.src = `https://placehold.co/400x250/CCCCCC/333333?text=Tour+Abu+Dhabi+Dia+Todo+10h`; };

                const contentDiv = document.createElement('div');
                contentDiv.className = 'p-5 sm:p-6 flex-grow flex flex-col justify-between';

                const textDiv = document.createElement('div');
                const nameH3 = document.createElement('h3');
                nameH3.className = 'text-xl sm:text-2xl font-bold text-[#0D7C6C] font-geologica-bold mb-2';
                nameH3.textContent = "Tour Abu Dhabi Dia Todo (10h)";

                const descP = document.createElement('p');
                descP.className = 'text-gray-700 mb-4 text-sm font-geologica-light leading-relaxed';
                descP.innerHTML = `Incluso: Veículo Toyota Previa 7 assentos, Motorista e Guia Brasileiro(a) Licenciado(a), reserva da Grande Mesquita e recomendação de Itinerário (outros ingressos vendidos separadamente).<br>
                Hora Extra: AED 220 (Toyota) / AED 350 (Ônibus)<br>
                <span class="font-bold">Selecione o número de pessoas para calcular o valor:</span>`;

                textDiv.appendChild(nameH3);
                textDiv.appendChild(descP);

                const actionDiv = document.createElement('div');
                actionDiv.className = 'mt-auto pt-4 border-t border-gray-100';

                const priceAndButtonDiv = document.createElement('div');
                priceAndButtonDiv.className = 'flex flex-col sm:flex-row justify-between items-center mb-3';

                const priceSpan = document.createElement('span');
                priceSpan.className = 'text-lg sm:text-xl font-extrabold text-[#0D7C6C] font-geologica-bold mb-2';

                const quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.value = 1;
                quantityInput.min = 1;
                quantityInput.max = 20;
                quantityInput.className = 'w-16 text-center border border-gray-300 rounded-md px-2 py-1 text-sm mr-2';

                function updatePrice() {
                    const price = getTourAbuDhabiDiaTodo10hPrice(quantityInput.value);
                    priceSpan.textContent = `AED ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} por pessoa`;
                }
                quantityInput.addEventListener('input', updatePrice);
                updatePrice();

                const addButton = document.createElement('button');
                addButton.className = 'w-full sm:w-auto bg-[#33C4B6] hover:bg-[#0D7C6D] text-white font-semibold py-2 px-4 sm:px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#33C4B6] focus:ring-opacity-50 text-sm';
                addButton.textContent = 'Adicionar';
                addButton.onclick = (e) => {
                    e.stopPropagation();
                    const numPeople = parseInt(quantityInput.value, 10);
                    if (numPeople > 0 && numPeople <= 20) {
                        const price = getTourAbuDhabiDiaTodo10hPrice(numPeople);
                        handleAddToCart({
                            id: 'tour-abu-dhabi-dia-todo-10h',
                            name: 'Tour Abu Dhabi Dia Todo (10h)',
                            description: 'Incluso: Veículo Toyota Previa 7 assentos, Motorista e Guia Brasileiro(a) Licenciado(a), reserva da Grande Mesquita e recomendação de Itinerário (outros ingressos vendidos separadamente). Hora Extra: AED 220 (Toyota) / AED 350 (Ônibus)',
                            price: price,
                            imageUrl: "img/toursdubai/21.jpg",
                            category: "TOUR PRIVATIVO"
                        }, numPeople);
                    } else {
                        showConfirmationMessage("Selecione entre 1 e 20 pessoas.");
                    }
                };

                const quantityControlDiv = document.createElement('div');
                quantityControlDiv.className = 'flex items-center mb-2 sm:mb-0';
                quantityControlDiv.appendChild(quantityInput);
                quantityControlDiv.appendChild(addButton);

                priceAndButtonDiv.appendChild(priceSpan);
                priceAndButtonDiv.appendChild(quantityControlDiv);
                actionDiv.appendChild(priceAndButtonDiv);

                contentDiv.appendChild(textDiv);
                contentDiv.appendChild(actionDiv);
                tourCard.appendChild(img);
                tourCard.appendChild(contentDiv);
                toursGridTarget.appendChild(tourCard);
            });
        }


        if (
            currentCountry && currentCountry.name === "Dubai e Abu Dhabi" &&
            (selectedSubcategory === 'all' || selectedSubcategory === 'TOUR PRIVATIVO') &&
            dynamicCardMatches("Tour Jebel Jais ou Hatta - Montanhas / Dia Todo (10h)", "Incluso: Veículo Toyota Previa 7 assentos, Motorista, Guia Brasileiro(a) Licenciado(a) e recomendação de Itinerário (ingressos vendidos separadamente). Hora Extra: AED 220 (Toyota) / AED 350 (Ônibus)")
        ) {
            dynamicCards.push(() => {
                const tourCard = document.createElement('div');
                tourCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col';

                const img = document.createElement('img');
                img.src = "img/toursdubai/23.jpg";
                img.alt = "Tour Jebel Jais ou Hatta - Montanhas / Dia Todo (10h)";
                img.className = 'w-full h-48 object-cover object-center';
                img.onerror = () => { img.src = `https://placehold.co/400x250/CCCCCC/333333?text=Jebel+Jais+ou+Hatta+10h`; };

                const contentDiv = document.createElement('div');
                contentDiv.className = 'p-5 sm:p-6 flex-grow flex flex-col justify-between';

                const textDiv = document.createElement('div');
                const nameH3 = document.createElement('h3');
                nameH3.className = 'text-xl sm:text-2xl font-bold text-[#0D7C6C] font-geologica-bold mb-2';
                nameH3.textContent = "Tour Jebel Jais ou Hatta - Montanhas / Dia Todo (10h)";

                const descP = document.createElement('p');
                descP.className = 'text-gray-700 mb-4 text-sm font-geologica-light leading-relaxed';
                descP.innerHTML = `Incluso: Veículo Toyota Previa 7 assentos, Motorista, Guia Brasileiro(a) Licenciado(a) e recomendação de Itinerário (ingressos vendidos separadamente).<br>
                Hora Extra: AED 220 (Toyota) / AED 350 (Ônibus)<br>
                <span class="font-bold">Selecione o número de pessoas para calcular o valor:</span>`;

                textDiv.appendChild(nameH3);
                textDiv.appendChild(descP);

                const actionDiv = document.createElement('div');
                actionDiv.className = 'mt-auto pt-4 border-t border-gray-100';

                const priceAndButtonDiv = document.createElement('div');
                priceAndButtonDiv.className = 'flex flex-col sm:flex-row justify-between items-center mb-3';

                const priceSpan = document.createElement('span');
                priceSpan.className = 'text-lg sm:text-xl font-extrabold text-[#0D7C6C] font-geologica-bold mb-2';

                const quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.value = 1;
                quantityInput.min = 1;
                quantityInput.max = 20;
                quantityInput.className = 'w-16 text-center border border-gray-300 rounded-md px-2 py-1 text-sm mr-2';

                function updatePrice() {
                    const price = getTourJebelHattaDiaTodo10hPrice(quantityInput.value);
                    priceSpan.textContent = `AED ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} por pessoa`;
                }
                quantityInput.addEventListener('input', updatePrice);
                updatePrice();

                const addButton = document.createElement('button');
                addButton.className = 'w-full sm:w-auto bg-[#33C4B6] hover:bg-[#0D7C6D] text-white font-semibold py-2 px-4 sm:px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#33C4B6] focus:ring-opacity-50 text-sm';
                addButton.textContent = 'Adicionar';
                addButton.onclick = (e) => {
                    e.stopPropagation();
                    const numPeople = parseInt(quantityInput.value, 10);
                    if (numPeople > 0 && numPeople <= 20) {
                        const price = getTourJebelHattaDiaTodo10hPrice(numPeople);
                        handleAddToCart({
                            id: 'tour-jebel-hatta-dia-todo-10h',
                            name: 'Tour Jebel Jais ou Hatta - Montanhas / Dia Todo (10h)',
                            description: 'Incluso: Veículo Toyota Previa 7 assentos, Motorista, Guia Brasileiro(a) Licenciado(a) e recomendação de Itinerário (ingressos vendidos separadamente). Hora Extra: AED 220 (Toyota) / AED 350 (Ônibus)',
                            price: price,
                            imageUrl: "img/toursdubai/23.jpg",
                            category: "TOUR PRIVATIVO"
                        }, numPeople);
                    } else {
                        showConfirmationMessage("Selecione entre 1 e 20 pessoas.");
                    }
                };

                const quantityControlDiv = document.createElement('div');
                quantityControlDiv.className = 'flex items-center mb-2 sm:mb-0';
                quantityControlDiv.appendChild(quantityInput);
                quantityControlDiv.appendChild(addButton);

                priceAndButtonDiv.appendChild(priceSpan);
                priceAndButtonDiv.appendChild(quantityControlDiv);
                actionDiv.appendChild(priceAndButtonDiv);

                contentDiv.appendChild(textDiv);
                contentDiv.appendChild(actionDiv);
                tourCard.appendChild(img);
                tourCard.appendChild(contentDiv);
                toursGridTarget.appendChild(tourCard);
            });
        }


        if (
            currentCountry && currentCountry.name === "Dubai e Abu Dhabi" &&
            (selectedSubcategory === 'all' || selectedSubcategory === 'CARRO COM MOTORISTA') &&
            dynamicCardMatches("Transporte c/ Motorista em Dubai Meio Periodo (5h)", "Incluso: Veículo conforme o tamanho do grupo, Motorista, recomendação de Itinerário. Não inclui Guia - Apenas Motorista no Idioma Inglês.")
        ) {
            dynamicCards.push(() => {
                const tourCard = document.createElement('div');
                tourCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col';

                const img = document.createElement('img');
                img.src = "img/toursdubai/27.jpg";
                img.alt = "Transporte c/ Motorista em Dubai Meio Periodo (5h)";
                img.className = 'w-full h-48 object-cover object-center';
                img.onerror = () => { img.src = `https://placehold.co/400x250/CCCCCC/333333?text=Transporte+Dubai+Meio+Periodo`; };

                const contentDiv = document.createElement('div');
                contentDiv.className = 'p-5 sm:p-6 flex-grow flex flex-col justify-between';

                const textDiv = document.createElement('div');
                const nameH3 = document.createElement('h3');
                nameH3.className = 'text-xl sm:text-2xl font-bold text-[#0D7C6C] font-geologica-bold mb-2';
                nameH3.textContent = "Transporte c/ Motorista em Dubai Meio Periodo (5h)";

                const descP = document.createElement('p');
                descP.className = 'text-gray-700 mb-4 text-sm font-geologica-light leading-relaxed';
                descP.innerHTML = `Incluso: Veículo conforme o tamanho do grupo, Motorista, recomendação de Itinerário (roteiro detalhado e ingressos vendidos separadamente).<br>
                Não inclui Guia - Apenas Motorista no Idioma Inglês.<br>
                <span class="font-bold">Selecione o número de pessoas para calcular o valor:</span>`;

                textDiv.appendChild(nameH3);
                textDiv.appendChild(descP);

                const actionDiv = document.createElement('div');
                actionDiv.className = 'mt-auto pt-4 border-t border-gray-100';

                const priceAndButtonDiv = document.createElement('div');
                priceAndButtonDiv.className = 'flex flex-col sm:flex-row justify-between items-center mb-3';

                const priceSpan = document.createElement('span');
                priceSpan.className = 'text-lg sm:text-xl font-extrabold text-[#0D7C6C] font-geologica-bold mb-2';

                const quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.value = 1;
                quantityInput.min = 1;
                quantityInput.max = 47;
                quantityInput.className = 'w-16 text-center border border-gray-300 rounded-md px-2 py-1 text-sm mr-2';

                function updatePrice() {
                    const numPeople = parseInt(quantityInput.value, 10);
                    const price = getTransporteDubaiMeioPeriodo5hPrice(numPeople);
                    priceSpan.textContent = `AED ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} total`;
                }
                quantityInput.addEventListener('input', updatePrice);
                quantityInput.addEventListener('change', updatePrice);
                quantityInput.addEventListener('blur', updatePrice);
                updatePrice();

                const addButton = document.createElement('button');
                addButton.className = 'w-full sm:w-auto bg-[#33C4B6] hover:bg-[#0D7C6D] text-white font-semibold py-2 px-4 sm:px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#33C4B6] focus:ring-opacity-50 text-sm';
                addButton.textContent = 'Adicionar';
                addButton.onclick = (e) => {
                    e.stopPropagation();
                    const numPeople = parseInt(quantityInput.value, 10);
                    if (numPeople > 0 && numPeople <= 47) {
                        const price = getTransporteDubaiMeioPeriodo5hPrice(numPeople);
                        handleAddToCart({
                            id: 'transporte-dubai-meio-periodo-5h',
                            name: 'Transporte c/ Motorista em Dubai Meio Periodo (5h)',
                            description: 'Incluso: Veículo conforme o tamanho do grupo, Motorista, recomendação de Itinerário (roteiro detalhado e ingressos vendidos separadamente). Não inclui Guia - Apenas Motorista no Idioma Inglês.',
                            price: price,
                            imageUrl: "img/toursdubai/27.jpg",
                            category: "CARRO COM MOTORISTA"
                        }, 1);
                    } else {
                        showConfirmationMessage("Selecione entre 1 e 47 pessoas.");
                    }
                };

                const quantityControlDiv = document.createElement('div');
                quantityControlDiv.className = 'flex items-center mb-2 sm:mb-0';
                quantityControlDiv.appendChild(quantityInput);
                quantityControlDiv.appendChild(addButton);

                priceAndButtonDiv.appendChild(priceSpan);
                priceAndButtonDiv.appendChild(quantityControlDiv);
                actionDiv.appendChild(priceAndButtonDiv);

                contentDiv.appendChild(textDiv);
                contentDiv.appendChild(actionDiv);
                tourCard.appendChild(img);
                tourCard.appendChild(contentDiv);
                toursGridTarget.appendChild(tourCard);
            });
        }


        if (
            currentCountry && currentCountry.name === "Dubai e Abu Dhabi" &&
            (selectedSubcategory === 'all' || selectedSubcategory === 'CARRO COM MOTORISTA') &&
            dynamicCardMatches("Transporte c/ Motorista em Dubai - Dia Todo (10h)", "Incluso: Veículo conforme o tamanho do grupo, Motorista, recomendação de Itinerário. Não inclui Guia - Apenas Motorista no Idioma Inglês.")
        ) {
            dynamicCards.push(() => {
                const tourCard = document.createElement('div');
                tourCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col';

                const img = document.createElement('img');
                img.src = "img/toursdubai/118.jpg";
                img.alt = "Transporte c/ Motorista em Dubai - Dia Todo (10h)";
                img.className = 'w-full h-48 object-cover object-center';
                img.onerror = () => { img.src = `https://placehold.co/400x250/CCCCCC/333333?text=Transporte+Dubai+Dia+Todo`; };

                const contentDiv = document.createElement('div');
                contentDiv.className = 'p-5 sm:p-6 flex-grow flex flex-col justify-between';

                const textDiv = document.createElement('div');
                const nameH3 = document.createElement('h3');
                nameH3.className = 'text-xl sm:text-2xl font-bold text-[#0D7C6C] font-geologica-bold mb-2';
                nameH3.textContent = "Transporte c/ Motorista em Dubai - Dia Todo (10h)";

                const descP = document.createElement('p');
                descP.className = 'text-gray-700 mb-4 text-sm font-geologica-light leading-relaxed';
                descP.innerHTML = `Incluso: Veículo conforme o tamanho do grupo, Motorista, recomendação de Itinerário (roteiro detalhado e ingressos vendidos separadamente).<br>
                Não inclui Guia - Apenas Motorista no Idioma Inglês.<br>
                <span class="font-bold">Selecione o número de pessoas para calcular o valor:</span>`;

                textDiv.appendChild(nameH3);
                textDiv.appendChild(descP);

                const actionDiv = document.createElement('div');
                actionDiv.className = 'mt-auto pt-4 border-t border-gray-100';

                const priceAndButtonDiv = document.createElement('div');
                priceAndButtonDiv.className = 'flex flex-col sm:flex-row justify-between items-center mb-3';

                const priceSpan = document.createElement('span');
                priceSpan.className = 'text-lg sm:text-xl font-extrabold text-[#0D7C6C] font-geologica-bold mb-2';

                const quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.value = 1;
                quantityInput.min = 1;
                quantityInput.max = 47;
                quantityInput.className = 'w-16 text-center border border-gray-300 rounded-md px-2 py-1 text-sm mr-2';

                function updatePrice() {
                    const numPeople = parseInt(quantityInput.value, 10);
                    const price = getTransporteDubaiDiaTodo10hPrice(numPeople);
                    priceSpan.textContent = `AED ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} total`;
                }
                quantityInput.addEventListener('input', updatePrice);
                quantityInput.addEventListener('change', updatePrice);
                quantityInput.addEventListener('blur', updatePrice);
                updatePrice();

                const addButton = document.createElement('button');
                addButton.className = 'w-full sm:w-auto bg-[#33C4B6] hover:bg-[#0D7C6D] text-white font-semibold py-2 px-4 sm:px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#33C4B6] focus:ring-opacity-50 text-sm';
                addButton.textContent = 'Adicionar';
                addButton.onclick = (e) => {
                    e.stopPropagation();
                    const numPeople = parseInt(quantityInput.value, 10);
                    if (numPeople > 0 && numPeople <= 47) {
                        const price = getTransporteDubaiDiaTodo10hPrice(numPeople);
                        handleAddToCart({
                            id: 'transporte-dubai-dia-todo-10h',
                            name: 'Transporte c/ Motorista em Dubai - Dia Todo (10h)',
                            description: 'Incluso: Veículo conforme o tamanho do grupo, Motorista, recomendação de Itinerário (roteiro detalhado e ingressos vendidos separadamente). Não inclui Guia - Apenas Motorista no Idioma Inglês.',
                            price: price,
                            imageUrl: "img/toursdubai/28.jpg",
                            category: "CARRO COM MOTORISTA"
                        }, 1);
                    } else {
                        showConfirmationMessage("Selecione entre 1 e 47 pessoas.");
                    }
                };

                const quantityControlDiv = document.createElement('div');
                quantityControlDiv.className = 'flex items-center mb-2 sm:mb-0';
                quantityControlDiv.appendChild(quantityInput);
                quantityControlDiv.appendChild(addButton);

                priceAndButtonDiv.appendChild(priceSpan);
                priceAndButtonDiv.appendChild(quantityControlDiv);
                actionDiv.appendChild(priceAndButtonDiv);

                contentDiv.appendChild(textDiv);
                contentDiv.appendChild(actionDiv);
                tourCard.appendChild(img);
                tourCard.appendChild(contentDiv);
                toursGridTarget.appendChild(tourCard);
            });
        }


        if (
            currentCountry && currentCountry.name === "Dubai e Abu Dhabi" &&
            (selectedSubcategory === 'all' || selectedSubcategory === 'CARRO COM MOTORISTA') &&
            dynamicCardMatches("Transporte c/ Motorista em Abu Dhabi - Dia Todo (10h)", "Incluso: Veículo conforme o tamanho do grupo, Motorista, recomendação de Itinerário. Não inclui Guia - Apenas Motorista no Idioma Inglês.")
        ) {
            dynamicCards.push(() => {
                const tourCard = document.createElement('div');
                tourCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col';

                const img = document.createElement('img');
                img.src = "img/toursdubai/121.jpg";
                img.alt = "Transporte c/ Motorista em Abu Dhabi - Dia Todo (10h)";
                img.className = 'w-full h-48 object-cover object-center';
                img.onerror = () => { img.src = `https://placehold.co/400x250/CCCCCC/333333?text=Transporte+Abu+Dhabi+Dia+Todo`; };

                const contentDiv = document.createElement('div');
                contentDiv.className = 'p-5 sm:p-6 flex-grow flex flex-col justify-between';

                const textDiv = document.createElement('div');
                const nameH3 = document.createElement('h3');
                nameH3.className = 'text-xl sm:text-2xl font-bold text-[#0D7C6C] font-geologica-bold mb-2';
                nameH3.textContent = "Transporte c/ Motorista em Abu Dhabi - Dia Todo (10h)";

                const descP = document.createElement('p');
                descP.className = 'text-gray-700 mb-4 text-sm font-geologica-light leading-relaxed';
                descP.innerHTML = `Incluso: Veículo conforme o tamanho do grupo, Motorista, recomendação de Itinerário (roteiro detalhado e ingressos vendidos separadamente).<br>
                Não inclui Guia - Apenas Motorista no Idioma Inglês.<br>
                <span class="font-bold">Selecione o número de pessoas para calcular o valor:</span>`;

                textDiv.appendChild(nameH3);
                textDiv.appendChild(descP);

                const actionDiv = document.createElement('div');
                actionDiv.className = 'mt-auto pt-4 border-t border-gray-100';

                const priceAndButtonDiv = document.createElement('div');
                priceAndButtonDiv.className = 'flex flex-col sm:flex-row justify-between items-center mb-3';

                const priceSpan = document.createElement('span');
                priceSpan.className = 'text-lg sm:text-xl font-extrabold text-[#0D7C6C] font-geologica-bold mb-2';

                const quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.value = 1;
                quantityInput.min = 1;
                quantityInput.max = 47;
                quantityInput.className = 'w-16 text-center border border-gray-300 rounded-md px-2 py-1 text-sm mr-2';

                function updatePrice() {
                    const numPeople = parseInt(quantityInput.value, 10);
                    const price = getTransporteAbuDhabiDiaTodo10hPrice(numPeople);
                    priceSpan.textContent = `AED ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} total`;
                }
                quantityInput.addEventListener('input', updatePrice);
                quantityInput.addEventListener('change', updatePrice);
                quantityInput.addEventListener('blur', updatePrice);
                updatePrice();

                const addButton = document.createElement('button');
                addButton.className = 'w-full sm:w-auto bg-[#33C4B6] hover:bg-[#0D7C6D] text-white font-semibold py-2 px-4 sm:px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#33C4B6] focus:ring-opacity-50 text-sm';
                addButton.textContent = 'Adicionar';
                addButton.onclick = (e) => {
                    e.stopPropagation();
                    const numPeople = parseInt(quantityInput.value, 10);
                    if (numPeople > 0 && numPeople <= 47) {
                        const price = getTransporteAbuDhabiDiaTodo10hPrice(numPeople);
                        handleAddToCart({
                            id: 'transporte-abu-dhabi-dia-todo-10h',
                            name: 'Transporte c/ Motorista em Abu Dhabi - Dia Todo (10h)',
                            description: 'Incluso: Veículo conforme o tamanho do grupo, Motorista, recomendação de Itinerário (roteiro detalhado e ingressos vendidos separadamente). Não inclui Guia - Apenas Motorista no Idioma Inglês.',
                            price: price,
                            imageUrl: "img/toursdubai/121.jpg",
                            category: "CARRO COM MOTORISTA"
                        }, 1);
                    } else {
                        showConfirmationMessage("Selecione entre 1 e 47 pessoas.");
                    }
                };

                const quantityControlDiv = document.createElement('div');
                quantityControlDiv.className = 'flex items-center mb-2 sm:mb-0';
                quantityControlDiv.appendChild(quantityInput);
                quantityControlDiv.appendChild(addButton);

                priceAndButtonDiv.appendChild(priceSpan);
                priceAndButtonDiv.appendChild(quantityControlDiv);
                actionDiv.appendChild(priceAndButtonDiv);

                contentDiv.appendChild(textDiv);
                contentDiv.appendChild(actionDiv);
                tourCard.appendChild(img);
                tourCard.appendChild(contentDiv);
                toursGridTarget.appendChild(tourCard);
            });
        }

        // Card dinâmico Burj Khalifa - Com Fila
        if (
            currentCountry && currentCountry.name === "Dubai e Abu Dhabi" &&
            (selectedSubcategory === 'all' || selectedSubcategory === 'DUBAI TICKETS') &&
            dynamicCardMatches("Burj Khalifa", "Acesso ao Burj Khalifa, o edifício mais alto do mundo")
        ) {
            dynamicCards.push(() => {
                const tourCard = document.createElement('div');
                tourCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col';

                const img = document.createElement('img');
                img.src = "img/toursdubai/56.jpg";
                img.alt = "Burj Khalifa";
                img.className = 'w-full h-48 object-cover object-center';
                img.onerror = () => { img.src = `https://placehold.co/400x250/CCCCCC/333333?text=Burj+Khalifa`; };

                const contentDiv = document.createElement('div');
                contentDiv.className = 'p-5 sm:p-6 flex-grow flex flex-col justify-between';

                const textDiv = document.createElement('div');
                const nameH3 = document.createElement('h3');
                nameH3.className = 'text-xl sm:text-2xl font-bold text-[#0D7C6C] font-geologica-bold mb-2';
                nameH3.textContent = "Burj Khalifa - Ingresso Com Fila andar 124/125";

                const descP = document.createElement('p');
                descP.className = 'text-gray-700 mb-4 text-sm font-geologica-light leading-relaxed';
                descP.innerHTML = `Acesso ao Burj Khalifa, o edifício mais alto do mundo. Ingresso com fila, andares 124/125.<br>
                <span class="font-bold">Personalize seu ingresso:</span>`;

                textDiv.appendChild(nameH3);
                textDiv.appendChild(descP);

                const actionDiv = document.createElement('div');
                actionDiv.className = 'mt-auto pt-4 border-t border-gray-100';

                const burjKhalifaComFilaPrices = {
                    '9h-11h-adulto': 180.00,
                    '9h-11h-kids': 146.00,
                    'apos-11h-adulto': 260.00,
                    'apos-11h-kids': 165.00,
                    '9h-11h-aquario-adulto': 310.00,
                    '9h-11h-aquario-kids': 275.00,
                    'apos-11h-aquario-adulto': 310.00,
                    'apos-11h-aquario-kids': 275.00
                };

                const selectorsDiv = document.createElement('div');
                selectorsDiv.className = 'mb-4 space-y-3';

                const timeDiv = document.createElement('div');
                timeDiv.className = 'flex flex-col';
                const timeLabel = document.createElement('label');
                timeLabel.className = 'text-xs font-geologica-bold mb-1 text-gray-700';
                timeLabel.textContent = 'Horário:';
                const timeSelect = document.createElement('select');
                timeSelect.className = 'border border-gray-300 rounded-md px-2 py-1 text-sm font-geologica-light';
                timeSelect.innerHTML = `
                    <option value="9h-11h">9h-11h</option>
                    <option value="apos-11h">Após 11h</option>
                `;
                timeDiv.appendChild(timeLabel);
                timeDiv.appendChild(timeSelect);
                selectorsDiv.appendChild(timeDiv);

                const personTypeDiv = document.createElement('div');
                personTypeDiv.className = 'flex flex-col';
                const personTypeLabel = document.createElement('label');
                personTypeLabel.className = 'text-xs font-geologica-bold mb-1 text-gray-700';
                personTypeLabel.textContent = 'Tipo:';
                const personTypeSelect = document.createElement('select');
                personTypeSelect.className = 'border border-gray-300 rounded-md px-2 py-1 text-sm font-geologica-light';
                personTypeSelect.innerHTML = `
                    <option value="adulto">Adulto</option>
                    <option value="kids">Kids</option>
                `;
                personTypeDiv.appendChild(personTypeLabel);
                personTypeDiv.appendChild(personTypeSelect);
                selectorsDiv.appendChild(personTypeDiv);

                const aquariumDiv = document.createElement('div');
                aquariumDiv.className = 'flex flex-col';
                const aquariumLabel = document.createElement('label');
                aquariumLabel.className = 'text-xs font-geologica-bold mb-1 text-gray-700';
                aquariumLabel.textContent = 'Incluir Aquário:';
                const aquariumSelect = document.createElement('select');
                aquariumSelect.className = 'border border-gray-300 rounded-md px-2 py-1 text-sm font-geologica-light';
                aquariumSelect.innerHTML = `
                    <option value="sem">Sem Aquário</option>
                    <option value="com">Com Aquário</option>
                `;
                aquariumDiv.appendChild(aquariumLabel);
                aquariumDiv.appendChild(aquariumSelect);
                selectorsDiv.appendChild(aquariumDiv);

                const priceAndButtonDiv = document.createElement('div');
                priceAndButtonDiv.className = 'flex flex-col sm:flex-row justify-between items-center mb-3';

                const priceSpan = document.createElement('span');
                priceSpan.className = 'text-lg sm:text-xl font-extrabold text-[#0D7C6C] font-geologica-bold mb-2';

                const quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.value = 1;
                quantityInput.min = 1;
                quantityInput.max = 10;
                quantityInput.className = 'w-16 text-center border border-gray-300 rounded-md px-2 py-1 text-sm mr-2';

                function updateBurjKhalifaComFilaPrice() {
                    const time = timeSelect.value;
                    const personType = personTypeSelect.value;
                    const aquarium = aquariumSelect.value;

                    let priceKey = '';
                    if (aquarium === 'com') {
                        priceKey = `${time}-aquario-${personType}`;
                    } else {
                        priceKey = `${time}-${personType}`;
                    }

                    const price = burjKhalifaComFilaPrices[priceKey] || 0;
                    const quantity = parseInt(quantityInput.value, 10);
                    const totalPrice = price * quantity;
                    priceSpan.textContent = `AED ${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                }

                timeSelect.addEventListener('change', updateBurjKhalifaComFilaPrice);
                personTypeSelect.addEventListener('change', updateBurjKhalifaComFilaPrice);
                aquariumSelect.addEventListener('change', updateBurjKhalifaComFilaPrice);
                quantityInput.addEventListener('input', updateBurjKhalifaComFilaPrice);
                quantityInput.addEventListener('change', updateBurjKhalifaComFilaPrice);

                updateBurjKhalifaComFilaPrice();

                const addButton = document.createElement('button');
                addButton.className = 'w-full sm:w-auto bg-[#33C4B6] hover:bg-[#0D7C6D] text-white font-semibold py-2 px-4 sm:px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#33C4B6] focus:ring-opacity-50 text-sm';
                addButton.textContent = 'Adicionar';
                addButton.onclick = (e) => {
                    e.stopPropagation();
                    const quantity = parseInt(quantityInput.value, 10);
                    if (quantity > 0 && quantity <= 10) {
                        const time = timeSelect.value;
                        const personType = personTypeSelect.value;
                        const aquarium = aquariumSelect.value;

                        let priceKey = '';
                        if (aquarium === 'com') {
                            priceKey = `${time}-aquario-${personType}`;
                        } else {
                            priceKey = `${time}-${personType}`;
                        }

                        const price = burjKhalifaComFilaPrices[priceKey] || 0;
                        
                        // Gerar nome do ingresso
                        let ticketName = "Burj Khalifa - Ingresso Com Fila andar 124/125";
                        ticketName += ` ${time === '9h-11h' ? '9h-11h' : 'Após 11h'}`;
                        if (aquarium === 'com') ticketName += ' + Aquário';
                        ticketName += ` - ${personType === 'adulto' ? 'Adulto' : 'Kids'}`;

                        handleAddToCart({
                            id: `burj-khalifa-com-fila-${priceKey}`,
                            name: ticketName,
                            description: 'Acesso ao Burj Khalifa, o edifício mais alto do mundo. Ingresso com fila, andares 124/125. Vistas panorâmicas espetaculares de Dubai.',
                            price: price,
                            imageUrl: "img/toursdubai/56.jpg",
                            category: "DUBAI TICKETS"
                        }, quantity);
                    } else {
                        showConfirmationMessage("Selecione entre 1 e 10 ingressos.");
                    }
                };

                const quantityControlDiv = document.createElement('div');
                quantityControlDiv.className = 'flex items-center mb-2 sm:mb-0';
                quantityControlDiv.appendChild(quantityInput);
                quantityControlDiv.appendChild(addButton);

                priceAndButtonDiv.appendChild(priceSpan);
                priceAndButtonDiv.appendChild(quantityControlDiv);

                actionDiv.appendChild(selectorsDiv);
                actionDiv.appendChild(priceAndButtonDiv);

                contentDiv.appendChild(textDiv);
                contentDiv.appendChild(actionDiv);
                tourCard.appendChild(img);
                tourCard.appendChild(contentDiv);
                toursGridTarget.appendChild(tourCard);
            });
        }

        // Card dinâmico Burj Khalifa - Sem Fila
        if (
            currentCountry && currentCountry.name === "Dubai e Abu Dhabi" &&
            (selectedSubcategory === 'all' || selectedSubcategory === 'DUBAI TICKETS') &&
            dynamicCardMatches("Burj Khalifa", "Acesso ao Burj Khalifa, o edifício mais alto do mundo")
        ) {
            dynamicCards.push(() => {
                const tourCard = document.createElement('div');
                tourCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col';

                const img = document.createElement('img');
                img.src = "img/toursdubai/57.jpg";
                img.alt = "Burj Khalifa";
                img.className = 'w-full h-48 object-cover object-center';
                img.onerror = () => { img.src = `https://placehold.co/400x250/CCCCCC/333333?text=Burj+Khalifa`; };

                const contentDiv = document.createElement('div');
                contentDiv.className = 'p-5 sm:p-6 flex-grow flex flex-col justify-between';

                const textDiv = document.createElement('div');
                const nameH3 = document.createElement('h3');
                nameH3.className = 'text-xl sm:text-2xl font-bold text-[#0D7C6C] font-geologica-bold mb-2';
                nameH3.textContent = "Burj Khalifa - Ingresso Sem Fila andar 148/154";

                const descP = document.createElement('p');
                descP.className = 'text-gray-700 mb-4 text-sm font-geologica-light leading-relaxed';
                descP.innerHTML = `Acesso ao Burj Khalifa, o edifício mais alto do mundo. Ingresso sem fila com acesso prioritário.<br>
                <span class="font-bold">Escolha seu horário e andar:</span>`;

                textDiv.appendChild(nameH3);
                textDiv.appendChild(descP);

                const actionDiv = document.createElement('div');
                actionDiv.className = 'mt-auto pt-4 border-t border-gray-100';

                // Tabela de preços do Burj Khalifa Sem Fila
                const burjKhalifaSemFilaPrices = {
                    '9h-11h-124-125-148': 400.03,
                    'apos-11h-124-125-148': 557.84,
                    'qualquer-horario-154': 811.07
                };

                // Seletores
                const selectorsDiv = document.createElement('div');
                selectorsDiv.className = 'mb-4 space-y-3';

                // Seletor de horário e andar
                const timeFloorDiv = document.createElement('div');
                timeFloorDiv.className = 'flex flex-col';
                const timeFloorLabel = document.createElement('label');
                timeFloorLabel.className = 'text-xs font-geologica-bold mb-1 text-gray-700';
                timeFloorLabel.textContent = 'Horário e Andar:';
                const timeFloorSelect = document.createElement('select');
                timeFloorSelect.className = 'border border-gray-300 rounded-md px-2 py-1 text-sm font-geologica-light';
                timeFloorSelect.innerHTML = `
                    <option value="9h-11h-124-125-148">9h-11h - Andares 124/125/148</option>
                    <option value="apos-11h-124-125-148">Após 11h - Andares 124/125/148</option>
                    <option value="qualquer-horario-154">Qualquer horário - Andar 154</option>
                `;
                timeFloorDiv.appendChild(timeFloorLabel);
                timeFloorDiv.appendChild(timeFloorSelect);
                selectorsDiv.appendChild(timeFloorDiv);

                // Preço e botão
                const priceAndButtonDiv = document.createElement('div');
                priceAndButtonDiv.className = 'flex flex-col sm:flex-row justify-between items-center mb-3';

                const priceSpan = document.createElement('span');
                priceSpan.className = 'text-lg sm:text-xl font-extrabold text-[#0D7C6C] font-geologica-bold mb-2';

                const quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.value = 1;
                quantityInput.min = 1;
                quantityInput.max = 10;
                quantityInput.className = 'w-16 text-center border border-gray-300 rounded-md px-2 py-1 text-sm mr-2';

                function updateBurjKhalifaSemFilaPrice() {
                    const timeFloor = timeFloorSelect.value;
                    const price = burjKhalifaSemFilaPrices[timeFloor] || 0;
                    const quantity = parseInt(quantityInput.value, 10);
                    const totalPrice = price * quantity;
                    priceSpan.textContent = `AED ${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                }

                // Event listeners para atualizar preço
                timeFloorSelect.addEventListener('change', updateBurjKhalifaSemFilaPrice);
                quantityInput.addEventListener('input', updateBurjKhalifaSemFilaPrice);
                quantityInput.addEventListener('change', updateBurjKhalifaSemFilaPrice);

                // Atualizar preço inicial
                updateBurjKhalifaSemFilaPrice();

                const addButton = document.createElement('button');
                addButton.className = 'w-full sm:w-auto bg-[#33C4B6] hover:bg-[#0D7C6D] text-white font-semibold py-2 px-4 sm:px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#33C4B6] focus:ring-opacity-50 text-sm';
                addButton.textContent = 'Adicionar';
                addButton.onclick = (e) => {
                    e.stopPropagation();
                    const quantity = parseInt(quantityInput.value, 10);
                    if (quantity > 0 && quantity <= 10) {
                        const timeFloor = timeFloorSelect.value;
                        const price = burjKhalifaSemFilaPrices[timeFloor] || 0;
                        
                        // Gerar nome do ingresso
                        let ticketName = "Burj Khalifa - Ingresso Sem Fila andar 148/154";
                        if (timeFloor === '9h-11h-124-125-148') {
                            ticketName += ' 9h-11h - 124/125/148';
                        } else if (timeFloor === 'apos-11h-124-125-148') {
                            ticketName += ' Após 11h - 124/125/148';
                        } else if (timeFloor === 'qualquer-horario-154') {
                            ticketName += ' Qualquer Horário - 154';
                        }

                        handleAddToCart({
                            id: `burj-khalifa-sem-fila-${timeFloor}`,
                            name: ticketName,
                            description: 'Acesso ao Burj Khalifa, o edifício mais alto do mundo. Ingresso sem fila com acesso prioritário. Vistas panorâmicas espetaculares de Dubai.',
                            price: price,
                            imageUrl: "img/toursdubai/57.jpg",
                            category: "DUBAI TICKETS"
                        }, quantity);
                    } else {
                        showConfirmationMessage("Selecione entre 1 e 10 ingressos.");
                    }
                };

                const quantityControlDiv = document.createElement('div');
                quantityControlDiv.className = 'flex items-center mb-2 sm:mb-0';
                quantityControlDiv.appendChild(quantityInput);
                quantityControlDiv.appendChild(addButton);

                priceAndButtonDiv.appendChild(priceSpan);
                priceAndButtonDiv.appendChild(quantityControlDiv);

                actionDiv.appendChild(selectorsDiv);
                actionDiv.appendChild(priceAndButtonDiv);

                contentDiv.appendChild(textDiv);
                contentDiv.appendChild(actionDiv);
                tourCard.appendChild(img);
                tourCard.appendChild(contentDiv);
                toursGridTarget.appendChild(tourCard);
            });
        }

        // Card dinâmico The View - Unificado (Com Fila e Sem Fila)
        if (
            currentCountry && currentCountry.name === "Dubai e Abu Dhabi" &&
            (selectedSubcategory === 'all' || selectedSubcategory === 'DUBAI TICKETS') &&
            dynamicCardMatches("The View", "Acesso ao observatório The View at The Palm")
        ) {
            dynamicCards.push(() => {
                const tourCard = document.createElement('div');
                tourCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col';

                const img = document.createElement('img');
                img.src = "img/toursdubai/52.jpg";
                img.alt = "The View";
                img.className = 'w-full h-48 object-cover object-center';
                img.onerror = () => { img.src = `https://placehold.co/400x250/CCCCCC/333333?text=The+View`; };

                const contentDiv = document.createElement('div');
                contentDiv.className = 'p-5 sm:p-6 flex-grow flex flex-col justify-between';

                const textDiv = document.createElement('div');
                const nameH3 = document.createElement('h3');
                nameH3.className = 'text-xl sm:text-2xl font-bold text-[#0D7C6C] font-geologica-bold mb-2';
                nameH3.textContent = "The View - Ingresso";

                const descP = document.createElement('p');
                descP.className = 'text-gray-700 mb-4 text-sm font-geologica-light leading-relaxed';
                descP.innerHTML = `Acesso ao observatório The View at The Palm, localizado no topo da Palm Tower, com vistas 360 graus da Palm Jumeirah, do Golfo Pérsico e do skyline de Dubai.<br>
                <span class="font-bold">Escolha o tipo de ingresso:</span>`;

                textDiv.appendChild(nameH3);
                textDiv.appendChild(descP);

                const actionDiv = document.createElement('div');
                actionDiv.className = 'mt-auto pt-4 border-t border-gray-100';

                // Tabela de preços do The View
                const theViewPrices = {
                    'com-fila': {
                        'adulto': 110.00,
                        'kids': 75.00
                    },
                    'sem-fila': {
                        'adulto': 176.16,
                        'kids': 120.00
                    }
                };

                // Seletores
                const selectorsDiv = document.createElement('div');
                selectorsDiv.className = 'mb-4 space-y-3';

                // Seletor de tipo de ingresso
                const ticketTypeDiv = document.createElement('div');
                ticketTypeDiv.className = 'flex flex-col';
                const ticketTypeLabel = document.createElement('label');
                ticketTypeLabel.className = 'text-xs font-geologica-bold mb-1 text-gray-700';
                ticketTypeLabel.textContent = 'Tipo de Ingresso:';
                const ticketTypeSelect = document.createElement('select');
                ticketTypeSelect.className = 'border border-gray-300 rounded-md px-2 py-1 text-sm font-geologica-light';
                ticketTypeSelect.innerHTML = `
                    <option value="com-fila">Com Fila</option>
                    <option value="sem-fila">Sem Fila</option>
                `;
                ticketTypeDiv.appendChild(ticketTypeLabel);
                ticketTypeDiv.appendChild(ticketTypeSelect);
                selectorsDiv.appendChild(ticketTypeDiv);

                // Seletor de tipo de pessoa
                const personTypeDiv = document.createElement('div');
                personTypeDiv.className = 'flex flex-col';
                const personTypeLabel = document.createElement('label');
                personTypeLabel.className = 'text-xs font-geologica-bold mb-1 text-gray-700';
                personTypeLabel.textContent = 'Tipo:';
                const personTypeSelect = document.createElement('select');
                personTypeSelect.className = 'border border-gray-300 rounded-md px-2 py-1 text-sm font-geologica-light';
                personTypeSelect.innerHTML = `
                    <option value="adulto">Adulto</option>
                    <option value="kids">Kids</option>
                `;
                personTypeDiv.appendChild(personTypeLabel);
                personTypeDiv.appendChild(personTypeSelect);
                selectorsDiv.appendChild(personTypeDiv);

                // Preço e botão
                const priceAndButtonDiv = document.createElement('div');
                priceAndButtonDiv.className = 'flex flex-col sm:flex-row justify-between items-center mb-3';

                const priceSpan = document.createElement('span');
                priceSpan.className = 'text-lg sm:text-xl font-extrabold text-[#0D7C6C] font-geologica-bold mb-2';

                const quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.value = 1;
                quantityInput.min = 1;
                quantityInput.max = 10;
                quantityInput.className = 'w-16 text-center border border-gray-300 rounded-md px-2 py-1 text-sm mr-2';

                function updateTheViewPrice() {
                    const ticketType = ticketTypeSelect.value;
                    const personType = personTypeSelect.value;
                    const price = theViewPrices[ticketType][personType] || 0;
                    const quantity = parseInt(quantityInput.value, 10);
                    const totalPrice = price * quantity;
                    priceSpan.textContent = `AED ${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                }

                // Event listeners para atualizar preço
                ticketTypeSelect.addEventListener('change', updateTheViewPrice);
                personTypeSelect.addEventListener('change', updateTheViewPrice);
                quantityInput.addEventListener('input', updateTheViewPrice);
                quantityInput.addEventListener('change', updateTheViewPrice);

                // Atualizar preço inicial
                updateTheViewPrice();

                const addButton = document.createElement('button');
                addButton.className = 'w-full sm:w-auto bg-[#33C4B6] hover:bg-[#0D7C6D] text-white font-semibold py-2 px-4 sm:px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#33C4B6] focus:ring-opacity-50 text-sm';
                addButton.textContent = 'Adicionar';
                addButton.onclick = (e) => {
                    e.stopPropagation();
                    const quantity = parseInt(quantityInput.value, 10);
                    if (quantity > 0 && quantity <= 10) {
                        const ticketType = ticketTypeSelect.value;
                        const personType = personTypeSelect.value;
                        const price = theViewPrices[ticketType][personType] || 0;
                        
                        // Gerar nome do ingresso
                        let ticketName = "The View - Ingresso";
                        if (ticketType === 'com-fila') {
                            ticketName += " Com Fila";
                        } else if (ticketType === 'sem-fila') {
                            ticketName += " Sem Fila";
                        }
                        ticketName += ` - ${personType === 'adulto' ? 'Adulto' : 'Kids'}`;

                        // Gerar descrição baseada no tipo de ingresso
                        let description = 'Acesso ao observatório The View at The Palm, localizado no topo da Palm Tower, com vistas 360 graus da Palm Jumeirah, do Golfo Pérsico e do skyline de Dubai.';
                        if (ticketType === 'com-fila') {
                            description += ' Ingresso com fila.';
                        } else if (ticketType === 'sem-fila') {
                            description += ' Ingresso sem fila com acesso prioritário.';
                        }

                        handleAddToCart({
                            id: `the-view-${ticketType}-${personType}`,
                            name: ticketName,
                            description: description,
                            price: price,
                            imageUrl: "img/toursdubai/52.jpg",
                            category: "DUBAI TICKETS"
                        }, quantity);
                    } else {
                        showConfirmationMessage("Selecione entre 1 e 10 ingressos.");
                    }
                };

                const quantityControlDiv = document.createElement('div');
                quantityControlDiv.className = 'flex items-center mb-2 sm:mb-0';
                quantityControlDiv.appendChild(quantityInput);
                quantityControlDiv.appendChild(addButton);

                priceAndButtonDiv.appendChild(priceSpan);
                priceAndButtonDiv.appendChild(quantityControlDiv);

                actionDiv.appendChild(selectorsDiv);
                actionDiv.appendChild(priceAndButtonDiv);

                contentDiv.appendChild(textDiv);
                contentDiv.appendChild(actionDiv);
                tourCard.appendChild(img);
                tourCard.appendChild(contentDiv);
                toursGridTarget.appendChild(tourCard);
            });
        }

        // Card dinâmico Ingresso The Frame
        if (
            currentCountry && currentCountry.name === "Dubai e Abu Dhabi" &&
            (selectedSubcategory === 'all' || selectedSubcategory === 'DUBAI TICKETS') &&
            dynamicCardMatches("Ingresso The Frame", "Visite o The Dubai Frame")
        ) {
            dynamicCards.push(() => {
                const tourCard = document.createElement('div');
                tourCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col';

                const img = document.createElement('img');
                img.src = "img/toursdubai/theframe.jpg";
                img.alt = "The Frame";
                img.className = 'w-full h-48 object-cover object-center';
                img.onerror = () => { img.src = `https://placehold.co/400x250/CCCCCC/333333?text=The+Frame`; };

                const contentDiv = document.createElement('div');
                contentDiv.className = 'p-5 sm:p-6 flex-grow flex flex-col justify-between';

                const textDiv = document.createElement('div');
                const nameH3 = document.createElement('h3');
                nameH3.className = 'text-xl sm:text-2xl font-bold text-[#0D7C6C] font-geologica-bold mb-2';
                nameH3.textContent = "Ingresso The Frame (Moldura Dourada)";

                const descP = document.createElement('p');
                descP.className = 'text-gray-700 mb-4 text-sm font-geologica-light leading-relaxed';
                descP.innerHTML = `Visite o The Dubai Frame, uma estrutura arquitetônica impressionante que oferece vistas únicas do 'velho' e do 'novo' Dubai. Suba ao topo para uma perspectiva panorâmica da cidade.<br>
                <span class="font-bold">Personalize seu ingresso:</span>`;

                textDiv.appendChild(nameH3);
                textDiv.appendChild(descP);

                const actionDiv = document.createElement('div');
                actionDiv.className = 'mt-auto pt-4 border-t border-gray-100';

                // Tabela de preços do The Frame
                const theFramePrices = {
                    'adulto': 55.05,
                    'kids': 25.00
                };

                // Seletores
                const selectorsDiv = document.createElement('div');
                selectorsDiv.className = 'mb-4 space-y-3';

                // Seletor de tipo de pessoa
                const personTypeDiv = document.createElement('div');
                personTypeDiv.className = 'flex flex-col';
                const personTypeLabel = document.createElement('label');
                personTypeLabel.className = 'text-xs font-geologica-bold mb-1 text-gray-700';
                personTypeLabel.textContent = 'Tipo:';
                const personTypeSelect = document.createElement('select');
                personTypeSelect.className = 'border border-gray-300 rounded-md px-2 py-1 text-sm font-geologica-light';
                personTypeSelect.innerHTML = `
                    <option value="adulto">Adulto</option>
                    <option value="kids">Kids</option>
                `;
                personTypeDiv.appendChild(personTypeLabel);
                personTypeDiv.appendChild(personTypeSelect);
                selectorsDiv.appendChild(personTypeDiv);

                // Preço e botão
                const priceAndButtonDiv = document.createElement('div');
                priceAndButtonDiv.className = 'flex flex-col sm:flex-row justify-between items-center mb-3';

                const priceSpan = document.createElement('span');
                priceSpan.className = 'text-lg sm:text-xl font-extrabold text-[#0D7C6C] font-geologica-bold mb-2';

                const quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.value = 1;
                quantityInput.min = 1;
                quantityInput.max = 10;
                quantityInput.className = 'w-16 text-center border border-gray-300 rounded-md px-2 py-1 text-sm mr-2';

                function updateTheFramePrice() {
                    const personType = personTypeSelect.value;
                    const price = theFramePrices[personType] || 0;
                    const quantity = parseInt(quantityInput.value, 10);
                    const totalPrice = price * quantity;
                    priceSpan.textContent = `AED ${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                }

                // Event listeners para atualizar preço
                personTypeSelect.addEventListener('change', updateTheFramePrice);
                quantityInput.addEventListener('input', updateTheFramePrice);
                quantityInput.addEventListener('change', updateTheFramePrice);

                // Atualizar preço inicial
                updateTheFramePrice();

                const addButton = document.createElement('button');
                addButton.className = 'w-full sm:w-auto bg-[#33C4B6] hover:bg-[#0D7C6D] text-white font-semibold py-2 px-4 sm:px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#33C4B6] focus:ring-opacity-50 text-sm';
                addButton.textContent = 'Adicionar';
                addButton.onclick = (e) => {
                    e.stopPropagation();
                    const quantity = parseInt(quantityInput.value, 10);
                    if (quantity > 0 && quantity <= 10) {
                        const personType = personTypeSelect.value;
                        const price = theFramePrices[personType] || 0;
                        
                        // Gerar nome do ingresso
                        let ticketName = "Ingresso The Frame (Moldura Dourada)";
                        ticketName += ` - ${personType === 'adulto' ? 'Adulto' : 'Kids'}`;

                        handleAddToCart({
                            id: `the-frame-${personType}`,
                            name: ticketName,
                            description: 'Visite o The Dubai Frame, uma estrutura arquitetônica impressionante que oferece vistas únicas do "velho" e do "novo" Dubai. Suba ao topo para uma perspectiva panorâmica da cidade.',
                            price: price,
                            imageUrl: "img/toursdubai/67.jpg",
                            category: "DUBAI TICKETS"
                        }, quantity);
                    } else {
                        showConfirmationMessage("Selecione entre 1 e 10 ingressos.");
                    }
                };

                const quantityControlDiv = document.createElement('div');
                quantityControlDiv.className = 'flex items-center mb-2 sm:mb-0';
                quantityControlDiv.appendChild(quantityInput);
                quantityControlDiv.appendChild(addButton);

                priceAndButtonDiv.appendChild(priceSpan);
                priceAndButtonDiv.appendChild(quantityControlDiv);

                actionDiv.appendChild(selectorsDiv);
                actionDiv.appendChild(priceAndButtonDiv);

                contentDiv.appendChild(textDiv);
                contentDiv.appendChild(actionDiv);
                tourCard.appendChild(img);
                tourCard.appendChild(contentDiv);
                toursGridTarget.appendChild(tourCard);
            });
        }

        // Card dinâmico Ingresso Miracle Garden
        if (
            currentCountry && currentCountry.name === "Dubai e Abu Dhabi" &&
            (selectedSubcategory === 'all' || selectedSubcategory === 'DUBAI TICKETS') &&
            dynamicCardMatches("Ingresso Miracle Garden", "Visite o Dubai Miracle Garden")
        ) {
            dynamicCards.push(() => {
                const tourCard = document.createElement('div');
                tourCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col';

                const img = document.createElement('img');
                img.src = "img/toursdubai/70.jpg";
                img.alt = "Miracle Garden";
                img.className = 'w-full h-48 object-cover object-center';
                img.onerror = () => { img.src = `https://placehold.co/400x250/CCCCCC/333333?text=Miracle+Garden`; };

                const contentDiv = document.createElement('div');
                contentDiv.className = 'p-5 sm:p-6 flex-grow flex flex-col justify-between';

                const textDiv = document.createElement('div');
                const nameH3 = document.createElement('h3');
                nameH3.className = 'text-xl sm:text-2xl font-bold text-[#0D7C6C] font-geologica-bold mb-2';
                nameH3.textContent = "Ingresso Miracle Garden (Disponível apenas de Outubro a Abril / Inverno)";

                const descP = document.createElement('p');
                descP.className = 'text-gray-700 mb-4 text-sm font-geologica-light leading-relaxed';
                descP.innerHTML = `Visite o Dubai Miracle Garden, o maior jardim de flores naturais do mundo. Um espetáculo de cores e formas com milhões de flores arranjadas de maneira criativa.<br>
                <span class="font-bold">Personalize seu ingresso:</span>`;

                textDiv.appendChild(nameH3);
                textDiv.appendChild(descP);

                const actionDiv = document.createElement('div');
                actionDiv.className = 'mt-auto pt-4 border-t border-gray-100';

                // Tabela de preços do Miracle Garden
                const miracleGardenPrices = {
                    'adulto': 102.76,
                    'kids': 85.00
                };

                // Seletores
                const selectorsDiv = document.createElement('div');
                selectorsDiv.className = 'mb-4 space-y-3';

                // Seletor de tipo de pessoa
                const personTypeDiv = document.createElement('div');
                personTypeDiv.className = 'flex flex-col';
                const personTypeLabel = document.createElement('label');
                personTypeLabel.className = 'text-xs font-geologica-bold mb-1 text-gray-700';
                personTypeLabel.textContent = 'Tipo:';
                const personTypeSelect = document.createElement('select');
                personTypeSelect.className = 'border border-gray-300 rounded-md px-2 py-1 text-sm font-geologica-light';
                personTypeSelect.innerHTML = `
                    <option value="adulto">Adulto</option>
                    <option value="kids">Kids</option>
                `;
                personTypeDiv.appendChild(personTypeLabel);
                personTypeDiv.appendChild(personTypeSelect);
                selectorsDiv.appendChild(personTypeDiv);

                // Preço e botão
                const priceAndButtonDiv = document.createElement('div');
                priceAndButtonDiv.className = 'flex flex-col sm:flex-row justify-between items-center mb-3';

                const priceSpan = document.createElement('span');
                priceSpan.className = 'text-lg sm:text-xl font-extrabold text-[#0D7C6C] font-geologica-bold mb-2';

                const quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.value = 1;
                quantityInput.min = 1;
                quantityInput.max = 10;
                quantityInput.className = 'w-16 text-center border border-gray-300 rounded-md px-2 py-1 text-sm mr-2';

                function updateMiracleGardenPrice() {
                    const personType = personTypeSelect.value;
                    const price = miracleGardenPrices[personType] || 0;
                    const quantity = parseInt(quantityInput.value, 10);
                    const totalPrice = price * quantity;
                    priceSpan.textContent = `AED ${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                }

                // Event listeners para atualizar preço
                personTypeSelect.addEventListener('change', updateMiracleGardenPrice);
                quantityInput.addEventListener('input', updateMiracleGardenPrice);
                quantityInput.addEventListener('change', updateMiracleGardenPrice);

                // Atualizar preço inicial
                updateMiracleGardenPrice();

                const addButton = document.createElement('button');
                addButton.className = 'w-full sm:w-auto bg-[#33C4B6] hover:bg-[#0D7C6D] text-white font-semibold py-2 px-4 sm:px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#33C4B6] focus:ring-opacity-50 text-sm';
                addButton.textContent = 'Adicionar';
                addButton.onclick = (e) => {
                    e.stopPropagation();
                    const quantity = parseInt(quantityInput.value, 10);
                    if (quantity > 0 && quantity <= 10) {
                        const personType = personTypeSelect.value;
                        const price = miracleGardenPrices[personType] || 0;
                        
                        // Gerar nome do ingresso
                        let ticketName = "Ingresso Miracle Garden (Disponível apenas de Outubro a Abril / Inverno)";
                        ticketName += ` - ${personType === 'adulto' ? 'Adulto' : 'Kids'}`;

                        handleAddToCart({
                            id: `miracle-garden-${personType}`,
                            name: ticketName,
                            description: 'Visite o Dubai Miracle Garden, o maior jardim de flores naturais do mundo. Um espetáculo de cores e formas com milhões de flores arranjadas de maneira criativa.',
                            price: price,
                            imageUrl: "img/toursdubai/70.jpg",
                            category: "DUBAI TICKETS"
                        }, quantity);
                    } else {
                        showConfirmationMessage("Selecione entre 1 e 10 ingressos.");
                    }
                };

                const quantityControlDiv = document.createElement('div');
                quantityControlDiv.className = 'flex items-center mb-2 sm:mb-0';
                quantityControlDiv.appendChild(quantityInput);
                quantityControlDiv.appendChild(addButton);

                priceAndButtonDiv.appendChild(priceSpan);
                priceAndButtonDiv.appendChild(quantityControlDiv);

                actionDiv.appendChild(selectorsDiv);
                actionDiv.appendChild(priceAndButtonDiv);

                contentDiv.appendChild(textDiv);
                contentDiv.appendChild(actionDiv);
                tourCard.appendChild(img);
                tourCard.appendChild(contentDiv);
                toursGridTarget.appendChild(tourCard);
            });
        }

        // Card dinâmico Tour Dubai Compartilhado - REMOVIDO (categoria TOUR EM GRUPO removida)
        if (false) {
            dynamicCards.push(() => {
                const tourCard = document.createElement('div');
                tourCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col';

                const img = document.createElement('img');
                img.src = "img/toursdubai/15.jpg";
                img.alt = "Tour Dubai Compartilhado";
                img.className = 'w-full h-48 object-cover object-center';
                img.onerror = () => { img.src = `https://placehold.co/400x250/CCCCCC/333333?text=Tour+Dubai+Compartilhado`; };

                const contentDiv = document.createElement('div');
                contentDiv.className = 'p-5 sm:p-6 flex-grow flex flex-col justify-between';

                const textDiv = document.createElement('div');
                const nameH3 = document.createElement('h3');
                nameH3.className = 'text-xl sm:text-2xl font-bold text-[#0D7C6C] font-geologica-bold mb-2';
                nameH3.textContent = "Tour Dubai Compartilhado - No Idioma Da Sua Preferência (6h)";

                const descP = document.createElement('p');
                descP.className = 'text-gray-700 mb-4 text-sm font-geologica-light leading-relaxed';
                descP.innerHTML = `Tour compartilhado pelos principais pontos de Dubai com guia. Incluso: Guia em seu idioma nativo, Transporte do Hotel. Solicite Itinerário completo.<br>
                <span class="font-bold">Personalize seu tour:</span>`;

                textDiv.appendChild(nameH3);
                textDiv.appendChild(descP);

                const actionDiv = document.createElement('div');
                actionDiv.className = 'mt-auto pt-4 border-t border-gray-100';

                // Tabela de preços do Tour Dubai Compartilhado
                const tourDubaiCompartilhadoPrices = {
                    'adulto': 550.50,
                    'kids': 450.00
                };

                // Seletores
                const selectorsDiv = document.createElement('div');
                selectorsDiv.className = 'mb-4 space-y-3';

                // Seletor de tipo de pessoa
                const personTypeDiv = document.createElement('div');
                personTypeDiv.className = 'flex flex-col';
                const personTypeLabel = document.createElement('label');
                personTypeLabel.className = 'text-xs font-geologica-bold mb-1 text-gray-700';
                personTypeLabel.textContent = 'Tipo:';
                const personTypeSelect = document.createElement('select');
                personTypeSelect.className = 'border border-gray-300 rounded-md px-2 py-1 text-sm font-geologica-light';
                personTypeSelect.innerHTML = `
                    <option value="adulto">Adulto</option>
                    <option value="kids">Kids</option>
                `;
                personTypeDiv.appendChild(personTypeLabel);
                personTypeDiv.appendChild(personTypeSelect);
                selectorsDiv.appendChild(personTypeDiv);

                // Preço e botão
                const priceAndButtonDiv = document.createElement('div');
                priceAndButtonDiv.className = 'flex flex-col sm:flex-row justify-between items-center mb-3';

                const priceSpan = document.createElement('span');
                priceSpan.className = 'text-lg sm:text-xl font-extrabold text-[#0D7C6C] font-geologica-bold mb-2';

                const quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.value = 1;
                quantityInput.min = 1;
                quantityInput.max = 10;
                quantityInput.className = 'w-16 text-center border border-gray-300 rounded-md px-2 py-1 text-sm mr-2';

                function updateTourDubaiCompartilhadoPrice() {
                    const personType = personTypeSelect.value;
                    const price = tourDubaiCompartilhadoPrices[personType] || 0;
                    const quantity = parseInt(quantityInput.value, 10);
                    const totalPrice = price * quantity;
                    priceSpan.textContent = `AED ${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                }

                // Event listeners para atualizar preço
                personTypeSelect.addEventListener('change', updateTourDubaiCompartilhadoPrice);
                quantityInput.addEventListener('input', updateTourDubaiCompartilhadoPrice);
                quantityInput.addEventListener('change', updateTourDubaiCompartilhadoPrice);

                // Atualizar preço inicial
                updateTourDubaiCompartilhadoPrice();

                const addButton = document.createElement('button');
                addButton.className = 'w-full sm:w-auto bg-[#33C4B6] hover:bg-[#0D7C6D] text-white font-semibold py-2 px-4 sm:px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#33C4B6] focus:ring-opacity-50 text-sm';
                addButton.textContent = 'Adicionar';
                addButton.onclick = (e) => {
                    e.stopPropagation();
                    const quantity = parseInt(quantityInput.value, 10);
                    if (quantity > 0 && quantity <= 10) {
                        const personType = personTypeSelect.value;
                        const price = tourDubaiCompartilhadoPrices[personType] || 0;
                        
                        // Gerar nome do tour
                        let tourName = "Tour Dubai Compartilhado - No Idioma Da Sua Preferência (6h)";
                        tourName += ` - ${personType === 'adulto' ? 'Adulto' : 'Kids'}`;

                        handleAddToCart({
                            id: `tour-dubai-compartilhado-${personType}`,
                            name: tourName,
                            description: 'Tour compartilhado pelos principais pontos de Dubai com guia. Incluso: Guia em seu idioma nativo, Transporte do Hotel. Solicite Itinerário completo.',
                            price: price,
                            imageUrl: "img/toursdubai/15.jpg",
                            category: "TOUR EM GRUPO"
                        }, quantity);
                    } else {
                        showConfirmationMessage("Selecione entre 1 e 10 pessoas.");
                    }
                };

                const quantityControlDiv = document.createElement('div');
                quantityControlDiv.className = 'flex items-center mb-2 sm:mb-0';
                quantityControlDiv.appendChild(quantityInput);
                quantityControlDiv.appendChild(addButton);

                priceAndButtonDiv.appendChild(priceSpan);
                priceAndButtonDiv.appendChild(quantityControlDiv);

                actionDiv.appendChild(selectorsDiv);
                actionDiv.appendChild(priceAndButtonDiv);

                contentDiv.appendChild(textDiv);
                contentDiv.appendChild(actionDiv);
                tourCard.appendChild(img);
                tourCard.appendChild(contentDiv);
                toursGridTarget.appendChild(tourCard);
            });
        }

        // Card dinâmico Traslado Aeroporto Dubai - Hotel Dubai
        if (
            currentCountry && currentCountry.name === "Dubai e Abu Dhabi" &&
            (selectedSubcategory === 'all' || selectedSubcategory === 'TRASLADO') &&
            dynamicCardMatches("Traslado Aeroporto Dubai - Hotel Dubai", "Traslado do Aeroporto Dubai para Hotel em Dubai")
        ) {
            dynamicCards.push(() => {
                const tourCard = document.createElement('div');
                tourCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col';

                const img = document.createElement('img');
                img.src = "img/toursdubai/27.jpg";
                img.alt = "Traslado Aeroporto Dubai";
                img.className = 'w-full h-48 object-cover object-center';
                img.onerror = () => { img.src = `https://placehold.co/400x250/CCCCCC/333333?text=Traslado+Aeroporto`; };

                const contentDiv = document.createElement('div');
                contentDiv.className = 'p-5 sm:p-6 flex-grow flex flex-col justify-between';

                const textDiv = document.createElement('div');
                const nameH3 = document.createElement('h3');
                nameH3.className = 'text-xl sm:text-2xl font-bold text-[#0D7C6C] font-geologica-bold mb-2';
                nameH3.textContent = "Traslado Aeroporto Dubai - Hotel Dubai";

                const descP = document.createElement('p');
                descP.className = 'text-gray-700 mb-4 text-sm font-geologica-light leading-relaxed';
                descP.innerHTML = `Traslado do Aeroporto Dubai para Hotel em Dubai (1 trecho). Incluso: veículo adequado ao grupo e motorista no idioma inglês.<br>
                <span class="font-bold">Escolha o número de pessoas:</span>`;

                textDiv.appendChild(nameH3);
                textDiv.appendChild(descP);

                const actionDiv = document.createElement('div');
                actionDiv.className = 'mt-auto pt-4 border-t border-gray-100';

                // Tabela de preços do Traslado Aeroporto Dubai
                const trasladoAeroportoPrices = {
                    '2pessoas': 389.00,
                    '3a7pessoas': 499.00,
                    '8a14pessoas': 1000.00
                };

                // Seletores
                const selectorsDiv = document.createElement('div');
                selectorsDiv.className = 'mb-4 space-y-3';

                // Seletor de número de pessoas
                const peopleDiv = document.createElement('div');
                peopleDiv.className = 'flex flex-col';
                const peopleLabel = document.createElement('label');
                peopleLabel.className = 'text-xs font-geologica-bold mb-1 text-gray-700';
                peopleLabel.textContent = 'Pessoas:';
                const peopleSelect = document.createElement('select');
                peopleSelect.className = 'border border-gray-300 rounded-md px-2 py-1 text-sm font-geologica-light';
                peopleSelect.innerHTML = `
                    <option value="2pessoas">Até 2 pessoas</option>
                    <option value="3a7pessoas">3 a 7 pessoas</option>
                    <option value="8a14pessoas">8 a 14 pessoas</option>
                `;
                peopleDiv.appendChild(peopleLabel);
                peopleDiv.appendChild(peopleSelect);
                selectorsDiv.appendChild(peopleDiv);

                // Preço e botão
                const priceAndButtonDiv = document.createElement('div');
                priceAndButtonDiv.className = 'flex flex-col sm:flex-row justify-between items-center mb-3';

                const priceSpan = document.createElement('span');
                priceSpan.className = 'text-lg sm:text-xl font-extrabold text-[#0D7C6C] font-geologica-bold mb-2';

                function updateTrasladoAeroportoPrice() {
                    const peopleType = peopleSelect.value;
                    const price = trasladoAeroportoPrices[peopleType] || 0;
                    priceSpan.textContent = `AED ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                }

                // Event listeners para atualizar preço
                peopleSelect.addEventListener('change', updateTrasladoAeroportoPrice);

                // Atualizar preço inicial
                updateTrasladoAeroportoPrice();

                const addButton = document.createElement('button');
                addButton.className = 'w-full sm:w-auto bg-[#33C4B6] hover:bg-[#0D7C6D] text-white font-semibold py-2 px-4 sm:px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#33C4B6] focus:ring-opacity-50 text-sm';
                addButton.textContent = 'Adicionar';
                addButton.onclick = (e) => {
                    e.stopPropagation();
                    const peopleType = peopleSelect.value;
                    const price = trasladoAeroportoPrices[peopleType] || 0;
                    
                    // Gerar nome do traslado
                    let trasladoName = "Traslado Aeroporto Dubai - Hotel Dubai";
                    let peopleText = "";
                    if (peopleType === '2pessoas') peopleText = "Até 2 pessoas";
                    else if (peopleType === '3a7pessoas') peopleText = "3 a 7 pessoas";
                    else if (peopleType === '8a14pessoas') peopleText = "8 a 14 pessoas";
                    trasladoName += ` - ${peopleText}`;

                    handleAddToCart({
                        id: `traslado-aeroporto-${peopleType}`,
                        name: trasladoName,
                        description: 'Traslado do Aeroporto Dubai para Hotel em Dubai (1 trecho). Incluso: veículo adequado ao grupo e motorista no idioma inglês.',
                        price: price,
                        imageUrl: "img/toursdubai/27.jpg",
                        category: "TRASLADO"
                    }, 1);
                };

                priceAndButtonDiv.appendChild(priceSpan);
                priceAndButtonDiv.appendChild(addButton);

                actionDiv.appendChild(selectorsDiv);
                actionDiv.appendChild(priceAndButtonDiv);

                contentDiv.appendChild(textDiv);
                contentDiv.appendChild(actionDiv);
                tourCard.appendChild(img);
                tourCard.appendChild(contentDiv);
                toursGridTarget.appendChild(tourCard);
            });
        }

        // Card dinâmico Iate Privativo - Aluguel por Hora
        if (
            currentCountry && currentCountry.name === "Dubai e Abu Dhabi" &&
            (selectedSubcategory === 'all' || selectedSubcategory === 'AVENTURAS AQUÁTICAS') &&
            dynamicCardMatches("Iate Privativo - Aluguel por Hora", "Iate privativo para grupos de diferentes tamanhos")
        ) {
            dynamicCards.push(() => {
                const tourCard = document.createElement('div');
                tourCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col';

                const img = document.createElement('img');
                img.src = "img/toursdubai/iatePrivativo.jpg";
                img.alt = "Iate Privativo";
                img.className = 'w-full h-48 object-cover object-center';
                img.onerror = () => { img.src = `https://placehold.co/400x250/CCCCCC/333333?text=Iate+Privativo`; };

                const contentDiv = document.createElement('div');
                contentDiv.className = 'p-5 sm:p-6 flex-grow flex flex-col justify-between';

                const textDiv = document.createElement('div');
                const nameH3 = document.createElement('h3');
                nameH3.className = 'text-xl sm:text-2xl font-bold text-[#0D7C6C] font-geologica-bold mb-2';
                nameH3.textContent = "Iate Privativo - Aluguel por Hora";

                const descP = document.createElement('p');
                descP.className = 'text-gray-700 mb-4 text-sm font-geologica-light leading-relaxed';
                descP.innerHTML = `Iate privativo para grupos de diferentes tamanhos. Valor por hora (mínimo de 3 horas). Comidas e bebidas vendidas separadamente.<br>
                <span class="font-bold">Escolha a capacidade desejada:</span>`;

                textDiv.appendChild(nameH3);
                textDiv.appendChild(descP);

                const actionDiv = document.createElement('div');
                actionDiv.className = 'mt-auto pt-4 border-t border-gray-100';

                // Tabela de preços do Iate Privativo
                const iatePrivativoPrices = {
                    '6pessoas': 2100.00,
                    '15pessoas': 2500.00,
                    '20pessoas': 3100.00,
                    '30pessoas': 5000.00,
                    '40pessoas': 6000.00
                };

                // Seletores
                const selectorsDiv = document.createElement('div');
                selectorsDiv.className = 'mb-4 space-y-3';

                // Seletor de capacidade
                const capacityDiv = document.createElement('div');
                capacityDiv.className = 'flex flex-col';
                const capacityLabel = document.createElement('label');
                capacityLabel.className = 'text-xs font-geologica-bold mb-1 text-gray-700';
                capacityLabel.textContent = 'Capacidade:';
                const capacitySelect = document.createElement('select');
                capacitySelect.className = 'border border-gray-300 rounded-md px-2 py-1 text-sm font-geologica-light';
                capacitySelect.innerHTML = `
                    <option value="6pessoas">Até 6 pessoas</option>
                    <option value="15pessoas">Até 15 pessoas</option>
                    <option value="20pessoas">Até 20 pessoas</option>
                    <option value="30pessoas">Até 30 pessoas</option>
                    <option value="40pessoas">Até 40 pessoas</option>
                `;
                capacityDiv.appendChild(capacityLabel);
                capacityDiv.appendChild(capacitySelect);
                selectorsDiv.appendChild(capacityDiv);

                // Preço e botão
                const priceAndButtonDiv = document.createElement('div');
                priceAndButtonDiv.className = 'flex flex-col sm:flex-row justify-between items-center mb-3';

                const priceSpan = document.createElement('span');
                priceSpan.className = 'text-lg sm:text-xl font-extrabold text-[#0D7C6C] font-geologica-bold mb-2';

                function updateIatePrivativoPrice() {
                    const capacityType = capacitySelect.value;
                    const price = iatePrivativoPrices[capacityType] || 0;
                    priceSpan.textContent = `AED ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} por hora`;
                }

                // Event listeners para atualizar preço
                capacitySelect.addEventListener('change', updateIatePrivativoPrice);

                // Atualizar preço inicial
                updateIatePrivativoPrice();

                const addButton = document.createElement('button');
                addButton.className = 'w-full sm:w-auto bg-[#33C4B6] hover:bg-[#0D7C6D] text-white font-semibold py-2 px-4 sm:px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#33C4B6] focus:ring-opacity-50 text-sm';
                addButton.textContent = 'Adicionar';
                addButton.onclick = (e) => {
                    e.stopPropagation();
                    const capacityType = capacitySelect.value;
                    const price = iatePrivativoPrices[capacityType] || 0;
                    
                    // Gerar nome do iate
                    let iateName = "Iate Privativo - Aluguel por Hora";
                    let capacityText = "";
                    if (capacityType === '6pessoas') capacityText = "Até 6 pessoas";
                    else if (capacityType === '15pessoas') capacityText = "Até 15 pessoas";
                    else if (capacityType === '20pessoas') capacityText = "Até 20 pessoas";
                    else if (capacityType === '30pessoas') capacityText = "Até 30 pessoas";
                    else if (capacityType === '40pessoas') capacityText = "Até 40 pessoas";
                    iateName += ` - ${capacityText}`;

                    handleAddToCart({
                        id: `iate-privativo-${capacityType}`,
                        name: iateName,
                        description: 'Iate privativo para grupos de diferentes tamanhos. Valor por hora (mínimo de 3 horas). Comidas e bebidas vendidas separadamente.',
                        price: price,
                        imageUrl: "img/toursdubai/iatePrivativo.jpg",
                        category: "AVENTURAS AQUÁTICAS"
                    }, 1);
                };

                priceAndButtonDiv.appendChild(priceSpan);
                priceAndButtonDiv.appendChild(addButton);

                actionDiv.appendChild(selectorsDiv);
                actionDiv.appendChild(priceAndButtonDiv);

                contentDiv.appendChild(textDiv);
                contentDiv.appendChild(actionDiv);
                tourCard.appendChild(img);
                tourCard.appendChild(contentDiv);
                toursGridTarget.appendChild(tourCard);
            });
        }

        // Card dinâmico Helicóptero Compartilhado - Voo Panorâmico Dubai
        if (
            currentCountry && currentCountry.name === "Dubai e Abu Dhabi" &&
            (selectedSubcategory === 'all' || selectedSubcategory === 'EXPERIENCIAS AÉREAS') &&
            dynamicCardMatches("Helicóptero Compartilhado - Voo Panorâmico Dubai", "Voo panorâmico de helicóptero compartilhado sobre Dubai")
        ) {
            dynamicCards.push(() => {
                const tourCard = document.createElement('div');
                tourCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col';

                const img = document.createElement('img');
                img.src = "img/toursdubai/400.jpg";
                img.alt = "Helicóptero Compartilhado";
                img.className = 'w-full h-48 object-cover object-center';
                img.onerror = () => { img.src = `https://placehold.co/400x250/CCCCCC/333333?text=Helicoptero+Compartilhado`; };

                const contentDiv = document.createElement('div');
                contentDiv.className = 'p-5 sm:p-6 flex-grow flex flex-col justify-between';

                const textDiv = document.createElement('div');
                const nameH3 = document.createElement('h3');
                nameH3.className = 'text-xl sm:text-2xl font-bold text-[#0D7C6C] font-geologica-bold mb-2';
                nameH3.textContent = "Helicóptero Compartilhado - Voo Panorâmico Dubai";

                const descP = document.createElement('p');
                descP.className = 'text-gray-700 mb-4 text-sm font-geologica-light leading-relaxed';
                descP.innerHTML = `Voo panorâmico de helicóptero compartilhado sobre Dubai. Experiência única para 1 adulto. Vistas espetaculares da cidade.<br>
                <span class="font-bold">Escolha a duração do voo:</span>`;

                textDiv.appendChild(nameH3);
                textDiv.appendChild(descP);

                const actionDiv = document.createElement('div');
                actionDiv.className = 'mt-auto pt-4 border-t border-gray-100';

                // Tabela de preços do Helicóptero Compartilhado
                const helicopteroCompartilhadoPrices = {
                    '12min': 711.98,
                    '17min': 954.20,
                    '22min': 1302.85,
                    '30min': 2000.00
                };

                // Seletores
                const selectorsDiv = document.createElement('div');
                selectorsDiv.className = 'mb-4 space-y-3';

                // Seletor de duração
                const durationDiv = document.createElement('div');
                durationDiv.className = 'flex flex-col';
                const durationLabel = document.createElement('label');
                durationLabel.className = 'text-xs font-geologica-bold mb-1 text-gray-700';
                durationLabel.textContent = 'Duração:';
                const durationSelect = document.createElement('select');
                durationSelect.className = 'border border-gray-300 rounded-md px-2 py-1 text-sm font-geologica-light';
                durationSelect.innerHTML = `
                    <option value="12min">12 minutos</option>
                    <option value="17min">17 minutos</option>
                    <option value="22min">22 minutos</option>
                    <option value="30min">30 minutos</option>
                `;
                durationDiv.appendChild(durationLabel);
                durationDiv.appendChild(durationSelect);
                selectorsDiv.appendChild(durationDiv);

                // Preço e botão
                const priceAndButtonDiv = document.createElement('div');
                priceAndButtonDiv.className = 'flex flex-col sm:flex-row justify-between items-center mb-3';

                const priceSpan = document.createElement('span');
                priceSpan.className = 'text-lg sm:text-xl font-extrabold text-[#0D7C6C] font-geologica-bold mb-2';

                function updateHelicopteroCompartilhadoPrice() {
                    const durationType = durationSelect.value;
                    const price = helicopteroCompartilhadoPrices[durationType] || 0;
                    priceSpan.textContent = `AED ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                }

                // Event listeners para atualizar preço
                durationSelect.addEventListener('change', updateHelicopteroCompartilhadoPrice);

                // Atualizar preço inicial
                updateHelicopteroCompartilhadoPrice();

                const addButton = document.createElement('button');
                addButton.className = 'w-full sm:w-auto bg-[#33C4B6] hover:bg-[#0D7C6D] text-white font-semibold py-2 px-4 sm:px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#33C4B6] focus:ring-opacity-50 text-sm';
                addButton.textContent = 'Adicionar';
                addButton.onclick = (e) => {
                    e.stopPropagation();
                    const durationType = durationSelect.value;
                    const price = helicopteroCompartilhadoPrices[durationType] || 0;
                    
                    // Gerar nome do helicóptero
                    let helicopterName = "Helicóptero Compartilhado - Voo Panorâmico Dubai";
                    let durationText = "";
                    if (durationType === '12min') durationText = "12 minutos";
                    else if (durationType === '17min') durationText = "17 minutos";
                    else if (durationType === '22min') durationText = "22 minutos";
                    else if (durationType === '30min') durationText = "30 minutos";
                    helicopterName += ` - ${durationText}`;

                    handleAddToCart({
                        id: `helicoptero-compartilhado-${durationType}`,
                        name: helicopterName,
                        description: 'Voo panorâmico de helicóptero compartilhado sobre Dubai. Experiência única para 1 adulto. Vistas espetaculares da cidade.',
                        price: price,
                        imageUrl: "img/toursdubai/400.jpg",
                        category: "EXPERIENCIAS AÉREAS"
                    }, 1);
                };

                priceAndButtonDiv.appendChild(priceSpan);
                priceAndButtonDiv.appendChild(addButton);

                actionDiv.appendChild(selectorsDiv);
                actionDiv.appendChild(priceAndButtonDiv);

                contentDiv.appendChild(textDiv);
                contentDiv.appendChild(actionDiv);
                tourCard.appendChild(img);
                tourCard.appendChild(contentDiv);
                toursGridTarget.appendChild(tourCard);
            });
        }

        // Card dinâmico Helicóptero Privativo - Voo Exclusivo Dubai
        if (
            currentCountry && currentCountry.name === "Dubai e Abu Dhabi" &&
            (selectedSubcategory === 'all' || selectedSubcategory === 'EXPERIENCIAS AÉREAS') &&
            dynamicCardMatches("Helicóptero Privativo - Voo Exclusivo Dubai", "Voo privativo de helicóptero sobre Dubai para até 5 pessoas")
        ) {
            dynamicCards.push(() => {
                const tourCard = document.createElement('div');
                tourCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col';

                const img = document.createElement('img');
                img.src = "img/toursdubai/400.jpg";
                img.alt = "Helicóptero Privativo";
                img.className = 'w-full h-48 object-cover object-center';
                img.onerror = () => { img.src = `https://placehold.co/400x250/CCCCCC/333333?text=Helicoptero+Privativo`; };

                const contentDiv = document.createElement('div');
                contentDiv.className = 'p-5 sm:p-6 flex-grow flex flex-col justify-between';

                const textDiv = document.createElement('div');
                const nameH3 = document.createElement('h3');
                nameH3.className = 'text-xl sm:text-2xl font-bold text-[#0D7C6C] font-geologica-bold mb-2';
                nameH3.textContent = "Helicóptero Privativo - Voo Exclusivo Dubai";

                const descP = document.createElement('p');
                descP.className = 'text-gray-700 mb-4 text-sm font-geologica-light leading-relaxed';
                descP.innerHTML = `Voo privativo de helicóptero sobre Dubai para até 5 pessoas. Exclusividade e conforto total.<br>
                <span class="font-bold">Escolha a duração do voo:</span>`;

                textDiv.appendChild(nameH3);
                textDiv.appendChild(descP);

                const actionDiv = document.createElement('div');
                actionDiv.className = 'mt-auto pt-4 border-t border-gray-100';

                // Tabela de preços do Helicóptero Privativo
                const helicopteroPrivativoPrices = {
                    '12min': 3600.00,
                    '17min': 4800.00,
                    '22min': 6500.00,
                    '30min': 8900.00
                };

                // Seletores
                const selectorsDiv = document.createElement('div');
                selectorsDiv.className = 'mb-4 space-y-3';

                // Seletor de duração
                const durationDiv = document.createElement('div');
                durationDiv.className = 'flex flex-col';
                const durationLabel = document.createElement('label');
                durationLabel.className = 'text-xs font-geologica-bold mb-1 text-gray-700';
                durationLabel.textContent = 'Duração:';
                const durationSelect = document.createElement('select');
                durationSelect.className = 'border border-gray-300 rounded-md px-2 py-1 text-sm font-geologica-light';
                durationSelect.innerHTML = `
                    <option value="12min">12 minutos</option>
                    <option value="17min">17 minutos</option>
                    <option value="22min">22 minutos</option>
                    <option value="30min">30 minutos</option>
                `;
                durationDiv.appendChild(durationLabel);
                durationDiv.appendChild(durationSelect);
                selectorsDiv.appendChild(durationDiv);

                // Preço e botão
                const priceAndButtonDiv = document.createElement('div');
                priceAndButtonDiv.className = 'flex flex-col sm:flex-row justify-between items-center mb-3';

                const priceSpan = document.createElement('span');
                priceSpan.className = 'text-lg sm:text-xl font-extrabold text-[#0D7C6C] font-geologica-bold mb-2';

                function updateHelicopteroPrivativoPrice() {
                    const durationType = durationSelect.value;
                    const price = helicopteroPrivativoPrices[durationType] || 0;
                    priceSpan.textContent = `AED ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                }

                // Event listeners para atualizar preço
                durationSelect.addEventListener('change', updateHelicopteroPrivativoPrice);

                // Atualizar preço inicial
                updateHelicopteroPrivativoPrice();

                const addButton = document.createElement('button');
                addButton.className = 'w-full sm:w-auto bg-[#33C4B6] hover:bg-[#0D7C6D] text-white font-semibold py-2 px-4 sm:px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#33C4B6] focus:ring-opacity-50 text-sm';
                addButton.textContent = 'Adicionar';
                addButton.onclick = (e) => {
                    e.stopPropagation();
                    const durationType = durationSelect.value;
                    const price = helicopteroPrivativoPrices[durationType] || 0;
                    
                    // Gerar nome do helicóptero
                    let helicopterName = "Helicóptero Privativo - Voo Exclusivo Dubai";
                    let durationText = "";
                    if (durationType === '12min') durationText = "12 minutos";
                    else if (durationType === '17min') durationText = "17 minutos";
                    else if (durationType === '22min') durationText = "22 minutos";
                    else if (durationType === '30min') durationText = "30 minutos";
                    helicopterName += ` - ${durationText}`;

                    handleAddToCart({
                        id: `helicoptero-privativo-${durationType}`,
                        name: helicopterName,
                        description: 'Voo privativo de helicóptero sobre Dubai para até 5 pessoas. Exclusividade e conforto total.',
                        price: price,
                        imageUrl: "img/toursdubai/400.jpg",
                        category: "EXPERIENCIAS AÉREAS"
                    }, 1);
                };

                priceAndButtonDiv.appendChild(priceSpan);
                priceAndButtonDiv.appendChild(addButton);

                actionDiv.appendChild(selectorsDiv);
                actionDiv.appendChild(priceAndButtonDiv);

                contentDiv.appendChild(textDiv);
                contentDiv.appendChild(actionDiv);
                tourCard.appendChild(img);
                tourCard.appendChild(contentDiv);
                toursGridTarget.appendChild(tourCard);
            });
        }

        // Card dinâmico Ingresso Roda Gigante Ain Dubai
        if (
            currentCountry && currentCountry.name === "Dubai e Abu Dhabi" &&
            (selectedSubcategory === 'all' || selectedSubcategory === 'DUBAI TICKETS') &&
            dynamicCardMatches("Ingresso Roda Gigante Ain Dubai", "Acesso à Ain Dubai")
        ) {
            dynamicCards.push(() => {
                const tourCard = document.createElement('div');
                tourCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col';

                const img = document.createElement('img');
                img.src = "img/toursdubai/rodagigante.jpg";
                img.alt = "Ingresso Roda Gigante Ain Dubai";
                img.className = 'w-full h-48 object-cover object-center';
                img.onerror = () => { img.src = `https://placehold.co/400x250/CCCCCC/333333?text=Roda+Gigante+Ain+Dubai`; };

                const contentDiv = document.createElement('div');
                contentDiv.className = 'p-5 sm:p-6 flex-grow flex flex-col justify-between';

                const textDiv = document.createElement('div');
                const nameH3 = document.createElement('h3');
                nameH3.className = 'text-xl sm:text-2xl font-bold text-[#0D7C6C] font-geologica-bold mb-2';
                nameH3.textContent = "Ingresso Roda Gigante Ain Dubai";

                const descP = document.createElement('p');
                descP.className = 'text-gray-700 mb-4 text-sm font-geologica-light leading-relaxed';
                descP.innerHTML = `Acesso à Ain Dubai, a maior roda gigante de observação do mundo. Desfrute de vistas incríveis de Dubai.<br>
                <span class="font-bold">Escolha o tipo de ingresso:</span>`;

                textDiv.appendChild(nameH3);
                textDiv.appendChild(descP);

                const actionDiv = document.createElement('div');
                actionDiv.className = 'mt-auto pt-4 border-t border-gray-100';

                // Tabela de preços da Roda Gigante Ain Dubai
                const rodaGigantePrices = {
                    'adulto': 145.00,
                    'kids': 115.00
                };

                // Seletores
                const selectorsDiv = document.createElement('div');
                selectorsDiv.className = 'mb-4 space-y-3';

                // Seletor de tipo de pessoa
                const personTypeDiv = document.createElement('div');
                personTypeDiv.className = 'flex flex-col';
                const personTypeLabel = document.createElement('label');
                personTypeLabel.className = 'text-xs font-geologica-bold mb-1 text-gray-700';
                personTypeLabel.textContent = 'Tipo:';
                const personTypeSelect = document.createElement('select');
                personTypeSelect.className = 'border border-gray-300 rounded-md px-2 py-1 text-sm font-geologica-light';
                personTypeSelect.innerHTML = `
                    <option value="adulto">Adulto</option>
                    <option value="kids">Kids</option>
                `;
                personTypeDiv.appendChild(personTypeLabel);
                personTypeDiv.appendChild(personTypeSelect);
                selectorsDiv.appendChild(personTypeDiv);

                // Preço e botão
                const priceAndButtonDiv = document.createElement('div');
                priceAndButtonDiv.className = 'flex flex-col sm:flex-row justify-between items-center mb-3';

                const priceSpan = document.createElement('span');
                priceSpan.className = 'text-lg sm:text-xl font-extrabold text-[#0D7C6C] font-geologica-bold mb-2';

                const quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.value = 1;
                quantityInput.min = 1;
                quantityInput.max = 10;
                quantityInput.className = 'w-16 text-center border border-gray-300 rounded-md px-2 py-1 text-sm mr-2';

                function updateRodaGigantePrice() {
                    const personType = personTypeSelect.value;
                    const price = rodaGigantePrices[personType] || 0;
                    const quantity = parseInt(quantityInput.value, 10);
                    const totalPrice = price * quantity;
                    priceSpan.textContent = `AED ${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                }

                // Event listeners para atualizar preço
                personTypeSelect.addEventListener('change', updateRodaGigantePrice);
                quantityInput.addEventListener('input', updateRodaGigantePrice);
                quantityInput.addEventListener('change', updateRodaGigantePrice);

                // Atualizar preço inicial
                updateRodaGigantePrice();

                const addButton = document.createElement('button');
                addButton.className = 'w-full sm:w-auto bg-[#33C4B6] hover:bg-[#0D7C6D] text-white font-semibold py-2 px-4 sm:px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#33C4B6] focus:ring-opacity-50 text-sm';
                addButton.textContent = 'Adicionar';
                addButton.onclick = (e) => {
                    e.stopPropagation();
                    const quantity = parseInt(quantityInput.value, 10);
                    if (quantity > 0 && quantity <= 10) {
                        const personType = personTypeSelect.value;
                        const price = rodaGigantePrices[personType] || 0;
                        
                        // Gerar nome do ingresso
                        let ticketName = "Ingresso Roda Gigante Ain Dubai";
                        if (personType === 'adulto') {
                            ticketName += ' - Adulto';
                        } else if (personType === 'kids') {
                            ticketName += ' - Kids';
                        }

                        handleAddToCart({
                            id: `roda-gigante-ain-dubai-${personType}`,
                            name: ticketName,
                            description: 'Acesso à Ain Dubai, a maior roda gigante de observação do mundo. Desfrute de vistas incríveis de Dubai.',
                            price: price,
                            imageUrl: "img/toursdubai/76.jpg",
                            category: "DUBAI TICKETS"
                        }, quantity);
                    } else {
                        showConfirmationMessage("Selecione entre 1 e 10 ingressos.");
                    }
                };

                const quantityControlDiv = document.createElement('div');
                quantityControlDiv.className = 'flex items-center mb-2 sm:mb-0';
                quantityControlDiv.appendChild(quantityInput);
                quantityControlDiv.appendChild(addButton);

                priceAndButtonDiv.appendChild(priceSpan);
                priceAndButtonDiv.appendChild(quantityControlDiv);

                actionDiv.appendChild(selectorsDiv);
                actionDiv.appendChild(priceAndButtonDiv);

                contentDiv.appendChild(textDiv);
                contentDiv.appendChild(actionDiv);
                tourCard.appendChild(img);
                tourCard.appendChild(contentDiv);
                toursGridTarget.appendChild(tourCard);
            });
        }

        // Card dinâmico Ingresso Dubai Safari Park Zoo
        if (
            currentCountry && currentCountry.name === "Dubai e Abu Dhabi" &&
            (selectedSubcategory === 'all' || selectedSubcategory === 'DUBAI PARKS') &&
            dynamicCardMatches("Ingresso Dubai Safari Park Zoo", "Acesso ao Dubai Safari Park")
        ) {
            dynamicCards.push(() => {
                const tourCard = document.createElement('div');
                tourCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col';

                const img = document.createElement('img');
                img.src = "img/toursdubai/dubaisafaripark.jpg";
                img.alt = "Ingresso Dubai Safari Park Zoo";
                img.className = 'w-full h-48 object-cover object-center';
                img.onerror = () => { img.src = `https://placehold.co/400x250/CCCCCC/333333?text=Dubai+Safari+Park`; };

                const contentDiv = document.createElement('div');
                contentDiv.className = 'p-5 sm:p-6 flex-grow flex flex-col justify-between';

                const textDiv = document.createElement('div');
                const nameH3 = document.createElement('h3');
                nameH3.className = 'text-xl sm:text-2xl font-bold text-[#0D7C6C] font-geologica-bold mb-2';
                nameH3.textContent = "Ingresso Dubai Safari Park Zoo";

                const descP = document.createElement('p');
                descP.className = 'text-gray-700 mb-4 text-sm font-geologica-light leading-relaxed';
                descP.innerHTML = `Acesso ao Dubai Safari Park, um extenso parque de vida selvagem com diversas zonas que abrigam animais de diferentes habitats ao redor do mundo.<br>
                <span class="font-bold">Escolha o tipo de ingresso:</span>`;

                textDiv.appendChild(nameH3);
                textDiv.appendChild(descP);

                const actionDiv = document.createElement('div');
                actionDiv.className = 'mt-auto pt-4 border-t border-gray-100';

                // Tabela de preços do Dubai Safari Park
                const safariParkPrices = {
                    'adulto': 55.00,
                    'kids': 25.00
                };

                // Seletores
                const selectorsDiv = document.createElement('div');
                selectorsDiv.className = 'mb-4 space-y-3';

                // Seletor de tipo de pessoa
                const personTypeDiv = document.createElement('div');
                personTypeDiv.className = 'flex flex-col';
                const personTypeLabel = document.createElement('label');
                personTypeLabel.className = 'text-xs font-geologica-bold mb-1 text-gray-700';
                personTypeLabel.textContent = 'Tipo:';
                const personTypeSelect = document.createElement('select');
                personTypeSelect.className = 'border border-gray-300 rounded-md px-2 py-1 text-sm font-geologica-light';
                personTypeSelect.innerHTML = `
                    <option value="adulto">Adulto</option>
                    <option value="kids">Kids</option>
                `;
                personTypeDiv.appendChild(personTypeLabel);
                personTypeDiv.appendChild(personTypeSelect);
                selectorsDiv.appendChild(personTypeDiv);

                // Preço e botão
                const priceAndButtonDiv = document.createElement('div');
                priceAndButtonDiv.className = 'flex flex-col sm:flex-row justify-between items-center mb-3';

                const priceSpan = document.createElement('span');
                priceSpan.className = 'text-lg sm:text-xl font-extrabold text-[#0D7C6C] font-geologica-bold mb-2';

                const quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.value = 1;
                quantityInput.min = 1;
                quantityInput.max = 10;
                quantityInput.className = 'w-16 text-center border border-gray-300 rounded-md px-2 py-1 text-sm mr-2';

                function updateSafariParkPrice() {
                    const personType = personTypeSelect.value;
                    const price = safariParkPrices[personType] || 0;
                    const quantity = parseInt(quantityInput.value, 10);
                    const totalPrice = price * quantity;
                    priceSpan.textContent = `AED ${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                }

                // Event listeners para atualizar preço
                personTypeSelect.addEventListener('change', updateSafariParkPrice);
                quantityInput.addEventListener('input', updateSafariParkPrice);
                quantityInput.addEventListener('change', updateSafariParkPrice);

                // Atualizar preço inicial
                updateSafariParkPrice();

                const addButton = document.createElement('button');
                addButton.className = 'w-full sm:w-auto bg-[#33C4B6] hover:bg-[#0D7C6D] text-white font-semibold py-2 px-4 sm:px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#33C4B6] focus:ring-opacity-50 text-sm';
                addButton.textContent = 'Adicionar';
                addButton.onclick = (e) => {
                    e.stopPropagation();
                    const quantity = parseInt(quantityInput.value, 10);
                    if (quantity > 0 && quantity <= 10) {
                        const personType = personTypeSelect.value;
                        const price = safariParkPrices[personType] || 0;
                        
                        // Gerar nome do ingresso
                        let ticketName = "Ingresso Dubai Safari Park Zoo";
                        if (personType === 'adulto') {
                            ticketName += ' - Adulto';
                        } else if (personType === 'kids') {
                            ticketName += ' - Kids';
                        }

                        handleAddToCart({
                            id: `dubai-safari-park-${personType}`,
                            name: ticketName,
                            description: 'Acesso ao Dubai Safari Park, um extenso parque de vida selvagem com diversas zonas que abrigam animais de diferentes habitats ao redor do mundo.',
                            price: price,
                            imageUrl: "img/toursdubai/86.jpg",
                            category: "DUBAI PARKS"
                        }, quantity);
                    } else {
                        showConfirmationMessage("Selecione entre 1 e 10 ingressos.");
                    }
                };

                const quantityControlDiv = document.createElement('div');
                quantityControlDiv.className = 'flex items-center mb-2 sm:mb-0';
                quantityControlDiv.appendChild(quantityInput);
                quantityControlDiv.appendChild(addButton);

                priceAndButtonDiv.appendChild(priceSpan);
                priceAndButtonDiv.appendChild(quantityControlDiv);

                actionDiv.appendChild(selectorsDiv);
                actionDiv.appendChild(priceAndButtonDiv);

                contentDiv.appendChild(textDiv);
                contentDiv.appendChild(actionDiv);
                tourCard.appendChild(img);
                tourCard.appendChild(contentDiv);
                toursGridTarget.appendChild(tourCard);
            });
        }

        // Card dinâmico Ingresso Parque da Ferrari Abu Dhabi
        if (
            currentCountry && currentCountry.name === "Dubai e Abu Dhabi" &&
            (selectedSubcategory === 'all' || selectedSubcategory === 'ABU DHABI PARKS') &&
            dynamicCardMatches("Ingresso Parque da Ferrari Abu Dhabi", "Acesso ao Ferrari World Abu Dhabi")
        ) {
            dynamicCards.push(() => {
                const tourCard = document.createElement('div');
                tourCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col';

                const img = document.createElement('img');
                img.src = "img/toursdubai/ferrariworld.jpg";
                img.alt = "Ingresso Parque da Ferrari Abu Dhabi";
                img.className = 'w-full h-48 object-cover object-center';
                img.onerror = () => { img.src = `https://placehold.co/400x250/CCCCCC/333333?text=Ferrari+World+Abu+Dhabi`; };

                const contentDiv = document.createElement('div');
                contentDiv.className = 'p-5 sm:p-6 flex-grow flex flex-col justify-between';

                const textDiv = document.createElement('div');
                const nameH3 = document.createElement('h3');
                nameH3.className = 'text-xl sm:text-2xl font-bold text-[#0D7C6C] font-geologica-bold mb-2';
                nameH3.textContent = "Ingresso Parque da Ferrari Abu Dhabi";

                const descP = document.createElement('p');
                descP.className = 'text-gray-700 mb-4 text-sm font-geologica-light leading-relaxed';
                descP.innerHTML = `Acesso ao Ferrari World Abu Dhabi, o primeiro parque temático da Ferrari no mundo. Desfrute de montanhas-russas emocionantes, simuladores e atrações que celebram a marca italiana.<br>
                <span class="font-bold">Escolha o tipo de ingresso:</span>`;

                textDiv.appendChild(nameH3);
                textDiv.appendChild(descP);

                const actionDiv = document.createElement('div');
                actionDiv.className = 'mt-auto pt-4 border-t border-gray-100';

                // Tabela de preços do Ferrari World
                const ferrariWorldPrices = {
                    'adulto': 348.65,
                    'kids': 295.00
                };

                // Seletores
                const selectorsDiv = document.createElement('div');
                selectorsDiv.className = 'mb-4 space-y-3';

                // Seletor de tipo de pessoa
                const personTypeDiv = document.createElement('div');
                personTypeDiv.className = 'flex flex-col';
                const personTypeLabel = document.createElement('label');
                personTypeLabel.className = 'text-xs font-geologica-bold mb-1 text-gray-700';
                personTypeLabel.textContent = 'Tipo:';
                const personTypeSelect = document.createElement('select');
                personTypeSelect.className = 'border border-gray-300 rounded-md px-2 py-1 text-sm font-geologica-light';
                personTypeSelect.innerHTML = `
                    <option value="adulto">Adulto</option>
                    <option value="kids">Kids</option>
                `;
                personTypeDiv.appendChild(personTypeLabel);
                personTypeDiv.appendChild(personTypeSelect);
                selectorsDiv.appendChild(personTypeDiv);

                // Preço e botão
                const priceAndButtonDiv = document.createElement('div');
                priceAndButtonDiv.className = 'flex flex-col sm:flex-row justify-between items-center mb-3';

                const priceSpan = document.createElement('span');
                priceSpan.className = 'text-lg sm:text-xl font-extrabold text-[#0D7C6C] font-geologica-bold mb-2';

                const quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.value = 1;
                quantityInput.min = 1;
                quantityInput.max = 10;
                quantityInput.className = 'w-16 text-center border border-gray-300 rounded-md px-2 py-1 text-sm mr-2';

                function updateFerrariWorldPrice() {
                    const personType = personTypeSelect.value;
                    const price = ferrariWorldPrices[personType] || 0;
                    const quantity = parseInt(quantityInput.value, 10);
                    const totalPrice = price * quantity;
                    priceSpan.textContent = `AED ${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                }

                // Event listeners para atualizar preço
                personTypeSelect.addEventListener('change', updateFerrariWorldPrice);
                quantityInput.addEventListener('input', updateFerrariWorldPrice);
                quantityInput.addEventListener('change', updateFerrariWorldPrice);

                // Atualizar preço inicial
                updateFerrariWorldPrice();

                const addButton = document.createElement('button');
                addButton.className = 'w-full sm:w-auto bg-[#33C4B6] hover:bg-[#0D7C6D] text-white font-semibold py-2 px-4 sm:px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#33C4B6] focus:ring-opacity-50 text-sm';
                addButton.textContent = 'Adicionar';
                addButton.onclick = (e) => {
                    e.stopPropagation();
                    const quantity = parseInt(quantityInput.value, 10);
                    if (quantity > 0 && quantity <= 10) {
                        const personType = personTypeSelect.value;
                        const price = ferrariWorldPrices[personType] || 0;
                        
                        // Gerar nome do ingresso
                        let ticketName = "Ingresso Parque da Ferrari Abu Dhabi";
                        if (personType === 'adulto') {
                            ticketName += ' - Adulto';
                        } else if (personType === 'kids') {
                            ticketName += ' - Kids';
                        }

                        handleAddToCart({
                            id: `ferrari-world-${personType}`,
                            name: ticketName,
                            description: 'Acesso ao Ferrari World Abu Dhabi, o primeiro parque temático da Ferrari no mundo. Desfrute de montanhas-russas emocionantes, simuladores e atrações que celebram a marca italiana.',
                            price: price,
                            imageUrl: "img/toursdubai/95.jpg",
                            category: "ABU DHABI PARKS"
                        }, quantity);
                    } else {
                        showConfirmationMessage("Selecione entre 1 e 10 ingressos.");
                    }
                };

                const quantityControlDiv = document.createElement('div');
                quantityControlDiv.className = 'flex items-center mb-2 sm:mb-0';
                quantityControlDiv.appendChild(quantityInput);
                quantityControlDiv.appendChild(addButton);

                priceAndButtonDiv.appendChild(priceSpan);
                priceAndButtonDiv.appendChild(quantityControlDiv);

                actionDiv.appendChild(selectorsDiv);
                actionDiv.appendChild(priceAndButtonDiv);

                contentDiv.appendChild(textDiv);
                contentDiv.appendChild(actionDiv);
                tourCard.appendChild(img);
                tourCard.appendChild(contentDiv);
                toursGridTarget.appendChild(tourCard);
            });
        }

        // Card dinâmico Ingresso Parque Warner Bros Abu Dhabi
        if (
            currentCountry && currentCountry.name === "Dubai e Abu Dhabi" &&
            (selectedSubcategory === 'all' || selectedSubcategory === 'ABU DHABI PARKS') &&
            dynamicCardMatches("Ingresso Parque Warner Bros", "Acesso ao Warner Bros. World Abu Dhabi")
        ) {
            dynamicCards.push(() => {
                const tourCard = document.createElement('div');
                tourCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col';

                const img = document.createElement('img');
                img.src = "img/toursdubai/warnerbrosworld.jpg";
                img.alt = "Ingresso Parque Warner Bros Abu Dhabi";
                img.className = 'w-full h-48 object-cover object-center';
                img.onerror = () => { img.src = `https://placehold.co/400x250/CCCCCC/333333?text=Warner+Bros+World`; };

                const contentDiv = document.createElement('div');
                contentDiv.className = 'p-5 sm:p-6 flex-grow flex flex-col justify-between';

                const textDiv = document.createElement('div');
                const nameH3 = document.createElement('h3');
                nameH3.className = 'text-xl sm:text-2xl font-bold text-[#0D7C6C] font-geologica-bold mb-2';
                nameH3.textContent = "Ingresso Parque Warner Bros Abu Dhabi";

                const descP = document.createElement('p');
                descP.className = 'text-gray-700 mb-4 text-sm font-geologica-light leading-relaxed';
                descP.innerHTML = `Acesso ao Warner Bros. World Abu Dhabi, um parque temático indoor com zonas imersivas baseadas em personagens da Warner Bros., como Batman, Superman, Looney Tunes e Flintstones.<br>
                <span class="font-bold">Escolha o tipo de ingresso:</span>`;

                textDiv.appendChild(nameH3);
                textDiv.appendChild(descP);

                const actionDiv = document.createElement('div');
                actionDiv.className = 'mt-auto pt-4 border-t border-gray-100';

                // Tabela de preços do Warner Bros World
                const warnerBrosPrices = {
                    'adulto': 381.68,
                    'kids': 295.00
                };

                // Seletores
                const selectorsDiv = document.createElement('div');
                selectorsDiv.className = 'mb-4 space-y-3';

                // Seletor de tipo de pessoa
                const personTypeDiv = document.createElement('div');
                personTypeDiv.className = 'flex flex-col';
                const personTypeLabel = document.createElement('label');
                personTypeLabel.className = 'text-xs font-geologica-bold mb-1 text-gray-700';
                personTypeLabel.textContent = 'Tipo:';
                const personTypeSelect = document.createElement('select');
                personTypeSelect.className = 'border border-gray-300 rounded-md px-2 py-1 text-sm font-geologica-light';
                personTypeSelect.innerHTML = `
                    <option value="adulto">Adulto</option>
                    <option value="kids">Kids (Menor de 1.10m)</option>
                `;
                personTypeDiv.appendChild(personTypeLabel);
                personTypeDiv.appendChild(personTypeSelect);
                selectorsDiv.appendChild(personTypeDiv);

                // Preço e botão
                const priceAndButtonDiv = document.createElement('div');
                priceAndButtonDiv.className = 'flex flex-col sm:flex-row justify-between items-center mb-3';

                const priceSpan = document.createElement('span');
                priceSpan.className = 'text-lg sm:text-xl font-extrabold text-[#0D7C6C] font-geologica-bold mb-2';

                const quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.value = 1;
                quantityInput.min = 1;
                quantityInput.max = 10;
                quantityInput.className = 'w-16 text-center border border-gray-300 rounded-md px-2 py-1 text-sm mr-2';

                function updateWarnerBrosPrice() {
                    const personType = personTypeSelect.value;
                    const price = warnerBrosPrices[personType] || 0;
                    const quantity = parseInt(quantityInput.value, 10);
                    const totalPrice = price * quantity;
                    priceSpan.textContent = `AED ${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                }

                // Event listeners para atualizar preço
                personTypeSelect.addEventListener('change', updateWarnerBrosPrice);
                quantityInput.addEventListener('input', updateWarnerBrosPrice);
                quantityInput.addEventListener('change', updateWarnerBrosPrice);

                // Atualizar preço inicial
                updateWarnerBrosPrice();

                const addButton = document.createElement('button');
                addButton.className = 'w-full sm:w-auto bg-[#33C4B6] hover:bg-[#0D7C6D] text-white font-semibold py-2 px-4 sm:px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#33C4B6] focus:ring-opacity-50 text-sm';
                addButton.textContent = 'Adicionar';
                addButton.onclick = (e) => {
                    e.stopPropagation();
                    const quantity = parseInt(quantityInput.value, 10);
                    if (quantity > 0 && quantity <= 10) {
                        const personType = personTypeSelect.value;
                        const price = warnerBrosPrices[personType] || 0;
                        
                        // Gerar nome do ingresso
                        let ticketName = "Ingresso Parque Warner Bros Abu Dhabi";
                        if (personType === 'adulto') {
                            ticketName += ' - Adulto';
                        } else if (personType === 'kids') {
                            ticketName += ' - Kids (Menor de 1.10m)';
                        }

                        handleAddToCart({
                            id: `warner-bros-world-${personType}`,
                            name: ticketName,
                            description: 'Acesso ao Warner Bros. World Abu Dhabi, um parque temático indoor com zonas imersivas baseadas em personagens da Warner Bros., como Batman, Superman, Looney Tunes e Flintstones.',
                            price: price,
                            imageUrl: "img/toursdubai/warnerbrosworld.jpg",
                            category: "ABU DHABI PARKS"
                        }, quantity);
                    } else {
                        showConfirmationMessage("Selecione entre 1 e 10 ingressos.");
                    }
                };

                const quantityControlDiv = document.createElement('div');
                quantityControlDiv.className = 'flex items-center mb-2 sm:mb-0';
                quantityControlDiv.appendChild(quantityInput);
                quantityControlDiv.appendChild(addButton);

                priceAndButtonDiv.appendChild(priceSpan);
                priceAndButtonDiv.appendChild(quantityControlDiv);

                actionDiv.appendChild(selectorsDiv);
                actionDiv.appendChild(priceAndButtonDiv);

                contentDiv.appendChild(textDiv);
                contentDiv.appendChild(actionDiv);
                tourCard.appendChild(img);
                tourCard.appendChild(contentDiv);
                toursGridTarget.appendChild(tourCard);
            });
        }

        // Card dinâmico Ingresso Sea World Abu Dhabi
        if (
            currentCountry && currentCountry.name === "Dubai e Abu Dhabi" &&
            (selectedSubcategory === 'all' || selectedSubcategory === 'ABU DHABI PARKS') &&
            dynamicCardMatches("Ingresso Sea World Abu Dhabi", "Acesso ao SeaWorld Yas Island")
        ) {
            dynamicCards.push(() => {
                const tourCard = document.createElement('div');
                tourCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col';

                const img = document.createElement('img');
                img.src = "img/toursdubai/seaworldabudhabi.jpg";
                img.alt = "Ingresso Sea World Abu Dhabi";
                img.className = 'w-full h-48 object-cover object-center';
                img.onerror = () => { img.src = `https://placehold.co/400x250/CCCCCC/333333?text=Sea+World+Abu+Dhabi`; };

                const contentDiv = document.createElement('div');
                contentDiv.className = 'p-5 sm:p-6 flex-grow flex flex-col justify-between';

                const textDiv = document.createElement('div');
                const nameH3 = document.createElement('h3');
                nameH3.className = 'text-xl sm:text-2xl font-bold text-[#0D7C6C] font-geologica-bold mb-2';
                nameH3.textContent = "Ingresso Sea World Abu Dhabi";

                const descP = document.createElement('p');
                descP.className = 'text-gray-700 mb-4 text-sm font-geologica-light leading-relaxed';
                descP.innerHTML = `Acesso ao SeaWorld Yas Island, Abu Dhabi, um parque temático marinho que oferece experiências imersivas com animais marinhos, shows e atrações educativas.<br>
                <span class="font-bold">Escolha o tipo de ingresso:</span>`;

                textDiv.appendChild(nameH3);
                textDiv.appendChild(descP);

                const actionDiv = document.createElement('div');
                actionDiv.className = 'mt-auto pt-4 border-t border-gray-100';

                // Tabela de preços do Sea World
                const seaWorldPrices = {
                    'adulto': 381.68,
                    'kids': 320.00
                };

                // Seletores
                const selectorsDiv = document.createElement('div');
                selectorsDiv.className = 'mb-4 space-y-3';

                // Seletor de tipo de pessoa
                const personTypeDiv = document.createElement('div');
                personTypeDiv.className = 'flex flex-col';
                const personTypeLabel = document.createElement('label');
                personTypeLabel.className = 'text-xs font-geologica-bold mb-1 text-gray-700';
                personTypeLabel.textContent = 'Tipo:';
                const personTypeSelect = document.createElement('select');
                personTypeSelect.className = 'border border-gray-300 rounded-md px-2 py-1 text-sm font-geologica-light';
                personTypeSelect.innerHTML = `
                    <option value="adulto">Adulto</option>
                    <option value="kids">Kids</option>
                `;
                personTypeDiv.appendChild(personTypeLabel);
                personTypeDiv.appendChild(personTypeSelect);
                selectorsDiv.appendChild(personTypeDiv);

                // Preço e botão
                const priceAndButtonDiv = document.createElement('div');
                priceAndButtonDiv.className = 'flex flex-col sm:flex-row justify-between items-center mb-3';

                const priceSpan = document.createElement('span');
                priceSpan.className = 'text-lg sm:text-xl font-extrabold text-[#0D7C6C] font-geologica-bold mb-2';

                const quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.value = 1;
                quantityInput.min = 1;
                quantityInput.max = 10;
                quantityInput.className = 'w-16 text-center border border-gray-300 rounded-md px-2 py-1 text-sm mr-2';

                function updateSeaWorldPrice() {
                    const personType = personTypeSelect.value;
                    const price = seaWorldPrices[personType] || 0;
                    const quantity = parseInt(quantityInput.value, 10);
                    const totalPrice = price * quantity;
                    priceSpan.textContent = `AED ${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                }

                // Event listeners para atualizar preço
                personTypeSelect.addEventListener('change', updateSeaWorldPrice);
                quantityInput.addEventListener('input', updateSeaWorldPrice);
                quantityInput.addEventListener('change', updateSeaWorldPrice);

                // Atualizar preço inicial
                updateSeaWorldPrice();

                const addButton = document.createElement('button');
                addButton.className = 'w-full sm:w-auto bg-[#33C4B6] hover:bg-[#0D7C6D] text-white font-semibold py-2 px-4 sm:px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#33C4B6] focus:ring-opacity-50 text-sm';
                addButton.textContent = 'Adicionar';
                addButton.onclick = (e) => {
                    e.stopPropagation();
                    const quantity = parseInt(quantityInput.value, 10);
                    if (quantity > 0 && quantity <= 10) {
                        const personType = personTypeSelect.value;
                        const price = seaWorldPrices[personType] || 0;
                        
                        // Gerar nome do ingresso
                        let ticketName = "Ingresso Sea World Abu Dhabi";
                        if (personType === 'adulto') {
                            ticketName += ' - Adulto';
                        } else if (personType === 'kids') {
                            ticketName += ' - Kids';
                        }

                        handleAddToCart({
                            id: `sea-world-abu-dhabi-${personType}`,
                            name: ticketName,
                            description: 'Acesso ao SeaWorld Yas Island, Abu Dhabi, um parque temático marinho que oferece experiências imersivas com animais marinhos, shows e atrações educativas.',
                            price: price,
                            imageUrl: "img/toursdubai/seaworldabudhabi.jpg",
                            category: "ABU DHABI PARKS"
                        }, quantity);
                    } else {
                        showConfirmationMessage("Selecione entre 1 e 10 ingressos.");
                    }
                };

                const quantityControlDiv = document.createElement('div');
                quantityControlDiv.className = 'flex items-center mb-2 sm:mb-0';
                quantityControlDiv.appendChild(quantityInput);
                quantityControlDiv.appendChild(addButton);

                priceAndButtonDiv.appendChild(priceSpan);
                priceAndButtonDiv.appendChild(quantityControlDiv);

                actionDiv.appendChild(selectorsDiv);
                actionDiv.appendChild(priceAndButtonDiv);

                contentDiv.appendChild(textDiv);
                contentDiv.appendChild(actionDiv);
                tourCard.appendChild(img);
                tourCard.appendChild(contentDiv);
                toursGridTarget.appendChild(tourCard);
            });
        }

        // Card dinâmico Ingresso Experiência Dubai Safari Park Zoo
        if (
            currentCountry && currentCountry.name === "Dubai e Abu Dhabi" &&
            (selectedSubcategory === 'all' || selectedSubcategory === 'DUBAI PARKS') &&
            dynamicCardMatches("Ingresso Experiência Dubai Safari Park Zoo", "Acesso completo ao Dubai Safari Park")
        ) {
            dynamicCards.push(() => {
                const tourCard = document.createElement('div');
                tourCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col';

                const img = document.createElement('img');
                img.src = "img/toursdubai/experienciadubaisafaripark.jpg";
                img.alt = "Ingresso Experiência Dubai Safari Park Zoo";
                img.className = 'w-full h-48 object-cover object-center';
                img.onerror = () => { img.src = `https://placehold.co/400x250/CCCCCC/333333?text=Experiencia+Dubai+Safari+Park`; };

                const contentDiv = document.createElement('div');
                contentDiv.className = 'p-5 sm:p-6 flex-grow flex flex-col justify-between';

                const textDiv = document.createElement('div');
                const nameH3 = document.createElement('h3');
                nameH3.className = 'text-xl sm:text-2xl font-bold text-[#0D7C6C] font-geologica-bold mb-2';
                nameH3.textContent = "Ingresso Experiência Dubai Safari Park Zoo";

                const descP = document.createElement('p');
                descP.className = 'text-gray-700 mb-4 text-sm font-geologica-light leading-relaxed';
                descP.innerHTML = `Acesso completo ao Dubai Safari Park, incluindo o Safari Journey (passeio de ônibus pelas áreas de safari) e acesso a todas as vilas e shows.<br>
                <span class="font-bold">Escolha o tipo de ingresso:</span>`;

                textDiv.appendChild(nameH3);
                textDiv.appendChild(descP);

                const actionDiv = document.createElement('div');
                actionDiv.className = 'mt-auto pt-4 border-t border-gray-100';

                // Tabela de preços da Experiência Dubai Safari Park
                const experienciaSafariParkPrices = {
                    'adulto': 130.00,
                    'kids': 100.00
                };

                // Seletores
                const selectorsDiv = document.createElement('div');
                selectorsDiv.className = 'mb-4 space-y-3';

                // Seletor de tipo de pessoa
                const personTypeDiv = document.createElement('div');
                personTypeDiv.className = 'flex flex-col';
                const personTypeLabel = document.createElement('label');
                personTypeLabel.className = 'text-xs font-geologica-bold mb-1 text-gray-700';
                personTypeLabel.textContent = 'Tipo:';
                const personTypeSelect = document.createElement('select');
                personTypeSelect.className = 'border border-gray-300 rounded-md px-2 py-1 text-sm font-geologica-light';
                personTypeSelect.innerHTML = `
                    <option value="adulto">Adulto</option>
                    <option value="kids">Kids</option>
                `;
                personTypeDiv.appendChild(personTypeLabel);
                personTypeDiv.appendChild(personTypeSelect);
                selectorsDiv.appendChild(personTypeDiv);

                // Preço e botão
                const priceAndButtonDiv = document.createElement('div');
                priceAndButtonDiv.className = 'flex flex-col sm:flex-row justify-between items-center mb-3';

                const priceSpan = document.createElement('span');
                priceSpan.className = 'text-lg sm:text-xl font-extrabold text-[#0D7C6C] font-geologica-bold mb-2';

                const quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.value = 1;
                quantityInput.min = 1;
                quantityInput.max = 10;
                quantityInput.className = 'w-16 text-center border border-gray-300 rounded-md px-2 py-1 text-sm mr-2';

                function updateExperienciaSafariParkPrice() {
                    const personType = personTypeSelect.value;
                    const price = experienciaSafariParkPrices[personType] || 0;
                    const quantity = parseInt(quantityInput.value, 10);
                    const totalPrice = price * quantity;
                    priceSpan.textContent = `AED ${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                }

                // Event listeners para atualizar preço
                personTypeSelect.addEventListener('change', updateExperienciaSafariParkPrice);
                quantityInput.addEventListener('input', updateExperienciaSafariParkPrice);
                quantityInput.addEventListener('change', updateExperienciaSafariParkPrice);

                // Atualizar preço inicial
                updateExperienciaSafariParkPrice();

                const addButton = document.createElement('button');
                addButton.className = 'w-full sm:w-auto bg-[#33C4B6] hover:bg-[#0D7C6D] text-white font-semibold py-2 px-4 sm:px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#33C4B6] focus:ring-opacity-50 text-sm';
                addButton.textContent = 'Adicionar';
                addButton.onclick = (e) => {
                    e.stopPropagation();
                    const quantity = parseInt(quantityInput.value, 10);
                    if (quantity > 0 && quantity <= 10) {
                        const personType = personTypeSelect.value;
                        const price = experienciaSafariParkPrices[personType] || 0;
                        
                        // Gerar nome do ingresso
                        let ticketName = "Ingresso Experiência Dubai Safari Park Zoo";
                        if (personType === 'adulto') {
                            ticketName += ' - Adulto';
                        } else if (personType === 'kids') {
                            ticketName += ' - Kids';
                        }

                        handleAddToCart({
                            id: `experiencia-dubai-safari-park-${personType}`,
                            name: ticketName,
                            description: 'Acesso completo ao Dubai Safari Park, incluindo o Safari Journey (passeio de ônibus pelas áreas de safari) e acesso a todas as vilas e shows.',
                            price: price,
                            imageUrl: "img/toursdubai/experienciadubaisafaripark.jpg",
                            category: "DUBAI PARKS"
                        }, quantity);
                    } else {
                        showConfirmationMessage("Selecione entre 1 e 10 ingressos.");
                    }
                };

                const quantityControlDiv = document.createElement('div');
                quantityControlDiv.className = 'flex items-center mb-2 sm:mb-0';
                quantityControlDiv.appendChild(quantityInput);
                quantityControlDiv.appendChild(addButton);

                priceAndButtonDiv.appendChild(priceSpan);
                priceAndButtonDiv.appendChild(quantityControlDiv);

                actionDiv.appendChild(selectorsDiv);
                actionDiv.appendChild(priceAndButtonDiv);

                contentDiv.appendChild(textDiv);
                contentDiv.appendChild(actionDiv);
                tourCard.appendChild(img);
                tourCard.appendChild(contentDiv);
                toursGridTarget.appendChild(tourCard);
            });
        }

        // Card dinâmico Traslado Dubai - Abu Dhabi
        if (
            currentCountry && currentCountry.name === "Dubai e Abu Dhabi" &&
            (selectedSubcategory === 'all' || selectedSubcategory === 'TRASLADO') &&
            dynamicCardMatches("Traslado Dubai - Abu Dhabi", "Traslado de Dubai para Abu Dhabi")
        ) {
            dynamicCards.push(() => {
                const tourCard = document.createElement('div');
                tourCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col';

                const img = document.createElement('img');
                img.src = "img/toursdubai/27.jpg";
                img.alt = "Traslado Dubai - Abu Dhabi";
                img.className = 'w-full h-48 object-cover object-center';
                img.onerror = () => { img.src = `https://placehold.co/400x250/CCCCCC/333333?text=Traslado+Dubai+Abu+Dhabi`; };

                const contentDiv = document.createElement('div');
                contentDiv.className = 'p-5 sm:p-6 flex-grow flex flex-col justify-between';

                const textDiv = document.createElement('div');
                const nameH3 = document.createElement('h3');
                nameH3.className = 'text-xl sm:text-2xl font-bold text-[#0D7C6C] font-geologica-bold mb-2';
                nameH3.textContent = "Traslado Dubai - Abu Dhabi";

                const descP = document.createElement('p');
                descP.className = 'text-gray-700 mb-4 text-sm font-geologica-light leading-relaxed';
                descP.innerHTML = `Traslado de Dubai para Abu Dhabi (1 trecho). Incluso: veículo adequado ao grupo e motorista no idioma inglês.<br>
                <span class="font-bold">Escolha o número de pessoas:</span>`;

                textDiv.appendChild(nameH3);
                textDiv.appendChild(descP);

                const actionDiv = document.createElement('div');
                actionDiv.className = 'mt-auto pt-4 border-t border-gray-100';

                // Tabela de preços do Traslado Dubai - Abu Dhabi
                const trasladoDubaiAbuDhabiPrices = {
                    '2pessoas': 650.00,
                    '3a7pessoas': 750.00,
                    '8a14pessoas': 1500.00
                };

                // Seletores
                const selectorsDiv = document.createElement('div');
                selectorsDiv.className = 'mb-4 space-y-3';

                // Seletor de número de pessoas
                const peopleDiv = document.createElement('div');
                peopleDiv.className = 'flex flex-col';
                const peopleLabel = document.createElement('label');
                peopleLabel.className = 'text-xs font-geologica-bold mb-1 text-gray-700';
                peopleLabel.textContent = 'Pessoas:';
                const peopleSelect = document.createElement('select');
                peopleSelect.className = 'border border-gray-300 rounded-md px-2 py-1 text-sm font-geologica-light';
                peopleSelect.innerHTML = `
                    <option value="2pessoas">Até 2 pessoas</option>
                    <option value="3a7pessoas">3 a 7 pessoas</option>
                    <option value="8a14pessoas">8 a 14 pessoas</option>
                `;
                peopleDiv.appendChild(peopleLabel);
                peopleDiv.appendChild(peopleSelect);
                selectorsDiv.appendChild(peopleDiv);

                // Preço e botão
                const priceAndButtonDiv = document.createElement('div');
                priceAndButtonDiv.className = 'flex flex-col sm:flex-row justify-between items-center mb-3';

                const priceSpan = document.createElement('span');
                priceSpan.className = 'text-lg sm:text-xl font-extrabold text-[#0D7C6C] font-geologica-bold mb-2';

                function updateTrasladoDubaiAbuDhabiPrice() {
                    const peopleType = peopleSelect.value;
                    const price = trasladoDubaiAbuDhabiPrices[peopleType] || 0;
                    priceSpan.textContent = `AED ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                }

                // Event listeners para atualizar preço
                peopleSelect.addEventListener('change', updateTrasladoDubaiAbuDhabiPrice);

                // Atualizar preço inicial
                updateTrasladoDubaiAbuDhabiPrice();

                const addButton = document.createElement('button');
                addButton.className = 'w-full sm:w-auto bg-[#33C4B6] hover:bg-[#0D7C6D] text-white font-semibold py-2 px-4 sm:px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#33C4B6] focus:ring-opacity-50 text-sm';
                addButton.textContent = 'Adicionar';
                addButton.onclick = (e) => {
                    e.stopPropagation();
                    const peopleType = peopleSelect.value;
                    const price = trasladoDubaiAbuDhabiPrices[peopleType] || 0;
                    
                    // Gerar nome do traslado
                    let trasladoName = "Traslado Dubai - Abu Dhabi";
                    let peopleText = "";
                    if (peopleType === '2pessoas') peopleText = "Até 2 pessoas";
                    else if (peopleType === '3a7pessoas') peopleText = "3 a 7 pessoas";
                    else if (peopleType === '8a14pessoas') peopleText = "8 a 14 pessoas";
                    trasladoName += ` - ${peopleText}`;

                    handleAddToCart({
                        id: `traslado-dubai-abudhabi-${peopleType}`,
                        name: trasladoName,
                        description: 'Traslado de Dubai para Abu Dhabi (1 trecho). Incluso: veículo adequado ao grupo e motorista no idioma inglês.',
                        price: price,
                        imageUrl: "img/toursdubai/27.jpg",
                        category: "TRASLADO"
                    }, 1);
                };

                priceAndButtonDiv.appendChild(priceSpan);
                priceAndButtonDiv.appendChild(addButton);

                actionDiv.appendChild(selectorsDiv);
                actionDiv.appendChild(priceAndButtonDiv);

                contentDiv.appendChild(textDiv);
                contentDiv.appendChild(actionDiv);
                tourCard.appendChild(img);
                tourCard.appendChild(contentDiv);
                toursGridTarget.appendChild(tourCard);
            });
        }

        // Card dinâmico Safari no Deserto Premium - Unificado (Compartilhado e Privativo)
        if (
            currentCountry && currentCountry.name === "Dubai e Abu Dhabi" &&
            (selectedSubcategory === 'all' || selectedSubcategory === 'DESERTO') &&
            (dynamicCardMatches("Safari no Deserto Premium", "Transfer compartilhado em carro 4X4") || 
             dynamicCardMatches("Safari no Deserto Premium", "Transfer privativo em carro 4X4"))
        ) {
            dynamicCards.push(() => {
                const tourCard = document.createElement('div');
                tourCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col';

                const img = document.createElement('img');
                img.src = "img/toursdubai/safaricompartilhadopremium.jpg";
                img.alt = "Safari no Deserto Premium";
                img.className = 'w-full h-48 object-cover object-center';
                img.onerror = () => { img.src = `https://placehold.co/400x250/CCCCCC/333333?text=Safari+Premium`; };

                const contentDiv = document.createElement('div');
                contentDiv.className = 'p-5 sm:p-6 flex-grow flex flex-col justify-between';

                const textDiv = document.createElement('div');
                const nameH3 = document.createElement('h3');
                nameH3.className = 'text-xl sm:text-2xl font-bold text-[#0D7C6C] font-geologica-bold mb-2';
                nameH3.innerHTML = "Safari no Deserto Premium <span class='text-yellow-500'>⭐⭐⭐</span>";

                const descP = document.createElement('p');
                descP.className = 'text-gray-700 mb-4 text-sm font-geologica-light leading-relaxed';
                descP.innerHTML = `Incluso: Rally nas dunas vermelhas, sandboard e parada para fotos, Falcão, Passeio simples de Camelo, Mesa área premium (3ª fileira), Jantar tipo Buffet, Danças e Show, bebidas não alcoólicas.<br>
                <span class="font-bold">Escolha o tipo de transporte:</span>`;

                textDiv.appendChild(nameH3);
                textDiv.appendChild(descP);

                const actionDiv = document.createElement('div');
                actionDiv.className = 'mt-auto pt-4 border-t border-gray-100';

                const selectorsDiv = document.createElement('div');
                selectorsDiv.className = 'mb-4 space-y-3';

                // Seletor de tipo de transporte
                const transportTypeDiv = document.createElement('div');
                transportTypeDiv.className = 'flex flex-col';
                const transportTypeLabel = document.createElement('label');
                transportTypeLabel.className = 'text-xs font-geologica-bold mb-1 text-gray-700';
                transportTypeLabel.textContent = 'Tipo de Transporte:';
                const transportTypeSelect = document.createElement('select');
                transportTypeSelect.className = 'border border-gray-300 rounded-md px-2 py-1 text-sm font-geologica-light';
                transportTypeSelect.innerHTML = `
                    <option value="compartilhado">Compartilhado - Valor por pessoa</option>
                    <option value="privativo">Privativo - Valor total para até 6 pessoas</option>
                `;
                transportTypeDiv.appendChild(transportTypeLabel);
                transportTypeDiv.appendChild(transportTypeSelect);
                selectorsDiv.appendChild(transportTypeDiv);

                // Seletor de quantidade para compartilhado
                const quantityDiv = document.createElement('div');
                quantityDiv.className = 'flex flex-col';
                quantityDiv.style.display = 'none'; // Inicialmente oculto
                const quantityLabel = document.createElement('label');
                quantityLabel.className = 'text-xs font-geologica-bold mb-1 text-gray-700';
                quantityLabel.textContent = 'Quantidade de Pessoas:';
                const quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.value = 1;
                quantityInput.min = 1;
                quantityInput.max = 10;
                quantityInput.className = 'border border-gray-300 rounded-md px-2 py-1 text-sm font-geologica-light';
                quantityDiv.appendChild(quantityLabel);
                quantityDiv.appendChild(quantityInput);
                selectorsDiv.appendChild(quantityDiv);

                const priceAndButtonDiv = document.createElement('div');
                priceAndButtonDiv.className = 'flex flex-col sm:flex-row justify-between items-center mb-3';

                const priceSpan = document.createElement('span');
                priceSpan.className = 'text-lg sm:text-xl font-extrabold text-[#0D7C6C] font-geologica-bold mb-2';

                // Opções e preços
                const premiumPrices = {
                    'compartilhado': 500.00, // Valor por pessoa
                    'privativo': 2383.00 // Valor total para até 6 pessoas
                };

                function updatePremiumPrice() {
                    const transportType = transportTypeSelect.value;
                    
                    if (transportType === 'compartilhado') {
                        const quantity = parseInt(quantityInput.value, 10) || 1;
                        const pricePerPerson = premiumPrices.compartilhado;
                        const totalPrice = pricePerPerson * quantity;
                        priceSpan.textContent = `AED ${pricePerPerson.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} por pessoa (Total: AED ${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})`;
                    } else {
                        const totalPrice = premiumPrices.privativo;
                        priceSpan.textContent = `AED ${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (valor total para até 6 pessoas)`;
                    }
                }

                function updateSelectorsVisibility() {
                    const transportType = transportTypeSelect.value;
                    
                    if (transportType === 'compartilhado') {
                        quantityDiv.style.display = 'flex';
                    } else {
                        quantityDiv.style.display = 'none';
                    }
                    updatePremiumPrice();
                }

                // Event listeners
                transportTypeSelect.addEventListener('change', updateSelectorsVisibility);
                quantityInput.addEventListener('input', updatePremiumPrice);

                // Inicializar
                updateSelectorsVisibility();

                const addButton = document.createElement('button');
                addButton.className = 'w-full sm:w-auto bg-[#33C4B6] hover:bg-[#0D7C6D] text-white font-semibold py-2 px-4 sm:px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#33C4B6] focus:ring-opacity-50 text-sm';
                addButton.textContent = 'Adicionar';

                addButton.onclick = (e) => {
                    e.stopPropagation();
                    const transportType = transportTypeSelect.value;
                    
                    if (transportType === 'compartilhado') {
                        const quantity = parseInt(quantityInput.value, 10) || 1;
                        const price = premiumPrices.compartilhado;
                        const name = `Safari no Deserto Premium - Transporte Compartilhado`;
                        
                        handleAddToCart({
                            id: `safari-premium-compartilhado`,
                            name: name,
                            description: 'Incluso: Transfer compartilhado em carro 4X4 (6 assentos) ida e volta do Hotel, Rally nas dunas vermelhas, sandboard e parada para fotos, Falcão, Passeio simples de Camelo, Mesa área premium (3ª fileira), Jantar tipo Buffet, Danças e Show, bebidas não alcoólicas. Não incluso: bebidas alcoólicas e narguilé - disponíveis no local para pagamento à parte.',
                            price: price,
                            imageUrl: "img/toursdubai/safaricompartilhadopremium.jpg",
                            category: "DESERTO"
                        }, quantity);
                    } else {
                        const price = premiumPrices.privativo;
                        const name = `Safari no Deserto Premium - Transporte Privativo - Valor total para até 6 pessoas`;
                        
                        handleAddToCart({
                            id: `safari-premium-privativo`,
                            name: name,
                            description: 'Incluso: Transfer privativo em carro 4X4 (6 assentos) ida e volta do Hotel, Rally nas dunas vermelhas, sandboard e parada para fotos, Falcão, Passeio simples de Camelo, Mesa área premium (3ª fileira), Jantar tipo Buffet, Danças e Show, bebidas não alcoólicas. Não incluso: bebidas alcoólicas e narguilé - disponíveis no local para pagamento à parte.',
                            price: price,
                            imageUrl: "img/toursdubai/safariprivativopremium.jpg",
                            category: "DESERTO"
                        }, 1);
                    }
                };

                priceAndButtonDiv.appendChild(priceSpan);
                priceAndButtonDiv.appendChild(addButton);

                actionDiv.appendChild(selectorsDiv);
                actionDiv.appendChild(priceAndButtonDiv);

                contentDiv.appendChild(textDiv);
                contentDiv.appendChild(actionDiv);
                tourCard.appendChild(img);
                tourCard.appendChild(contentDiv);
                toursGridTarget.appendChild(tourCard);
            });
        }

        // Card dinâmico Safari no Deserto Gold - Unificado (Privativo e Compartilhado)
        if (
            currentCountry && currentCountry.name === "Dubai e Abu Dhabi" &&
            (selectedSubcategory === 'all' || selectedSubcategory === 'DESERTO') &&
            (dynamicCardMatches("Safari no Deserto Gold", "Transfer privativo em carro 4X4") || 
             dynamicCardMatches("Safari no Deserto Gold", "Transfer compartilhado em carro 4X4"))
        ) {
            dynamicCards.push(() => {
                const tourCard = document.createElement('div');
                tourCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col';

                const img = document.createElement('img');
                img.src = "img/toursdubai/safarigold.jpg";
                img.alt = "Safari no Deserto Gold";
                img.className = 'w-full h-48 object-cover object-center';
                img.onerror = () => { img.src = `https://placehold.co/400x250/CCCCCC/333333?text=Safari+Gold`; };

                const contentDiv = document.createElement('div');
                contentDiv.className = 'p-5 sm:p-6 flex-grow flex flex-col justify-between';

                const textDiv = document.createElement('div');
                const nameH3 = document.createElement('h3');
                nameH3.className = 'text-xl sm:text-2xl font-bold text-[#0D7C6C] font-geologica-bold mb-2';
                nameH3.innerHTML = "Safari no Deserto Gold <span class='text-yellow-500'>⭐⭐⭐⭐</span>";

                const descP = document.createElement('p');
                descP.className = 'text-gray-700 mb-4 text-sm font-geologica-light leading-relaxed';
                descP.innerHTML = `Incluso: Transfer em carro 4X4 (6 assentos) ida e volta do Hotel, Rally nas dunas vermelhas, sandboard e parada para fotos, Falcão, Passeio simples de Camelo, Mesa área Gold (2ª fileira), Menu especial do Chef 5★, servido à francesa, Danças e Show, bebidas não alcoólicas.<br>
                <span class="font-bold">Escolha o tipo de transporte e número de pessoas:</span>`;

                textDiv.appendChild(nameH3);
                textDiv.appendChild(descP);

                const actionDiv = document.createElement('div');
                actionDiv.className = 'mt-auto pt-4 border-t border-gray-100';

                const priceAndButtonDiv = document.createElement('div');
                priceAndButtonDiv.className = 'flex flex-col sm:flex-row justify-between items-center mb-3';

                const priceSpan = document.createElement('span');
                priceSpan.className = 'text-lg sm:text-xl font-extrabold text-[#0D7C6C] font-geologica-bold mb-2';

                // Opções e preços
                const goldPrices = {
                    'compartilhado': 740.00, // Valor por pessoa
                    'privativo': {
                        '2pessoas': 1300, // Valor total
                        '3pessoas': 1000, // Valor total
                        '4pessoas': 850,  // Valor total
                        '5pessoas': 850   // Valor total
                    }
                };

                const selectorsDiv = document.createElement('div');
                selectorsDiv.className = 'mb-4 space-y-3';

                // Seletor de tipo de transporte
                const transportTypeDiv = document.createElement('div');
                transportTypeDiv.className = 'flex flex-col';
                const transportTypeLabel = document.createElement('label');
                transportTypeLabel.className = 'text-xs font-geologica-bold mb-1 text-gray-700';
                transportTypeLabel.textContent = 'Tipo de Transporte:';
                const transportTypeSelect = document.createElement('select');
                transportTypeSelect.className = 'border border-gray-300 rounded-md px-2 py-1 text-sm font-geologica-light';
                transportTypeSelect.innerHTML = `
                    <option value="compartilhado">Compartilhado - Valor por pessoa</option>
                    <option value="privativo">Privativo - Valor por pessoa</option>
                `;
                transportTypeDiv.appendChild(transportTypeLabel);
                transportTypeDiv.appendChild(transportTypeSelect);
                selectorsDiv.appendChild(transportTypeDiv);

                // Seletor de número de pessoas (aparece apenas para privativo)
                const peopleDiv = document.createElement('div');
                peopleDiv.className = 'flex flex-col';
                peopleDiv.style.display = 'none'; // Inicialmente oculto
                const peopleLabel = document.createElement('label');
                peopleLabel.className = 'text-xs font-geologica-bold mb-1 text-gray-700';
                peopleLabel.textContent = 'Número de Pessoas:';
                const peopleSelect = document.createElement('select');
                peopleSelect.className = 'border border-gray-300 rounded-md px-2 py-1 text-sm font-geologica-light';
                peopleSelect.innerHTML = `
                    <option value="2pessoas">2 pessoas</option>
                    <option value="3pessoas">3 pessoas</option>
                    <option value="4pessoas">4 pessoas</option>
                    <option value="5pessoas">5 pessoas</option>
                `;
                peopleDiv.appendChild(peopleLabel);
                peopleDiv.appendChild(peopleSelect);
                selectorsDiv.appendChild(peopleDiv);

                // Seletor de quantidade para compartilhado
                const quantityDiv = document.createElement('div');
                quantityDiv.className = 'flex flex-col';
                quantityDiv.style.display = 'none'; // Inicialmente oculto
                const quantityLabel = document.createElement('label');
                quantityLabel.className = 'text-xs font-geologica-bold mb-1 text-gray-700';
                quantityLabel.textContent = 'Quantidade de Pessoas:';
                const quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.value = 1;
                quantityInput.min = 1;
                quantityInput.max = 10;
                quantityInput.className = 'border border-gray-300 rounded-md px-2 py-1 text-sm font-geologica-light';
                quantityDiv.appendChild(quantityLabel);
                quantityDiv.appendChild(quantityInput);
                selectorsDiv.appendChild(quantityDiv);

                function updateGoldPrice() {
                    const transportType = transportTypeSelect.value;
                    
                    if (transportType === 'compartilhado') {
                        const quantity = parseInt(quantityInput.value, 10) || 1;
                        const pricePerPerson = goldPrices.compartilhado;
                        const totalPrice = pricePerPerson * quantity;
                        priceSpan.textContent = `AED ${pricePerPerson.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} por pessoa (Total: AED ${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})`;
                    } else {
                        const key = peopleSelect.value;
                        const totalPrice = goldPrices.privativo[key] || 0;
                        let peopleText = key.replace('pessoas', ' pessoas');
                        priceSpan.textContent = `AED ${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} por pessoa (${peopleText})`;
                    }
                }

                function updateSelectorsVisibility() {
                    const transportType = transportTypeSelect.value;
                    
                    if (transportType === 'compartilhado') {
                        peopleDiv.style.display = 'none';
                        quantityDiv.style.display = 'flex';
                    } else {
                        peopleDiv.style.display = 'flex';
                        quantityDiv.style.display = 'none';
                    }
                    updateGoldPrice();
                }

                // Event listeners
                transportTypeSelect.addEventListener('change', updateSelectorsVisibility);
                peopleSelect.addEventListener('change', updateGoldPrice);
                quantityInput.addEventListener('input', updateGoldPrice);

                // Inicializar
                updateSelectorsVisibility();

                const addButton = document.createElement('button');
                addButton.className = 'w-full sm:w-auto bg-[#33C4B6] hover:bg-[#0D7C6D] text-white font-semibold py-2 px-4 sm:px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#33C4B6] focus:ring-opacity-50 text-sm';
                addButton.textContent = 'Adicionar';
                addButton.onclick = (e) => {
                    e.stopPropagation();
                    const transportType = transportTypeSelect.value;
                    
                    if (transportType === 'compartilhado') {
                        const quantity = parseInt(quantityInput.value, 10) || 1;
                        const price = goldPrices.compartilhado;
                        const name = `Safari no Deserto Gold - Transporte Compartilhado`;
                        
                        handleAddToCart({
                            id: `safari-gold-compartilhado`,
                            name: name,
                            description: 'Incluso: Transfer compartilhado em carro 4X4 (6 assentos) ida e volta do Hotel, Rally nas dunas vermelhas, sandboard e parada para fotos, Falcão, Passeio simples de Camelo, Mesa área Gold (2ª fileira), Menu especial do Chef 5★, servido à francesa, Danças e Show, bebidas não alcoólicas.',
                            price: price,
                            imageUrl: "img/toursdubai/goldprivativo4p.jpg",
                            category: "DESERTO"
                        }, quantity);
                    } else {
                        const key = peopleSelect.value;
                        const price = goldPrices.privativo[key];
                        let peopleText = key.replace('pessoas', ' pessoas');
                        const name = `Safari no Deserto Gold - Transporte Privativo - ${peopleText}`;
                        const quantity = parseInt(key.replace('pessoas', ''), 10);
                        
                        handleAddToCart({
                            id: `safari-gold-privativo-${key}`,
                            name: name,
                            description: 'Incluso: Transfer privativo em carro 4X4 (6 assentos) ida e volta do Hotel, Rally nas dunas vermelhas, sandboard e parada para fotos, Falcão, Passeio simples de Camelo, Mesa área Gold (2ª fileira), Menu especial do Chef 5★, servido à francesa, Danças e Show, bebidas não alcoólicas.',
                            price: price,
                            imageUrl: "img/toursdubai/goldprivativo4p.jpg",
                            category: "DESERTO"
                        }, quantity);
                    }
                };

                priceAndButtonDiv.appendChild(priceSpan);
                priceAndButtonDiv.appendChild(addButton);

                actionDiv.appendChild(selectorsDiv);
                actionDiv.appendChild(priceAndButtonDiv);

                contentDiv.appendChild(textDiv);
                contentDiv.appendChild(actionDiv);
                tourCard.appendChild(img);
                tourCard.appendChild(contentDiv);
                toursGridTarget.appendChild(tourCard);
            });
        }

        // Card dinâmico Safari no Deserto Platinum - Unificado (Privativo e Compartilhado)
        if (
            currentCountry && currentCountry.name === "Dubai e Abu Dhabi" &&
            (selectedSubcategory === 'all' || selectedSubcategory === 'DESERTO') &&
            (dynamicCardMatches("Safari no Deserto Platinum", "Transfer privativo em carro 4X4") || 
             dynamicCardMatches("Safari no Deserto Platinum", "Transfer compartilhado em carro 4X4"))
        ) {
            dynamicCards.push(() => {
                const tourCard = document.createElement('div');
                tourCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col';

                const img = document.createElement('img');
                img.src = "img/toursdubai/safariplatinum.jpg";
                img.alt = "Safari no Deserto Platinum";
                img.className = 'w-full h-48 object-cover object-center';
                img.onerror = () => { img.src = `https://placehold.co/400x250/CCCCCC/333333?text=Safari+Platinum`; };

                const contentDiv = document.createElement('div');
                contentDiv.className = 'p-5 sm:p-6 flex-grow flex flex-col justify-between';

                const textDiv = document.createElement('div');
                const nameH3 = document.createElement('h3');
                nameH3.className = 'text-xl sm:text-2xl font-bold text-[#0D7C6C] font-geologica-bold mb-2';
                nameH3.innerHTML = "Safari no Deserto Platinum <span class='text-yellow-500'>⭐⭐⭐⭐⭐</span>";

                const descP = document.createElement('p');
                descP.className = 'text-gray-700 mb-4 text-sm font-geologica-light leading-relaxed';
                descP.innerHTML = `Incluso: Transfer em carro 4X4 (6 assentos) ida e volta do Hotel, Rally nas dunas vermelhas, sandboard e parada para fotos, Falcão, Passeio simples de Camelo, Mesa área Platinum (1ª fileira), Menu especial do Chef 5★, servido à francesa, Danças e Show, bebidas não alcoólicas.<br>
                <span class="font-bold">Escolha o tipo de transporte e número de pessoas:</span>`;

                textDiv.appendChild(nameH3);
                textDiv.appendChild(descP);

                const actionDiv = document.createElement('div');
                actionDiv.className = 'mt-auto pt-4 border-t border-gray-100';

                const priceAndButtonDiv = document.createElement('div');
                priceAndButtonDiv.className = 'flex flex-col sm:flex-row justify-between items-center mb-3';

                const priceSpan = document.createElement('span');
                priceSpan.className = 'text-lg sm:text-xl font-extrabold text-[#0D7C6C] font-geologica-bold mb-2';

                // Opções e preços
                const platinumPrices = {
                    'compartilhado': 850.00, // Valor por pessoa
                    'privativo': {
                        '2pessoas': 1400, // Valor total
                        '3pessoas': 1200, // Valor total
                        '4pessoas': 950,  // Valor total
                        '5pessoas': 950   // Valor total
                    }
                };

                const selectorsDiv = document.createElement('div');
                selectorsDiv.className = 'mb-4 space-y-3';

                // Seletor de tipo de transporte
                const transportTypeDiv = document.createElement('div');
                transportTypeDiv.className = 'flex flex-col';
                const transportTypeLabel = document.createElement('label');
                transportTypeLabel.className = 'text-xs font-geologica-bold mb-1 text-gray-700';
                transportTypeLabel.textContent = 'Tipo de Transporte:';
                const transportTypeSelect = document.createElement('select');
                transportTypeSelect.className = 'border border-gray-300 rounded-md px-2 py-1 text-sm font-geologica-light';
                transportTypeSelect.innerHTML = `
                    <option value="compartilhado">Compartilhado - Valor por pessoa</option>
                    <option value="privativo">Privativo - Valor por pessoa</option>
                `;
                transportTypeDiv.appendChild(transportTypeLabel);
                transportTypeDiv.appendChild(transportTypeSelect);
                selectorsDiv.appendChild(transportTypeDiv);

                // Seletor de número de pessoas (aparece apenas para privativo)
                const peopleDiv = document.createElement('div');
                peopleDiv.className = 'flex flex-col';
                peopleDiv.style.display = 'none'; // Inicialmente oculto
                const peopleLabel = document.createElement('label');
                peopleLabel.className = 'text-xs font-geologica-bold mb-1 text-gray-700';
                peopleLabel.textContent = 'Número de Pessoas:';
                const peopleSelect = document.createElement('select');
                peopleSelect.className = 'border border-gray-300 rounded-md px-2 py-1 text-sm font-geologica-light';
                peopleSelect.innerHTML = `
                    <option value="2pessoas">2 pessoas</option>
                    <option value="3pessoas">3 pessoas</option>
                    <option value="4pessoas">4 pessoas</option>
                    <option value="5pessoas">5 pessoas</option>
                `;
                peopleDiv.appendChild(peopleLabel);
                peopleDiv.appendChild(peopleSelect);
                selectorsDiv.appendChild(peopleDiv);

                // Seletor de quantidade para compartilhado
                const quantityDiv = document.createElement('div');
                quantityDiv.className = 'flex flex-col';
                quantityDiv.style.display = 'none'; // Inicialmente oculto
                const quantityLabel = document.createElement('label');
                quantityLabel.className = 'text-xs font-geologica-bold mb-1 text-gray-700';
                quantityLabel.textContent = 'Quantidade de Pessoas:';
                const quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.value = 1;
                quantityInput.min = 1;
                quantityInput.max = 10;
                quantityInput.className = 'border border-gray-300 rounded-md px-2 py-1 text-sm font-geologica-light';
                quantityDiv.appendChild(quantityLabel);
                quantityDiv.appendChild(quantityInput);
                selectorsDiv.appendChild(quantityDiv);

                function updatePlatinumPrice() {
                    const transportType = transportTypeSelect.value;
                    
                    if (transportType === 'compartilhado') {
                        const quantity = parseInt(quantityInput.value, 10) || 1;
                        const pricePerPerson = platinumPrices.compartilhado;
                        const totalPrice = pricePerPerson * quantity;
                        priceSpan.textContent = `AED ${pricePerPerson.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} por pessoa (Total: AED ${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})`;
                    } else {
                        const key = peopleSelect.value;
                        const totalPrice = platinumPrices.privativo[key] || 0;
                        let peopleText = key.replace('pessoas', ' pessoas');
                        priceSpan.textContent = `AED ${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} por pessoa (${peopleText})`;
                    }
                }

                function updateSelectorsVisibility() {
                    const transportType = transportTypeSelect.value;
                    
                    if (transportType === 'compartilhado') {
                        peopleDiv.style.display = 'none';
                        quantityDiv.style.display = 'flex';
                    } else {
                        peopleDiv.style.display = 'flex';
                        quantityDiv.style.display = 'none';
                    }
                    updatePlatinumPrice();
                }

                // Event listeners
                transportTypeSelect.addEventListener('change', updateSelectorsVisibility);
                peopleSelect.addEventListener('change', updatePlatinumPrice);
                quantityInput.addEventListener('input', updatePlatinumPrice);

                // Inicializar
                updateSelectorsVisibility();

                const addButton = document.createElement('button');
                addButton.className = 'w-full sm:w-auto bg-[#33C4B6] hover:bg-[#0D7C6D] text-white font-semibold py-2 px-4 sm:px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#33C4B6] focus:ring-opacity-50 text-sm';
                addButton.textContent = 'Adicionar';
                addButton.onclick = (e) => {
                    e.stopPropagation();
                    const transportType = transportTypeSelect.value;
                    
                    if (transportType === 'compartilhado') {
                        const quantity = parseInt(quantityInput.value, 10) || 1;
                        const price = platinumPrices.compartilhado;
                        const name = `Safari no Deserto Platinum - Transporte Compartilhado`;
                        
                        handleAddToCart({
                            id: `safari-platinum-compartilhado`,
                            name: name,
                            description: 'Incluso: Transfer compartilhado em carro 4X4 (6 assentos) ida e volta do Hotel, Rally nas dunas vermelhas, sandboard e parada para fotos, Falcão, Passeio simples de Camelo, Mesa área Platinum (1ª fileira), Menu especial do Chef 5★, servido à francesa, Danças e Show, bebidas não alcoólicas.',
                            price: price,
                            imageUrl: "img/toursdubai/platinumprivativo4p.jpg",
                            category: "DESERTO"
                        }, quantity);
                    } else {
                        const key = peopleSelect.value;
                        const price = platinumPrices.privativo[key];
                        let peopleText = key.replace('pessoas', ' pessoas');
                        const name = `Safari no Deserto Platinum - Transporte Privativo - ${peopleText}`;
                        const quantity = parseInt(key.replace('pessoas', ''), 10);
                        
                        handleAddToCart({
                            id: `safari-platinum-privativo-${key}`,
                            name: name,
                            description: 'Incluso: Transfer privativo em carro 4X4 (6 assentos) ida e volta do Hotel, Rally nas dunas vermelhas, sandboard e parada para fotos, Falcão, Passeio simples de Camelo, Mesa área Platinum (1ª fileira), Menu especial do Chef 5★, servido à francesa, Danças e Show, bebidas não alcoólicas.',
                            price: price,
                            imageUrl: "img/toursdubai/platinumprivativo4p.jpg",
                            category: "DESERTO"
                        }, quantity);
                    }
                };

                priceAndButtonDiv.appendChild(priceSpan);
                priceAndButtonDiv.appendChild(addButton);

                actionDiv.appendChild(selectorsDiv);
                actionDiv.appendChild(priceAndButtonDiv);

                contentDiv.appendChild(textDiv);
                contentDiv.appendChild(actionDiv);
                tourCard.appendChild(img);
                tourCard.appendChild(contentDiv);
                toursGridTarget.appendChild(tourCard);
            });
        }

        // RENDER: executar/mostrar os cards dinâmicos criados
        dynamicCards.forEach(fn => {
            try { fn(); } catch (err) { console.error('Erro ao renderizar card dinâmico:', err); }
        });

        // Renderiza os demais passeios normalmente
        filteredTours.forEach(tour => {
            const tourCard = document.createElement('div');
            tourCard.className = 'tour-card bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col';

            const img = document.createElement('img');
            img.src = tour.imageUrl;
            img.alt = tour.name;
            img.className = 'w-full h-48 object-cover object-center';
            img.onerror = () => { img.src = `https://placehold.co/400x250/CCCCCC/333333?text=${tour.name.replace(/\s/g, '+')}`; };

            const contentDiv = document.createElement('div');
            contentDiv.className = 'p-5 sm:p-6 flex-grow flex flex-col justify-between';

            const textDiv = document.createElement('div');
            const nameH3 = document.createElement('h3');
            nameH3.className = 'text-xl sm:text-2xl font-bold text-[#0D7C6C] font-geologica-bold mb-2';
            nameH3.textContent = tour.name;

            const descP = document.createElement('p');
            descP.className = 'text-gray-700 mb-4 text-sm font-geologica-light leading-relaxed';
            descP.textContent = tour.description;

            textDiv.appendChild(nameH3);
            textDiv.appendChild(descP);

            const actionDiv = document.createElement('div');
            actionDiv.className = 'mt-auto pt-4 border-t border-gray-100';

            const priceAndButtonDiv = document.createElement('div');
            priceAndButtonDiv.className = 'flex flex-col sm:flex-row justify-between items-center mb-3';

            const priceSpan = document.createElement('span');
            priceSpan.className = 'text-lg sm:text-xl font-extrabold text-[#0D7C6C] font-geologica-bold mb-2';
            
            // Seletor de tempo para passeios de helicóptero
            let selectedTimeOption = null;
            if (tour.hasTimeSelector && tour.timeOptions) {
                selectedTimeOption = tour.timeOptions[0]; // Primeira opção como padrão
                priceSpan.textContent = `AED ${selectedTimeOption.price.toFixed(2)}`;
                
                // Criar seletor de tempo
                const timeSelectorDiv = document.createElement('div');
                timeSelectorDiv.className = 'mb-3 flex flex-col items-start';
                
                const timeLabel = document.createElement('label');
                timeLabel.className = 'text-xs font-geologica-bold mb-1 text-gray-700';
                timeLabel.textContent = 'Escolha a duração do voo:';
                
                const timeSelect = document.createElement('select');
                timeSelect.className = 'border border-gray-300 rounded-md px-2 py-1 text-sm font-geologica-light w-full';
                timeSelect.addEventListener('click', (e) => e.stopPropagation());
                
                tour.timeOptions.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.minutes;
                    optionElement.textContent = `${option.minutes} minutos - AED ${option.price.toFixed(2)}`;
                    timeSelect.appendChild(optionElement);
                });
                
                timeSelect.onchange = function() {
                    const selectedMinutes = parseInt(timeSelect.value);
                    selectedTimeOption = tour.timeOptions.find(opt => opt.minutes === selectedMinutes);
                    if (selectedTimeOption) {
                        priceSpan.textContent = `AED ${selectedTimeOption.price.toFixed(2)}`;
                    }
                };
                
                timeSelectorDiv.appendChild(timeLabel);
                timeSelectorDiv.appendChild(timeSelect);
                
                // Inserir o seletor antes do preço
                priceAndButtonDiv.insertBefore(timeSelectorDiv, priceAndButtonDiv.firstChild);
            } else {
                priceSpan.textContent = `AED ${tour.price.toFixed(2)}`;
            }



            // Seletor para Iates
            let selectedYachtOption = null;
            if (tour.hasYachtSelector && tour.yachtOptions) {
                selectedYachtOption = tour.yachtOptions[0];
                priceSpan.textContent = `AED ${selectedYachtOption.price.toFixed(2)}`;
                
                const yachtSelectorDiv = document.createElement('div');
                yachtSelectorDiv.className = 'mb-3 flex flex-col items-start';
                
                const yachtLabel = document.createElement('label');
                yachtLabel.className = 'text-xs font-geologica-bold mb-1 text-gray-700';
                yachtLabel.textContent = 'Escolha a capacidade:';
                
                const yachtSelect = document.createElement('select');
                yachtSelect.className = 'border border-gray-300 rounded-md px-2 py-1 text-sm font-geologica-light w-full';
                yachtSelect.addEventListener('click', (e) => e.stopPropagation());
                
                tour.yachtOptions.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = JSON.stringify(option);
                    optionElement.textContent = `${option.capacidade} - AED ${option.price.toFixed(2)}`;
                    yachtSelect.appendChild(optionElement);
                });
                
                yachtSelect.onchange = function() {
                    selectedYachtOption = JSON.parse(yachtSelect.value);
                    priceSpan.textContent = `AED ${selectedYachtOption.price.toFixed(2)}`;
                };
                
                yachtSelectorDiv.appendChild(yachtLabel);
                yachtSelectorDiv.appendChild(yachtSelect);
                priceAndButtonDiv.insertBefore(yachtSelectorDiv, priceAndButtonDiv.firstChild);
            }

            // Seletor para Traslados
            let selectedTransferOption = null;
            if (tour.hasTransferSelector && tour.transferOptions) {
                selectedTransferOption = tour.transferOptions[0];
                priceSpan.textContent = `AED ${selectedTransferOption.price.toFixed(2)}`;
                
                const transferSelectorDiv = document.createElement('div');
                transferSelectorDiv.className = 'mb-3 flex flex-col items-start';
                
                const transferLabel = document.createElement('label');
                transferLabel.className = 'text-xs font-geologica-bold mb-1 text-gray-700';
                transferLabel.textContent = 'Escolha o número de pessoas:';
                
                const transferSelect = document.createElement('select');
                transferSelect.className = 'border border-gray-300 rounded-md px-2 py-1 text-sm font-geologica-light w-full';
                transferSelect.addEventListener('click', (e) => e.stopPropagation());
                
                tour.transferOptions.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = JSON.stringify(option);
                    optionElement.textContent = `${option.pessoas} - AED ${option.price.toFixed(2)}`;
                    transferSelect.appendChild(optionElement);
                });
                
                transferSelect.onchange = function() {
                    selectedTransferOption = JSON.parse(transferSelect.value);
                    priceSpan.textContent = `AED ${selectedTransferOption.price.toFixed(2)}`;
                };
                
                transferSelectorDiv.appendChild(transferLabel);
                transferSelectorDiv.appendChild(transferSelect);
                priceAndButtonDiv.insertBefore(transferSelectorDiv, priceAndButtonDiv.firstChild);
            }

            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = 1;
            quantityInput.min = 1;
            quantityInput.className = 'w-16 text-center border border-gray-300 rounded-md px-2 py-1 text-sm mr-2';
            quantityInput.addEventListener('click', (e) => e.stopPropagation());

            // Seletor de idioma para o passeio id 110
            let selectedLanguage = 'portugues';
            let selectedLanguageLabel = 'Português';
            let selectedLanguageFlag = '🇧🇷';
            const languages = [
                { value: 'ingles', label: 'Inglês', flag: '🇬🇧' },
                { value: 'chines', label: 'Chinês', flag: '🇨🇳' },
                { value: 'espanhol', label: 'Espanhol', flag: '🇪🇸' },
                { value: 'mandarim', label: 'Mandarim', flag: '🇨🇳' },
                { value: 'portugues', label: 'Português', flag: '🇧🇷' },
                { value: 'alemao', label: 'Alemão', flag: '🇩🇪' },
                { value: 'frances', label: 'Francês', flag: '🇫🇷' },
                { value: 'italiano', label: 'Italiano', flag: '🇮🇹' },
                { value: 'russo', label: 'Russo', flag: '🇷🇺' },
                { value: 'arabe', label: 'Árabe', flag: '🇦🇪' },
                { value: 'hindi', label: 'Hindi', flag: '🇮🇳' },
                { value: 'bengali', label: 'Bengali', flag: '🇧🇩' },
            ];

            // Adiciona o seletor de idioma antes do botão Adicionar, apenas para o card id 110
            if (tour.id === 110) {
                const languageDiv = document.createElement('div');
                languageDiv.className = 'mb-2 flex flex-col items-start';

                const label = document.createElement('label');
                label.className = 'text-xs font-geologica-bold mb-1';
                label.textContent = 'Escolha o idioma do guia:';

                const select = document.createElement('select');
                select.className = 'border border-gray-300 rounded-md px-2 py-1 text-sm font-geologica-light';
                languages.forEach(lang => {
                    const option = document.createElement('option');
                    option.value = lang.value;
                    option.textContent = `${lang.flag} ${lang.label}`;
                    select.appendChild(option);
                });
                select.value = 'portugues';
                select.onchange = function () {
                    const lang = languages.find(l => l.value === select.value);
                    selectedLanguage = lang.value;
                    selectedLanguageLabel = lang.label;
                    selectedLanguageFlag = lang.flag;
                };

                languageDiv.appendChild(label);
                languageDiv.appendChild(select);

                priceAndButtonDiv.appendChild(languageDiv);
            }

            const addButton = document.createElement('button');
            addButton.className = 'w-full sm:w-auto bg-[#33C4B6] hover:bg-[#0D7C6D] text-white font-semibold py-2 px-4 sm:px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#33C4B6] focus:ring-opacity-50 text-sm';
            addButton.textContent = 'Adicionar';
            addButton.onclick = (e) => {
                e.stopPropagation();
                const quantity = parseInt(quantityInput.value, 10);
                if (quantity > 0) {
                    if (tour.id === 110) {
                        handleAddToCart(
                            {
                                ...tour,
                                language: selectedLanguage,
                                languageLabel: selectedLanguageLabel,
                                languageFlag: selectedLanguageFlag
                            },
                            quantity
                        );
                        showConfirmationMessage(`${quantity}x ${tour.name} (${selectedLanguageFlag} ${selectedLanguageLabel}) adicionado(s) ao carrinho!`);

                    } else if (tour.hasTimeSelector && selectedTimeOption) {
                        // Para passeios de helicóptero, usar o preço selecionado
                        const tourWithSelectedTime = {
                            ...tour,
                            price: selectedTimeOption.price,
                            selectedTime: selectedTimeOption.minutes
                        };
                        handleAddToCart(tourWithSelectedTime, quantity);
                        showConfirmationMessage(`${quantity}x ${tour.name} (${selectedTimeOption.minutes} min) adicionado(s) ao carrinho!`);

                    } else if (tour.hasYachtSelector && selectedYachtOption) {
                        // Para Iates, usar a capacidade selecionada
                        const tourWithSelectedOptions = {
                            ...tour,
                            price: selectedYachtOption.price,
                            selectedOptions: selectedYachtOption
                        };
                        handleAddToCart(tourWithSelectedOptions, quantity);
                        showConfirmationMessage(`${quantity}x ${tour.name} (${selectedYachtOption.capacidade}) adicionado(s) ao carrinho!`);
                    } else if (tour.hasTransferSelector && selectedTransferOption) {
                        // Para Traslados, usar as opções selecionadas
                        const tourWithSelectedOptions = {
                            ...tour,
                            price: selectedTransferOption.price,
                            selectedOptions: selectedTransferOption
                        };
                        handleAddToCart(tourWithSelectedOptions, quantity);
                        showConfirmationMessage(`${quantity}x ${tour.name} (${selectedTransferOption.pessoas}) adicionado(s) ao carrinho!`);
                    } else {
                        handleAddToCart(tour, quantity);
                        showConfirmationMessage(`${quantity}x ${tour.name} adicionado(s) ao carrinho!`);
                    }
                } else {
                    showConfirmationMessage("A quantidade deve ser pelo menos 1.");
                }
            };

            const quantityControlDiv = document.createElement('div');
            quantityControlDiv.className = 'flex items-center mb-2 sm:mb-0';
            quantityControlDiv.appendChild(quantityInput);
            quantityControlDiv.appendChild(addButton);

            priceAndButtonDiv.appendChild(priceSpan);
            priceAndButtonDiv.appendChild(quantityControlDiv);
            actionDiv.appendChild(priceAndButtonDiv);

            // Add PDF button if pdfUrl exists
            if (tour.pdfUrl) {
                const pdfButton = document.createElement('button');
                pdfButton.className = "w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm mt-2";
                pdfButton.textContent = "📄 Ver Roteiro Detalhado (PDF)";
                pdfButton.onclick = (e) => {
                    e.stopPropagation();
                    openPdfModal(tour.pdfUrl);
                };
                actionDiv.appendChild(pdfButton);
            }

            contentDiv.appendChild(textDiv);
            contentDiv.appendChild(actionDiv);
            tourCard.appendChild(img);
            tourCard.appendChild(contentDiv);
            toursGridTarget.appendChild(tourCard);
        });

        // Animar entrada dos cards de tour
        const tourCards = toursGridTarget.querySelectorAll('.bg-white.rounded-xl');
        addStaggeredAnimation(Array.from(tourCards), 'animate-fade-in-up', 100);
        }); // Fim do setTimeout
    }

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-gray-500 text-center mt-8 font-geologica-light">Seu carrinho está vazio.</p>';
            cartCountElement.style.display = 'none';
        } else {
            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.className = 'flex items-center justify-between border-b border-gray-100 py-3 sm:py-4 last:border-b-0';

                const itemInfoDiv = document.createElement('div');
                itemInfoDiv.className = 'flex-grow pr-2';

                const itemName = document.createElement('h4');
                itemName.className = 'font-semibold text-md sm:text-lg font-geologica-bold';
                itemName.textContent = item.name;

                const itemPriceQuantity = document.createElement('p');
                itemPriceQuantity.className = 'text-gray-600 text-xs sm:text-sm font-geologica-light';
                itemPriceQuantity.textContent = `AED ${item.price.toFixed(2)} x ${item.quantity}`;

                itemInfoDiv.appendChild(itemName);
                itemInfoDiv.appendChild(itemPriceQuantity);

                const removeButton = document.createElement('button');
                removeButton.className = 'ml-2 sm:ml-4 bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm font-bold py-1 px-2 rounded-full transition duration-300 ease-in-out';
                removeButton.textContent = 'Remover';
                removeButton.onclick = () => handleRemoveFromCart(item.id);

                // Exibe idioma se existir
                if (item.languageLabel && item.languageFlag) {
                    const langDiv = document.createElement('div');
                    langDiv.className = 'text-xs text-gray-500 font-geologica-light';
                    langDiv.textContent = `Idioma: ${item.languageFlag} ${item.languageLabel}`;
                    itemInfoDiv.appendChild(langDiv);
                }

                // Exibe opções selecionadas para passeios dinâmicos
                if (item.selectedTime) {
                    const timeDiv = document.createElement('div');
                    timeDiv.className = 'text-xs text-gray-500 font-geologica-light';
                    timeDiv.textContent = `Duração: ${item.selectedTime} minutos`;
                    itemInfoDiv.appendChild(timeDiv);
                }

                if (item.selectedOptions) {
                    const optionsDiv = document.createElement('div');
                    optionsDiv.className = 'text-xs text-gray-500 font-geologica-light';
                    
                    if (item.selectedOptions.capacidade) {
                        // Iates
                        optionsDiv.textContent = `Capacidade: ${item.selectedOptions.capacidade}`;
                    } else if (item.selectedOptions.pessoas) {
                        // Traslados
                        optionsDiv.textContent = `Pessoas: ${item.selectedOptions.pessoas}`;
                    }
                    
                    itemInfoDiv.appendChild(optionsDiv);
                }



                cartItemDiv.appendChild(itemInfoDiv);
                cartItemDiv.appendChild(removeButton);
                cartItemsContainer.appendChild(cartItemDiv);
            });

            const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCountElement.textContent = totalQuantity;
            cartCountElement.style.display = totalQuantity > 0 ? 'flex' : 'none';
        }

        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        const serviceFee = totalPrice * 0.15;
        const totalWithFee = totalPrice + serviceFee;

        cartTotalElement.textContent = `AED ${totalWithFee.toFixed(2)} (Inclui 15% Taxa de Serviço)`;
    }

    function renderTravelStyleButtons() {
        travelStyleButtonsContainer.innerHTML = '';
        travelStyles.forEach(style => {
            const button = document.createElement('button');
            button.className = `px-3 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 ${selectedTravelStyle === style.value ? 'bg-[#0D7C6D] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`;
            button.textContent = style.label;
            button.onclick = () => {
                selectedTravelStyle = style.value;
                renderTravelStyleButtons(); // Re-render to update active state
                clearTravelStyleButton.classList.remove('hidden');
            };
            travelStyleButtonsContainer.appendChild(button);
        });
    }

    // Funções de Manipulação de Estado e Ações
    function handleAddToCart(tourToAdd, quantity = 1) { // Adiciona parâmetro quantity com default 1
        const existingItem = cart.find(item => item.id === tourToAdd.id);
        if (existingItem) {
            existingItem.quantity += quantity; // Soma a quantidade
        } else {
            cart.push({ ...tourToAdd, quantity: quantity }); // Usa a quantidade especificada
        }
        showConfirmationMessage(`${quantity}x ${tourToAdd.name} adicionado(s) ao carrinho!`); // Mensagem atualizada
        openCartSidebar();
        renderCart();
    }

    function handleRemoveFromCart(tourId) {
        const itemIndex = cart.findIndex(item => item.id === tourId);
        if (itemIndex > -1) {
            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity--;
            } else {
                cart.splice(itemIndex, 1);
            }
        }
        renderCart();
    }

    function openCartSidebar() {
        cartSidebar.classList.remove('translate-x-full');
    }
    function closeCartSidebar() {
        cartSidebar.classList.add('translate-x-full');
    }

    function openPdfModal(pdfUrl) {
        pdfViewer.src = pdfUrl;
        pdfModalOverlay.style.display = 'flex';
    }

    function closePdfModal() {
        pdfModalOverlay.style.display = 'none';
        pdfViewer.src = '';
    }


    // Funções da API Gemini
    async function callGeminiAPI(prompt, signal) {
        const apiKey = "AIzaSyDpRyvbYUE4tDhBqw7v8GaFiA7m4760Ltk";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                signal: signal // Pass the signal here
            });

            if (!response.ok) {
                const errorResult = await response.json().catch(() => ({ error: { message: "Falha ao analisar resposta de erro da API." } }));
                throw new Error(errorResult.error?.message || `Erro da API: ${response.statusText}`);
            }
            const result = await response.json();
            if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
                return result.candidates[0].content.parts[0].text;
            } else {
                console.error("Unexpected API response structure:", result);
                throw new Error("Resposta inesperada da API ao gerar conteúdo.");
            }
        } catch (error) {
            // Check if the error is due to abortion
            if (error.name === 'AbortError') {
                console.log('API request aborted by user.');
                // Do not show an error message for user-initiated aborts
                throw error; // Re-throw the AbortError so the caller can handle cleanup
            } else {
                console.error("Error calling Gemini API:", error);
                throw error; // Re-throw other errors
            }
        }
    }

    async function handleGenerateEnhancedDescription(tour) {
        if (!tour) return;

        // Abort any ongoing request before starting a new one
        if (currentAbortController) {
            currentAbortController.abort();
        }
        currentAbortController = new AbortController();
        const signal = currentAbortController.signal;

        enhancedDescModalTitle.textContent = tour.name;
        enhancedDescModalOverlay.style.display = 'flex';
        showLoading(enhancedDescModalContentArea, "Gerando descrição detalhada...");

        const prompt = `Gere uma descrição detalhada e atraente para o seguinte passeio turístico em ${currentCountry ? currentCountry.name : 'Dubai/Abu Dhabi'}:
Nome do Passeio: ${tour.name}
Descrição Curta Atual: ${tour.description}
Preço: AED ${tour.price.toFixed(2)}

A descrição deve ser mais elaborada, destacando os principais atrativos, experiências únicas, e o que o torna especial. Use um tone convidativo e informativo. Se possível, adicione uma curiosidade ou dica relacionada ao passeio. Formate com parágrafos para fácil leitura.`;

        try {
            const description = await callGeminiAPI(prompt, signal);
            enhancedDescModalContentArea.innerHTML = `<div class="ai-generated-content">${formatAIResponse(description)}</div>`;
        } catch (error) {
            if (error.name !== 'AbortError') { // Only show error if it wasn't an abort
                showError(enhancedDescModalContentArea, `Ocorreu um erro: ${error.message}. Por favor, tente novamente.`);
            }
            // If it was an AbortError, the modal is already closing via the overlay click handler
        } finally {
            // Clear the controller reference once the request is done (success, error, or abort)
            if (currentAbortController === currentAbortController) { // Ensure it's the same controller
                 currentAbortController = null;
            }
        }
    }

    async function handleGenerateItinerary() {
        if (cart.length === 0) {
            showConfirmationMessage("Adicione passeios ao carrinho para gerar um roteiro!");
            return;
        }

        // Abort any ongoing request before starting a new one
        if (currentAbortController) {
            currentAbortController.abort();
        }
        currentAbortController = new AbortController();
        const signal = currentAbortController.signal;


        itineraryModalOverlay.style.display = 'flex';
        showLoading(itineraryModalContentArea, "Gerando seu roteiro...");

        const tourList = cart.map(item => `${item.name} (x${item.quantity})`).join(', ');
        let prompt = `Crie um roteiro de viagem personalizado para ${currentCountry ? currentCountry.name : 'Dubai e/ou Abu Dhabi'} com base nos seguintes passeios selecionados: ${tourList}.`;
        if (selectedTravelStyle) {
            prompt += ` O estilo de viagem preferido é: ${selectedTravelStyle}.`;
        }
        prompt += ` Inclua uma sugestão de ordem para os passeios, considerando a logística e horários. Adicione também sugestões de atividades complementares (como restaurantes, compras, ou outros pontos de interesse próximos aos passeios selecionados) e dicas gerais para aproveitar ao máximo a viagem aos Emirados Árabes. Formate a resposta de forma clara e organizada, com títulos para cada dia ou seção.`;

        try {
            const itinerary = await callGeminiAPI(prompt, signal);
            itineraryModalContentArea.innerHTML = `<div class="ai-generated-content">${formatAIResponse(itinerary)}</div>`;
        } catch (error) {
             if (error.name !== 'AbortError') { // Only show error if it wasn't an abort
                showError(itineraryModalContentArea, `Ocorreu um erro: ${error.message}. Por favor, tente novamente.`);
            }
             // If it was an AbortError, the modal is already closing via the overlay click handler
        } finally {
             // Clear the controller reference once the request is done (success, error, or abort)
             if (currentAbortController === currentAbortController) { // Ensure it's the same controller
                 currentAbortController = null;
            }
        }
    }


    // Event Listeners
    cartButton.addEventListener('click', openCartSidebar);
    closeCartButton.addEventListener('click', closeCartSidebar);

    // Close modals when clicking the close button OR clicking outside
    closeItineraryModalButton.addEventListener('click', () => {
        if (currentAbortController) {
            currentAbortController.abort();
        }
        itineraryModalOverlay.style.display = 'none';
    });
    itineraryModalOverlay.addEventListener('click', (event) => {
        if (event.target === itineraryModalOverlay) {
             if (currentAbortController) {
                currentAbortController.abort();
            }
            itineraryModalOverlay.style.display = 'none';
        }
    });

    closeEnhancedDescModalButton.addEventListener('click', () => {
         if (currentAbortController) {
            currentAbortController.abort();
        }
        enhancedDescModalOverlay.style.display = 'none';
    });
     enhancedDescModalOverlay.addEventListener('click', (event) => {
        if (event.target === enhancedDescModalOverlay) {
             if (currentAbortController) {
                currentAbortController.abort();
            }
            enhancedDescModalOverlay.style.display = 'none';
        }
    });

    closePdfModalButton.addEventListener('click', closePdfModal);
    pdfModalOverlay.addEventListener('click', (event) => {
        if (event.target === pdfModalOverlay) {
            closePdfModal();
        }
    });


    generateItineraryButton.addEventListener('click', handleGenerateItinerary);

    // Add event listener for search input
    if (tourSearchInput) {
        tourSearchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderTours(); // Re-render tours with the new search query
        });
    }

    backToCountryButton.addEventListener('click', () => {
        showLoadingOverlay('Voltando...');
        setTimeout(() => {
            currentPage = 'countrySelection';
            cart = []; // Clear cart when going back to country selection
            renderCart(); // Update cart display
            searchQuery = ''; // Clear search query
            if (tourSearchInput) tourSearchInput.value = ''; // Clear search input field
            renderPage();
            hideLoadingOverlay();
        }, 300);
    });

    // Add event listener for the header logo
    headerLogo.addEventListener('click', () => {
        showLoadingOverlay('Carregando...');
        setTimeout(() => {
            currentPage = 'countrySelection';
            cart = []; // Clear cart when going back to country selection
            renderCart(); // Update cart display
            renderPage();
            hideLoadingOverlay();
        }, 300);
    });

    // Add event listener for the header title
    const headerTitle = document.querySelector('h1');
    if (headerTitle) {
        headerTitle.addEventListener('click', () => {
            showLoadingOverlay('Carregando...');
            setTimeout(() => {
                currentPage = 'countrySelection';
                cart = []; // Clear cart when going back to country selection
                renderCart(); // Update cart display
                renderPage();
                hideLoadingOverlay();
            }, 300);
        });
    }

    // Close modals when clicking outside
    itineraryModalOverlay.addEventListener('click', (event) => {
        if (event.target === itineraryModalOverlay) {
            itineraryModalOverlay.style.display = 'none';
        }
    });

    enhancedDescModalOverlay.addEventListener('click', (event) => {
        if (event.target === enhancedDescModalOverlay) {
            enhancedDescModalOverlay.style.display = 'none';
        }
    });

    // Close cart sidebar when clicking outside
    document.body.addEventListener('click', (event) => {
        if (!cartSidebar.classList.contains('translate-x-full') &&
            !cartSidebar.contains(event.target) &&
            event.target !== cartButton &&
            !cartButton.contains(event.target))
        {
            closeCartSidebar();
        }
    });


    whatsappQuoteButton.addEventListener('click', () => {
        if (cart.length === 0) {
            showConfirmationMessage("Seu carrinho está vazio. Adicione passeios antes de solicitar um orçamento.");
            return;
        }

        const customerName = customerNameInput ? customerNameInput.value.trim() : 'Cliente';
        const numberOfPeople = numberOfPeopleInput ? parseInt(numberOfPeopleInput.value, 10) : 1;

        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = String(now.getFullYear()).slice(-2);
        const invoiceNumber = `${day}${month}${year}-PT-001`;

        const invoiceDate = now.toLocaleDateString('pt-BR');

        const messageLines = [
            "INVOICE",
            "",
            `Número do Invoice: ${invoiceNumber}`,
            `Data do Invoice: ${invoiceDate}`,
            "",
            "Faturado Para:",
            `${customerName}`,
            `${numberOfPeople} Pessoa(s)`,
            "--------------------------------------------------------------------------------",
            "Descrição do Item", // Header line 1
            "Quantidade     Preço Unit.     Total", // Header line 2 (simplified alignment)
            "--------------------------------------------------------------------------------",
        ];

        let subtotal = 0;

        cart.forEach((item) => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            let quantityText = `${item.quantity}x`;

            if (item.description.includes("Preço por pessoa")) {
                 quantityText = `${item.quantity} pessoa(s)`;
            } else if (item.description.includes("Valor total pelo serviço")) {
                 quantityText = `${item.quantity} serviço(s)`;
            } else if (item.description.includes("Valor total pelo aluguel")) {
                 quantityText = `${item.quantity} aluguel(is)`;
            }
            messageLines.push(`${item.name}`);
            messageLines.push(`  ${quantityText}     AED ${item.price.toFixed(2)}     AED ${itemTotal.toFixed(2)}`);
        });

        const serviceFee = subtotal * 0.15;
        const totalWithFee = subtotal + serviceFee;

        messageLines.push("--------------------------------------------------------------------------------");
        messageLines.push(`Subtotal:                                                              AED ${subtotal.toFixed(2)}`);
        messageLines.push(`Taxa de Serviço (15%):                                                 AED ${serviceFee.toFixed(2)}`);
        messageLines.push(`Total:                                                          AED ${totalWithFee.toFixed(2)}`); // Add total after items
        messageLines.push("--------------------------------------------------------------------------------");
        messageLines.push("Observações:");
        messageLines.push("Obrigado por escolher a Portare Travel para sua viagem!");


        const message = messageLines.join('\n');

        const whatsappNumber = "+971523811226";
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    });

    clearTravelStyleButton.addEventListener('click', () => {
        selectedTravelStyle = '';
        renderTravelStyleButtons();
        clearTravelStyleButton.classList.add('hidden');
    });

    document.getElementById('current-year').textContent = new Date().getFullYear();

    renderPage();
    renderCart();
    renderTravelStyleButtons();
});
