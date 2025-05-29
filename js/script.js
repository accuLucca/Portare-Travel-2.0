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

    const itineraryModalOverlay = document.getElementById('itinerary-modal-overlay');
    const itineraryModalContentArea = document.getElementById('itinerary-modal-content-area');
    const closeItineraryModalButton = document.getElementById('close-itinerary-modal-button');

    const enhancedDescModalOverlay = document.getElementById('enhanced-desc-modal-overlay');
    const enhancedDescModalTitle = document.getElementById('enhanced-desc-modal-title');
    const enhancedDescModalContentArea = document.getElementById('enhanced-desc-modal-content-area');
    const closeEnhancedDescModalButton = document.getElementById('close-enhanced-desc-modal-button');

    const confirmationMessageGlobal = document.getElementById('confirmation-message-global');
    const travelStyleButtonsContainer = document.getElementById('travel-style-buttons-container');
    const clearTravelStyleButton = document.getElementById('clear-travel-style-button');


    // Estado da Aplicação
    let allTours = [];
    let cart = [];
    let currentPage = 'countrySelection'; // 'countrySelection' ou 'tours'
    let selectedSubcategory = 'all';
    let selectedTravelStyle = '';

    const logoUrl = "./Marca.png"; // Certifique-se que este caminho está correto

    // Dados dos Passeios
    const toursData = [
        // COLE AQUI O CONTEÚDO COMPLETO DA VARIÁVEL newToursData DO CÓDIGO REACT ANTERIOR
        // Exemplo de como começar a colar:
        // TOUR EM GRUPO
        { id: 15, name: "Tour Dubai Compartilhado Meio Periodo (6h)", description: "adulto ou kids +3 anos", price: 60.00, imageUrl: "https://placehold.co/400x250/FFD700/000000?text=Tour+Dubai+Grupo+6h", category: "TOUR EM GRUPO" },
        { id: 16, name: "Tour Abu Dhabi Compartilhado - Tradicional / Dia Todo (8h)", description: "adulto ou kids +3 anos", price: 100.00, imageUrl: "https://placehold.co/400x250/FFC107/000000?text=Tour+Abu+Dhabi+Grupo", category: "TOUR EM GRUPO" },
        { id: 17, name: "Tour Abu Dhabi Compartilhado c/ Parque - Dia Todo (8h)", description: "adulto ou kids +3 anos", price: 167.00, imageUrl: "https://placehold.co/400x250/FFC107/000000?text=Tour+AD+Grupo+Parque", category: "TOUR EM GRUPO" },
        { id: 18, name: "Iate Compartilhado c/ Churrasco", description: "adulto ou kids", price: 132.00, imageUrl: "https://placehold.co/400x250/007BFF/FFFFFF?text=Iate+Churrasco", category: "TOUR EM GRUPO" },
        { id: 19, name: "Tour Dubai Meio Periodo (4h)", description: "Guia e carro privativo. Preço (por pessoa) para 4+ pessoas: $87.50. Consulte para outros tamanhos.", price: 87.50, imageUrl: "https://placehold.co/400x250/28A745/FFFFFF?text=Tour+Dubai+Privado+4h", category: "TOUR DUBAI" },
        { id: 20, name: "Tour Dubai Dia Todo (8h)", description: "Guia e carro privativo. Preço (por pessoa) para 4+ pessoas: $137.50. Consulte para outros tamanhos.", price: 137.50, imageUrl: "https://placehold.co/400x250/28A745/FFFFFF?text=Tour+Dubai+Privado+8h", category: "TOUR DUBAI" },
        { id: 21, name: "Tour Dubai Ônibus 2025 Corporativo (até 35p) - Dia Todo (10h)", description: "Ideal para grupos grandes", price: 479.56, imageUrl: "https://placehold.co/400x250/28A745/FFFFFF?text=Tour+Dubai+Onibus", category: "TOUR DUBAI" },
        { id: 22, name: "Tour Abu Dhabi (8h)", description: "Guia e carro privativo. Preço (por pessoa) para 4+ pessoas: $172.00. Consulte para outros tamanhos.", price: 172.00, imageUrl: "https://placehold.co/400x250/FFC107/000000?text=Tour+AD+Privado+8h", category: "TOUR ABU DHABI" },
        { id: 23, name: "Tour Jebel Jais - Montanhas (Dia Todo - 8h)", description: "Guia e carro privativo. Preço (por pessoa) para 4+ pessoas (mínimo 2): $172.00. Consulte para outros tamanhos.", price: 172.00, imageUrl: "https://placehold.co/400x250/A0522D/FFFFFF?text=Tour+RAK+Jebel+Jais", category: "TOUR RAK" },
        { id: 24, name: "Tour Hatta Montanhas (Dia Todo - 8h)", description: "Guia e carro privativo. Preço (por pessoa) para 4+ pessoas (mínimo 2): $172.00. Consulte para outros tamanhos.", price: 172.00, imageUrl: "https://placehold.co/400x250/5F9EA0/FFFFFF?text=Tour+Hatta+Privado", category: "HATTA" },
        { id: 25, name: "Representante no Aeroporto (Português)", description: "Assistência fora da imigração", price: 163.49, imageUrl: "https://placehold.co/400x250/808080/FFFFFF?text=Rep+Aeroporto+PT", category: "TRANSLADO" },
        { id: 26, name: "Serviço de Recepção (Meet & Greet - Inglês)", description: "Assistência dentro do Terminal DXB", price: 217.98, imageUrl: "https://placehold.co/400x250/808080/FFFFFF?text=Meet+Greet+DXB", category: "TRANSLADO" },
        { id: 27, name: "Translado Aeroporto DXB ↔ Hotel Dubai (1 Trecho)", description: "Carro privativo. Preço (por trecho) para 1 pessoa: $95.00. Consulte para mais pessoas.", price: 95.00, imageUrl: "https://placehold.co/400x250/808080/FFFFFF?text=Translado+Privado+DXB", category: "TRANSLADO" },
        { id: 28, name: "Translado Aeroporto DXB ↔ Hotel Dubai (1 Trecho) - Ônibus Corporativo", description: "Até 35 pessoas", price: 386.92, imageUrl: "https://placehold.co/400x250/808080/FFFFFF?text=Translado+Onibus+DXB", category: "TRANSLADO" },
        { id: 29, name: "Translado Abu Dhabi ↔ Dubai (1 Trecho)", description: "Carro privativo (1-3 pessoas). Preço total por trecho: $190.74. Consulte para grupos maiores.", price: 190.74, imageUrl: "https://placehold.co/400x250/808080/FFFFFF?text=Translado+AUH-DXB", category: "TRANSLADO" },
        { id: 30, name: "Carro c/ Motorista (Sem Guia) - Meio Período (4h)", description: "Disposição em Dubai. Preço total (por carro) para 1-5 pessoas: $190.74.", price: 190.74, imageUrl: "https://placehold.co/400x250/4682B4/FFFFFF?text=Carro+Motorista+4h+DXB", category: "CARRO COM MOTORISTA" },
        { id: 31, name: "Carro c/ Motorista (Sem Guia) - Dia Todo (8h)", description: "Disposição em Dubai. Preço total (por carro) para 1-5 pessoas: $299.73.", price: 299.73, imageUrl: "https://placehold.co/400x250/4682B4/FFFFFF?text=Carro+Motorista+8h+DXB", category: "CARRO COM MOTORISTA" },
        { id: 32, name: "Carro c/ Motorista (Sem Guia) - Dia Todo (8h) - Abu Dhabi", description: "Disposição em Abu Dhabi (partindo de Abu Dhabi). Preço total (por carro) para 1-5 pessoas: $299.73.", price: 299.73, imageUrl: "https://placehold.co/400x250/4682B4/FFFFFF?text=Carro+Motorista+8h+AUH", category: "ABU DHABI CARRO" },
        { id: 33, name: "Safari no Deserto Compartilhado", description: "Completo c/ Jantar (Bebidas Alcoólicas à parte)", price: 110.00, imageUrl: "https://placehold.co/400x250/F8D800/000000?text=Safari+Compartilhado", category: "DESERTO" },
        { id: 34, name: "Adicional Guia em Português para Safari", description: "Valor total para o serviço de guia (adicionar ao Safari VIP)", price: 280.00, imageUrl: "https://placehold.co/400x250/F8D800/000000?text=Guia+PT+Safari", category: "DESERTO" },
        { id: 35, name: "Adicional Menu Chef 5 Estrelas", description: "Upgrade para o jantar no deserto (por pessoa)", price: 163.49, imageUrl: "https://placehold.co/400x250/F8D800/000000?text=Menu+Chef+Safari", category: "DESERTO" },
        { id: 36, name: "Safari no Deserto VIP Privativo", description: "Completo c/ Jantar - Carro VIP. Preço (por pessoa) para 6 pessoas: $110.00. Consulte para outros tamanhos.", price: 110.00, imageUrl: "https://placehold.co/400x250/F8D800/000000?text=Safari+VIP+Privado", category: "DESERTO" },
        { id: 37, name: "Safari no Deserto com Jantar (Bebidas Inclusas)", description: "Inclui bebidas alcoólicas selecionadas", price: 220.00, imageUrl: "https://placehold.co/400x250/F8D800/000000?text=Safari+Bebidas+Inc", category: "DESERTO" },
        { id: 38, name: "1 Jetski (30 min) - 1 pessoa", description: "Pilotando sozinho", price: 82.00, imageUrl: "https://placehold.co/400x250/007BFF/FFFFFF?text=Jetski+1pax", category: "WATER" },
        { id: 39, name: "1 Jetski (30 min) - 2 pessoas", description: "Compartilhando o mesmo Jetski (preço por pessoa)", price: 41.00, imageUrl: "https://placehold.co/400x250/007BFF/FFFFFF?text=Jetski+2pax", category: "WATER" },
        { id: 40, name: "1 Jetcar (30 min) - 2 pessoas", description: "Valor total para o Jetcar", price: 275.00, imageUrl: "https://placehold.co/400x250/007BFF/FFFFFF?text=Jetcar", category: "WATER" },
        { id: 41, name: "Parasailing (30 min) - 1 pessoa", description: "Voo individual", price: 82.00, imageUrl: "https://placehold.co/400x250/007BFF/FFFFFF?text=Parasailing", category: "WATER" },
        { id: 42, name: "Yacht 44 pés (3 horas)", description: "Capacidade até 12 pessoas (Valor total do aluguel)", price: 600.00, imageUrl: "https://placehold.co/400x250/007BFF/FFFFFF?text=Yacht+44ft", category: "WATER" },
        { id: 43, name: "Mergulho em Dubai (30 Minutos)", description: "Para iniciantes ou experientes (adulto ou kids)", price: 132.00, imageUrl: "https://placehold.co/400x250/007BFF/FFFFFF?text=Mergulho+Dubai", category: "WATER" },
        { id: 44, name: "Deep Diving - Mergulhadores Certificados (Pacote Padrão)", description: "Profundidade: 12-30 m (Duração: 40 min)", price: 330.00, imageUrl: "https://placehold.co/400x250/007BFF/FFFFFF?text=Deep+Dive+Padrao", category: "WATER" },
        { id: 45, name: "Deep Diving - Mergulhadores Certificados (Pacote c/ Certificado)", description: "Profundidade: 12-30 m (Duração: 40 min) + Certificado", price: 654.00, imageUrl: "https://placehold.co/400x250/007BFF/FFFFFF?text=Deep+Dive+Cert", category: "WATER" },
        { id: 46, name: "Helicóptero 12 min - 1 adulto", description: "Voo panorâmico", price: 194.00, imageUrl: "https://placehold.co/400x250/87CEEB/000000?text=Helicoptero+12min", category: "AIR" },
        { id: 47, name: "Helicóptero 17 min - 1 adulto", description: "Voo panorâmico estendido", price: 260.00, imageUrl: "https://placehold.co/400x250/87CEEB/000000?text=Helicoptero+17min", category: "AIR" },
        { id: 48, name: "Helicóptero 22 min - 1 adulto", description: "Voo panorâmico longo", price: 355.00, imageUrl: "https://placehold.co/400x250/87CEEB/000000?text=Helicoptero+22min", category: "AIR" },
        { id: 49, name: "Helicóptero 30 min - 1 adulto", description: "Voo panorâmico completo", price: 383.00, imageUrl: "https://placehold.co/400x250/87CEEB/000000?text=Helicoptero+30min", category: "AIR" },
        { id: 50, name: "Balão no Deserto ao Nascer do Sol", description: "Com café da manhã (adulto)", price: 545.00, imageUrl: "https://placehold.co/400x250/87CEEB/000000?text=Balao+Deserto", category: "AIR" },
        { id: 51, name: "Ingresso Global Village (Qualquer Dia)", description: "Adulto ou kids (+3 anos)", price: 8.17, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=Global+Village", category: "DUBAI TICKETS" },
        { id: 52, name: "Ingresso The View (Vista Palmeira) - Com Fila", description: "Adulto", price: 29.97, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=The+View+Fila+Adulto", category: "DUBAI TICKETS" },
        { id: 53, name: "Ingresso The View (Vista Palmeira) - Com Fila", description: "Kids", price: 20.44, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=The+View+Fila+Kids", category: "DUBAI TICKETS" },
        { id: 54, name: "Ingresso The View (Vista Palmeira) - Sem Fila", description: "Adulto", price: 48.00, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=The+View+Adulto", category: "DUBAI TICKETS" },
        { id: 55, name: "Ingresso The View (Vista Palmeira) - Sem Fila", description: "Criança", price: 33.00, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=The+View+Crianca", category: "DUBAI TICKETS" },
        { id: 56, name: "Ingresso Burj Khalifa 124/125 c/ Fila (Após 14h)", description: "Adulto", price: 70.84, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=BK+124+Tarde+Adulto", category: "DUBAI TICKETS" },
        { id: 57, name: "Ingresso Burj Khalifa 124/125 c/ Fila (Após 14h)", description: "Kids (3-8 anos)", price: 44.96, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=BK+124+Tarde+Kids", category: "DUBAI TICKETS" },
        { id: 58, name: "Ingresso Burj Khalifa 124/125 c/ Fila (9h-14h)", description: "Adulto", price: 49.05, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=BK+124+Manha+Adulto", category: "DUBAI TICKETS" },
        { id: 59, name: "Ingresso Burj Khalifa 124/125 c/ Fila (9h-14h)", description: "Kids (3-8 anos)", price: 39.78, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=BK+124+Manha+Kids", category: "DUBAI TICKETS" },
        { id: 60, name: "Ingresso Burj Khalifa 124/125 c/ Fila + Aquário", description: "Adulto", price: 84.47, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=BK+Aquario+Adulto", category: "DUBAI TICKETS" },
        { id: 61, name: "Ingresso Burj Khalifa 124/125 c/ Fila + Aquário", description: "Kids (3-8 anos)", price: 74.93, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=BK+Aquario+Kids", category: "DUBAI TICKETS" },
        { id: 62, name: "Ingresso Burj Khalifa 124/125/148 s/ Fila (Após 14h)", description: "Adulto ou Kids", price: 152.00, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=BK+148+Tarde", category: "DUBAI TICKETS" },
        { id: 63, name: "Ingresso Burj Khalifa 124/125/148 s/ Fila (9h-14h)", description: "Adulto ou Kids", price: 109.00, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=BK+148+Manha", category: "DUBAI TICKETS" },
        { id: 64, name: "Ingresso Burj Khalifa s/ Fila Andar 154", description: "Adulto ou Kids", price: 221.00, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=BK+154", category: "DUBAI TICKETS" },
        { id: 65, name: "Ingresso Sky Views Observatory + Escorregador", description: "Adulto", price: 68.12, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=Sky+Views+Obs", category: "DUBAI TICKETS" },
        { id: 66, name: "Ingresso Museu do Futuro", description: "Adulto ou Kids", price: 42.00, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=Museu+Futuro", category: "DUBAI TICKETS" },
        { id: 67, name: "Ingresso The Frame (Moldura Dourada)", description: "Adulto", price: 15.00, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=The+Frame+Adulto", category: "DUBAI TICKETS" },
        { id: 68, name: "Ingresso The Frame (Moldura Dourada)", description: "Kids (3-12 anos)", price: 6.94, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=The+Frame+Kids", category: "DUBAI TICKETS" },
        { id: 69, name: "Ingresso Aquário Dubai Mall", description: "Adulto", price: 55.00, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=Aquario+Dubai+Mall", category: "DUBAI TICKETS" },
        { id: 70, name: "Ingresso Miracle Garden", description: "Adulto", price: 28.00, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=Miracle+Garden+Adulto", category: "DUBAI TICKETS" },
        { id: 71, name: "Ingresso Miracle Garden", description: "Criança (3-12 anos)", price: 23.16, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=Miracle+Garden+Crianca", category: "DUBAI TICKETS" },
        { id: 72, name: "Ingresso Ski Dubai", description: "Adulto/Kids", price: 100.00, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=Ski+Dubai", category: "DUBAI TICKETS" },
        { id: 73, name: "Tour Guiado Burj al Arab", description: "Adulto", price: 68.12, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=Tour+Burj+Al+Arab", category: "DUBAI TICKETS" },
        { id: 74, name: "Abra Lake Ride - Show das Águas", description: "Passeio de barco durante o show", price: 18.80, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=Abra+Ride+Fontes", category: "DUBAI TICKETS" },
        { id: 75, name: "Ingresso Roda Gigante Ain Dubai c/ Corta Fila", description: "Adulto (não prime hour)", price: 53.41, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=Ain+Dubai+Fast+Track", category: "DUBAI TICKETS" },
        { id: 76, name: "Ingresso Roda Gigante Ain Dubai s/ Corta Fila", description: "Adulto (não prime hour)", price: 39.51, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=Ain+Dubai+Adulto", category: "DUBAI TICKETS" },
        { id: 77, name: "Ingresso Roda Gigante Ain Dubai s/ Corta Fila", description: "Kids (não prime hour)", price: 31.34, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=Ain+Dubai+Kids", category: "DUBAI TICKETS" },
        { id: 78, name: "Ingresso Parque IMG Worlds of Adventure (Marvel)", description: "Adulto", price: 90.00, imageUrl: "https://placehold.co/400x250/DC3545/FFFFFF?text=IMG+Marvel", category: "DUBAI PARKS" },
        { id: 79, name: "Ingresso Legoland Dubai", description: "Adulto", price: 90.00, imageUrl: "https://placehold.co/400x250/DC3545/FFFFFF?text=Legoland+Dubai", category: "DUBAI PARKS" },
        { id: 80, name: "Ingresso Parque Motiongate Dubai", description: "Adulto", price: 80.38, imageUrl: "https://placehold.co/400x250/DC3545/FFFFFF?text=Motiongate+Dubai", category: "DUBAI PARKS" },
        { id: 81, name: "Ingresso Parque Motiongate Dubai c/ Corta Fila", description: "Adulto", price: 121.25, imageUrl: "https://placehold.co/400x250/DC3545/FFFFFF?text=Motiongate+Fast+Track", category: "DUBAI PARKS" },
        { id: 82, name: "Ingresso Legoland Water Park", description: "Adulto", price: 90.00, imageUrl: "https://placehold.co/400x250/DC3545/FFFFFF?text=Legoland+WaterPark", category: "DUBAI PARKS" },
        { id: 83, name: "Ingresso Parque Real Madrid World", description: "Adulto", price: 90.00, imageUrl: "https://placehold.co/400x250/DC3545/FFFFFF?text=Real+Madrid+World", category: "DUBAI PARKS" },
        { id: 84, name: "Ingresso Parque Aquático Atlantis Aquaventure", description: "Adulto", price: 90.00, imageUrl: "https://placehold.co/400x250/DC3545/FFFFFF?text=Aquaventure+Standard", category: "DUBAI PARKS" },
        { id: 85, name: "Ingresso Parque Aquático Atlantis Aquaventure c/ Corta Fila", description: "Adulto", price: 180.00, imageUrl: "https://placehold.co/400x250/DC3545/FFFFFF?text=Aquaventure+Fast+Track", category: "DUBAI PARKS" },
        { id: 86, name: "Ingresso Dubai Safari Park Zoo", description: "Adulto", price: 14.99, imageUrl: "https://placehold.co/400x250/DC3545/FFFFFF?text=Safari+Park+Adulto", category: "DUBAI PARKS" },
        { id: 87, name: "Ingresso Dubai Safari Park Zoo", description: "Criança (3-12 anos)", price: 6.81, imageUrl: "https://placehold.co/400x250/DC3545/FFFFFF?text=Safari+Park+Crianca", category: "DUBAI PARKS" },
        { id: 88, name: "Ingresso Experiência Dubai Safari Park Zoo", description: "Adulto", price: 35.42, imageUrl: "https://placehold.co/400x250/DC3545/FFFFFF?text=Safari+Park+Exp+Adulto", category: "DUBAI PARKS" },
        { id: 89, name: "Ingresso Experiência Dubai Safari Park Zoo", description: "Criança (3-12 anos)", price: 27.25, imageUrl: "https://placehold.co/400x250/DC3545/FFFFFF?text=Safari+Park+Exp+Crianca", category: "DUBAI PARKS" },
        { id: 90, name: "Ingresso Palácio Presidencial (Qasr Al Watan)", description: "Adulto", price: 18.00, imageUrl: "https://placehold.co/400x250/FF4500/FFFFFF?text=Qasr+Al+Watan", category: "ABU DHABI TICKETS" },
        { id: 91, name: "Ingresso Museu do Louvre Abu Dhabi", description: "Adulto", price: 18.00, imageUrl: "https://placehold.co/400x250/FF4500/FFFFFF?text=Louvre+AD", category: "ABU DHABI TICKETS" },
        { id: 92, name: "Ingresso Grande Mesquita Sheikh Zayed", description: "Entrada gratuita (agendamento recomendado)", price: 0.00, imageUrl: "https://placehold.co/400x250/FF4500/FFFFFF?text=Grande+Mesquita+AD", category: "ABU DHABI TICKETS" },
        { id: 93, name: "Etihad Tower Observation Deck c/ Café da Tarde", description: "Adulto", price: 27.25, imageUrl: "https://placehold.co/400x250/FF4500/FFFFFF?text=Etihad+Tower+Cafe", category: "ABU DHABI TICKETS" },
        { id: 94, name: "Ingresso Tour Yas Marina Circuit (2 horas)", description: "Adulto", price: 43.60, imageUrl: "https://placehold.co/400x250/FF4500/FFFFFF?text=Yas+Marina+Tour", category: "ABU DHABI TICKETS" },
        { id: 95, name: "Ingresso Parque da Ferrari Abu Dhabi", description: "Adulto", price: 95.00, imageUrl: "https://placehold.co/400x250/4682B4/FFFFFF?text=Ferrari+World+AD", category: "ABU DHABI PARKS" },
        { id: 96, name: "Ingresso Parque Warner Bros World Abu Dhabi", description: "Adulto", price: 104.00, imageUrl: "https://placehold.co/400x250/4682B4/FFFFFF?text=Warner+Bros+AD", category: "ABU DHABI PARKS" },
        { id: 97, name: "Ingresso Sea World Abu Dhabi", description: "Adulto", price: 104.00, imageUrl: "https://placehold.co/400x250/4682B4/FFFFFF?text=SeaWorld+AD", category: "ABU DHABI PARKS" },
        { id: 98, name: "Ingresso 2 Parques Abu Dhabi (a escolher)", description: "Adulto", price: 129.43, imageUrl: "https://placehold.co/400x250/4682B4/FFFFFF?text=2+Parques+AD+Adulto", category: "ABU DHABI PARKS" },
        { id: 99, name: "Ingresso 3 Parques Abu Dhabi (a escolher)", description: "Adulto", price: 156.68, imageUrl: "https://placehold.co/400x250/4682B4/FFFFFF?text=3+Parques+AD+Adulto", category: "ABU DHABI PARKS" },
        { id: 100, name: "Ingresso 2 Parques Abu Dhabi (a escolher)", description: "Criança", price: 129.43, imageUrl: "https://placehold.co/400x250/4682B4/FFFFFF?text=2+Parques+AD+Crianca", category: "ABU DHABI PARKS" },
        { id: 101, name: "La Perle - Assento Normal", description: "Ingresso para o show (Bronze/Silver/Gold - verificar disponibilidade)", price: 81.74, imageUrl: "https://placehold.co/400x250/FF6347/FFFFFF?text=La+Perle+Normal", category: "LA PERLE" },
        { id: 102, name: "La Perle - Assento Platinum + Foods & Drinks", description: "Melhores assentos com acesso ao lounge VIP, snacks e bebidas", price: 141.69, imageUrl: "https://placehold.co/400x250/FF6347/FFFFFF?text=La+Perle+Platinum", category: "LA PERLE" },
        { id: 103, name: "Serviço de Reservas e Indicações", description: "Restaurantes e Beach Clubs (valor único pelo serviço)", price: 50.00, imageUrl: "https://placehold.co/400x250/17A2B8/FFFFFF?text=Reservas+Portare", category: "PORTARE SERVIÇOS" },
        { id: 104, name: "Roteiro Personalizado", description: "Planejamento detalhado da sua viagem (valor único)", price: 200.00, imageUrl: "https://placehold.co/400x250/17A2B8/FFFFFF?text=Roteiro+Portare", category: "PORTARE SERVIÇOS" },
        { id: 105, name: "Atendimento VIP 24h + Roteiro", description: "Suporte telefônico contínuo + roteiro (valor por dia)", price: 100.00, imageUrl: "https://placehold.co/400x250/17A2B8/FFFFFF?text=VIP+Portare", category: "PORTARE SERVIÇOS" },
        { id: 106, name: "Staff (Acompanhante não Guia) em Português - Dia Todo", description: "8 horas, sem carro (valor por staff/dia)", price: 177.11, imageUrl: "https://placehold.co/400x250/17A2B8/FFFFFF?text=Staff+8h+Portare", category: "PORTARE SERVIÇOS" },
        { id: 107, name: "Staff (Acompanhante não Guia) em Português - Meio Período", description: "4 horas, sem carro (valor por staff/meio-período)", price: 108.99, imageUrl: "https://placehold.co/400x250/17A2B8/FFFFFF?text=Staff+4h+Portare", category: "PORTARE SERVIÇOS" },
        { id: 108, name: "Sala de Conferência + Coffee Break (Abu Dhabi)", description: "Até 5 horas totais, 1 coffee break (Hotel em Abu Dhabi - valor por pessoa)", price: 57.22, imageUrl: "https://placehold.co/400x250/6C757D/FFFFFF?text=Conferencia+AD", category: "EVENTOS" },
    ];
    allTours = toursData;

    const subcategories = [
        { label: "Todos", value: "all" }, { label: "TOUR EM GRUPO", value: "TOUR EM GRUPO" }, { label: "TOUR DUBAI", value: "TOUR DUBAI" }, { label: "TOUR ABU DHABI", value: "TOUR ABU DHABI" }, { label: "TOUR RAK", value: "TOUR RAK" },  { label: "HATTA", value: "HATTA" }, { label: "TRANSLADO", value: "TRANSLADO" }, { label: "CARRO COM MOTORISTA", value: "CARRO COM MOTORISTA" }, { label: "ABU DHABI CARRO", value: "ABU DHABI CARRO" },  { label: "DESERTO", value: "DESERTO" }, { label: "WATER", value: "WATER" }, { label: "AIR", value: "AIR" }, { label: "DUBAI TICKETS", value: "DUBAI TICKETS" }, { label: "DUBAI PARKS", value: "DUBAI PARKS" }, { label: "ABU DHABI TICKETS", value: "ABU DHABI TICKETS" }, { label: "ABU DHABI PARKS", value: "ABU DHABI PARKS" }, { label: "LA PERLE", value: "LA PERLE" }, { label: "PORTARE SERVIÇOS", value: "PORTARE SERVIÇOS" },  { label: "EVENTOS", value: "EVENTOS" },
    ];

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
            renderSubcategoryButtons();
            renderTours();
        }
    }

    function renderCountries() {
        countriesGrid.innerHTML = '';
        const countriesData = [
            { name: "Dubai e Abu Dhabi", image: "https://placehold.co/400x250/0D7C6C/FFF9D7?text=Dubai+%26+Abu+Dhabi+Skyline", targetPage: 'tours' },
            { name: "Egito", image: "https://placehold.co/400x250/2FBA52/FFF9D7?text=Pir%C3%A2mides+do+Egito", message: 'Passeios para Egito em breve!' },
            { name: "Maldivas", image: "https://placehold.co/400x250/33C4B6/FFF9D7?text=Maldivas+Praia", message: 'Passeios para Maldivas em breve!' },
            { name: "Japão", image: "https://placehold.co/400x250/0A7216/FFF9D7?text=Monte+Fuji+Jap%C3%A3o", message: 'Passeios para Japão em breve!' },
        ];

        countriesData.forEach(country => {
            const countryDiv = document.createElement('div');
            countryDiv.className = "bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-center text-center p-4";
            countryDiv.onclick = () => {
                if (country.targetPage) {
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
            img.onerror = (e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x250/CCCCCC/333333?text=${country.name.replace(/\s/g, '+')}`; };

            const h3 = document.createElement('h3');
            h3.className = "text-2xl font-bold text-[#0D7C6C] font-geologica-bold";
            h3.textContent = country.name;

            countryDiv.appendChild(img);
            countryDiv.appendChild(h3);
            countriesGrid.appendChild(countryDiv);
        });
    }

    function renderSubcategoryButtons() {
        subcategoryButtonsContainer.innerHTML = '';
        subcategories.forEach(cat => {
            const button = document.createElement('button');
            button.className = `px-3 py-2 sm:px-5 sm:py-2 rounded-full font-semibold text-xs sm:text-sm transition duration-300 ease-in-out font-geologica-light ${selectedSubcategory === cat.value ? 'bg-[#0D7C6C] text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`;
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
        const filteredTours = allTours.filter(tour => selectedSubcategory === 'all' || tour.category === selectedSubcategory);

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
            priceSpan.className = 'text-lg sm:text-xl font-extrabold text-[#0D7C6C] font-geologica-bold mb-2 sm:mb-0';
            priceSpan.textContent = `AED ${tour.price.toFixed(2)}`;

            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = 1;
            quantityInput.min = 1;
            quantityInput.className = 'w-16 text-center border border-gray-300 rounded-md px-2 py-1 text-sm mr-2'; // Adicionado mr-2 para espaçamento
            quantityInput.addEventListener('click', (e) => e.stopPropagation()); // Prevent card click when clicking input

            const addButton = document.createElement('button');
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
        cartTotalElement.textContent = `AED ${totalPrice.toFixed(2)}`;
    }

    function renderTravelStyleButtons() {
        travelStyleButtonsContainer.innerHTML = '';
        travelStyles.forEach(style => {
            const button = document.createElement('button');
            button.className = `px-3 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 ${selectedTravelStyle === style.value ? 'bg-[#0D7C6C] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`;
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

    // Funções da API Gemini
    async function callGeminiAPI(prompt) {
        const apiKey = ""; // Canvas will provide
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
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
            console.error("Error calling Gemini API:", error);
            throw error; // Re-throw para ser pego pela função chamadora
        }
    }

    async function handleGenerateEnhancedDescription(tour) {
        if (!tour) return;
        enhancedDescModalTitle.textContent = tour.name;
        enhancedDescModalOverlay.style.display = 'flex';
        showLoading(enhancedDescModalContentArea, "Gerando descrição detalhada...");

        const prompt = `Gere uma descrição detalhada e atraente para o seguinte passeio turístico em Dubai/Abu Dhabi:
Nome do Passeio: ${tour.name}
Descrição Curta Atual: ${tour.description}
Preço: AED ${tour.price.toFixed(2)}

A descrição deve ser mais elaborada, destacando os principais atrativos, experiências únicas, e o que o torna especial. Use um tom convidativo e informativo. Se possível, adicione uma curiosidade ou dica relacionada ao passeio. Formate com parágrafos para fácil leitura.`;

        try {
            const description = await callGeminiAPI(prompt);
            enhancedDescModalContentArea.innerHTML = `<div class="ai-generated-content">${formatAIResponse(description)}</div>`;
        } catch (error) {
            showError(enhancedDescModalContentArea, `Ocorreu um erro: ${error.message}. Por favor, tente novamente.`);
        }
    }

    async function handleGenerateItinerary() {
        if (cart.length === 0) {
            showConfirmationMessage("Adicione passeios ao carrinho para gerar um roteiro!");
            return;
        }
        itineraryModalOverlay.style.display = 'flex';
        showLoading(itineraryModalContentArea, "Gerando seu roteiro...");

        const tourList = cart.map(item => `${item.name} (x${item.quantity})`).join(', ');
        let prompt = `Crie um roteiro de viagem personalizado para Dubai e/ou Abu Dhabi com base nos seguintes passeios selecionados: ${tourList}.`;
        if (selectedTravelStyle) {
            prompt += ` O estilo de viagem preferido é: ${selectedTravelStyle}.`;
        }
        prompt += ` Inclua uma sugestão de ordem para os passeios, considerando a logística e horários. Adicione também sugestões de atividades complementares (como restaurantes, compras, ou outros pontos de interesse próximos aos passeios selecionados) e dicas gerais para aproveitar ao máximo a viagem aos Emirados Árabes. Formate a resposta de forma clara e organizada, com títulos para cada dia ou seção.`;

        try {
            const itinerary = await callGeminiAPI(prompt);
            itineraryModalContentArea.innerHTML = `<div class="ai-generated-content">${formatAIResponse(itinerary)}</div>`;
        } catch (error) {
            showError(itineraryModalContentArea, `Ocorreu um erro: ${error.message}. Por favor, tente novamente.`);
        }
    }


    // Event Listeners
    cartButton.addEventListener('click', openCartSidebar);
    closeCartButton.addEventListener('click', closeCartSidebar);
    closeItineraryModalButton.addEventListener('click', () => itineraryModalOverlay.style.display = 'none');
    closeEnhancedDescModalButton.addEventListener('click', () => enhancedDescModalOverlay.style.display = 'none');
    generateItineraryButton.addEventListener('click', handleGenerateItinerary);

    backToCountryButton.addEventListener('click', () => {
        currentPage = 'countrySelection';
        renderPage();
    });

    whatsappQuoteButton.addEventListener('click', () => {
        if (cart.length === 0) {
            showConfirmationMessage("Seu carrinho está vazio. Adicione passeios antes de solicitar um orçamento.");
            return;
        }
        let message = "Olá, Portare Travel! Gostaria de solicitar um orçamento para os seguintes passeios:\n\n";
        cart.forEach((item) => {
            message += `- ${item.name} (x${item.quantity}) - AED ${item.price.toFixed(2)} cada\n`;
        });
        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        message += `\nTotal Estimado: AED ${totalPrice.toFixed(2)}\n`;
        message += "Por favor, entre em contato para mais detalhes.";
        const whatsappNumber = "+971 52 381 1226"; // Seu número do WhatsApp
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
    renderCart(); // Para estado inicial do carrinho
    renderTravelStyleButtons();

    // Adiciona a função ao objeto window para acesso global
    window.headerLogoClick = () => {
        currentPage = 'countrySelection';
        renderPage();
    };
});
// Fim do JavaScript
