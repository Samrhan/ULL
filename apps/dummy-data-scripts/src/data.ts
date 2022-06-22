import {
  EditProviderInfoBody,
  PriceUnit,
  ProviderProfileSection,
  RegisterProviderRequestBody,
  SectionType
} from "@ull/api-interfaces";

export const providerData : {
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
    profile_picture: '/images/music-player-g7f03cb116_1920.jpg',
    cover_picture: '/images/audio-g4cfa9b9e7_1920.jpg',
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
        section_title: "Animation musicale",
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
  }
]
