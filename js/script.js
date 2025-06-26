import { toursData } from './toursData.js';
import { egyptData } from './egyptData.js'; // Import Egypt data

// Início do JavaScript
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

    // New PDF Modal Elements
    const pdfModalOverlay = document.getElementById('pdf-modal-overlay');
    const pdfViewer = document.getElementById('pdf-viewer');
    const closePdfModalButton = document.getElementById('close-pdf-modal-button');
    // End New PDF Modal Elements

    const confirmationMessageGlobal = document.getElementById('confirmation-message-global');
    const travelStyleButtonsContainer = document.getElementById('travel-style-buttons-container');
    const clearTravelStyleButton = document.getElementById('clear-travel-style-button');
    const headerLogo = document.getElementById('header-logo'); // Get the logo element
    const toursPageTitle = document.getElementById('tours-page-title'); // Get the tours page title element
    const toursPageHero = document.getElementById('hero-section'); // Get the hero section element
    const tourSearchInput = document.getElementById('tour-search-input'); // Get the search input element

    // Estado da Aplicação
    let allTours = []; // This will now hold data for the selected country
    let cart = [];
    let currentPage = 'countrySelection'; // 'countrySelection' ou 'tours'
    let selectedSubcategory = 'all';
    let selectedTravelStyle = '';
    let currentCountry = null; // Track the currently selected country
    let searchQuery = ''; // New state variable for search query
    let currentAbortController = null; // To manage ongoing API requests

    const logoUrl = "./Marca.png"; // Certifique-se que este caminho está correto

    // allTours = toursData; // Remove this line, data is loaded on country selection

    const subcategories = [
        { label: "Todos", value: "all" }, { label: "TOUR EM GRUPO", value: "TOUR EM GRUPO" }, { label: "TOUR DUBAI", value: "TOUR DUBAI" }, { label: "TOUR ABU DHABI", value: "TOUR ABU DHABI" }, { label: "TOUR RAK", value: "TOUR RAK" },  { label: "HATTA", value: "HATTA" }, { label: "TRANSLADO", value: "TRANSLADO" }, { label: "CARRO COM MOTORISTA", value: "CARRO COM MOTORISTA" }, { label: "ABU DHABI CARRO", value: "ABU DHABI CARRO" },  { label: "DESERTO", value: "DESERTO" }, { label: "WATER", value: "WATER" }, { label: "AIR", value: "AIR" }, { label: "DUBAI TICKETS", value: "DUBAI TICKETS" }, { label: "DUBAI PARKS", value: "DUBAI PARKS" }, { label: "ABU DHABI TICKETS", value: "ABU DHABI TICKETS" }, { label: "ABU DHABI PARKS", value: "ABU DHABI PARKS" }, { label: "LA PERLE", value: "LA PERLE" }, { label: "PORTARE SERVIÇOS", value: "PORTARE SERVIÇOS" },  { label: "EVENTOS", value: "EVENTOS" },
    ];

    // Define subcategories per country
    const countrySubcategories = {
        'Dubai e Abu Dhabi': [
            { label: "Todos", value: "all" }, { label: "TOUR EM GRUPO", value: "TOUR EM GRUPO" }, { label: "TOUR DUBAI", value: "TOUR DUBAI" }, { label: "TOUR ABU DHABI", value: "TOUR ABU DHABI" }, { label: "TOUR RAK", value: "TOUR RAK" },  { label: "HATTA", value: "HATTA" }, { label: "TRANSLADO", value: "TRANSLADO" }, { label: "CARRO COM MOTORISTA", value: "CARRO COM MOTORISTA" }, { label: "ABU DHABI CARRO", value: "ABU DHABI CARRO" },  { label: "DESERTO", value: "DESERTO" }, { label: "AVENTURAS AQUÁTICAS", value: "AVENTURAS AQUÁTICAS" }, { label: "EXPERIÊNCIAS AÉREAS", value: "EXPERIENCIAS AÉREAS" }, { label: "DUBAI TICKETS", value: "DUBAI TICKETS" }, { label: "DUBAI PARKS", value: "DUBAI PARKS" }, { label: "ABU DHABI TICKETS", value: "ABU DHABI TICKETS" }, { label: "ABU DHABI PARKS", value: "ABU DHABI PARKS" }, { label: "LA PERLE", value: "LA PERLE" }, { label: "PORTARE SERVIÇOS", value: "PORTARE SERVIÇOS" },  { label: "EVENTOS", value: "EVENTOS" },
        ],
        'Egito': [
             { label: "Todos", value: "all" }, { label: "Tour em grupo", value: "Tour em grupo" }, { label: "Tour privativo", value: "Tour privativo" },
        ],
        'Maldivas': [
            { label: "Todos", value: "all" }, // Add Maldives specific categories later
        ],
        'Japão': [
            { label: "Todos", value: "all" }, // Add Japan specific categories later
        ]
    };

    const travelStyles = [
        { label: "Aventura", value: "Aventura" }, { label: "Relaxante", value: "Relaxante" }, { label: "Cultural", value: "Cultural" }, { label: "Romântico", value: "Romântico" }, { label: "Família", value: "Família com crianças" }, { label: "Luxo", value: "Luxo" },
    ];

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
        // Substitui múltiplos asteriscos por tags <strong> ou <em>, e quebras de linha
        // Esta é uma simplificação. Uma conversão Markdown completa seria mais complexa.
        let html = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Negrito
            .replace(/\*(.*?)\*/g, '<em>$1</em>')       // Itálico
            .replace(/^- (.*)/gm, '<li>$1</li>');      // Itens de lista simples

        // Agrupa <li>s em <ul>
        html = html.replace(/(<li>.*<\/li>)+/gs, '<ul>$&</ul>');
        html = html.replace(/\n/g, '<br />'); // Quebras de linha
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
            cartButton.style.display = 'flex'; // 'flex' para alinhar itens internos
            backToCountryButton.style.display = 'flex';
            renderSubcategoryButtons(); // Render buttons based on current country
            renderTours(); // Render tours based on current country data
            updateToursPageHeader(); // Update header text and image
        }
    }

    function renderCountries() {
        countriesGrid.innerHTML = '';
        const countriesData = [
            // Update image paths to point to your local img folder with correct filenames and extension
            { name: "Dubai e Abu Dhabi", image: "img/dubai.jpg", data: toursData, targetPage: 'tours', heroImage: 'img/dubaideserto.jpg', heroTitle: 'Sua Aventura em Dubai Começa Aqui!', heroSubtitle: 'Passeios inesquecíveis e experiências únicas.<br>Você sabia que o nome do País é Emirados Árabes Unidos?<br>São 7 Emirados para explorar:<br>Dubai – Abu Dhabi – Sharjah – Ras Al Khaimah (RAK) – Ajman – Fujairah – Umm Al Quwain' }, // Using dubai.jpg
            { name: "Egito", image: "img/egito.jpg", data: egyptData, targetPage: 'tours', heroImage: 'img/egito.jpg', heroTitle: 'Descubra os Mistérios do Egito!', heroSubtitle: 'Uma jornada pela terra dos faraós, pirâmides e templos ancestrais.' }, // Using egito.jpg
            { name: "Maldivas", image: "img/maldivas.jpg", message: 'Passeios para Maldivas em breve!' }, // Using maldivas.jpg
            { name: "Japão", image: "img/japao.jpg", message: 'Passeios para Japão em breve!' }, // Using japao.jpg
        ];

        countriesData.forEach(country => {
            const countryDiv = document.createElement('div');
            countryDiv.className = "bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-center text-center p-4";
            countryDiv.onclick = () => {
                if (country.targetPage === 'tours') {
                    currentCountry = country; // Set the current country
                    allTours = country.data; // Load data for the selected country
                    selectedSubcategory = 'all'; // Reset subcategory filter
                    currentPage = country.targetPage;
                    renderPage();
                } else if (country.message) {
                    showConfirmationMessage(country.message);
                }
            };

            const img = document.createElement('img');
            img.src = country.image;
            img.alt = country.name;
            img.className = "w-full h-40 object-cover object-center rounded-lg mb-4";
            // Keep the onerror as a fallback in case the local image is not found
            img.onerror = (e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x250/CCCCCC/333333?text=${country.name.replace(/\s/g, '+')}`; };

            const h3 = document.createElement('h3');
            h3.className = "text-2xl sm:text-3xl font-bold text-[#0D7C6C] font-geologica-bold";
            h3.textContent = country.name;

            countryDiv.appendChild(img);
            countryDiv.appendChild(h3);
            countriesGrid.appendChild(countryDiv);
        });
    }

    function updateToursPageHeader() {
        if (currentCountry) {
            // Update the hero section background image
            toursPageHero.style.backgroundImage = `url('${currentCountry.heroImage}')`;

            // Update the hero section title and subtitle
            const heroTitleElement = toursPageHero.querySelector('h2');
            const heroSubtitleElement = toursPageHero.querySelector('p');
            if (heroTitleElement) heroTitleElement.innerHTML = currentCountry.heroTitle;
            if (heroSubtitleElement) heroSubtitleElement.innerHTML = currentCountry.heroSubtitle;

            // Update the main section title
            if (toursPageTitle) { // Check if the element exists
                 toursPageTitle.textContent = `Nossos Passeios em ${currentCountry.name}`;
            } else {
                 // If tours-page-title doesn't exist, find the h2 inside main
                 const mainH2 = document.querySelector('#tours-page main h2');
                 if (mainH2) mainH2.textContent = `Nossos Passeios em ${currentCountry.name}`;
            }

        }
    }


    function renderSubcategoryButtons() {
        subcategoryButtonsContainer.innerHTML = '';
        // Use subcategories specific to the current country, default to empty if none found
        const currentSubcategories = currentCountry && countrySubcategories[currentCountry.name] ? countrySubcategories[currentCountry.name] : [{ label: "Todos", value: "all" }];

        currentSubcategories.forEach(cat => {
            const button = document.createElement('button');
            // Update the class list here
            button.className = `px-3 py-2 sm:px-5 sm:py-2 rounded-full font-semibold text-xs sm:text-sm transition duration-300 ease-in-out font-geologica-light ${selectedSubcategory === cat.value ? 'bg-[#0D7C6D] text-white shadow-md' : 'bg-[#33C4B6] text-[#0D7C6D] hover:bg-[#0D7C6C] hover:text-white'}`;
            button.textContent = cat.label;
            button.onclick = () => {
                selectedSubcategory = cat.value;
                renderSubcategoryButtons(); // Re-render buttons to update active state
                renderTours(); // Re-render tours based on new filter
            };
            subcategoryButtonsContainer.appendChild(button);
        });
    }

    function renderTours() {
        const toursGridTarget = document.getElementById('tours-grid'); // Target the correct grid
        if (!toursGridTarget) {
            console.error("Elemento tours-grid não encontrado na página de passeios.");
            return;
        }
        toursGridTarget.innerHTML = '';
        // Use the allTours array which is now populated based on the selected country
        let filteredTours = allTours.filter(tour => selectedSubcategory === 'all' || tour.category === selectedSubcategory);

        // Apply search filter
        if (searchQuery) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            filteredTours = filteredTours.filter(tour =>
                tour.name.toLowerCase().includes(lowerCaseQuery) ||
                tour.description.toLowerCase().includes(lowerCaseQuery) ||
                tour.category.toLowerCase().includes(lowerCaseQuery) // Optional: search in category too
            );
        }


        if (filteredTours.length === 0) {
            toursGridTarget.innerHTML = '<p class="col-span-full text-center text-gray-500 text-lg font-geologica-light">Nenhum passeio encontrado para esta categoria no momento.</p>';
            return;
        }

        filteredTours.forEach(tour => {
            const tourCard = document.createElement('div');
            tourCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col';

            const img = document.createElement('img');
            img.src = tour.imageUrl;
            img.alt = tour.name;
            img.className = 'w-full h-48 object-cover object-center';
            // Update the onerror path to match the new structure
            img.onerror = () => { img.src = `https://placehold.co/400x250/CCCCCC/333333?text=${tour.name.replace(/\s/g, '+')}`; }; // Fallback to placeholder if local image fails

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
            priceSpan.className = 'text-lg sm:text-xl font-extrabold text-[#0D7C6C] font-geologica-bold mb-2 sm:mb-0';
            priceSpan.textContent = `AED ${tour.price.toFixed(2)}`;

            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = 1;
            quantityInput.min = 1;
            quantityInput.className = 'w-16 text-center border border-gray-300 rounded-md px-2 py-1 text-sm mr-2'; // Adicionado mr-2 para espaçamento
            quantityInput.addEventListener('click', (e) => e.stopPropagation()); // Prevent card click when clicking input

            const addButton = document.createElement('button');
            // Update the class list here
            addButton.className = 'w-full sm:w-auto bg-[#33C4B6] hover:bg-[#0D7C6C] text-white font-semibold py-2 px-4 sm:px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#33C4B6] focus:ring-opacity-50 text-sm';
            addButton.textContent = 'Adicionar'; // Texto alterado para "Adicionar"
            addButton.onclick = (e) => {
                e.stopPropagation(); // Prevent card click
                const quantity = parseInt(quantityInput.value, 10);
                if (quantity > 0) {
                    handleAddToCart(tour, quantity);
                } else {
                    showConfirmationMessage("A quantidade deve ser pelo menos 1.");
                }
            };

            const quantityControlDiv = document.createElement('div');
            quantityControlDiv.className = 'flex items-center mb-2 sm:mb-0'; // Flex container for quantity input and button
            quantityControlDiv.appendChild(quantityInput);
            quantityControlDiv.appendChild(addButton);


            priceAndButtonDiv.appendChild(priceSpan);
            priceAndButtonDiv.appendChild(quantityControlDiv); // Adiciona o novo container
            actionDiv.appendChild(priceAndButtonDiv);

            const aiDetailsButton = document.createElement('button');
            aiDetailsButton.className = "w-full bg-amber-400 hover:bg-amber-500 text-gray-800 font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50 text-sm mt-2";
            aiDetailsButton.textContent = "✨ Detalhes com IA";
            aiDetailsButton.onclick = () => handleGenerateEnhancedDescription(tour);
            actionDiv.appendChild(aiDetailsButton);

            // Add PDF button if pdfUrl exists
            if (tour.pdfUrl) {
                const pdfButton = document.createElement('button');
                pdfButton.className = "w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm mt-2";
                pdfButton.textContent = "📄 Ver Roteiro Detalhado (PDF)";
                // Modify the click handler to open the PDF modal
                pdfButton.onclick = (e) => {
                    e.stopPropagation(); // Prevent card click
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

    // New PDF Modal Functions
    function openPdfModal(pdfUrl) {
        pdfViewer.src = pdfUrl;
        pdfModalOverlay.style.display = 'flex';
    }

    function closePdfModal() {
        pdfModalOverlay.style.display = 'none';
        pdfViewer.src = ''; // Clear the iframe source when closing
    }
    // End New PDF Modal Functions


    // Funções da API Gemini
    async function callGeminiAPI(prompt, signal) {
        // NOTE: Hardcoding API keys directly in client-side code is a security risk.
        // For a production application, consider using a backend proxy or environment variables.
        const apiKey = "AIzaSyDpRyvbYUE4tDhBqw7v8GaFiA7m4760Ltk"; // API AQUI!!!
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

    // New PDF Modal Event Listeners
    closePdfModalButton.addEventListener('click', closePdfModal);
    pdfModalOverlay.addEventListener('click', (event) => {
        if (event.target === pdfModalOverlay) {
            closePdfModal();
        }
    });
    // End New PDF Modal Event Listeners


    generateItineraryButton.addEventListener('click', handleGenerateItinerary);

    // Add event listener for search input
    if (tourSearchInput) {
        tourSearchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderTours(); // Re-render tours with the new search query
        });
    }

    backToCountryButton.addEventListener('click', () => {
        currentPage = 'countrySelection';
        cart = []; // Clear cart when going back to country selection
        renderCart(); // Update cart display
        searchQuery = ''; // Clear search query
        if (tourSearchInput) tourSearchInput.value = ''; // Clear search input field
        renderPage();
    });

    // Add event listener for the header logo
    headerLogo.addEventListener('click', () => {
        currentPage = 'countrySelection';
        cart = []; // Clear cart when going back to country selection
        renderCart(); // Update cart display
        renderPage();
    });

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
        // Check if the cart sidebar is open AND the click is outside the sidebar and not on the cart button itself
        if (!cartSidebar.classList.contains('translate-x-full') &&
            !cartSidebar.contains(event.target) &&
            event.target !== cartButton && // Exclude the cart button
            !cartButton.contains(event.target)) // Exclude elements inside the cart button
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

        // Generate Invoice Number (Simple format: DDMMYY-PT-001)
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        const year = String(now.getFullYear()).slice(-2);
        const invoiceNumber = `${day}${month}${year}-PT-001`; // Using a static counter 001

        // Format Invoice Date
        const invoiceDate = now.toLocaleDateString('pt-BR'); // Format as DD/MM/YYYY

        // Build the message using an array of lines for clarity
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

            let quantityText = `${item.quantity}x`; // Default format

            // Check if the item's description indicates "per person" pricing
            if (item.description.includes("Preço por pessoa")) {
                 quantityText = `${item.quantity} pessoa(s)`;
            } else if (item.description.includes("Valor total pelo serviço")) {
                 quantityText = `${item.quantity} serviço(s)`;
            } else if (item.description.includes("Valor total pelo aluguel")) {
                 quantityText = `${item.quantity} aluguel(is)`;
            }

            // Simple formatting for item line - difficult to make a perfect table in plain text
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


        const message = messageLines.join('\n'); // Join all lines with newline characters

        const whatsappNumber = "+971523811226"; // Seu número do WhatsApp
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    });

    clearTravelStyleButton.addEventListener('click', () => {
        selectedTravelStyle = '';
        renderTravelStyleButtons();
        clearTravelStyleButton.classList.add('hidden');
    });

    // Atualiza o ano no rodapé
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Inicialização
    renderPage();
    renderCart(); // Fornece estado inicial do carrinho
    renderTravelStyleButtons();
});
// Fim do JavaScript
