import {
  EditProviderInfoBody,
  PriceUnit,
  ProviderProfileSection,
  RegisterProviderRequestBody,
  SectionType
} from "@ull/api-interfaces";

export const providerData: {
  register: RegisterProviderRequestBody,
  profile_picture: string,
  cover_picture: string
  company_info: EditProviderInfoBody,
  category: string,
  tags: string[],
  profile_content: ProviderProfileSection[]
}[] = [
  {
    register: {
      company_name: "Catering premium",
      email: "Catering.premium@gmail.com",
      password: "password",
      phone: "+33601020304",
      siren: "844639286"
    },
    profile_picture: '/images/81891603-logo-du-service-traiteur-icône-ou-étiquette-pour-le-menu-du-restaurant-ou-du-café-illustration-vecto.png',
    cover_picture: '/images/urban-gb6dbb4281_1920.jpg',
    company_info: {
      company_name: "Catering premium",
      company_description: "Un service traiteur de qualité",
      area_served: "Région parisienne",
      email: "Catering.premium@gmail.com",
      phone: "+33601020304",
      address: {
        number: "1",
        street: "Rue de la paix",
        postal_code: "75010",
        city: "Paris"
      },
    },
    category: "Traiteur",
    tags: ["Cuisine Française", "Salle des fêtes"],
    profile_content: [
      {
        id_section: "",
        type: SectionType.big,
        section_title: "Notre menu du moment",
        section_description: "",
        purchasable: true,
        pictures: [
          "/images/i130738-courgettes-farcies-aux-tomates-sechees-poulet-et-mozzarella.jpeg",
          "/images/quiche-aux-tomates-cerise-et-mozzarella.jpeg",
          "/images/nos-70-recettes-preferees-de-l-ete.jpeg",
        ],
        content: [
          {
            id_performance: "",
            performance_title: "Menu printanier",
            performance_description: "Un suberbe menu aux saveurs de l'été qui saura ravir vos invités. Entrée plat et dessert, ce menu plaira aux papilles des plus fins gourmets.\nNous vous proposons en entrée des courgettes farcies aux tomates séchées et poulet mariné, en plat principal une quiche au chorizo, et en dessert une bûche glacée pastèque-basilic.",
            price: {
              value: 3300,
              unit: PriceUnit.person
            },
            picture: "/images/wine-ga64186795_1920.jpg",
          }
        ]
      },
      {
        id_section: "",
        type: SectionType.medium,
        section_title: "Nos boissons",
        section_description: "Une sélection de vins français pour accompagner votre repas.",
        purchasable: true,
        content: [
          {
            id_performance: "",
            performance_title: "Bordeaux rouge - Seigneur de Paludate",
            performance_description: "Un bordeau rouge plaisir, aux arômes fruités",
            price: {
              value: 1100,
              unit: PriceUnit.stack
            },
            picture: "/images/image_4960.jpeg",
          },
          {
            id_performance: "",
            performance_title: "Bourgogne rouge - Hautes-côtes de Beaune",
            performance_description: "AOC Bourgogne, chaque arôme de ce vin vous plongera dans vos souvenirs : le parfum des sous-bois à l’automne, un pré fleuri le long de la route des vacances…",
            price: {
              value: 2400,
              unit: PriceUnit.stack
            },
            picture: "/images/demi-bouteille-vin-rouge-bourgogne-hautes-cotes-de-beaune-.jpeg",
          },
          {
            id_performance: "",
            performance_title: "Rosé du gard - La Belle Emilie Rosé",
            performance_description: "Sec et arômatique, ce vin du Rhône se marie parfaitement aux journées ensoleillées",
            price: {
              value: 1300,
              unit: PriceUnit.stack
            },
            picture: "/images/belleemilie-rose.jpeg",
          },
          {
            id_performance: "",
            performance_title: "Rosé corse - Domaine San Pieru",
            performance_description: "Ce rosé a fait tout le chemin depuis l'île de beauté pour ravir vos papilles",
            price: {
              value: 2200,
              unit: PriceUnit.stack
            },
            picture: "/images/san-pieru-rose-vin-corse-1-1.jpeg",
          }
        ]
      }
    ]
  },
  {
    register: {
      company_name: "Chez Luigi",
      email: "luigi-pizzeria-paris@gmail.com",
      password: "password",
      phone: "+33601020305",
      siren: "421415803"
    },
    profile_picture: '/images/baker-1620504_1920.jpg',
    cover_picture: '/images/Taormina-Sicile.jpeg',
    company_info: {
      company_name: "Chez Luigi",
      company_description: "Les meilleures pizza hors d'italie",
      area_served: "Paris et petite couronne",
      email: "luigi-pizzeria-paris@gmail.com",
      phone: "+33601020305",
      address: {
        number: "2",
        street: "Rue de la paix",
        postal_code: "75010",
        city: "Paris"
      },
    },
    category: "Traiteur",
    tags: ["Cuisine Italienne"],
    profile_content: [
      {
        id_section: "",
        type: SectionType.info,
        section_title: "Mon parcours",
        section_description: "Classé cinq années de suite meilleure pizza d’ile de france. Mes pizzas sauront ravir vos invités, qu’il s’agisse d’une réunion de famille, d’une sortie team-building, ou encore d’une fête entre amis.",
        content: [],
        purchasable: false
      },
      {
        id_section: "",
        type: SectionType.big,
        section_title: "La formule",
        section_description: "",
        purchasable: true,
        pictures: [
          "/images/pizza-6478481__340.jpeg",
          "/images/pizza-2643374__340.jpeg",
        ],
        content: [
          {
            id_performance: "",
            performance_title: "Une pizza par invité",
            performance_description: "Une option simple, rapide et conviviale pour plaire à vos invités. Choissisez chacun une pizza de taille L (33 cm) chacun dans le cataglogue, et Luigi vous les apportera le jour J.",
            price: {
              value: 1500,
              unit: PriceUnit.person
            },
            picture: "/images/pizza-6478478__480.jpeg",
          }
        ]
      },
      {
        id_section: "",
        type: SectionType.small,
        section_title: "La carte des pizza",
        section_description: "",
        purchasable: false,
        preview_amount: 3,
        content: [
          {
            id_performance: "",
            performance_title: "Pizza margherita",
            performance_description: "Base tomate, mozarella, jambon, champignons",
            price: {
              value: 600,
              unit: PriceUnit.stack
            },
            picture: "/images/téléchargement.jpeg",
          },
          {
            id_performance: "",
            performance_title: "Pizza regina",
            performance_description: "AOC Bourgogne, chaque arôme de ce vin vous plongera dans vos souvenirs : le parfum des sous-bois à l’automne, un pré fleuri le long de la route des vacances…",
            price: {
              value: 800,
              unit: PriceUnit.stack
            },
            picture: "/images/téléchargement(3).jpeg",
          },
          {
            id_performance: "",
            performance_title: "Pizza 4 fromages",
            performance_description: "Base crème fraiche, gruyère, mozarella, chèvre, gorgonzola",
            price: {
              value: 1000,
              unit: PriceUnit.stack
            },
            picture: "/images/téléchargement(1).jpeg",
          },
          {
            id_performance: "",
            performance_title: "Pizza pepperoni",
            performance_description: "Base tomate, mozarella, pepperoni",
            price: {
              value: 1250,
              unit: PriceUnit.stack
            },
            picture: "/images/téléchargement(2).jpeg",
          },
          {
            id_performance: "",
            performance_title: "Pizza suprême",
            performance_description: "Base tomate, mozarella, pepperoni, champignons, olives, poivrons",
            price: {
              value: 1350,
              unit: PriceUnit.stack
            },
            picture: "/images/2560px-Supreme_pizza.jpeg",
          }
        ]
      },
      {
        id_section: "",
        type: SectionType.medium,
        section_title: "Les annexes",
        section_description: "Des petit plaisirs supplémentaires en fin de repas",
        purchasable: true,
        content: [
          {
            id_performance: "",
            performance_title: "Tiramisu",
            performance_description: "Un authentique tiramisu italien qui saura raviver les souvenirs de votre enfance.",
            price: {
              value: 600,
              unit: PriceUnit.stack
            },
            picture: "/images/italian-food-2157246__340.jpeg",
          },
          {
            id_performance: "",
            performance_title: "Cannoli",
            performance_description: "J'ai ramené la recette de Sicile avec moi.",
            price: {
              value: 800,
              unit: PriceUnit.stack
            },
            picture: "/images/sicilian-cannoli-3686050__340.jpeg",
          },
          {
            id_performance: "",
            performance_title: "Pandoro",
            performance_description: "Le déssert traditionnel de Noël",
            price: {
              value: 1000,
              unit: PriceUnit.stack
            },
            picture: "/images/pandoro-3772455__340.jpeg",
          }
        ]
      }
    ]
  },
  {
    register: {
      company_name: "Gabriel Châtillon",
      email: "gabriel.chatillon@outlook.com",
      password: "password",
      phone: "+33601020306",
      siren: "511930729"
    },
    profile_picture: '/images/music-player-g7f03cb116_1920.jpg',
    cover_picture: '/images/audio-g4cfa9b9e7_1920.jpg',
    company_info: {
      company_name: "Gabriel Châtillon",
      company_description: "DJ moderne",
      area_served: "Sud de Paris",
      email: "gabriel.chatillon@outlook.com",
      phone: "+33601020306",
      address: {
        number: "1",
        street: "Rue de la victoire",
        postal_code: "94310",
        city: "Orly"
      },
    },
    category: "Musicien",
    tags: ["DJ", "Style moderne"],
    profile_content: [
      {
        id_section: "",
        type: SectionType.big,
        section_title: "Animation musicale",
        section_description: "",
        purchasable: true,
        pictures: [
          "/images/dj-g43624caea_1920.jpg",
          "/images/hand-g94e2eabe3_1920.jpg"
        ],
        content: [
          {
            id_performance: "",
            performance_title: "Je viens faire l'animation de votre événement",
            performance_description: "Je m'adapte à vos goûts et vos envie, pour tous les publics. N'hésitez pas si vous avez une idée précise de ce que vous voulez (artiste, album, voire une liste exacte). Je peux également vous conseiller et éllaborer une playlist avec vous si vous êtes moins sûr.\n\nNous pouvons discuter via le chat de l'application.\n\nAttention : pour des raisons légales de droit d'auteur, je ne peux pas passer toutes les musiques. Nous pourrons également discuter de cela pour organiser au mieux votre événement.",
            price: {
              value: 25000,
              unit: PriceUnit.absolute
            },
            picture: "/images/audience-g6ad299182_1920.jpg",
          }
        ]
      }
    ]
  },
  {
    register: {
      company_name: "Domaine de la Tuilerie",
      email: "domaine-tuilerie@orange.fr",
      password: "password",
      phone: "+33601020307",
      siren: "484456884"
    },
    profile_picture: '/images/logo-tuilerie-150.png',
    cover_picture: '/images/Tuilerie_Slider_2B.jpeg',
    company_info: {
      company_name: "Domaine de la Tuilerie",
      company_description: "Un espace de 370 mètres carrés pouvant accueillir 400 personnes.",
      area_served: "Domaine à Marolles-en-Brie (94440)",
      email: "domaine-tuilerie@orange.fr",
      phone: "+33601020307",
      address: {
        number: "7",
        street: "Rue de la Tuilerie",
        postal_code: "94440",
        city: "Marolles-en-Brie"
      },
    },
    category: "Locataire de salle",
    tags: ["Salle des fêtes", "Monument historique", "Parc", "Château"],
    profile_content: [
      {
        id_section: "",
        type: SectionType.big,
        section_title: "Salle de festivités",
        section_description: "",
        purchasable: true,
        pictures: [
          "/images/lico-4.jpeg",
          "/images/lico-15.jpeg",
          "/images/lico-16.jpeg",
          "/images/lico-29.jpeg",
          "/images/lico-34.jpeg",
          "/images/lico-37.jpeg"
        ],
        content: [
          {
            id_performance: "",
            performance_title: "Louer le domaine",
            performance_description: "Bienvenue chez marolles event !\n\nPour vos événements privés, notre équipe de professionnels vous accompagne avec grand plaisir dans toute l'organisation de votre projet et met tout son savoir-faire à votre service.\n\nNotre espace le pavillon \"la Tuilerie\" à Marolles en Brie peut accueillir vos réceptions privées de 100 à 400 personnes. Ce lieu sera idéal pour vos mariages.Notre salle de réception très spacieuse, ouverte sur un grand jardin fleuri, est à votre disposition. Idéale pour une réception en pleine nature. Nous ferons notre maximum pour faire de votre événement, un moment spécial pour vous et vos invités que vous n'oublierez jamais, soyez-en sûrs !\n\n! Entreprises ou particuliers, vous pourrez nous accorder toute votre confiance les yeux fermés.\n\nNous mettons un point d’honneur à répondre à vos besoins, notamment pour les dîners de Gala, les dîners de fin d'année, les repas d'affaires ou encore les déjeuners d'affaires ou de fin d'année...\n\nPour de plus amples informations, n'hésitez pas à nous contacter !",
            price: {
              value: 150000,
              unit: PriceUnit.absolute
            },
            picture: "/images/lico-17.jpeg",
          }
        ]
      }
    ]
  },
  {
    register: {
      company_name: "Les délices du Rajasthan",
      email: "delice.rajasthan@outlook.com",
      password: "passwd",
      phone: "+33671212458",
      siren: "564528652"
    },
    profile_picture: '/images/Vegetarian_Curry.jpeg',
    cover_picture: '/images/rajasthan_577.jpg',
    company_info: {
      company_name: "Les délices du Rajasthan",
      company_description: "Traiteur indien qui offre des plats de qualité pour vos papilles",
      area_served: "Nord de Paris",
      email: "delice.rajasthan@outlook.com",
      phone: "+33671212458",
      address: {
        number: "23",
        street: "rue de Bellevue",
        postal_code: "75020",
        city: "Paris"
      },
    },
    category: "Traiteur",
    tags: ["Cuisine Indienne", "Salle des fêtes"],
    profile_content: []
  },
  {
    register: {
      company_name: "Nihongo Jouzu",
      email: "nihongo.jouzu@gmail.com",
      password: "dummypass",
      phone: "+33650908070",
      siren: "102608987"
    },
    profile_picture: '/images/japanese-food-940x625.jpg',
    cover_picture: '/images/WallpaperStudio10japon-207132-1680x1050.jpg',
    company_info: {
      company_name: "Nihongo Jouzu",
      company_description: "Découvrez les plats du Japon dans le restaurant Nihongo Jouzu",
      area_served: "Ouest de Paris",
      email: "nihongo.jouzu@gmail.com",
      phone: "+33650908070",
      address: {
        number: "87",
        street: "rue de Patrick Balkany",
        postal_code: "92300",
        city: "Levallois-Perret"
      },
    },
    category: "Traiteur",
    tags: ["Cuisine Japonaise", "Style Zen", "Livraison"],
    profile_content: []
  },
  {
    register: {
      company_name: "El Pedro Alto",
      email: "Elpedroalto@gmail.com",
      password: "dummypass",
      phone: "+33787986545",
      siren: "434525987"
    },
    profile_picture: '/images/i52156-meilleures-recettes-mexicaines.jpg',
    cover_picture: '/images/paysage-centre-mexique.jpg',
    company_info: {
      company_name: "El Pedro Alto",
      company_description: "Venez dégustez les spécialités mexicaines",
      area_served: "Nord de Paris",
      email: "elpedroalto@gmail.com",
      phone: "+33787986545",
      address: {
        number: "87",
        street: "rue François Mitterand",
        postal_code: "93000",
        city: "Saint-Denis"
      },
    },
    category: "Traiteur",
    tags: ["Cuisine Mexicaine", "Livraison", "Fanfare"],
    profile_content: []
  },
  {
    register: {
      company_name: "Kamsa Hamida",
      email: "kamsa.resto@gmail.com",
      password: "dummypass",
      phone: "+33690654567",
      siren: "852964758"
    },
    profile_picture: '/images/304090.jpg',
    cover_picture: '/images/825071.jpg',
    company_info: {
      company_name: "Kamsa Hamida",
      company_description: "Les délices de Corée du Sud",
      area_served: "Est de Paris",
      email: "kamsa.resto@gmail.com",
      phone: "+33690654567",
      address: {
        number: "87",
        street: "rue du château",
        postal_code: "94080",
        city: "Vincennes"
      },
    },
    category: "Traiteur",
    tags: ["Cuisine Coréenne", "Livraison"],
    profile_content: []
  },
  {
    register: {
      company_name: "Rastapopoulos",
      email: "rastapopoulos.resto@outlook.com",
      password: "dummypass",
      phone: "+33798781234",
      siren: "108987456"
    },
    profile_picture: '/images/cuisine-grecque-flickr-9712150801_748a76b73e_h.jpg',
    cover_picture: '/images/grce-santorin.jpg',
    company_info: {
      company_name: "Rastapopoulos",
      company_description: "Découvrez les meilleurs plats grecs dans notre restaurant",
      area_served: "Essonne",
      email: "rastapopoulos.resto@outlook.com",
      phone: "+33798781234",
      address: {
        number: "58",
        street: "rue du prisme",
        postal_code: "91100",
        city: "Villabé"
      },
    },
    category: "Traiteur",
    tags: ["Cuisine Grecque", "Livraison", "Salle de fête"],
    profile_content: []
  },
  {
    register: {
      company_name: "La fecha de hoy",
      email: "lafechadehoy@outlook.com",
      password: "dummypass",
      phone: "+33787116685",
      siren: "454856898"
    },
    profile_picture: '/images/1200x600-paella-1200x900.jpg',
    cover_picture: '/images/8442_Fill_800_800.png',
    company_info: {
      company_name: "La fecha de hoy",
      company_description: "Ce restaurant est vraiment le meilleur restaurant espagnol",
      area_served: "Paris",
      email: "lafechadehoy@outlook.com",
      phone: "+33787116685",
      address: {
        number: "14",
        street: "Avenue des Champs-Elysées",
        postal_code: "75016",
        city: "Paris"
      },
    },
    category: "Traiteur",
    tags: ["Cuisine Espagnole", "Livraison"],
    profile_content: []
  },
  {
    register: {
      company_name: "Thaï hade",
      email: "thaihade@gmail.com",
      password: "dummypass",
      phone: "+33698762076",
      siren: "902685741"
    },
    profile_picture: '/images/On-fond-pour-le-pad-thai.jpg',
    cover_picture: '/images/thailande.png',
    company_info: {
      company_name: "Thaï hade",
      company_description: "Thaï hade est un restaurant thaï qui propose les plats les plus savoureux du monde",
      area_served: "Nord de Paris",
      email: "thaihade@gmail.com",
      phone: "+33698762076",
      address: {
        number: "74",
        street: "rue de la tranquilité",
        postal_code: "Cergy",
        city: "95000"
      },
    },
    category: "Traiteur",
    tags: ["Cuisine Thaï", "Livraison"],
    profile_content: []
  },
  {
    register: {
      company_name: "La grande muraille",
      email: "lagrandemuraille@outlook.com",
      password: "dummypass",
      phone: "+33618576622",
      siren: "839461345"
    },
    profile_picture: '/images/plat-chinois-e1505832667470.jpg',
    cover_picture: '/images/parc-wulingyuan-chine-wusuowei.jpeg',
    company_info: {
      company_name: "La grande muraille",
      company_description: "La grande muraille est très accueillante et est un lieu de convivialité où vous pouvez manger de bonnes spécilalités",
      area_served: "Paris",
      email: "lagrandemuraille@outlook.com",
      phone: "+33618576622",
      address: {
        number: "21",
        street: "rue de la république",
        postal_code: "75003",
        city: "Paris"
      },
    },
    category: "Traiteur",
    tags: ["Cuisine Chinoise", "Salle de fête"],
    profile_content: []
  },
  {
    register: {
      company_name: "L'oasis",
      email: "oasis.resto@outlook.com",
      password: "dummypass",
      phone: "+33666328914",
      siren: "971244663"
    },
    profile_picture: '/images/riz-au-poulet-et-legumes-343.640x480.jpg',
    cover_picture: '/images/index.jpg',
    company_info: {
      company_name: "L'oasis",
      company_description: "Venez déguster les délicieux plats du monde oriental",
      area_served: "Sud de Paris",
      email: "oasis.resto@outlook.com",
      phone: "+33666328914",
      address: {
        number: "45",
        street: "rue de la fraternité",
        postal_code: "91300",
        city: "Massy"
      },
    },
    category: "Traiteur",
    tags: ["Cuisine Orientale", "Livraison"],
    profile_content: []
  },
  {
    register: {
      company_name: "Les saveurs de Kinshasa",
      email: "saveurs.kinshasa@outlook.com",
      password: "dummypass",
      phone: "+33692728242",
      siren: "105520312"
    },
    profile_picture: '/images/Les-repas-du-jeudi-a%CC%80-Gourgan-Congo.jpeg',
    cover_picture: '/images/Congo.jpg',
    company_info: {
      company_name: "Les saveurs de Kinshasa",
      company_description: "Découvrez les plats des différents pays de l'Afrique",
      area_served: "Est de Paris",
      email: "saveurs.kinshasa@outlook.com",
      phone: "+33692728242",
      address: {
        number: "58",
        street: "rue Paul Vaillant-Couturier",
        postal_code: "77160",
        city: "Provins"
      },
    },
    category: "Traiteur",
    tags: ["Cuisine Africaine", "Livraison"],
    profile_content: []
  },
  {
    register: {
      company_name: "La cuisine des iles",
      email: "cuisinedesiles@gmail.com",
      password: "dummypass",
      phone: "+33649264755",
      siren: "452125954"
    },
    profile_picture: '/images/90a3d4af4b5f54456b7db973ac01c830-1920.jpg',
    cover_picture: '/images/Paysage-Plage-Antilles.jpg',
    company_info: {
      company_name: "La cuisine des iles",
      company_description: "La cuisine des Iles vous sertses meilleurs plats",
      area_served: "Paris",
      email: "cuisinedesiles@gmail.com",
      phone: "+33649264755",
      address: {
        number: "22",
        street: "rue Stalingrad",
        postal_code: "75019",
        city: "Paris"
      },
    },
    category: "Traiteur",
    tags: ["Cuisine Antillaise"],
    profile_content: []
  }
]
