import { toursData } from './js/toursData.js';
import { egyptData } from './js/egyptData.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function translateText(text) {
    if (!text) return "";
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=pt&tl=en&dt=t&q=${encodeURIComponent(text)}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        return json[0].map(s => s[0]).join('');
    } catch (error) {
        console.error(`Error translating text "${text.substring(0, 20)}...":`, error);
        throw error;
    }
}

async function run() {
    console.log("Starting optimized translation using Google Translate free API...");
    const allTours = [
        ...toursData.map(t => ({ id: t.id, name: t.name, description: t.description })),
        ...egyptData.map(t => ({ id: t.id, name: t.name, description: t.description }))
    ];

    console.log(`Total tours to translate: ${allTours.length}`);
    const translatedMap = {};

    const batchSize = 6;
    for (let i = 0; i < allTours.length; i += batchSize) {
        const chunk = allTours.slice(i, i + batchSize);
        console.log(`Translating tours ${i + 1} to ${Math.min(i + batchSize, allTours.length)}...`);
        
        await Promise.all(chunk.map(async (tour) => {
            let attempts = 3;
            while (attempts > 0) {
                try {
                    const [nameEn, descEn] = await Promise.all([
                        translateText(tour.name),
                        translateText(tour.description)
                    ]);
                    
                    translatedMap[tour.id] = {
                        name: nameEn,
                        description: descEn
                    };
                    break;
                } catch (e) {
                    attempts--;
                    console.log(`Tour ${tour.id} failed, retrying... (${attempts} left)`);
                    if (attempts === 0) {
                        console.error(`Tour ID ${tour.id} failed completely.`);
                        process.exit(1);
                    }
                    await new Promise(resolve => setTimeout(resolve, 2000));
                }
            }
        }));
        
        // Brief delay between batches
        await new Promise(resolve => setTimeout(resolve, 250));
    }

    console.log("Translation complete! Writing translations.js file...");

    const outputPath = path.join(__dirname, 'js', 'translations.js');
    
    // UI translations dictionary
    const uiTranslations = {
        pt: {
            welcomeTitle: "Bem-vindos à",
            chooseDestination: "Escolha seu Destino dos Sonhos",
            discoverExperiences: "Descubra experiências únicas e inesquecíveis. Sua aventura perfeita está a um clique de distância.",
            searchPlaceholder: "Pesquisar passeios...",
            back: "Voltar",
            cart: "Carrinho",
            cartTitle: "Seu Carrinho",
            travelStyleLabel: "Estilo de Viagem (para roteiro):",
            clearStyleBtn: "Limpar Estilo",
            clientNameLabel: "Nome do Cliente:",
            clientNamePlaceholder: "Seu nome",
            numPeopleLabel: "Número de Pessoas:",
            totalLabel: "Total:",
            whatsappQuoteBtn: "Solicitar Orçamento via WhatsApp",
            generateItineraryBtn: "Gerar Roteiro Personalizado",
            loadingText: "Carregando...",
            loadingDestinations: "Carregando destinos...",
            loadingEnhancedDesc: "Gerando descrição detalhada...",
            loadingItinerary: "Gerando seu roteiro...",
            itineraryTitle: "Seu Roteiro Personalizado ✨",
            aiDetailsSubtitle: "✨ Detalhes Gerados por IA ✨",
            footerTagline: "Transformando sonhos em experiências inesquecíveis. Sua jornada começa agora.",
            footerCopy: "Todos os direitos reservados.",
            emptyCartWarning: "Adicione passeios ao carrinho para gerar um roteiro!",
            peopleWarning: "Selecione entre 1 e 47 pessoas.",
            peopleWarningGold: "Selecione entre 1 e 47 pessoas.",
            peopleWarningDia: "Selecione entre 1 e 20 pessoas.",
            peopleWarningAbu: "Selecione entre 1 e 20 pessoas.",
            peopleWarningJebel: "Selecione entre 1 e 20 pessoas.",
            peopleWarningSafari: "Selecione entre 1 e 20 pessoas.",
            toursTitlePrefix: "Nossos Passeios em",
            cartCountUnit: "item",
            cartCountUnitPlural: "itens",
            addedToCart: "adicionado ao carrinho!",
            categoryAll: "Todos",
            styleAdventure: "Aventura",
            styleRelaxing: "Relaxante",
            styleCultural: "Cultural",
            styleRomantic: "Romântico",
            styleFamily: "Família com crianças",
            styleLuxury: "Luxo",
            perPerson: "por pessoa",
            selectPeopleToCalculate: "Selecione o número de pessoas para calcular o valor:",
            qtyLabel: "Qtd:",
            btnRemove: "Remover",
            btnAdd: "Adicionar",
            heroDubaiTitle: "Sua Aventura em Dubai Começa Aqui!",
            heroDubaiSubtitle: "Passeios inesquecíveis e experiências únicas.<br>Você sabia que o nome do País é Emirados Árabes Unidos?<br>São 7 Emirados para explorar:<br>Dubai – Abu Dhabi – Sharjah – Ras Al Khaimah (RAK) – Ajman – Fujairah – Umm Al Quwain",
            heroEgyptTitle: "Descubra os Mistérios do Egito!",
            heroEgyptSubtitle: "Uma jornada pela terra dos faraós, pirâmides e templos ancestrais.",
            heroMaldivesTitle: "Paraíso nas Maldivas!",
            heroMaldivesSubtitle: "Descubra as ilhas mais deslumbrantes do mundo.",
            heroJapanTitle: "Terra do Sol Nascente!",
            heroJapanSubtitle: "Uma jornada pela cultura milenar japonesa.",
            comingSoonMaldives: "Passeios para Maldivas em breve!",
            comingSoonJapan: "Passeios para Japão em breve!"
        },
        en: {
            welcomeTitle: "Welcome to",
            chooseDestination: "Choose Your Dream Destination",
            discoverExperiences: "Discover unique and unforgettable experiences. Your perfect adventure is just a click away.",
            searchPlaceholder: "Search tours...",
            back: "Back",
            cart: "Cart",
            cartTitle: "Your Cart",
            travelStyleLabel: "Travel Style (for itinerary):",
            clearStyleBtn: "Clear Style",
            clientNameLabel: "Client Name:",
            clientNamePlaceholder: "Your name",
            numPeopleLabel: "Number of People:",
            totalLabel: "Total:",
            whatsappQuoteBtn: "Request Quote via WhatsApp",
            generateItineraryBtn: "Generate Personalized Itinerary",
            loadingText: "Loading...",
            loadingDestinations: "Loading destinations...",
            loadingEnhancedDesc: "Generating detailed description...",
            loadingItinerary: "Generating your itinerary...",
            itineraryTitle: "Your Personalized Itinerary ✨",
            aiDetailsSubtitle: "✨ AI Generated Details ✨",
            footerTagline: "Transforming dreams into unforgettable experiences. Your journey starts now.",
            footerCopy: "All rights reserved.",
            emptyCartWarning: "Add tours to the cart to generate an itinerary!",
            peopleWarning: "Select between 1 and 47 people.",
            peopleWarningGold: "Select between 1 and 47 people.",
            peopleWarningDia: "Select between 1 and 20 people.",
            peopleWarningAbu: "Select between 1 and 20 people.",
            peopleWarningJebel: "Select between 1 and 20 people.",
            peopleWarningSafari: "Select between 1 and 20 people.",
            toursTitlePrefix: "Our Tours in",
            cartCountUnit: "item",
            cartCountUnitPlural: "items",
            addedToCart: "added to cart!",
            categoryAll: "All",
            styleAdventure: "Adventure",
            styleRelaxing: "Relaxing",
            styleCultural: "Cultural",
            styleRomantic: "Romantic",
            styleFamily: "Family with kids",
            styleLuxury: "Luxury",
            perPerson: "per person",
            selectPeopleToCalculate: "Select the number of people to calculate price:",
            qtyLabel: "Qty:",
            btnRemove: "Remove",
            btnAdd: "Add",
            heroDubaiTitle: "Your Dubai Adventure Starts Here!",
            heroDubaiSubtitle: "Unforgettable tours and unique experiences.<br>Did you know the country's name is United Arab Emirates?<br>There are 7 Emirates to explore:<br>Dubai – Abu Dhabi – Sharjah – Ras Al Khaimah (RAK) – Ajman – Fujairah – Umm Al Quwain",
            heroEgyptTitle: "Discover the Mysteries of Egypt!",
            heroEgyptSubtitle: "A journey through the land of Pharaohs, pyramids and ancestral temples.",
            heroMaldivesTitle: "Maldives Paradise!",
            heroMaldivesSubtitle: "Discover the most stunning islands in the world.",
            heroJapanTitle: "Land of the Rising Sun!",
            heroJapanSubtitle: "A journey through ancient Japanese culture.",
            comingSoonMaldives: "Tours to Maldives coming soon!",
            comingSoonJapan: "Tours to Japan coming soon!"
        }
    };

    // Category translations mapping (Português -> Inglês)
    const categoryTranslations = {
        pt: {
            "TOUR PRIVATIVO": "TOUR PRIVATIVO",
            "DESERTO": "DESERTO",
            "TRASLADO": "TRASLADO",
            "CARRO COM MOTORISTA": "CARRO COM MOTORISTA",
            "AVENTURAS AQUÁTICAS": "AVENTURAS AQUÁTICAS",
            "EXPERIÊNCIAS AÉREAS": "EXPERIÊNCIAS AÉREAS",
            "DUBAI TICKETS": "DUBAI TICKETS",
            "DUBAI PARKS": "DUBAI PARKS",
            "ABU DHABI TICKETS": "ABU DHABI TICKETS",
            "ABU DHABI PARKS": "ABU DHABI PARKS",
            "PORTARE SERVIÇOS": "PORTARE SERVIÇOS",
            "Tour em grupo": "Tour em grupo",
            "Tour privativo": "Tour privativo"
        },
        en: {
            "TOUR PRIVATIVO": "PRIVATE TOUR",
            "DESERTO": "DESERT",
            "TRASLADO": "TRANSFER",
            "CARRO COM MOTORISTA": "CAR WITH DRIVER",
            "AVENTURAS AQUÁTICAS": "WATER ADVENTURES",
            "EXPERIÊNCIAS AÉREAS": "AERIAL EXPERIENCES",
            "DUBAI TICKETS": "DUBAI TICKETS",
            "DUBAI PARKS": "DUBAI PARKS",
            "ABU DHABI TICKETS": "ABU DHABI TICKETS",
            "ABU DHABI PARKS": "ABU DHABI PARKS",
            "PORTARE SERVIÇOS": "PORTARE SERVICES",
            "Tour em grupo": "Group tour",
            "Tour privativo": "Private tour"
        }
    };

    const fileContent = `// File generated automatically by generate_translations.mjs
export const uiTranslations = ${JSON.stringify(uiTranslations, null, 4)};

export const categoryTranslations = ${JSON.stringify(categoryTranslations, null, 4)};

export const tourTranslations = ${JSON.stringify(translatedMap, null, 4)};
`;

    fs.writeFileSync(outputPath, fileContent, 'utf-8');
    console.log(`Saved translations to ${outputPath}`);
}

run().catch(console.error);
