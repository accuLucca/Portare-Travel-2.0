export const toursData = [
    // TOUR EM GRUPO
    {
        id: 110,
        name: "Tour Dubai Compartilhado - No Idioma Da Sua Preferencia (6h)",
        description: "Tour compartilhado pelos principais pontos de Dubai com guia. Incluso: Guia em seu idioma nativo, Transporte do Hotel. Solicite Itinerário completo. Adulto ou kids +3 anos. PP.",
        price: 550.50,
        imageUrl: "img/toursdubai/15.jpg",
        category: "TOUR EM GRUPO"
    },
    {
        id: 16,
        name: "Tour Abu Dhabi Compartilhado - Tradicional / Dia Todo (8h)",
        description: "Tour compartilhado tradicional em Abu Dhabi. Incluso: Guia em Inglês, 1 Ingresso (à escolher), Transporte do Hotel (Dubai). Solicite Itinerário completo. Adulto ou kids +3 anos. PP.",
        price: 367.00,
        imageUrl: "img/toursdubai/16.jpg",
        category: "TOUR EM GRUPO"
    },
    {
        id: 17,
        name: "Tour Abu Dhabi Compartilhado c/ 1 Parque à sua escolha - Dia Todo (8h)",
        description: "Tour compartilhado em Abu Dhabi com parque à escolha. Incluso: Guia em Inglês, Ingresso Mesquita + 1 Parque (consultar opções), Transporte do Hotel (Dubai). Adulto ou kids +3 anos. PP.",
        price: 734.00,
        imageUrl: "img/toursdubai/17.jpg",
        category: "TOUR EM GRUPO"
    },
    {
        id: 18,
        name: "Iate Compartilhado c/ Churrasco",
        description: "Desfrute de um passeio de iate compartilhado pelas águas de Dubai, com vistas deslumbrantes do skyline e da Palm Jumeirah. Inclui um delicioso churrasco a bordo para uma experiência relaxante e divertida no mar. (Preço por pessoa, aplicável para adultos e crianças)",
        price: 132.00,
        imageUrl: "img/toursdubai/18.jpg",
        category: "TOUR EM GRUPO"
    },
    // TOUR DUBAI
    {
        id: 'tour-dubai-meio-periodo',
        name: "Tour Dubai Meio Periodo (4h)",
        description: "Tour privativo de 4 horas por Dubai com veículo, motorista, guia licenciado(a) e recomendação de itinerário. Ingressos vendidos separadamente. Hora extra: AED 220 (Toyota) / AED 350 (Ônibus). O valor por pessoa depende do número de participantes.",
        price: 321.13, // Valor base para 4+ pessoas, mas será sobrescrito pelo cálculo dinâmico
        imageUrl: "img/toursdubai/19.jpg",
        category: "TOUR DUBAI"
    },
    {
        id: 'tour-dubai-dia-todo',
        name: "Tour Dubai Dia Todo (8h)",
        description: "Tour privativo de 8 horas por Dubai com veículo, motorista, guia brasileiro(a) licenciado(a) e recomendação de itinerário. Ingressos vendidos separadamente. Hora extra: AED 220 (Toyota) / AED 350 (Ônibus). O valor por pessoa depende do número de participantes.",
        price: 504.63, // Valor base para 4+ pessoas, será sobrescrito pelo cálculo dinâmico
        imageUrl: "img/toursdubai/20.jpg",
        category: "TOUR DUBAI"
    },
    {
        id: 'tour-abu-dhabi-dia-todo-10h',
        name: "Tour Abu Dhabi Dia Todo (10h)",
        description: "Tour privativo de 10 horas por Abu Dhabi com veículo, motorista e guia brasileiro(a) licenciado(a), reserva da Grande Mesquita e recomendação de itinerário. Outros ingressos vendidos separadamente. Hora extra: AED 220 (Toyota) / AED 350 (Ônibus). O valor por pessoa depende do número de participantes.",
        price: 631.24, // Valor base para 4+ pessoas, será sobrescrito pelo cálculo dinâmico
        imageUrl: "img/toursdubai/21.jpg", // Use uma imagem apropriada
        category: "TOUR ABU DHABI"
    },
    {
        id: 22,
        name: "Tour Abu Dhabi (8h)",
        description: "Descubra Abu Dhabi com um tour privativo de dia inteiro (8 horas), com guia e carro exclusivos para o seu grupo. Visite a Grande Mesquita, o Palácio Presidencial, o Museu do Louvre (vista externa) e outros locais de interesse com total conforto e personalização. (Preço por pessoa, baseado em 4+ pessoas. Consulte para outros tamanhos de grupo)",
        price: 172.00,
        imageUrl: "img/toursdubai/22.jpg",
        category: "TOUR ABU DHABI"
    },
    {
        id: 23,
        name: "Tour Jebel Jais - Montanhas (Dia Todo - 8h)",
        description: "Aventure-se nas montanhas de Ras Al Khaimah com um tour privativo de dia inteiro (8 horas) até Jebel Jais, o pico mais alto dos Emirados Árabes Unidos. Desfrute de paisagens desérticas e montanhosas únicas. Ideal para quem busca natureza e vistas panorâmicas. (Preço por pessoa, baseado em 4+ pessoas. Mínimo de 2 pessoas. Consulte para outros tamanhos de grupo)",
        price: 172.00,
        imageUrl: "img/toursdubai/23.jpg",
        category: "TOUR RAK"
    },
    {
        id: 24,
        name: "Tour Hatta Montanhas (Dia Todo - 8h)",
        description: "Explore a beleza natural de Hatta, uma região montanhosa próxima a Dubai, em um tour privativo de dia inteiro (8 horas). Visite a represa de Hatta, o vilarejo histórico e desfrute das paisagens. Uma fuga da agitação da cidade. (Preço por pessoa, baseado em 4+ pessoas. Mínimo de 2 pessoas. Consulte para outros tamanhos de grupo)",
        price: 172.00,
        imageUrl: "img/toursdubai/24.jpg",
        category: "HATTA"
    },
    {
        id: 25,
        name: "Representante em Português no Aeroporto - fora da imigração",
        description: "Profissional aguardará os clientes após a retirada da bagagem, recepção no terminal e auxílio no check in do hotel (não inclui serviços dentro da imigração). Serviço válido apenas na contratação conjunta do translado aeroporto-hotel.",
        price: 600.00,
        imageUrl: "img/toursdubai/25.jpg",
        category: "TRASLADO"
    },
    {
        id: 26,
        name: "Serviços de recepção dentro do Terminal DXB - Inglês",
        description: "Recepção personalizada dentro da imigração no Terminal 3 (Dubai). Profissional da Emirates acompanha até a saída do terminal. Atendimento em inglês. Válido apenas para chegadas em voos da Emirates.",
        price: 800.00,
        imageUrl: "img/toursdubai/26.jpg",
        category: "TRASLADO"
    },
    {
        id: 27,
        name: "Traslado Aeroporto DXB-Hotel em Dubai (1 Trecho) - até 2 pessoas TT",
        description: "Incluso: Veículo Toyota Previa (7 assentos - espaço p/ bagagem) e motorista no idioma inglês.",
        price: 389.00,
        imageUrl: "img/toursdubai/27.jpg",
        category: "TRASLADO"
    },
    {
        id: 28,
        name: "Traslado Aeroporto DXB-Hotel em Dubai (1 Trecho) - 3 a 7 pessoas TT",
        description: "Incluso: Hiace vehicle (13 assentos - espaço p/ bagagem) e motorista no idioma inglês.",
        price: 499.00,
        imageUrl: "img/toursdubai/28.jpg",
        category: "TRASLADO"
    },
    {
        id: 29,
        name: "Traslado Aeroporto DXB-Hotel em Dubai (1 Trecho) - 8 a 14 pessoas TT",
        description: "Incluso: 2 Hiace vehicle (13 assentos - espaço p/ bagagem) e motorista no idioma inglês.",
        price: 1000.00,
        imageUrl: "img/toursdubai/29.jpg",
        category: "TRASLADO"
    },
    {
        id: 30,
        name: "Carro c/ Motorista (Sem Guia) - Meio Período (4h)",
        description: "Tenha um carro privativo com motorista à sua disposição em Dubai por 4 horas. Ideal para deslocamentos flexíveis, visitas a múltiplos locais ou compras, sem a necessidade de um guia turístico. (Preço total pelo serviço do carro para 1-5 pessoas)",
        price: 190.74,
        imageUrl: "img/toursdubai/30.jpg",
        category: "CARRO COM MOTORISTA"
    },
    {
        id: 31,
        name: "Carro c/ Motorista (Sem Guia) - Dia Todo (8h)",
        description: "Tenha um carro privativo com motorista à sua disposição em Dubai por 8 horas. Máxima flexibilidade para seus deslocamentos, reuniões ou visitas pela cidade ao longo do dia. (Preço total pelo serviço do carro para 1-5 pessoas)",
        price: 299.73,
        imageUrl: "img/toursdubai/31.jpg",
        category: "CARRO COM MOTORISTA"
    },
    {
        id: 32,
        name: "Carro c/ Motorista (Sem Guia) - Dia Todo (8h) - Abu Dhabi",
        description: "Tenha um carro privativo com motorista à sua disposição em Abu Dhabi por 8 horas (serviço iniciando e terminando em Abu Dhabi). Ideal para explorar a capital com flexibilidade. (Preço total pelo serviço do carro para 1-5 pessoas)",
        price: 299.73,
        imageUrl: "img/toursdubai/32.jpg",
        category: "ABU DHABI CARRO"
    },
    {
        id: 33,
        name: "Safari no Deserto Compartilhado",
        description: "Uma experiência clássica e emocionante no deserto de Dubai. Inclui dune bashing (passeio radical nas dunas), sandboard, passeio de camelo curto, pintura de henna, show de danças típicas (Tanoura e Belly Dance) e um jantar buffet completo em um acampamento beduíno. Bebidas alcoólicas são cobradas à parte. (Preço por pessoa)",
        price: 110.00,
        imageUrl: "img/toursdubai/33.jpg",
        category: "DESERTO"
    },
    {
        id: 34,
        name: "Adicional Guia em Português para Safari",
        description: "Adicione um guia falando português à sua experiência de Safari no Deserto VIP Privativo para ter informações e acompanhamento personalizado durante todo o passeio. (Valor total adicional pelo serviço de guia)",
        price: 280.00,
        imageUrl: "img/toursdubai/34.jpg",
        category: "DESERTO"
    },
    {
        id: 35,
        name: "Adicional Menu Chef 5 Estrelas",
        description: "Faça um upgrade no seu jantar durante o Safari no Deserto com um menu especial preparado por um chef 5 estrelas. Uma experiência gastronômica diferenciada no coração do deserto. (Valor adicional por pessoa)",
        price: 163.49,
        imageUrl: "img/toursdubai/35.jpg",
        category: "DESERTO"
    },
    {
        id: 36,
        name: "Safari no Deserto VIP Privativo",
        description: "Desfrute de um Safari no Deserto exclusivo para o seu grupo em um carro VIP privativo. Inclui todas as atividades do safari tradicional (dune bashing, shows, etc.) e jantar, com a privacidade e conforto de um serviço dedicado. (Preço por pessoa, baseado em 6 pessoas. Consulte para outros tamanhos de grupo)",
        price: 110.00,
        imageUrl: "img/toursdubai/36.jpg",
        category: "DESERTO"
    },
    {
        id: 37,
        name: "Safari no Deserto com Jantar (Bebidas Inclusas)",
        description: "Aproveite a experiência completa do Safari no Deserto, incluindo todas as atividades e o jantar buffet, com a conveniência de ter bebidas (seleção de bebidas alcoólicas e não alcoólicas) já inclusas no pacote. (Preço por pessoa)",
        price: 220.00,
        imageUrl: "img/toursdubai/37.jpg",
        category: "DESERTO"
    },
    {
        id: 38,
        name: "1 Jetski (30 min) - 1 pessoa",
        description: "Sinta a adrenalina pilotando um jetski sozinho por 30 minutos nas águas de Dubai, com vistas incríveis da costa e dos marcos da cidade. (Preço por pessoa)",
        price: 82.00,
        imageUrl: "img/toursdubai/38.jpg",
        category: "AVENTURAS AQUÁTICAS"
    },
    {
        id: 39,
        name: "1 Jetski (30 min) - 2 pessoas",
        description: "Compartilhe a emoção de um passeio de jetski por 30 minutos com um acompanhante. O preço é por pessoa, mas vocês dividem o mesmo jetski. Uma ótima opção para casais ou amigos. (Preço por pessoa)",
        price: 41.00,
        imageUrl: "img/toursdubai/39.jpg",
        category: "AVENTURAS AQUÁTICAS"
    },
    {
        id: 40,
        name: "1 Jetcar (30 min) - 2 pessoas",
        description: "Experimente a sensação única de pilotar um Jetcar, um veículo aquático que parece um carro esportivo, por 30 minutos. Capacidade para 2 pessoas. Uma atividade divertida e diferente nas águas de Dubai. (Valor total pelo aluguel do Jetcar)",
        price: 275.00,
        imageUrl: "img/toursdubai/40.jpg",
        category: "AVENTURAS AQUÁTICAS"
    },
    {
        id: 41,
        name: "Parasailing (30 min) - 1 pessoa",
        description: "Tenha uma vista aérea espetacular de Dubai enquanto voa de parasail por 30 minutos. Uma experiência emocionante e com paisagens inesquecíveis da costa. (Preço por pessoa para voo individual)",
        price: 82.00,
        imageUrl: "img/toursdubai/41.jpg",
        category: "AVENTURAS AQUÁTICAS"
    },
    {
        id: 300,
        name: "1 Jetski (30 min) - até 2 pessoas TT",
        description: "Aproveite 30 minutos de emoção em um jetski para até 2 pessoas nas águas de Dubai. Ideal para casais ou amigos.",
        price: 300.94,
        imageUrl: "img/toursdubai/jetski2p.jpg",
        category: "AVENTURAS AQUÁTICAS"
    },
    {
        id: 301,
        name: "1 Jetcar (30 min) - até 2 pessoas TT",
        description: "Experimente um passeio de Jetcar por 30 minutos para até 2 pessoas. Diversão garantida em um veículo aquático exclusivo.",
        price: 1009.25,
        imageUrl: "img/toursdubai/jetcar2p.jpg",
        category: "AVENTURAS AQUÁTICAS"
    },
    {
        id: 302,
        name: "1 Parasailing (30 min) - 1 pessoa PP",
        description: "Viva a experiência de parasailing por 30 minutos e admire Dubai do alto. Uma aventura inesquecível para uma pessoa.",
        price: 300.94,
        imageUrl: "img/toursdubai/parasailing1p.jpg",
        category: "AVENTURAS AQUÁTICAS"
    },
    {
        id: 303,
        name: "Iate para até 6 pessoas - valor por hora (mínimo de 3 horas)",
        description: "Iate privativo para até 6 pessoas. Valor por hora (mínimo de 3 horas). Comidas e bebidas vendidas separadamente.",
        price: 550.00,
        imageUrl: "img/toursdubai/yacht6p.jpg",
        category: "AVENTURAS AQUÁTICAS"
    },
    {
        id: 304,
        name: "Iate até 15 pessoas - valor por hora (mínimo de 3 horas)",
        description: "Iate privativo para até 15 pessoas. Valor por hora (mínimo de 3 horas). Comidas e bebidas vendidas separadamente.",
        price: 680.00,
        imageUrl: "img/toursdubai/yacht15p.jpg",
        category: "AVENTURAS AQUÁTICAS"
    },
    {
        id: 305,
        name: "Iate para até 20 pessoas - valor por hora (mínimo de 3 horas)",
        description: "Iate privativo para até 20 pessoas. Valor por hora (mínimo de 3 horas). Comidas e bebidas vendidas separadamente.",
        price: 800.00,
        imageUrl: "img/toursdubai/yacht20p.jpg",
        category: "AVENTURAS AQUÁTICAS"
    },
    {
        id: 306,
        name: "Iate para até 30 pessoas - valor por hora (mínimo de 3 horas)",
        description: "Iate privativo para até 30 pessoas. Valor por hora (mínimo de 3 horas). Comidas e bebidas vendidas separadamente.",
        price: 1000.00,
        imageUrl: "img/toursdubai/yacht30p.jpg",
        category: "AVENTURAS AQUÁTICAS"
    },
    {
        id: 307,
        name: "Iate para até 40 pessoas - valor por hora (mínimo de 3 horas)",
        description: "Iate privativo para até 40 pessoas. Valor por hora (mínimo de 3 horas). Comidas e bebidas vendidas separadamente.",
        price: 2000.00,
        imageUrl: "img/toursdubai/yacht40p.jpg",
        category: "AVENTURAS AQUÁTICAS"
    },
    {
        id: 308,
        name: "Mergulho em Dubai (30 Minutos)",
        description: "Descubra o mundo subaquático de Dubai com uma sessão de mergulho de 30 minutos. Ideal para iniciantes que querem experimentar o mergulho ou para mergulhadores experientes. Equipamento e acompanhamento inclusos. (Preço por pessoa, aplicável para adultos e crianças)",
        price: 132.00,
        imageUrl: "img/toursdubai/43.jpg",
        category: "AVENTURAS AQUÁTICAS"
    },
    {
        id: 309,
        name: "Mergulho em Dubai PP - 30 Minutos / adulto ou kids",
        description: "Descubra o mundo subaquático de Dubai com uma sessão de mergulho de 30 minutos. Equipamento e acompanhamento inclusos. (Preço por pessoa, adulto ou criança)",
        price: 477.10,
        imageUrl: "img/toursdubai/mergulho.jpg",
        category: "AVENTURAS AQUÁTICAS"
    },
    {
        id: 310,
        name: "Tour de Barco nas Ilhas de Dubai PP - 100 min",
        description: "Tour de barco pelas ilhas de Dubai por 100 minutos. Uma experiência relaxante e panorâmica pelas águas da cidade.",
        price: 300.94,
        imageUrl: "img/toursdubai/barcoilhas.jpg",
        category: "AVENTURAS AQUÁTICAS"
    },
    {
        id: 311,
        name: "Iate Compartilhado c/ Churrasco PP - adulto ou kids",
        description: "Passeio de iate compartilhado com churrasco incluso. Ideal para adultos e crianças aproveitarem juntos.",
        price: 477.10,
        imageUrl: "img/toursdubai/iatechurrasco.jpg",
        category: "AVENTURAS AQUÁTICAS"
    },
    {
        id: 312,
        name: "Deep Diving - Mergulhadores Sem Experiência / Pacote Padrão 12-30 m (40 min)",
        description: "Mergulho profundo para quem não tem experiência, entre 12 e 30 metros, por 40 minutos. Inclui acompanhamento especializado.",
        price: 1800.00,
        imageUrl: "img/toursdubai/deepdivingsemexp.jpg",
        category: "AVENTURAS AQUÁTICAS"
    },
    {
        id: 313,
        name: "Deep Diving - Mergulhadores Sem Experiência / Pacote c/ Certificado 12-30 m (40 min)",
        description: "Mergulho profundo para iniciantes com certificado incluso, entre 12 e 30 metros, por 40 minutos.",
        price: 2400.00,
        imageUrl: "img/toursdubai/deepdivingsemexpcert.jpg",
        category: "AVENTURAS AQUÁTICAS"
    },
    {
        id: 314,
        name: "Deep Diving - Mergulhadores Certificados / Pacote Padrão 12-30 m (40 min)",
        description: "Mergulho profundo para mergulhadores certificados, entre 12 e 30 metros, por 40 minutos.",
        price: 1800.00,
        imageUrl: "img/toursdubai/deepdivingcert.jpg",
        category: "AVENTURAS AQUÁTICAS"
    },
    {
        id: 315,
        name: "Deep Diving - Mergulhadores Certificados / Pacote c/ Certificado 12-30 m (40 min)",
        description: "Mergulho profundo para mergulhadores certificados com certificado incluso, entre 12 e 30 metros, por 40 minutos.",
        price: 2400.00,
        imageUrl: "img/toursdubai/deepdivingcertcert.jpg",
        category: "AVENTURAS AQUÁTICAS"
    },
    {
        id: 400,
        name: "Helicóptero 12 min Compartilhado - 1 adulto",
        description: "Voo panorâmico de helicóptero compartilhado por 12 minutos sobre Dubai. Experiência única para 1 adulto.",
        price: 711.98,
        imageUrl: "img/toursdubai/heli12comp.jpg",
        category: "EXPERIENCIAS AÉREAS"
    },
    {
        id: 401,
        name: "Helicóptero 17 min Compartilhado - 1 adulto",
        description: "Voo panorâmico de helicóptero compartilhado por 17 minutos sobre Dubai. Experiência única para 1 adulto.",
        price: 954.20,
        imageUrl: "img/toursdubai/heli17comp.jpg",
        category: "EXPERIENCIAS AÉREAS"
    },
    {
        id: 402,
        name: "Helicóptero 22 min Compartilhado - 1 adulto",
        description: "Voo panorâmico de helicóptero compartilhado por 22 minutos sobre Dubai. Experiência única para 1 adulto.",
        price: 1302.85,
        imageUrl: "img/toursdubai/heli22comp.jpg",
        category: "EXPERIENCIAS AÉREAS"
    },
    {
        id: 403,
        name: "Helicóptero 30 min Compartilhado - 1 adulto",
        description: "Voo panorâmico de helicóptero compartilhado por 30 minutos sobre Dubai. Experiência única para 1 adulto.",
        price: 2000.00,
        imageUrl: "img/toursdubai/heli30comp.jpg",
        category: "EXPERIENCIAS AÉREAS"
    },
    {
        id: 404,
        name: "Helicóptero 12 min Privativo - até 5 pessoas TT",
        description: "Voo privativo de helicóptero por 12 minutos para até 5 pessoas. Exclusividade e conforto.",
        price: 3600.00,
        imageUrl: "img/toursdubai/heli12priv.jpg",
        category: "EXPERIENCIAS AÉREAS"
    },
    {
        id: 405,
        name: "Helicóptero 17 min Privativo - até 5 pessoas TT",
        description: "Voo privativo de helicóptero por 17 minutos para até 5 pessoas. Exclusividade e conforto.",
        price: 4800.00,
        imageUrl: "img/toursdubai/heli17priv.jpg",
        category: "EXPERIENCIAS AÉREAS"
    },
    {
        id: 406,
        name: "Helicóptero 22 min Privativo - até 5 pessoas TT",
        description: "Voo privativo de helicóptero por 22 minutos para até 5 pessoas. Exclusividade e conforto.",
        price: 6500.00,
        imageUrl: "img/toursdubai/heli22priv.jpg",
        category: "EXPERIENCIAS AÉREAS"
    },
    {
        id: 407,
        name: "Helicóptero 30 min Privativo - até 5 pessoas TT",
        description: "Voo privativo de helicóptero por 30 minutos para até 5 pessoas. Exclusividade e conforto.",
        price: 8900.00,
        imageUrl: "img/toursdubai/heli30priv.jpg",
        category: "EXPERIENCIAS AÉREAS"
    },
    {
        id: 51,
        name: "Ingresso Global Village (Qualquer Dia)",
        description: "Acesso ao Global Village, um parque multicultural com pavilhões de diversos países, shows, comidas e compras. Válido para qualquer dia de funcionamento. (Preço por pessoa, aplicável para adultos e crianças a partir de 3 anos)",
        price: 8.17,
        imageUrl: "img/toursdubai/51.jpg",
        category: "DUBAI TICKETS"
    },
    {
        id: 52,
        name: "Ingresso The View (Vista Palmeira) - Com Fila",
        description: "Acesso ao observatório The View at The Palm, localizado no topo da Palm Tower, com vistas 360 graus da Palm Jumeirah, do Golfo Pérsico e do skyline de Dubai. Ingresso padrão com tempo de espera na fila. (Preço por pessoa, aplicável para adultos)",
        price: 29.97,
        imageUrl: "img/toursdubai/52.jpg",
        category: "DUBAI TICKETS"
    },
    {
        id: 53,
        name: "Ingresso The View (Vista Palmeira) - Com Fila",
        description: "Acesso ao observatório The View at The Palm para crianças, com vistas espetaculares da Palm Jumeirah e arredores. Ingresso padrão com tempo de espera na fila. (Preço por pessoa, aplicável para crianças)",
        price: 20.44,
        imageUrl: "img/toursdubai/53.jpg",
        category: "DUBAI TICKETS"
    },
    {
        id: 54,
        name: "Ingresso The View (Vista Palmeira) - Sem Fila",
        description: "Acesso rápido ao observatório The View at The Palm, evitando as filas. Desfrute das vistas panorâmicas da Palm Jumeirah e do skyline de Dubai com mais agilidade. (Preço por pessoa, aplicável para adultos)",
        price: 48.00,
        imageUrl: "img/toursdubai/54.jpg",
        category: "DUBAI TICKETS"
    },
    {
        id: 55,
        name: "Ingresso The View (Vista Palmeira) - Sem Fila",
        description: "Acesso rápido ao observatório The View at The Palm para crianças, sem a necessidade de esperar na fila. Vistas incríveis com mais conforto. (Preço por pessoa, aplicável para crianças)",
        price: 33.00,
        imageUrl: "img/toursdubai/55.jpg",
        category: "DUBAI TICKETS"
    },
    {
        id: 56,
        name: "Ingresso Burj Khalifa 124/125 c/ Fila (Após 14h)",
        description: "Acesso aos andares 124 e 125 do Burj Khalifa, o edifício mais alto do mundo, com vistas panorâmicas de Dubai. Ingresso padrão com tempo de espera na fila, válido para visitas após as 14h. (Preço por pessoa, aplicável para adultos)",
        price: 70.84,
        imageUrl: "img/toursdubai/56.jpg",
        category: "DUBAI TICKETS"
    },
    {
        id: 57,
        name: "Ingresso Burj Khalifa 124/125 c/ Fila (Após 14h)",
        description: "Acesso aos andares 124 e 125 do Burj Khalifa para crianças (3-8 anos), com vistas espetaculares de Dubai. Ingresso padrão com tempo de espera na fila, válido para visitas após as 14h. (Preço por pessoa, aplicável para crianças)",
        price: 44.96,
        imageUrl: "img/toursdubai/57.jpg",
        category: "DUBAI TICKETS"
    },
    {
        id: 58,
        name: "Ingresso Burj Khalifa 124/125 c/ Fila (9h-14h)",
        description: "Acesso aos andares 124 e 125 do Burj Khalifa com vistas panorâmicas de Dubai. Ingresso padrão com tempo de espera na fila, válido para visitas entre 9h e 14h. (Preço por pessoa, aplicável para adultos)",
        price: 49.05,
        imageUrl: "img/toursdubai/58.jpg",
        category: "DUBAI TICKETS"
    },
    {
        id: 59,
        name: "Ingresso Burj Khalifa 124/125 c/ Fila (9h-14h)",
        description: "Acesso aos andares 124 e 125 do Burj Khalifa para crianças (3-8 anos), com vistas espetaculares de Dubai. Ingresso padrão com tempo de espera na fila, válido para visitas entre 9h e 14h. (Preço por pessoa, aplicável para crianças)",
        price: 39.78,
        imageUrl: "img/toursdubai/59.jpg",
        category: "DUBAI TICKETS"
    },
    {
        id: 60,
        name: "Ingresso Burj Khalifa 124/125 c/ Fila + Aquário",
        description: "Combine a visita aos andares 124 e 125 do Burj Khalifa com a entrada para o Dubai Aquarium & Underwater Zoo, localizado no Dubai Mall. Ingresso padrão com tempo de espera na fila para o Burj Khalifa. (Preço por pessoa, aplicável para adultos)",
        price: 84.47,
        imageUrl: "img/toursdubai/60.jpg",
        category: "DUBAI TICKETS"
    },
    {
        id: 61,
        name: "Ingresso Burj Khalifa 124/125 c/ Fila + Aquário",
        description: "Combine a visita aos andares 124 e 125 do Burj Khalifa com a entrada para o Dubai Aquarium & Underwater Zoo para crianças (3-8 anos). Ingresso padrão com tempo de espera na fila para o Burj Khalifa. (Preço por pessoa, aplicável para crianças)",
        price: 74.93,
        imageUrl: "img/toursdubai/61.jpg",
        category: "DUBAI TICKETS"
    },
    {
        id: 62,
        name: "Ingresso Burj Khalifa 124/125/148 s/ Fila (Após 14h)",
        description: "Acesso VIP sem fila aos andares 124, 125 e o exclusivo andar 148 do Burj Khalifa, o ponto de observação mais alto do mundo. Inclui lounge e bebidas. Válido para visitas após as 14h. (Preço por pessoa, aplicável para adultos e crianças)",
        price: 152.00,
        imageUrl: "img/toursdubai/62.jpg",
        category: "DUBAI TICKETS"
    },
    {
        id: 63,
        name: "Ingresso Burj Khalifa 124/125/148 s/ Fila (9h-14h)",
        description: "Acesso VIP sem fila aos andares 124, 125 e o exclusivo andar 148 do Burj Khalifa. Inclui lounge e bebidas. Válido para visitas entre 9h e 14h. (Preço por pessoa, aplicável para adultos e crianças)",
        price: 109.00,
        imageUrl: "img/toursdubai/63.jpg",
        category: "DUBAI TICKETS"
    },
    {
        id: 64,
        name: "Ingresso Burj Khalifa s/ Fila Andar 154",
        description: "Acesso exclusivo e sem fila ao luxuoso lounge no andar 154 do Burj Khalifa, o ponto mais alto acessível ao público. Desfrute de vistas incomparáveis e serviço premium. (Preço por pessoa, aplicável para adultos e crianças)",
        price: 221.00,
        imageUrl: "img/toursdubai/64.jpg",
        category: "DUBAI TICKETS"
    },
    {
        id: 65,
        name: "Ingresso Sky Views Observatory + Escorregador",
        description: "Acesso ao Sky Views Observatory, com vistas panorâmicas de Dubai, e uma descida emocionante pelo Glass Slide (escorregador de vidro) do 53º andar. Uma experiência única e com adrenalina. (Preço por pessoa, aplicável para adultos)",
        price: 68.12,
        imageUrl: "img/toursdubai/65.jpg",
        category: "DUBAI TICKETS"
    },
    {
        id: 66,
        name: "Ingresso Museu do Futuro",
        description: "Explore o Museu do Futuro, um ícone arquitetônico e cultural de Dubai. Uma jornada imersiva pelas possibilidades do futuro, com exposições interativas e inovadoras. (Preço por pessoa, aplicável para adultos e crianças)",
        price: 42.00,
        imageUrl: "img/toursdubai/66.jpg",
        category: "DUBAI TICKETS"
    },
    {
        id: 67,
        name: "Ingresso The Frame (Moldura Dourada)",
        description: "Visite o The Dubai Frame, uma estrutura arquitetônica impressionante que oferece vistas únicas do 'velho' e do 'novo' Dubai. Suba ao topo para uma perspectiva panorâmica da cidade. (Preço por pessoa, aplicável para adultos)",
        price: 15.00,
        imageUrl: "img/toursdubai/67.jpg",
        category: "DUBAI TICKETS"
    },
    {
        id: 68,
        name: "Ingresso The Frame (Moldura Dourada)",
        description: "Visite o The Dubai Frame com ingresso para crianças (3-12 anos). Uma forma divertida e educativa de ver a evolução de Dubai. (Preço por pessoa, aplicável para crianças)",
        price: 6.94,
        imageUrl: "img/toursdubai/68.jpg",
        category: "DUBAI TICKETS"
    },
    {
        id: 69,
        name: "Ingresso Aquário Dubai Mall",
        description: "Acesso ao Dubai Aquarium & Underwater Zoo, um dos maiores aquários suspensos do mundo, localizado no Dubai Mall. Observe uma variedade incrível de vida marinha. (Preço por pessoa, aplicável para adultos)",
        price: 55.00,
        imageUrl: "img/toursdubai/69.jpg",
        category: "DUBAI TICKETS"
    },
    {
        id: 70,
        name: "Ingresso Miracle Garden",
        description: "Visite o Dubai Miracle Garden, o maior jardim de flores naturais do mundo. Um espetáculo de cores e formas com milhões de flores arranjadas de maneira criativa. (Preço por pessoa, aplicável para adultos)",
        price: 28.00,
        imageUrl: "img/toursdubai/70.jpg",
        category: "DUBAI TICKETS"
    },
    {
        id: 71,
        name: "Ingresso Miracle Garden",
        description: "Visite o Dubai Miracle Garden com ingresso para crianças (3-12 anos). Um lugar mágico e colorido para toda a família. (Preço por pessoa, aplicável para crianças)",
        price: 23.16,
        imageUrl: "img/toursdubai/71.jpg",
        category: "DUBAI TICKETS"
    },
    {
        id: 72,
        name: "Ingresso Ski Dubai",
        description: "O que está incluso: Entrada única para o Snow Park, permanência ilimitada. Aproveite as atividades do Snow Park, como nossa Caverna de Gelo. Bobsled ilimitado, passeio ilimitado na bola gigante, carrinhos bate-bate e descida de boia (tubbing) ilimitados.Uma vez no teleférico (Chairlift Ride).Uma vez na atração Mountain Thriller.Equipamentos de inverno fornecidos: jaqueta, calça, meias descartáveis, botas de neve e luvas de lã (fleece) gratuitas.Capacetes são obrigatórios para crianças menores de 13 anos.",
        price: 100.00,
        imageUrl: "img/toursdubai/72.jpg",
        category: "DUBAI TICKETS"
    },
    {
        id: 73,
        name: "Tour Guiado Burj al Arab",
        description: "Faça um tour guiado pelo interior do icônico hotel Burj Al Arab Jumeirah, considerado um dos mais luxuosos do mundo. Conheça sua arquitetura, história e interiores opulentos. (Preço por pessoa, aplicável para adultos)",
        price: 68.12,
        imageUrl: "img/toursdubai/73.jpg",
        category: "DUBAI TICKETS"
    },
    {
        id: 74,
        name: "Abra Lake Ride - Show das Águas",
        description: "Desfrute de um passeio tradicional de barco Abra no lago do Burj Khalifa durante o famoso show das fontes dançantes. Uma vista privilegiada e emocionante do espetáculo. (Preço por pessoa)",
        price: 18.80,
        imageUrl: "img/toursdubai/74.jpg",
        category: "DUBAI TICKETS"
    },
    {
        id: 75,
        name: "Ingresso Roda Gigante Ain Dubai c/ Corta Fila",
        description: "Acesso rápido e sem fila para a Ain Dubai, a maior roda gigante de observação do mundo. Desfrute de vistas espetaculares de Dubai de uma cabine climatizada. (Preço por pessoa, aplicável para adultos, exceto horários de pico)",
        price: 53.41,
        imageUrl: "img/toursdubai/75.jpg",
        category: "DUBAI TICKETS"
    },
    {
        id: 76,
        name: "Ingresso Roda Gigante Ain Dubai s/ Corta Fila",
        description: "Acesso padrão à Ain Dubai, a maior roda gigante de observação do mundo. Desfrute de vistas incríveis de Dubai. (Preço por pessoa, aplicável para adultos, exceto horários de pico)",
        price: 39.51,
        imageUrl: "img/toursdubai/76.jpg",
        category: "DUBAI TICKETS"
    },
    {
        id: 77,
        name: "Ingresso Roda Gigante Ain Dubai s/ Corta Fila",
        description: "Acesso padrão à Ain Dubai para crianças, a maior roda gigante de observação do mundo. Vistas espetaculares de Dubai. (Preço por pessoa, aplicável para crianças, exceto horários de pico)",
        price: 31.34,
        imageUrl: "img/toursdubai/77.jpg",
        category: "DUBAI TICKETS"
    },
    {
        id: 78,
        name: "Ingresso Parque IMG Worlds of Adventure (Marvel)",
        description: "Acesso ao IMG Worlds of Adventure, o maior parque temático indoor do mundo, com zonas dedicadas a personagens da Marvel, Cartoon Network e outras atrações originais. (Preço por pessoa, aplicável para adultos)",
        price: 90.00,
        imageUrl: "img/toursdubai/78.jpg",
        category: "DUBAI PARKS"
    },
    {
        id: 79,
        name: "Ingresso Legoland Dubai",
        description: "Acesso ao Legoland Dubai, um parque temático baseado nos famosos blocos de montar Lego, com atrações, shows e modelos construídos com Lego. Ideal para famílias com crianças de 2 a 12 anos. (Preço por pessoa, aplicável para adultos)",
        price: 90.00,
        imageUrl: "img/toursdubai/79.jpg",
        category: "DUBAI PARKS"
    },
    {
        id: 80,
        name: "Ingresso Parque Motiongate Dubai",
        description: "Acesso ao Motiongate Dubai, um parque temático inspirado em Hollywood, com atrações baseadas em filmes e estúdios como DreamWorks Animation, Columbia Pictures e Lionsgate. (Preço por pessoa, aplicável para adultos)",
        price: 80.38,
        imageUrl: "img/toursdubai/80.jpg",
        category: "DUBAI PARKS"
    },
    {
        id: 81,
        name: "Ingresso Parque Motiongate Dubai c/ Corta Fila",
        description: "Acesso rápido e sem fila ao Motiongate Dubai, permitindo que você aproveite as atrações inspiradas em Hollywood com mais agilidade. (Preço por pessoa, aplicável para adultos)",
        price: 121.25,
        imageUrl: "img/toursdubai/81.jpg",
        category: "DUBAI PARKS"
    },
    {
        id: 82,
        name: "Ingresso Legoland Water Park",
        description: "Acesso ao Legoland Water Park, um parque aquático projetado para famílias com crianças de 2 a 12 anos, com escorregadores, piscinas e atrações temáticas de Lego. (Preço por pessoa, aplicável para adultos)",
        price: 90.00,
        imageUrl: "img/toursdubai/82.jpg",
        category: "DUBAI PARKS"
    },
    {
        id: 83,
        name: "Ingresso Parque Real Madrid World",
        description: "Acesso ao Real Madrid World, o primeiro parque temático do Real Madrid no mundo. Desfrute de atrações, experiências e jogos inspirados no famoso clube de futebol. (Preço por pessoa, aplicável para adultos)",
        price: 90.00,
        imageUrl: "img/toursdubai/83.jpg",
        category: "DUBAI PARKS"
    },
    {
        id: 84,
        name: "Ingresso Parque Aquático Atlantis Aquaventure",
        description: "Acesso ao Atlantis Aquaventure Waterpark, um dos maiores e mais emocionantes parques aquáticos do mundo, localizado no Atlantis, The Palm. Desfrute de diversos escorregadores e atrações aquáticas. (Preço por pessoa, aplicável para adultos)",
        price: 90.00,
        imageUrl: "img/toursdubai/84.jpg",
        category: "DUBAI PARKS"
    },
    {
        id: 85,
        name: "Ingresso Parque Aquático Atlantis Aquaventure c/ Corta Fila",
        description: "Acesso rápido e sem fila ao Atlantis Aquaventure Waterpark, permitindo que você maximize seu tempo e aproveite mais escorregadores e atrações. (Preço por pessoa, aplicável para adultos)",
        price: 180.00,
        imageUrl: "img/toursdubai/85.jpg",
        category: "DUBAI PARKS"
    },
    {
        id: 86,
        name: "Ingresso Dubai Safari Park Zoo",
        description: "Acesso ao Dubai Safari Park, um extenso parque de vida selvagem com diversas zonas que abrigam animais de diferentes habitats ao redor do mundo. (Preço por pessoa, aplicável para adultos)",
        price: 14.99,
        imageUrl: "img/toursdubai/86.jpg",
        category: "DUBAI PARKS"
    },
    {
        id: 87,
        name: "Ingresso Dubai Safari Park Zoo",
        description: "Acesso ao Dubai Safari Park para crianças (3-12 anos). Uma oportunidade educativa e divertida para ver animais de perto. (Preço por pessoa, aplicável para crianças)",
        price: 6.81,
        imageUrl: "img/toursdubai/87.jpg",
        category: "DUBAI PARKS"
    },
    {
        id: 88,
        name: "Ingresso Experiência Dubai Safari Park Zoo",
        description: "Acesso completo ao Dubai Safari Park, incluindo o Safari Journey (passeio de ônibus pelas áreas de safari) e acesso a todas as vilas e shows. (Preço por pessoa, aplicável para adultos)",
        price: 35.42,
        imageUrl: "img/toursdubai/88.jpg",
        category: "DUBAI PARKS"
    },
    {
        id: 89,
        name: "Ingresso Experiência Dubai Safari Park Zoo",
        description: "Acesso completo ao Dubai Safari Park para crianças (3-12 anos), incluindo o Safari Journey e acesso a todas as vilas e shows. (Preço por pessoa, aplicável para crianças)",
        price: 27.25,
        imageUrl: "img/toursdubai/89.jpg",
        category: "DUBAI PARKS"
    },
    {
        id: 90,
        name: "Ingresso Palácio Presidencial (Qasr Al Watan) - adulto",
        description: "Visite o Qasr Al Watan, o magnífico Palácio Presidencial de Abu Dhabi. Explore a arquitetura deslumbrante, salões grandiosos e aprenda sobre a cultura e história dos Emirados Árabes Unidos.",
        price: 66.06,
        imageUrl: "img/toursdubai/90.jpg",
        category: "ABU DHABI TICKETS"
    },
    {
        id: 91,
        name: "Ingresso Museu do Louvre Abu Dhabi - adulto",
        description: "Acesso ao Museu do Louvre Abu Dhabi, uma obra-prima arquitetônica que abriga uma coleção de arte e artefatos que conectam diferentes culturas e civilizações.",
        price: 66.06,
        imageUrl: "img/toursdubai/91.jpg",
        category: "ABU DHABI TICKETS"
    },
    {
        id: 92,
        name: "Ingresso Grande Mesquita",
        description: "A entrada na Grande Mesquita Sheikh Zayed em Abu Dhabi é gratuita. Este item é apenas informativo. É altamente recomendado agendar sua visita online com antecedência.",
        price: 0.00,
        imageUrl: "img/toursdubai/92.jpg",
        category: "ABU DHABI TICKETS"
    },
    {
        id: 93,
        name: "Etihad Tower Observation Deck - com café da tarde (adulto)",
        description: "Desfrute de vistas panorâmicas de Abu Dhabi a partir do Observation Deck at 300, localizado nas Etihad Towers, incluindo um delicioso café da tarde.",
        price: 100.00,
        imageUrl: "img/toursdubai/93.jpg",
        category: "ABU DHABI TICKETS"
    },
    {
        id: 94,
        name: "Ingresso Tour Yas Marina Circuit (2 horas) - adulto",
        description: "Faça um tour guiado pelo Yas Marina Circuit, o famoso circuito de Fórmula 1 em Abu Dhabi. Conheça os bastidores, boxes, sala de controle e sinta a atmosfera do automobilismo.",
        price: 160.00,
        imageUrl: "img/toursdubai/94.jpg",
        category: "ABU DHABI TICKETS"
    },
    {
        id: 95,
        name: "Ingresso Parque da Ferrari Abu Dhabi - adulto",
        description: "Acesso ao Ferrari World Abu Dhabi, o primeiro parque temático da Ferrari no mundo. Desfrute de montanhas-russas emocionantes, simuladores e atrações que celebram a marca italiana.",
        price: 348.65,
        imageUrl: "img/toursdubai/95.jpg",
        category: "ABU DHABI PARKS"
    },
    {
        id: 96,
        name: "Ingresso Parque Warner Bros - adulto",
        description: "Acesso ao Warner Bros. World Abu Dhabi, um parque temático indoor com zonas imersivas baseadas em personagens da Warner Bros., como Batman, Superman, Looney Tunes e Flintstones.",
        price: 381.68,
        imageUrl: "img/toursdubai/96.jpg",
        category: "ABU DHABI PARKS"
    },
    {
        id: 97,
        name: "Ingresso Sea World Abu Dhabi - adulto",
        description: "Acesso ao SeaWorld Yas Island, Abu Dhabi, um parque temático marinho que oferece experiências imersivas com animais marinhos, shows e atrações educativas.",
        price: 381.68,
        imageUrl: "img/toursdubai/97.jpg",
        category: "ABU DHABI PARKS"
    },
    {
        id: 98,
        name: "Ingresso 2 Parques Abu Dhabi a escolher - adulto",
        description: "Acesso a dois parques temáticos na Ilha Yas, Abu Dhabi (Ferrari World, Warner Bros. World, SeaWorld ou Yas Waterworld - verificar opções disponíveis). Escolha seus dois parques favoritos para um dia de diversão.",
        price: 475.00,
        imageUrl: "img/toursdubai/98.jpg",
        category: "ABU DHABI PARKS"
    },
    {
        id: 99,
        name: "Ingresso 3 Parques Abu Dhabi a escolher - adulto",
        description: "Acesso a três parques temáticos na Ilha Yas, Abu Dhabi (Ferrari World, Warner Bros. World, SeaWorld ou Yas Waterworld - verificar opções disponíveis). Aproveite um combo para visitar três parques em dias diferentes.",
        price: 575.00,
        imageUrl: "img/toursdubai/99.jpg",
        category: "ABU DHABI PARKS"
    },
    {
        id: 100,
        name: "Ingresso 2 Parques Abu Dhabi a escolher - criança",
        description: "Acesso a dois parques temáticos na Ilha Yas, Abu Dhabi (Ferrari World, Warner Bros. World, SeaWorld ou Yas Waterworld - verificar opções disponíveis) para crianças. Escolha dois parques para a diversão dos pequenos.",
        price: 475.00,
        imageUrl: "img/toursdubai/100.jpg",
        category: "ABU DHABI PARKS"
    },
    {
        id: 101,
        name: "La Perle - Assento Normal",
        description: "Ingresso para o espetáculo aquático e acrobático La Perle by Dragone em Dubai. Escolha entre as categorias de assento Bronze, Silver ou Gold (verificar disponibilidade) para uma experiência visualmente deslumbrante.",
        price: 300.00,
        imageUrl: "img/toursdubai/101.jpg",
        category: "LA PERLE"
    },
    {
        id: 102,
        name: "La Perle - Assento Platinum + Foods & Drinks",
        description: "Desfrute do espetáculo La Perle com os melhores assentos na categoria Platinum. Inclui acesso a um lounge VIP exclusivo com snacks e bebidas antes do show. Uma experiência premium.",
        price: 520.00,
        imageUrl: "img/toursdubai/102.jpg",
        category: "LA PERLE"
    },
    {
        id: 103,
        name: "Serviço de Reservas e Indicações",
        description: "Recomendações e Reservas de Restaurantes, Day Use em Resorts e Beach Clubs de acordo com o seu perfil.",
        price: 183.50,
        imageUrl: "img/toursdubai/103.jpg",
        category: "PORTARE SERVIÇOS"
    },
    {
        id: 104,
        name: "Roteiro Personalizado",
        description: "Descritivo completo de todo o itinerário, endereços com localizações clicáveis, explicação de como chegar e dicas. Sua viagem toda por escrito para tornar sua experiência ainda mais prática.",
        price: 734.00,
        imageUrl: "img/toursdubai/104.jpg",
        category: "PORTARE SERVIÇOS"
    },
    {
        id: 105,
        name: "Upgrade para Assistência Premium (valor por dia)",
        description: "Profissional disponível em tempo real por whatsapp (respostas imediatas) para dúvidas durante a viagem. Horário de atendimento: 09:00 AM às 06:00 PM.",
        price: 150.00,
        imageUrl: "img/toursdubai/105.jpg",
        category: "PORTARE SERVIÇOS"
    },
    {
        id: 106,
        name: "Upgrade para Assistência VIP (valor por dia)",
        description: "Profissional disponível em tempo real por whatsapp ou chamada de voz (respostas imediatas) para dúvidas durante a viagem. Horário de atendimento: 07:00 AM às 00:30 AM.",
        price: 350.00,
        imageUrl: "img/toursdubai/106.jpg",
        category: "PORTARE SERVIÇOS"
    },
    {
        id: 107,
        name: "Profissional Staff (acompanhante não guia) em Português - Dia todo (10h) - Transporte não Incluso",
        description: "Profissional disponível em português por 10 horas para acompanhamento, sem transporte incluso.",
        price: 800.00,
        imageUrl: "img/toursdubai/107.jpg",
        category: "PORTARE SERVIÇOS"
    },
    {
        id: 108,
        name: "Staff (acompanhante não guia) em Português - Meio Período (5h) sem transporte",
        description: "Profissional disponível em português por 5 horas para acompanhamento, sem transporte incluso.",
        price: 500.00,
        imageUrl: "img/toursdubai/108.jpg",
        category: "PORTARE SERVIÇOS"
    },
    {
        id: 109,
        name: "Adicional Carro Premium",
        description: "Adicional Carro Premium 100 USD – Total até 4 pessoas 200 USD – Total até 12 Pessoas",
        price: 100,
        imageUrl: "img/toursdubai/.jpg",
        category: "TOUR DUBAI"
    },
    {
        id: 'tour-jebel-hatta-dia-todo-10h',
        name: "Tour Jebel Jais ou Hatta - Montanhas / Dia Todo (10h)",
        description: "Tour privativo de 10 horas para Jebel Jais ou Hatta com veículo, motorista, guia brasileiro(a) licenciado(a) e recomendação de itinerário. Ingressos vendidos separadamente. Hora extra: AED 220 (Toyota) / AED 350 (Ônibus). O valor por pessoa depende do número de participantes.",
        price: 631.24, // Valor base para 4+ pessoas, será sobrescrito pelo cálculo dinâmico
        imageUrl: "img/toursdubai/23.jpg", // Use uma imagem apropriada
        category: "TOUR RAK"
    },
    {
        id: 'traslado-dubai-abu-dhabi-2p',
        name: "Traslado Dubai-Abu Dhabi (1 Trecho) - até 2 pessoas TT",
        description: "Incluso: Veículo Toyota Previa (7 assentos - espaço p/ bagagem) e motorista no idioma inglês.",
        price: 650.00,
        imageUrl: "img/toursdubai/27.jpg",
        category: "TRASLADO"
    },
    {
        id: 'traslado-dubai-abu-dhabi-3-7p',
        name: "Traslado Dubai-Abu Dhabi (1 Trecho) - 3 a 7 pessoas TT",
        description: "Incluso: Hiace vehicle (13 assentos - espaço p/ bagagem) e motorista no idioma inglês.",
        price: 750.00,
        imageUrl: "img/toursdubai/28.jpg",
        category: "TRASLADO"
    },
    {
        id: 'traslado-dubai-abu-dhabi-8-14p',
        name: "Traslado Dubai-Abu Dhabi (1 Trecho) - 8 a 14 pessoas TT",
        description: "Incluso: 2 Hiace vehicle (13 assentos - espaço p/ bagagem) e motorista no idioma inglês.",
        price: 1500.00,
        imageUrl: "img/toursdubai/29.jpg",
        category: "TRASLADO"
    },
    {
        id: 'transporte-dubai-5h-ate-5p',
        name: "Transporte c/ Motorista em Dubai Meio Periodo (5h) até 5 pessoas",
        description: "Incluso: Veículo Toyota Previa 7 assentos, Motorista, recomendação de Itinerário (roteiro detalhado e ingressos vendidos separadamente). Não inclui Guia - Apenas Motorista no Idioma Inglês.",
        price: 800.00,
        imageUrl: "img/toursdubai/27.jpg",
        category: "CARRO COM MOTORISTA"
    },
    {
        id: 'transporte-dubai-5h-6-11p',
        name: "Transporte c/ Motorista em Dubai Meio Periodo (5h) 6 a 11 pessoas",
        description: "Incluso: Veículo Hiace vehicle 13 assentos, Motorista, recomendação de Itinerário (roteiro detalhado e ingressos vendidos separadamente). Não inclui Guia - Apenas Motorista no Idioma Inglês.",
        price: 950.00,
        imageUrl: "img/toursdubai/28.jpg",
        category: "CARRO COM MOTORISTA"
    },
    {
        id: 'transporte-dubai-5h-12-20p',
        name: "Transporte c/ Motorista em Dubai Meio Periodo (5h) 12 a 20 pessoas",
        description: "Incluso: Ônibus Executivo Yutong (2024) – 22 lugares, Motorista, recomendação de Itinerário (roteiro detalhado e ingressos vendidos separadamente). Não inclui Guia - Apenas Motorista no Idioma Inglês.",
        price: 1600.00,
        imageUrl: "img/toursdubai/29.jpg",
        category: "CARRO COM MOTORISTA"
    },
    {
        id: 'transporte-dubai-10h-ate-5p',
        name: "Transporte c/ Motorista em Dubai - Dia Todo (10h) até 5 pessoas",
        description: "Incluso: Veículo Toyota Previa 7 assentos, Motorista, recomendação de Itinerário (roteiro detalhado e ingressos vendidos separadamente). Não inclui Guia - Apenas Motorista no Idioma Inglês.",
        price: 1200.00,
        imageUrl: "img/toursdubai/27.jpg",
        category: "CARRO COM MOTORISTA"
    },
    {
        id: 'transporte-dubai-10h-6-11p',
        name: "Transporte c/ Motorista em Dubai - Dia Todo (10h) 6 a 11 pessoas",
        description: "Incluso: Veículo Hiace vehicle 13 assentos, Motorista, recomendação de Itinerário (roteiro detalhado e ingressos vendidos separadamente). Não inclui Guia - Apenas Motorista no Idioma Inglês.",
        price: 1400.00,
        imageUrl: "img/toursdubai/28.jpg",
        category: "CARRO COM MOTORISTA"
    },
    {
        id: 'transporte-dubai-10h-12-20p',
        name: "Transporte c/ Motorista em Dubai - Dia Todo (10h) 12 a 20 pessoas",
        description: "Incluso: Ônibus Executivo Yutong (2024) – 22 lugares, Motorista, recomendação de Itinerário (roteiro detalhado e ingressos vendidos separadamente). Não inclui Guia - Apenas Motorista no Idioma Inglês.",
        price: 1800.00,
        imageUrl: "img/toursdubai/29.jpg",
        category: "CARRO COM MOTORISTA"
    },
    {
        id: 'transporte-abu-dhabi-10h-ate-5p',
        name: "Transporte c/ Motorista em Abu Dhabi - Dia Todo (10h) até 5 pessoas",
        description: "Incluso: Veículo Toyota Previa 7 assentos, Motorista, recomendação de Itinerário (roteiro detalhado e ingressos vendidos separadamente). Não inclui Guia - Apenas Motorista no Idioma Inglês.",
        price: 1450.00,
        imageUrl: "img/toursdubai/27.jpg",
        category: "ABU DHABI CARRO"
    },
    {
        id: 'transporte-abu-dhabi-10h-6-11p',
        name: "Transporte c/ Motorista em Abu Dhabi - Dia Todo (10h) 6 a 11 pessoas",
        description: "Incluso: Veículo Hiace vehicle 13 assentos, Motorista, recomendação de Itinerário (roteiro detalhado e ingressos vendidos separadamente). Não inclui Guia - Apenas Motorista no Idioma Inglês.",
        price: 1950.00,
        imageUrl: "img/toursdubai/28.jpg",
        category: "ABU DHABI CARRO"
    },
    {
        id: 'transporte-abu-dhabi-10h-12-20p',
        name: "Transporte c/ Motorista em Abu Dhabi - Dia Todo (10h) 12 a 20 pessoas",
        description: "Incluso: Ônibus Executivo Yutong (2024) – 22 lugares, Motorista, recomendação de Itinerário (roteiro detalhado e ingressos vendidos separadamente). Não inclui Guia - Apenas Motorista no Idioma Inglês.",
        price: 2650.00,
        imageUrl: "img/toursdubai/29.jpg",
        category: "ABU DHABI CARRO"
    },
    {
        id: 200,
        name: "Quadriciclo 90 CC - 1 pessoa 20 min",
        description: "Aventure-se no deserto pilotando um quadriciclo 90 CC por 20 minutos. Ideal para quem busca emoção e diversão nas dunas.",
        price: 165.00,
        imageUrl: "img/toursdubai/quadriciclo90cc.jpg",
        category: "DESERTO"
    },
    {
        id: 201,
        name: "Buggy 1000 CC - até 2 pessoas 30 min",
        description: "Desfrute de um passeio emocionante de buggy 1000 CC por 30 minutos, com capacidade para até 2 pessoas. Sinta a adrenalina nas dunas do deserto.",
        price: 860.00,
        imageUrl: "img/toursdubai/buggy1000cc2p.jpg",
        category: "DESERTO"
    },
    {
        id: 202,
        name: "Buggy 1000 CC - até 4 pessoas 30 min",
        description: "Passeio de buggy 1000 CC por 30 minutos para até 4 pessoas. Uma experiência divertida e cheia de aventura nas dunas.",
        price: 1100.00,
        imageUrl: "img/toursdubai/buggy1000cc4p.jpg",
        category: "DESERTO"
    },
    {
        id: 203,
        name: "Adicional Guia em Português para Safari no Deserto (Valor Único) TT",
        description: "Adicione um guia falando português à sua experiência de Safari no Deserto para informações e acompanhamento personalizado durante todo o passeio.",
        price: 1025.00,
        imageUrl: "img/toursdubai/guiaportugues.jpg",
        category: "DESERTO"
    },
    {
        id: 204,
        name: "Safari no Deserto Premium - Transporte Compartilhado PP",
        description: "Incluso: Transfer compartilhado em carro 4X4 (6 assentos) ida e volta do Hotel, Rally nas dunas vermelhas, sandboard e parada para fotos, Falcão, Passeio simples de Camelo, Mesa área premium (3ª fileira), Jantar tipo Buffet, Danças e Show, bebidas não alcoólicas. Não incluso: disponíveis no local para comprar à parte - bebidas alcoólicas e narguilé.",
        price: 450.00,
        imageUrl: "img/toursdubai/premiumcompartilhado.jpg",
        category: "DESERTO"
    },
    {
        id: 205,
        name: "Safari no Deserto Premium - Transporte Privativo TT",
        description: "Incluso: Transfer privativo em carro 4X4 (6 assentos) ida e volta do Hotel, Rally nas dunas vermelhas, sandboard e parada para fotos, Falcão, Passeio simples de Camelo, Mesa área premium (3ª fileira), Jantar tipo Buffet, Danças e Show, bebidas não alcoólicas. Não incluso: disponíveis no local para comprar à parte - bebidas alcoólicas e narguilé.",
        price: 2282.74,
        imageUrl: "img/toursdubai/premiumprivativo.jpg",
        category: "DESERTO"
    },
    {
        id: 206,
        name: "Safari no Deserto Gold - Transporte Compartilhado PP",
        description: "Incluso: Transfer compartilhado em carro 4X4 (6 assentos) ida e volta do Hotel, Rally nas dunas vermelhas, sandboard e parada para fotos, Falcão, Passeio simples de Camelo, Mesa área Gold (2ª fileira), Menu especial do Chef 5★, servido à francesa, Danças e Show, bebidas não alcoólicas. Não incluso: disponíveis no local para comprar à parte - bebidas alcoólicas e narguilé. *Será privativo quando houver 6 pessoas do mesmo grupo.",
        price: 690.00,
        imageUrl: "img/toursdubai/goldcompartilhado.jpg",
        category: "DESERTO"
    },
    {
        id: 207,
        name: "Safari no Deserto Gold - Transporte Privativo - 2 pessoas PP",
        description: "Incluso: Transfer privativo em carro 4X4 (6 assentos) ida e volta do Hotel, Rally nas dunas vermelhas, sandboard e parada para fotos, Falcão, Passeio simples de Camelo, Mesa área Gold (2ª fileira), Menu especial do Chef 5★, servido à francesa, Danças e Show, bebidas não alcoólicas. Não incluso: disponíveis no local para comprar à parte - bebidas alcoólicas e narguilé.",
        price: 1256.25,
        imageUrl: "img/toursdubai/goldprivativo2p.jpg",
        category: "DESERTO"
    },
    {
        id: 208,
        name: "Safari no Deserto Gold - Transporte Privativo - 3 pessoas PP",
        description: "Incluso: Transfer privativo em carro 4X4 (6 assentos) ida e volta do Hotel, Rally nas dunas vermelhas, sandboard e parada para fotos, Falcão, Passeio simples de Camelo, Mesa área Gold (2ª fileira), Menu especial do Chef 5★, servido à francesa, Danças e Show, bebidas não alcoólicas. Não incluso: disponíveis no local para comprar à parte - bebidas alcoólicas e narguilé.",
        price: 950.00,
        imageUrl: "img/toursdubai/goldprivativo3p.jpg",
        category: "DESERTO"
    },
    {
        id: 209,
        name: "Safari no Deserto Gold - Transporte Privativo - 4 a 5 pessoas PP",
        description: "Incluso: Transfer privativo em carro 4X4 (6 assentos) ida e volta do Hotel, Rally nas dunas vermelhas, sandboard e parada para fotos, Falcão, Passeio simples de Camelo, Mesa área Gold (2ª fileira), Menu especial do Chef 5★, servido à francesa, Danças e Show, bebidas não alcoólicas. Não incluso: disponíveis no local para comprar à parte - bebidas alcoólicas e narguilé.",
        price: 805.00,
        imageUrl: "img/toursdubai/goldprivativo4p.jpg",
        category: "DESERTO"
    },
    {
        id: 210,
        name: "Safari no Deserto Platinum - Transporte Compartilhado PP",
        description: "Incluso: Transfer compartilhado em carro 4X4 (6 assentos) ida e volta do Hotel, Rally nas dunas vermelhas, sandboard e parada para fotos, Falcão, Passeio simples de Camelo, Mesa área Platinum (1ª fileira), Menu especial do Chef 5★, servido à francesa, Danças e Show, bebidas não alcoólicas. Não incluso: disponíveis no local para comprar à parte - bebidas alcoólicas e narguilé. *Será privativo quando houver 6 pessoas do mesmo grupo.",
        price: 795.00,
        imageUrl: "img/toursdubai/platinumcompartilhado.jpg",
        category: "DESERTO"
    },
    {
        id: 211,
        name: "Safari no Deserto Platinum - Transporte Privativo - 2 pessoas PP",
        description: "Incluso: Transfer privativo em carro 4X4 (6 assentos) ida e volta do Hotel, Rally nas dunas vermelhas, sandboard e parada para fotos, Falcão, Passeio simples de Camelo, Mesa área Platinum (1ª fileira), Menu especial do Chef 5★, servido à francesa, Danças e Show, bebidas não alcoólicas. Não incluso: disponíveis no local para comprar à parte - bebidas alcoólicas e narguilé.",
        price: 1361.25,
        imageUrl: "img/toursdubai/platinumprivativo2p.jpg",
        category: "DESERTO"
    },
    {
        id: 212,
        name: "Safari no Deserto Platinum - Transporte Privativo - 3 pessoas PP",
        description: "Incluso: Transfer privativo em carro 4X4 (6 assentos) ida e volta do Hotel, Rally nas dunas vermelhas, sandboard e parada para fotos, Falcão, Passeio simples de Camelo, Mesa área Platinum (1ª fileira), Menu especial do Chef 5★, servido à francesa, Danças e Show, bebidas não alcoólicas. Não incluso: disponíveis no local para comprar à parte - bebidas alcoólicas e narguilé.",
        price: 1121.18,
        imageUrl: "img/toursdubai/platinumprivativo3p.jpg",
        category: "DESERTO"
    },
    {
        id: 213,
        name: "Safari no Deserto Platinum - Transporte Privativo - 4 a 5 pessoas PP",
        description: "Incluso: Transfer privativo em carro 4X4 (6 assentos) ida e volta do Hotel, Rally nas dunas vermelhas, sandboard e parada para fotos, Falcão, Passeio simples de Camelo, Mesa área Platinum (1ª fileira), Menu especial do Chef 5★, servido à francesa, Danças e Show, bebidas não alcoólicas. Não incluso: disponíveis no local para comprar à parte - bebidas alcoólicas e narguilé.",
        price: 895.00,
        imageUrl: "img/toursdubai/platinumprivativo4p.jpg",
        category: "DESERTO"
    },
    {
        id: 214,
        name: "Safari no Deserto All Inclusive (Bebidas alcoólicas) - Transporte Compartilhado PP",
        description: "Incluso: Transfer compartilhado em carro 4X4 (6 assentos) ida e volta do Hotel, Rally nas dunas vermelhas, parada para fotos, Passeio simples de Camelo, Jantar tipo Buffet, Danças e Show, bebidas alcoólicas e não alcoólicas. Não incluso: narguilé.",
        price: 640.50,
        imageUrl: "img/toursdubai/allinclusivecompartilhado.jpg",
        category: "DESERTO"
    },
    {
        id: 215,
        name: "Safari no Deserto Emirate (Heritage) - Transporte Compartilhado PP",
        description: "Incluso: Transfer compartilhado ida e volta do Hotel, Rota no Deserto de Land Rover Vintage ou 30 Min de Camelo, Passeio simples de Camelo, Jantar tipo Buffet tradicional Emirate, Danças Típicas Emirate, Experiência sob as estrelas, bebidas alcoólicas tradicionais, acampamento beduíno.",
        price: 796.00,
        imageUrl: "img/toursdubai/emirateheritage.jpg",
        category: "DESERTO"
    },
];
