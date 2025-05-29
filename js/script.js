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
    const headerLogo = document.getElementById('header-logo'); // Get the logo element

    // Estado da Aplicação
    let allTours = [];
    let cart = [];
    let currentPage = 'countrySelection'; // 'countrySelection' ou 'tours'
    let selectedSubcategory = 'all';
    let selectedTravelStyle = '';

    const logoUrl = "./Marca.png"; // Certifique-se que este caminho está correto

    // Dados dos Passeios
    // NOTE: In a production application, this data would typically be fetched from a backend API
    // or managed in a more dynamic way rather than hardcoded in the JS file.
    const toursData = [
        // COLE AQUI O CONTEÚDO COMPLETO DA VARIÁVEL newToursData DO CÓDIGO REACT ANTERIOR
        // Exemplo de como começar a colar:
        // TOUR EM GRUPO
        { id: 15, name: "Tour Dubai Compartilhado Meio Periodo (6h)", description: "Explore os destaques de Dubai em um tour compartilhado de 6 horas. Visite pontos icônicos como o Burj Khalifa (vista externa), a Mesquita Jumeirah, o bairro histórico de Al Fahidi e os souks. Ideal para quem busca uma experiência completa e econômica. Inclui transporte em grupo. (Preço por pessoa, aplicável para adultos e crianças a partir de 3 anos)", price: 60.00, imageUrl: "https://placehold.co/400x250/FFD700/000000?text=Tour+Dubai+Grupo+6h", category: "TOUR EM GRUPO" },
        { id: 16, name: "Tour Abu Dhabi Compartilhado - Tradicional / Dia Todo (8h)", description: "Descubra a capital dos Emirados Árabes Unidos em um tour compartilhado de dia inteiro (8 horas). Visite a majestosa Grande Mesquita Sheikh Zayed, o Palácio Presidencial Qasr Al Watan (vista externa) e passeie pela Corniche. Uma imersão na cultura e modernidade de Abu Dhabi. Inclui transporte em grupo. (Preço por pessoa, aplicável para adultos e crianças a partir de 3 anos)", price: 100.00, imageUrl: "https://placehold.co/400x250/FFC107/000000?text=Tour+Abu+Dhabi+Grupo", category: "TOUR EM GRUPO" },
        { id: 17, name: "Tour Abu Dhabi Compartilhado c/ Parque - Dia Todo (8h)", description: "Combine a visita aos principais pontos turísticos de Abu Dhabi com a diversão de um parque temático (ingresso do parque não incluso). Tour compartilhado de dia inteiro (8 horas) visitando a Grande Mesquita e outros locais, com tempo livre para visitar um dos parques da Ilha Yas (Ferrari World, Warner Bros. World ou SeaWorld). Inclui transporte em grupo. (Preço por pessoa, aplicável para adultos e crianças a partir de 3 anos)", price: 167.00, imageUrl: "https://placehold.co/400x250/FFC107/000000?text=Tour+AD+Grupo+Parque", category: "TOUR EM GRUPO" },
        { id: 18, name: "Iate Compartilhado c/ Churrasco", description: "Desfrute de um passeio de iate compartilhado pelas águas de Dubai, com vistas deslumbrantes do skyline e da Palm Jumeirah. Inclui um delicioso churrasco a bordo para uma experiência relaxante e divertida no mar. (Preço por pessoa, aplicável para adultos e crianças)", price: 132.00, imageUrl: "https://placehold.co/400x250/007BFF/FFFFFF?text=Iate+Churrasco", category: "TOUR EM GRUPO" },
        { id: 19, name: "Tour Dubai Meio Periodo (4h)", description: "Um tour privativo de 4 horas por Dubai com guia e carro exclusivos para o seu grupo. Personalize o roteiro para visitar os locais que mais lhe interessam, com a flexibilidade e conforto de um serviço dedicado. Ideal para famílias ou pequenos grupos. (Preço por pessoa, baseado em 4+ pessoas. Consulte para outros tamanhos de grupo)", price: 87.50, imageUrl: "https://placehold.co/400x250/28A745/FFFFFF?text=Tour+Dubai+Privado+4h", category: "TOUR DUBAI" },
        { id: 20, name: "Tour Dubai Dia Todo (8h)", description: "Explore Dubai em profundidade com um tour privativo de dia inteiro (8 horas), incluindo guia e carro à sua disposição. Tenha a liberdade de criar um roteiro completo, visitando tanto os pontos turísticos clássicos quanto os mais modernos, no seu próprio ritmo. (Preço por pessoa, baseado em 4+ pessoas. Consulte para outros tamanhos de grupo)", price: 137.50, imageUrl: "https://placehold.co/400x250/28A745/FFFFFF?text=Tour+Dubai+Privado+8h", category: "TOUR DUBAI" },
        { id: 21, name: "Tour Dubai Ônibus 2025 Corporativo (até 35p) - Dia Todo (10h)", description: "Solução ideal para grandes grupos ou eventos corporativos. Tour privativo de 10 horas em ônibus confortável com capacidade para até 35 pessoas, explorando Dubai com flexibilidade e conveniência. (Preço total pelo serviço do ônibus e guia)", price: 479.56, imageUrl: "https://placehold.co/400x250/28A745/FFFFFF?text=Tour+Dubai+Onibus", category: "TOUR DUBAI" },
        { id: 22, name: "Tour Abu Dhabi (8h)", description: "Descubra Abu Dhabi com um tour privativo de dia inteiro (8 horas), com guia e carro exclusivos para o seu grupo. Visite a Grande Mesquita, o Palácio Presidencial, o Museu do Louvre (vista externa) e outros locais de interesse com total conforto e personalização. (Preço por pessoa, baseado em 4+ pessoas. Consulte para outros tamanhos de grupo)", price: 172.00, imageUrl: "https://placehold.co/400x250/FFC107/000000?text=Tour+AD+Privado+8h", category: "TOUR ABU DHABI" },
        { id: 23, name: "Tour Jebel Jais - Montanhas (Dia Todo - 8h)", description: "Aventure-se nas montanhas de Ras Al Khaimah com um tour privativo de dia inteiro (8 horas) até Jebel Jais, o pico mais alto dos Emirados Árabes Unidos. Desfrute de paisagens desérticas e montanhosas únicas. Ideal para quem busca natureza e vistas panorâmicas. (Preço por pessoa, baseado em 4+ pessoas. Mínimo de 2 pessoas. Consulte para outros tamanhos de grupo)", price: 172.00, imageUrl: "https://placehold.co/400x250/A0522D/FFFFFF?text=Tour+RAK+Jebel+Jais", category: "TOUR RAK" },
        { id: 24, name: "Tour Hatta Montanhas (Dia Todo - 8h)", description: "Explore a beleza natural de Hatta, uma região montanhosa próxima a Dubai, em um tour privativo de dia inteiro (8 horas). Visite a represa de Hatta, o vilarejo histórico e desfrute das paisagens. Uma fuga da agitação da cidade. (Preço por pessoa, baseado em 4+ pessoas. Mínimo de 2 pessoas. Consulte para outros tamanhos de grupo)", price: 172.00, imageUrl: "https://placehold.co/400x250/5F9EA0/FFFFFF?text=Tour+Hatta+Privado", category: "HATTA" },
        { id: 25, name: "Representante no Aeroporto (Português)", description: "Receba assistência personalizada em português na sua chegada ao Aeroporto Internacional de Dubai (DXB). Nosso representante irá encontrá-lo após a imigração para auxiliar com bagagem e direcioná-lo ao seu transporte. (Valor total pelo serviço)", price: 163.49, imageUrl: "https://placehold.co/400x250/808080/FFFFFF?text=Rep+Aeroporto+PT", category: "TRANSLADO" },
        { id: 26, name: "Serviço de Recepção (Meet & Greet - Inglês)", description: "Tenha uma recepção VIP no Aeroporto Internacional de Dubai (DXB) com assistência em inglês. Um membro da equipe irá encontrá-lo dentro do terminal para agilizar os procedimentos de chegada, incluindo imigração e bagagem. (Valor total pelo serviço)", price: 217.98, imageUrl: "https://placehold.co/400x250/808080/FFFFFF?text=Meet+Greet+DXB", category: "TRANSLADO" },
        { id: 27, name: "Translado Aeroporto DXB ↔ Hotel Dubai (1 Trecho)", description: "Garanta seu transporte privativo e confortável entre o Aeroporto Internacional de Dubai (DXB) e seu hotel em Dubai. Serviço para um trecho (chegada ou partida). (Preço total por trecho para 1 pessoa. Consulte para mais pessoas ou tipos de veículo)", price: 95.00, imageUrl: "https://placehold.co/400x250/808080/FFFFFF?text=Translado+Privado+DXB", category: "TRANSLADO" },
        { id: 28, name: "Translado Aeroporto DXB ↔ Hotel Dubai (1 Trecho) - Ônibus Corporativo", description: "Transporte privativo em ônibus com capacidade para até 35 pessoas entre o Aeroporto Internacional de Dubai (DXB) e hotéis em Dubai. Ideal para grupos grandes, eventos ou viagens corporativas. Serviço para um trecho. (Preço total pelo serviço do ônibus)", price: 386.92, imageUrl: "https://placehold.co/400x250/808080/FFFFFF?text=Translado+Onibus+DXB", category: "TRANSLADO" },
        { id: 29, name: "Translado Abu Dhabi ↔ Dubai (1 Trecho)", description: "Transporte privativo e confortável entre Abu Dhabi e Dubai (ou vice-versa). Serviço para um trecho, ideal para quem chega ou parte por aeroportos diferentes ou deseja se deslocar entre as cidades. (Preço total por trecho para 1-3 pessoas. Consulte para grupos maiores)", price: 190.74, imageUrl: "https://placehold.co/400x250/808080/FFFFFF?text=Translado+AUH-DXB", category: "TRANSLADO" },
        { id: 30, name: "Carro c/ Motorista (Sem Guia) - Meio Período (4h)", description: "Tenha um carro privativo com motorista à sua disposição em Dubai por 4 horas. Ideal para deslocamentos flexíveis, visitas a múltiplos locais ou compras, sem a necessidade de um guia turístico. (Preço total pelo serviço do carro para 1-5 pessoas)", price: 190.74, imageUrl: "https://placehold.co/400x250/4682B4/FFFFFF?text=Carro+Motorista+4h+DXB", category: "CARRO COM MOTORISTA" },
        { id: 31, name: "Carro c/ Motorista (Sem Guia) - Dia Todo (8h)", description: "Tenha um carro privativo com motorista à sua disposição em Dubai por 8 horas. Máxima flexibilidade para seus deslocamentos, reuniões ou visitas pela cidade ao longo do dia. (Preço total pelo serviço do carro para 1-5 pessoas)", price: 299.73, imageUrl: "https://placehold.co/400x250/4682B4/FFFFFF?text=Carro+Motorista+8h+DXB", category: "CARRO COM MOTORISTA" },
        { id: 32, name: "Carro c/ Motorista (Sem Guia) - Dia Todo (8h) - Abu Dhabi", description: "Tenha um carro privativo com motorista à sua disposição em Abu Dhabi por 8 horas (serviço iniciando e terminando em Abu Dhabi). Ideal para explorar a capital com flexibilidade. (Preço total pelo serviço do carro para 1-5 pessoas)", price: 299.73, imageUrl: "https://placehold.co/400x250/4682B4/FFFFFF?text=Carro+Motorista+8h+AUH", category: "ABU DHABI CARRO" },
        { id: 33, name: "Safari no Deserto Compartilhado", description: "Uma experiência clássica e emocionante no deserto de Dubai. Inclui dune bashing (passeio radical nas dunas), sandboard, passeio de camelo curto, pintura de henna, show de danças típicas (Tanoura e Belly Dance) e um jantar buffet completo em um acampamento beduíno. Bebidas alcoólicas são cobradas à parte. (Preço por pessoa)", price: 110.00, imageUrl: "https://placehold.co/400x250/F8D800/000000?text=Safari+Compartilhado", category: "DESERTO" },
        { id: 34, name: "Adicional Guia em Português para Safari", description: "Adicione um guia falando português à sua experiência de Safari no Deserto VIP Privativo para ter informações e acompanhamento personalizado durante todo o passeio. (Valor total adicional pelo serviço de guia)", price: 280.00, imageUrl: "https://placehold.co/400x250/F8D800/000000?text=Guia+PT+Safari", category: "DESERTO" },
        { id: 35, name: "Adicional Menu Chef 5 Estrelas", description: "Faça um upgrade no seu jantar durante o Safari no Deserto com um menu especial preparado por um chef 5 estrelas. Uma experiência gastronômica diferenciada no coração do deserto. (Valor adicional por pessoa)", price: 163.49, imageUrl: "https://placehold.co/400x250/F8D800/000000?text=Menu+Chef+Safari", category: "DESERTO" },
        { id: 36, name: "Safari no Deserto VIP Privativo", description: "Desfrute de um Safari no Deserto exclusivo para o seu grupo em um carro VIP privativo. Inclui todas as atividades do safari tradicional (dune bashing, shows, etc.) e jantar, com a privacidade e conforto de um serviço dedicado. (Preço por pessoa, baseado em 6 pessoas. Consulte para outros tamanhos de grupo)", price: 110.00, imageUrl: "https://placehold.co/400x250/F8D800/000000?text=Safari+VIP+Privado", category: "DESERTO" },
        { id: 37, name: "Safari no Deserto com Jantar (Bebidas Inclusas)", description: "Aproveite a experiência completa do Safari no Deserto, incluindo todas as atividades e o jantar buffet, com a conveniência de ter bebidas (seleção de bebidas alcoólicas e não alcoólicas) já inclusas no pacote. (Preço por pessoa)", price: 220.00, imageUrl: "https://placehold.co/400x250/F8D800/000000?text=Safari+Bebidas+Inc", category: "DESERTO" },
        { id: 38, name: "1 Jetski (30 min) - 1 pessoa", description: "Sinta a adrenalina pilotando um jetski sozinho por 30 minutos nas águas de Dubai, com vistas incríveis da costa e dos marcos da cidade. (Preço por pessoa)", price: 82.00, imageUrl: "https://placehold.co/400x250/007BFF/FFFFFF?text=Jetski+1pax", category: "WATER" },
        { id: 39, name: "1 Jetski (30 min) - 2 pessoas", description: "Compartilhe a emoção de um passeio de jetski por 30 minutos com um acompanhante. O preço é por pessoa, mas vocês dividem o mesmo jetski. Uma ótima opção para casais ou amigos. (Preço por pessoa)", price: 41.00, imageUrl: "https://placehold.co/400x250/007BFF/FFFFFF?text=Jetski+2pax", category: "WATER" },
        { id: 40, name: "1 Jetcar (30 min) - 2 pessoas", description: "Experimente a sensação única de pilotar um Jetcar, um veículo aquático que parece um carro esportivo, por 30 minutos. Capacidade para 2 pessoas. Uma atividade divertida e diferente nas águas de Dubai. (Valor total pelo aluguel do Jetcar)", price: 275.00, imageUrl: "https://placehold.co/400x250/007BFF/FFFFFF?text=Jetcar", category: "WATER" },
        { id: 41, name: "Parasailing (30 min) - 1 pessoa", description: "Tenha uma vista aérea espetacular de Dubai enquanto voa de parasail por 30 minutos. Uma experiência emocionante e com paisagens inesquecíveis da costa. (Preço por pessoa para voo individual)", price: 82.00, imageUrl: "https://placehold.co/400x250/007BFF/FFFFFF?text=Parasailing", category: "WATER" },
        { id: 42, name: "Yacht 44 pés (3 horas)", description: "Alugue um iate privativo de 44 pés por 3 horas para o seu grupo. Com capacidade para até 12 pessoas, é perfeito para celebrações, passeios relaxantes ou simplesmente para desfrutar do luxo e das vistas de Dubai a partir do mar. (Valor total pelo aluguel do iate)", price: 600.00, imageUrl: "https://placehold.co/400x250/007BFF/FFFFFF?text=Yacht+44ft", category: "WATER" },
        { id: 43, name: "Mergulho em Dubai (30 Minutos)", description: "Descubra o mundo subaquático de Dubai com uma sessão de mergulho de 30 minutos. Ideal para iniciantes que querem experimentar o mergulho ou para mergulhadores experientes. Equipamento e acompanhamento inclusos. (Preço por pessoa, aplicável para adultos e crianças)", price: 132.00, imageUrl: "https://placehold.co/400x250/007BFF/FFFFFF?text=Mergulho+Dubai", category: "WATER" },
        { id: 44, name: "Deep Diving - Mergulhadores Certificados (Pacote Padrão)", description: "Mergulho profundo para mergulhadores certificados, explorando profundidades entre 12 e 30 metros por aproximadamente 40 minutos. Uma oportunidade para descobrir a vida marinha e estruturas subaquáticas. (Preço por pessoa)", price: 330.00, imageUrl: "https://placehold.co/400x250/007BFF/FFFFFF?text=Deep+Dive+Padrao", category: "WATER" },
        { id: 45, name: "Deep Diving - Mergulhadores Certificados (Pacote c/ Certificado)", description: "Mergulho profundo para mergulhadores certificados (12-30m, 40 min) com a inclusão de um certificado de participação. Ideal para quem quer registrar a experiência ou precisa comprovar o mergulho. (Preço por pessoa)", price: 654.00, imageUrl: "https://placehold.co/400x250/007BFF/FFFFFF?text=Deep+Dive+Cert", category: "WATER" },
        { id: 46, name: "Helicóptero 12 min - 1 adulto", description: "Desfrute de um voo panorâmico de helicóptero de 12 minutos sobre Dubai, com vistas aéreas incríveis dos principais marcos como Burj Khalifa, Palm Jumeirah e a costa. Uma perspectiva única da cidade. (Preço por pessoa)", price: 194.00, imageUrl: "https://placehold.co/400x250/87CEEB/000000?text=Helicoptero+12min", category: "AIR" },
        { id: 47, name: "Helicóptero 17 min - 1 adulto", description: "Voo panorâmico de helicóptero de 17 minutos, cobrindo uma área maior de Dubai e permitindo mais tempo para apreciar as vistas espetaculares da cidade e seus arredores. (Preço por pessoa)", price: 260.00, imageUrl: "https://placehold.co/400x250/87CEEB/000000?text=Helicoptero+17min", category: "AIR" },
        { id: 48, name: "Helicóptero 22 min - 1 adulto", description: "Um voo panorâmico mais extenso de 22 minutos, ideal para quem deseja ver mais de Dubai do alto, incluindo a Palm Jumeirah completa, World Islands e outros pontos distantes. (Preço por pessoa)", price: 355.00, imageUrl: "https://placehold.co/400x250/87CEEB/000000?text=Helicoptero+22min", category: "AIR" },
        { id: 49, name: "Helicóptero 30 min - 1 adulto", description: "O voo panorâmico mais completo de helicóptero, com 30 minutos para explorar Dubai do alto, cobrindo todos os principais marcos e oferecendo uma experiência inesquecível. (Preço por pessoa)", price: 383.00, imageUrl: "https://placehold.co/400x250/87CEEB/000000?text=Helicoptero+30min", category: "AIR" },
        { id: 50, name: "Balão no Deserto ao Nascer do Sol", description: "Experimente a magia do deserto de Dubai em um voo de balão ao nascer do sol. Desfrute de vistas panorâmicas incríveis das dunas e da vida selvagem, seguido de um café da manhã. Uma experiência tranquila e memorável. (Preço por pessoa, aplicável para adultos)", price: 545.00, imageUrl: "https://placehold.co/400x250/87CEEB/000000?text=Balao+Deserto", category: "AIR" },
        { id: 51, name: "Ingresso Global Village (Qualquer Dia)", description: "Acesso ao Global Village, um parque multicultural com pavilhões de diversos países, shows, comidas e compras. Válido para qualquer dia de funcionamento. (Preço por pessoa, aplicável para adultos e crianças a partir de 3 anos)", price: 8.17, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=Global+Village", category: "DUBAI TICKETS" },
        { id: 52, name: "Ingresso The View (Vista Palmeira) - Com Fila", description: "Acesso ao observatório The View at The Palm, localizado no topo da Palm Tower, com vistas 360 graus da Palm Jumeirah, do Golfo Pérsico e do skyline de Dubai. Ingresso padrão com tempo de espera na fila. (Preço por pessoa, aplicável para adultos)", price: 29.97, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=The+View+Fila+Adulto", category: "DUBAI TICKETS" },
        { id: 53, name: "Ingresso The View (Vista Palmeira) - Com Fila", description: "Acesso ao observatório The View at The Palm para crianças, com vistas espetaculares da Palm Jumeirah e arredores. Ingresso padrão com tempo de espera na fila. (Preço por pessoa, aplicável para crianças)", price: 20.44, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=The+View+Fila+Kids", category: "DUBAI TICKETS" },
        { id: 54, name: "Ingresso The View (Vista Palmeira) - Sem Fila", description: "Acesso rápido ao observatório The View at The Palm, evitando as filas. Desfrute das vistas panorâmicas da Palm Jumeirah e do skyline de Dubai com mais agilidade. (Preço por pessoa, aplicável para adultos)", price: 48.00, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=The+View+Adulto", category: "DUBAI TICKETS" },
        { id: 55, name: "Ingresso The View (Vista Palmeira) - Sem Fila", description: "Acesso rápido ao observatório The View at The Palm para crianças, sem a necessidade de esperar na fila. Vistas incríveis com mais conforto. (Preço por pessoa, aplicável para crianças)", price: 33.00, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=The+View+Crianca", category: "DUBAI TICKETS" },
        { id: 56, name: "Ingresso Burj Khalifa 124/125 c/ Fila (Após 14h)", description: "Acesso aos andares 124 e 125 do Burj Khalifa, o edifício mais alto do mundo, com vistas panorâmicas de Dubai. Ingresso padrão com tempo de espera na fila, válido para visitas após as 14h. (Preço por pessoa, aplicável para adultos)", price: 70.84, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=BK+124+Tarde+Adulto", category: "DUBAI TICKETS" },
        { id: 57, name: "Ingresso Burj Khalifa 124/125 c/ Fila (Após 14h)", description: "Acesso aos andares 124 e 125 do Burj Khalifa para crianças (3-8 anos), com vistas espetaculares de Dubai. Ingresso padrão com tempo de espera na fila, válido para visitas após as 14h. (Preço por pessoa, aplicável para crianças)", price: 44.96, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=BK+124+Tarde+Kids", category: "DUBAI TICKETS" },
        { id: 58, name: "Ingresso Burj Khalifa 124/125 c/ Fila (9h-14h)", description: "Acesso aos andares 124 e 125 do Burj Khalifa com vistas panorâmicas de Dubai. Ingresso padrão com tempo de espera na fila, válido para visitas entre 9h e 14h. (Preço por pessoa, aplicável para adultos)", price: 49.05, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=BK+124+Manha+Adulto", category: "DUBAI TICKETS" },
        { id: 59, name: "Ingresso Burj Khalifa 124/125 c/ Fila (9h-14h)", description: "Acesso aos andares 124 e 125 do Burj Khalifa para crianças (3-8 anos), com vistas espetaculares de Dubai. Ingresso padrão com tempo de espera na fila, válido para visitas entre 9h e 14h. (Preço por pessoa, aplicável para crianças)", price: 39.78, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=BK+124+Manha+Kids", category: "DUBAI TICKETS" },
        { id: 60, name: "Ingresso Burj Khalifa 124/125 c/ Fila + Aquário", description: "Combine a visita aos andares 124 e 125 do Burj Khalifa com a entrada para o Dubai Aquarium & Underwater Zoo, localizado no Dubai Mall. Ingresso padrão com tempo de espera na fila para o Burj Khalifa. (Preço por pessoa, aplicável para adultos)", price: 84.47, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=BK+Aquario+Adulto", category: "DUBAI TICKETS" },
        { id: 61, name: "Ingresso Burj Khalifa 124/125 c/ Fila + Aquário", description: "Combine a visita aos andares 124 e 125 do Burj Khalifa com a entrada para o Dubai Aquarium & Underwater Zoo para crianças (3-8 anos). Ingresso padrão com tempo de espera na fila para o Burj Khalifa. (Preço por pessoa, aplicável para crianças)", price: 74.93, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=BK+Aquario+Kids", category: "DUBAI TICKETS" },
        { id: 62, name: "Ingresso Burj Khalifa 124/125/148 s/ Fila (Após 14h)", description: "Acesso VIP sem fila aos andares 124, 125 e o exclusivo andar 148 do Burj Khalifa, o ponto de observação mais alto do mundo. Inclui lounge e bebidas. Válido para visitas após as 14h. (Preço por pessoa, aplicável para adultos e crianças)", price: 152.00, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=BK+148+Tarde", category: "DUBAI TICKETS" },
        { id: 63, name: "Ingresso Burj Khalifa 124/125/148 s/ Fila (9h-14h)", description: "Acesso VIP sem fila aos andares 124, 125 e o exclusivo andar 148 do Burj Khalifa. Inclui lounge e bebidas. Válido para visitas entre 9h e 14h. (Preço por pessoa, aplicável para adultos e crianças)", price: 109.00, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=BK+148+Manha", category: "DUBAI TICKETS" },
        { id: 64, name: "Ingresso Burj Khalifa s/ Fila Andar 154", description: "Acesso exclusivo e sem fila ao luxuoso lounge no andar 154 do Burj Khalifa, o ponto mais alto acessível ao público. Desfrute de vistas incomparáveis e serviço premium. (Preço por pessoa, aplicável para adultos e crianças)", price: 221.00, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=BK+154", category: "DUBAI TICKETS" },
        { id: 65, name: "Ingresso Sky Views Observatory + Escorregador", description: "Acesso ao Sky Views Observatory, com vistas panorâmicas de Dubai, e uma descida emocionante pelo Glass Slide (escorregador de vidro) do 53º andar. Uma experiência única e com adrenalina. (Preço por pessoa, aplicável para adultos)", price: 68.12, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=Sky+Views+Obs", category: "DUBAI TICKETS" },
        { id: 66, name: "Ingresso Museu do Futuro", description: "Explore o Museu do Futuro, um ícone arquitetônico e cultural de Dubai. Uma jornada imersiva pelas possibilidades do futuro, com exposições interativas e inovadoras. (Preço por pessoa, aplicável para adultos e crianças)", price: 42.00, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=Museu+Futuro", category: "DUBAI TICKETS" },
        { id: 67, name: "Ingresso The Frame (Moldura Dourada)", description: "Visite o The Dubai Frame, uma estrutura arquitetônica impressionante que oferece vistas únicas do 'velho' e do 'novo' Dubai. Suba ao topo para uma perspectiva panorâmica da cidade. (Preço por pessoa, aplicável para adultos)", price: 15.00, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=The+Frame+Adulto", category: "DUBAI TICKETS" },
        { id: 68, name: "Ingresso The Frame (Moldura Dourada)", description: "Visite o The Dubai Frame com ingresso para crianças (3-12 anos). Uma forma divertida e educativa de ver a evolução de Dubai. (Preço por pessoa, aplicável para crianças)", price: 6.94, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=The+Frame+Kids", category: "DUBAI TICKETS" },
        { id: 69, name: "Ingresso Aquário Dubai Mall", description: "Acesso ao Dubai Aquarium & Underwater Zoo, um dos maiores aquários suspensos do mundo, localizado no Dubai Mall. Observe uma variedade incrível de vida marinha. (Preço por pessoa, aplicável para adultos)", price: 55.00, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=Aquario+Dubai+Mall", category: "DUBAI TICKETS" },
        { id: 70, name: "Ingresso Miracle Garden", description: "Visite o Dubai Miracle Garden, o maior jardim de flores naturais do mundo. Um espetáculo de cores e formas com milhões de flores arranjadas de maneira criativa. (Preço por pessoa, aplicável para adultos)", price: 28.00, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=Miracle+Garden+Adulto", category: "DUBAI TICKETS" },
        { id: 71, name: "Ingresso Miracle Garden", description: "Visite o Dubai Miracle Garden com ingresso para crianças (3-12 anos). Um lugar mágico e colorido para toda a família. (Preço por pessoa, aplicável para crianças)", price: 23.16, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=Miracle+Garden+Crianca", category: "DUBAI TICKETS" },
        { id: 72, name: "Ingresso Ski Dubai", description: "Experimente a neve e esportes de inverno no Ski Dubai, uma estação de esqui indoor no Mall of the Emirates. Inclui acesso a atividades na neve e/ou pistas de esqui. (Preço por pessoa, aplicável para adultos e crianças)", price: 100.00, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=Ski+Dubai", category: "DUBAI TICKETS" },
        { id: 73, name: "Tour Guiado Burj al Arab", description: "Faça um tour guiado pelo interior do icônico hotel Burj Al Arab Jumeirah, considerado um dos mais luxuosos do mundo. Conheça sua arquitetura, história e interiores opulentos. (Preço por pessoa, aplicável para adultos)", price: 68.12, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=Tour+Burj+Al+Arab", category: "DUBAI TICKETS" },
        { id: 74, name: "Abra Lake Ride - Show das Águas", description: "Desfrute de um passeio tradicional de barco Abra no lago do Burj Khalifa durante o famoso show das fontes dançantes. Uma vista privilegiada e emocionante do espetáculo. (Preço por pessoa)", price: 18.80, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=Abra+Ride+Fontes", category: "DUBAI TICKETS" },
        { id: 75, name: "Ingresso Roda Gigante Ain Dubai c/ Corta Fila", description: "Acesso rápido e sem fila para a Ain Dubai, a maior roda gigante de observação do mundo. Desfrute de vistas espetaculares de Dubai de uma cabine climatizada. (Preço por pessoa, aplicável para adultos, exceto horários de pico)", price: 53.41, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=Ain+Dubai+Fast+Track", category: "DUBAI TICKETS" },
        { id: 76, name: "Ingresso Roda Gigante Ain Dubai s/ Corta Fila", description: "Acesso padrão à Ain Dubai, a maior roda gigante de observação do mundo. Desfrute de vistas incríveis de Dubai. (Preço por pessoa, aplicável para adultos, exceto horários de pico)", price: 39.51, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=Ain+Dubai+Adulto", category: "DUBAI TICKETS" },
        { id: 77, name: "Ingresso Roda Gigante Ain Dubai s/ Corta Fila", description: "Acesso padrão à Ain Dubai para crianças, a maior roda gigante de observação do mundo. Vistas espetaculares de Dubai. (Preço por pessoa, aplicável para crianças, exceto horários de pico)", price: 31.34, imageUrl: "https://placehold.co/400x250/6F42C1/FFFFFF?text=Ain+Dubai+Kids", category: "DUBAI TICKETS" },
        { id: 78, name: "Ingresso Parque IMG Worlds of Adventure (Marvel)", description: "Acesso ao IMG Worlds of Adventure, o maior parque temático indoor do mundo, com zonas dedicadas a personagens da Marvel, Cartoon Network e outras atrações originais. (Preço por pessoa, aplicável para adultos)", price: 90.00, imageUrl: "https://placehold.co/400x250/DC3545/FFFFFF?text=IMG+Marvel", category: "DUBAI PARKS" },
        { id: 79, name: "Ingresso Legoland Dubai", description: "Acesso ao Legoland Dubai, um parque temático baseado nos famosos blocos de montar Lego, com atrações, shows e modelos construídos com Lego. Ideal para famílias com crianças de 2 a 12 anos. (Preço por pessoa, aplicável para adultos)", price: 90.00, imageUrl: "https://placehold.co/400x250/DC3545/FFFFFF?text=Legoland+Dubai", category: "DUBAI PARKS" },
        { id: 80, name: "Ingresso Parque Motiongate Dubai", description: "Acesso ao Motiongate Dubai, um parque temático inspirado em Hollywood, com atrações baseadas em filmes e estúdios como DreamWorks Animation, Columbia Pictures e Lionsgate. (Preço por pessoa, aplicável para adultos)", price: 80.38, imageUrl: "https://placehold.co/400x250/DC3545/FFFFFF?text=Motiongate+Dubai", category: "DUBAI PARKS" },
        { id: 81, name: "Ingresso Parque Motiongate Dubai c/ Corta Fila", description: "Acesso rápido e sem fila ao Motiongate Dubai, permitindo que você aproveite as atrações inspiradas em Hollywood com mais agilidade. (Preço por pessoa, aplicável para adultos)", price: 121.25, imageUrl: "https://placehold.co/400x250/DC3545/FFFFFF?text=Motiongate+Fast+Track", category: "DUBAI PARKS" },
        { id: 82, name: "Ingresso Legoland Water Park", description: "Acesso ao Legoland Water Park, um parque aquático projetado para famílias com crianças de 2 a 12 anos, com escorregadores, piscinas e atrações temáticas de Lego. (Preço por pessoa, aplicável para adultos)", price: 90.00, imageUrl: "https://placehold.co/400x250/DC3545/FFFFFF?text=Legoland+WaterPark", category: "DUBAI PARKS" },
        { id: 83, name: "Ingresso Parque Real Madrid World", description: "Acesso ao Real Madrid World, o primeiro parque temático do Real Madrid no mundo. Desfrute de atrações, experiências e jogos inspirados no famoso clube de futebol. (Preço por pessoa, aplicável para adultos)", price: 90.00, imageUrl: "https://placehold.co/400x250/DC3545/FFFFFF?text=Real+Madrid+World", category: "DUBAI PARKS" },
        { id: 84, name: "Ingresso Parque Aquático Atlantis Aquaventure", description: "Acesso ao Atlantis Aquaventure Waterpark, um dos maiores e mais emocionantes parques aquáticos do mundo, localizado no Atlantis, The Palm. Desfrute de diversos escorregadores e atrações aquáticas. (Preço por pessoa, aplicável para adultos)", price: 90.00, imageUrl: "https://placehold.co/400x250/DC3545/FFFFFF?text=Aquaventure+Standard", category: "DUBAI PARKS" },
        { id: 85, name: "Ingresso Parque Aquático Atlantis Aquaventure c/ Corta Fila", description: "Acesso rápido e sem fila ao Atlantis Aquaventure Waterpark, permitindo que você maximize seu tempo e aproveite mais escorregadores e atrações. (Preço por pessoa, aplicável para adultos)", price: 180.00, imageUrl: "https://placehold.co/400x250/DC3545/FFFFFF?text=Aquaventure+Fast+Track", category: "DUBAI PARKS" },
        { id: 86, name: "Ingresso Dubai Safari Park Zoo", description: "Acesso ao Dubai Safari Park, um extenso parque de vida selvagem com diversas zonas que abrigam animais de diferentes habitats ao redor do mundo. (Preço por pessoa, aplicável para adultos)", price: 14.99, imageUrl: "https://placehold.co/400x250/DC3545/FFFFFF?text=Safari+Park+Adulto", category: "DUBAI PARKS" },
        { id: 87, name: "Ingresso Dubai Safari Park Zoo", description: "Acesso ao Dubai Safari Park para crianças (3-12 anos). Uma oportunidade educativa e divertida para ver animais de perto. (Preço por pessoa, aplicável para crianças)", price: 6.81, imageUrl: "https://placehold.co/400x250/DC3545/FFFFFF?text=Safari+Park+Crianca", category: "DUBAI PARKS" },
        { id: 88, name: "Ingresso Experiência Dubai Safari Park Zoo", description: "Acesso completo ao Dubai Safari Park, incluindo o Safari Journey (passeio de ônibus pelas áreas de safari) e acesso a todas as vilas e shows. (Preço por pessoa, aplicável para adultos)", price: 35.42, imageUrl: "https://placehold.co/400x250/DC3545/FFFFFF?text=Safari+Park+Exp+Adulto", category: "DUBAI PARKS" },
        { id: 89, name: "Ingresso Experiência Dubai Safari Park Zoo", description: "Acesso completo ao Dubai Safari Park para crianças (3-12 anos), incluindo o Safari Journey e acesso a todas as vilas e shows. (Preço por pessoa, aplicável para crianças)", price: 27.25, imageUrl: "https://placehold.co/400x250/DC3545/FFFFFF?text=Safari+Park+Exp+Crianca", category: "DUBAI PARKS" },
        { id: 90, name: "Ingresso Palácio Presidencial (Qasr Al Watan)", description: "Visite o Qasr Al Watan, o magnífico Palácio Presidencial de Abu Dhabi. Explore a arquitetura deslumbrante, salões grandiosos e aprenda sobre a cultura e história dos Emirados Árabes Unidos. (Preço por pessoa, aplicável para adultos)", price: 18.00, imageUrl: "https://placehold.co/400x250/FF4500/FFFFFF?text=Qasr+Al+Watan", category: "ABU DHABI TICKETS" },
        { id: 91, name: "Ingresso Museu do Louvre Abu Dhabi", description: "Acesso ao Museu do Louvre Abu Dhabi, uma obra-prima arquitetônica que abriga uma coleção de arte e artefatos que conectam diferentes culturas e civilizações. (Preço por pessoa, aplicável para adultos)", price: 18.00, imageUrl: "https://placehold.co/400x250/FF4500/FFFFFF?text=Louvre+AD", category: "ABU DHABI TICKETS" },
        { id: 92, name: "Ingresso Grande Mesquita Sheikh Zayed", description: "A entrada na Grande Mesquita Sheikh Zayed em Abu Dhabi é gratuita. Este item é apenas informativo. É altamente recomendado agendar sua visita online com antecedência. (Entrada gratuita)", price: 0.00, imageUrl: "https://placehold.co/400x250/FF4500/FFFFFF?text=Grande+Mesquita+AD", category: "ABU DHABI TICKETS" },
        { id: 93, name: "Etihad Tower Observation Deck c/ Café da Tarde", description: "Desfrute de vistas panorâmicas de Abu Dhabi a partir do Observation Deck at 300, localizado nas Etihad Towers, incluindo um delicioso café da tarde. (Preço por pessoa, aplicável para adultos)", price: 27.25, imageUrl: "https://placehold.co/400x250/FF4500/FFFFFF?text=Etihad+Tower+Cafe", category: "ABU DHABI TICKETS" },
        { id: 94, name: "Ingresso Tour Yas Marina Circuit (2 horas)", description: "Faça um tour guiado pelo Yas Marina Circuit, o famoso circuito de Fórmula 1 em Abu Dhabi. Conheça os bastidores, boxes, sala de controle e sinta a atmosfera do automobilismo. (Preço por pessoa, aplicável para adultos)", price: 43.60, imageUrl: "https://placehold.co/400x250/FF4500/FFFFFF?text=Yas+Marina+Tour", category: "ABU DHABI TICKETS" },
        { id: 95, name: "Ingresso Parque da Ferrari Abu Dhabi", description: "Acesso ao Ferrari World Abu Dhabi, o primeiro parque temático da Ferrari no mundo. Desfrute de montanhas-russas emocionantes, simuladores e atrações que celebram a marca italiana. (Preço por pessoa, aplicável para adultos)", price: 95.00, imageUrl: "https://placehold.co/400x250/4682B4/FFFFFF?text=Ferrari+World+AD", category: "ABU DHABI PARKS" },
        { id: 96, name: "Ingresso Parque Warner Bros World Abu Dhabi", description: "Acesso ao Warner Bros. World Abu Dhabi, um parque temático indoor com zonas imersivas baseadas em personagens da Warner Bros., como Batman, Superman, Looney Tunes e Flintstones. (Preço por pessoa, aplicável para adultos)", price: 104.00, imageUrl: "https://placehold.co/400x250/4682B4/FFFFFF?text=Warner+Bros+AD", category: "ABU DHABI PARKS" },
        { id: 97, name: "Ingresso Sea World Abu Dhabi", description: "Acesso ao SeaWorld Yas Island, Abu Dhabi, um parque temático marinho que oferece experiências imersivas com animais marinhos, shows e atrações educativas. (Preço por pessoa, aplicável para adultos)", price: 104.00, imageUrl: "https://placehold.co/400x250/4682B4/FFFFFF?text=SeaWorld+AD", category: "ABU DHABI PARKS" },
        { id: 98, name: "Ingresso 2 Parques Abu Dhabi (a escolher)", description: "Acesso a dois parques temáticos na Ilha Yas, Abu Dhabi (Ferrari World, Warner Bros. World, SeaWorld ou Yas Waterworld - verificar opções disponíveis). Escolha seus dois parques favoritos para um dia de diversão. (Preço por pessoa, aplicável para adultos)", price: 129.43, imageUrl: "https://placehold.co/400x250/4682B4/FFFFFF?text=2+Parques+AD+Adulto", category: "ABU DHABI PARKS" },
        { id: 99, name: "Ingresso 3 Parques Abu Dhabi (a escolher)", description: "Acesso a três parques temáticos na Ilha Yas, Abu Dhabi (Ferrari World, Warner Bros. World, SeaWorld ou Yas Waterworld - verificar opções disponíveis). Aproveite um combo para visitar três parques em dias diferentes. (Preço por pessoa, aplicável para adultos)", price: 156.68, imageUrl: "https://placehold.co/400x250/4682B4/FFFFFF?text=3+Parques+AD+Adulto", category: "ABU DHABI PARKS" },
        { id: 100, name: "Ingresso 2 Parques Abu Dhabi (a escolher)", description: "Acesso a dois parques temáticos na Ilha Yas, Abu Dhabi (Ferrari World, Warner Bros. World, SeaWorld ou Yas Waterworld - verificar opções disponíveis) para crianças. Escolha dois parques para a diversão dos pequenos. (Preço por pessoa, aplicável para crianças)", price: 129.43, imageUrl: "https://placehold.co/400x250/4682B4/FFFFFF?text=2+Parques+AD+Crianca", category: "ABU DHABI PARKS" },
        { id: 101, name: "La Perle - Assento Normal", description: "Ingresso para o espetáculo aquático e acrobático La Perle by Dragone em Dubai. Escolha entre as categorias de assento Bronze, Silver ou Gold (verificar disponibilidade) para uma experiência visualmente deslumbrante. (Preço por pessoa)", price: 81.74, imageUrl: "https://placehold.co/400x250/FF6347/FFFFFF?text=La+Perle+Normal", category: "LA PERLE" },
        { id: 102, name: "La Perle - Assento Platinum + Foods & Drinks", description: "Desfrute do espetáculo La Perle com os melhores assentos na categoria Platinum. Inclui acesso a um lounge VIP exclusivo com snacks e bebidas antes do show. Uma experiência premium. (Preço por pessoa)", price: 141.69, imageUrl: "https://placehold.co/400x250/FF6347/FFFFFF?text=La+Perle+Platinum", category: "LA PERLE" },
        { id: 103, name: "Serviço de Reservas e Indicações", description: "Conte com nossa expertise para auxiliar com reservas e indicações de restaurantes, beach clubs e outros locais em Dubai e Abu Dhabi. Economize tempo e garanta os melhores lugares. (Valor único pelo serviço de consultoria e reservas)", price: 50.00, imageUrl: "https://placehold.co/400x250/17A2B8/FFFFFF?text=Reservas+Portare", category: "PORTARE SERVIÇOS" },
        { id: 104, name: "Roteiro Personalizado", description: "Receba um roteiro de viagem detalhado e personalizado para Dubai e Abu Dhabi, criado de acordo com seus interesses, tempo disponível e orçamento. O planejamento perfeito para sua viagem. (Valor único pelo serviço de elaboração do roteiro)", price: 200.00, imageUrl: "https://placehold.co/400x250/17A2B8/FFFFFF?text=Roteiro+Portare", category: "PORTARE SERVIÇOS" },
        { id: 105, name: "Atendimento VIP 24h + Roteiro", description: "Tenha suporte telefônico contínuo 24 horas por dia durante sua viagem, além da elaboração de um roteiro personalizado. Tranquilidade e assistência a qualquer momento. (Valor por dia de serviço)", price: 100.00, imageUrl: "https://placehold.co/400x250/17A2B8/FFFFFF?text=VIP+Portare", category: "PORTARE SERVIÇOS" },
        { id: 106, name: "Staff (Acompanhante não Guia) em Português - Dia Todo", description: "Tenha um acompanhante falando português à sua disposição por 8 horas em Dubai (sem carro). Ideal para auxiliar com compras, navegação pela cidade ou simplesmente ter companhia. (Valor por staff por dia)", price: 177.11, imageUrl: "https://placehold.co/400x250/17A2B8/FFFFFF?text=Staff+8h+Portare", category: "PORTARE SERVIÇOS" },
        { id: 107, name: "Staff (Acompanhante não Guia) em Português - Meio Período", description: "Tenha um acompanhante falando português à sua disposição por 4 horas em Dubai (sem carro). Flexibilidade para pequenas necessidades de acompanhamento. (Valor por staff por meio-período)", price: 108.99, imageUrl: "https://placehold.co/400x250/17A2B8/FFFFFF?text=Staff+4h+Portare", category: "PORTARE SERVIÇOS" },
        { id: 108, name: "Sala de Conferência + Coffee Break (Abu Dhabi)", description: "Aluguel de sala de conferência em um hotel em Abu Dhabi por até 5 horas, incluindo um coffee break. Ideal para pequenas reuniões ou eventos corporativos. (Valor por pessoa)", price: 57.22, imageUrl: "https://placehold.co/400x250/6C757D/FFFFFF?text=Conferencia+AD", category: "EVENTOS" },
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
            // Update image paths to point to your local img folder with correct filenames and extension
            { name: "Dubai e Abu Dhabi", image: "img/dubai.jpg", targetPage: 'tours' }, // Using dubai.jpg
            { name: "Egito", image: "img/egito.jpg", message: 'Passeios para Egito em breve!' }, // Using egito.jpg
            { name: "Maldivas", image: "img/maldivas.jpg", message: 'Passeios para Maldivas em breve!' }, // Using maldivas.jpg
            { name: "Japão", image: "img/japao.jpg", message: 'Passeios para Japão em breve!' }, // Using japao.jpg
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

    function renderSubcategoryButtons() {
        subcategoryButtonsContainer.innerHTML = '';
        subcategories.forEach(cat => {
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

    // Funções da API Gemini
    async function callGeminiAPI(prompt) {
        // NOTE: Hardcoding API keys directly in client-side code is a security risk.
        // For a production application, consider using a backend proxy or environment variables.
        const apiKey = "AIzaSyDpRyvbYUE4tDhBqw7v8GaFiA7m4760Ltk"; // API AQUI!!!
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

    // Add event listener for the header logo
    headerLogo.addEventListener('click', () => {
        currentPage = 'countrySelection';
        renderPage();
    });

    whatsappQuoteButton.addEventListener('click', () => {
        if (cart.length === 0) {
            showConfirmationMessage("Seu carrinho está vazio. Adicione passeios antes de solicitar um orçamento.");
            return;
        }
        // Build the message using an array of lines for clarity and robust formatting
        const messageLines = [
            "Olá, Portare Travel! Gostaria de solicitar um orçamento para os seguintes passeios:",
            "" // Add an empty line for spacing
        ];

        cart.forEach((item) => {
            // Find the original tour data to check the description
            const originalTour = allTours.find(tour => tour.id === item.id);
            let quantityText = `${item.quantity}x`; // Default format

            // Check if the original description indicates "per person" pricing
            if (originalTour && originalTour.description.includes("Preço por pessoa")) {
                 quantityText = `${item.quantity} pessoas`;
            } else if (originalTour && originalTour.description.includes("Valor total pelo serviço")) {
                 quantityText = `${item.quantity} serviço(s)`;
            }


            messageLines.push(`- ${quantityText} ${item.name} - AED ${item.price.toFixed(2)} cada`);
        });

        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        messageLines.push(`\nTotal Estimado: AED ${totalPrice.toFixed(2)}`); // Add total after items
        messageLines.push("Por favor, entre em contato para mais detalhes.");

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
    renderCart(); // Para estado inicial do carrinho
    renderTravelStyleButtons();
});
// Fim do JavaScript
