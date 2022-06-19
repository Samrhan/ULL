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
    profile_picture: 'images/waitress-gff8ebb643_1920.jpg',
    cover_picture: 'images/waitress-gff8ebb643_1920.jpg',
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
    category: "",
    tags: [""],
    profile_content: [
      {
        id_section: "",
        type: SectionType.big,
        section_title: "Le bar",
        section_description: "",
        purchasable: true,
        pictures: [
          "images/waitress-gff8ebb643_1920.jpg",
          "images/beer-820011_1920.jpg",
        ],
        content: [
          {
            id_performance: "",
            performance_title: "Service au bar",
            performance_description: "Nos cocktails, nos softs",
            price: {
              value: 1300,
              unit: PriceUnit.person
            },
            picture: "images/cocktails.jpg",
          }
        ]
      },
      {
        id_section: "",
        type: SectionType.medium,
        section_title: "Notre carte",
        section_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id vulputate dui, vel finibus nibh.",
        purchasable: false,
        content: [
          {
            id_performance: "",
            performance_title: "Cupcakes",
            performance_description: "De très bons cupcakes",
            price: {
              value: 500,
              unit: PriceUnit.stack
            },
            picture: "images/cupcakes-gc0620a627_1920.jpg",
          },
          {
            id_performance: "",
            performance_title: "Tiramisu",
            performance_description: "Meilleur dessert fait maison.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. \nEtiam id vulputate dui, vel finibus nibh. Aliquam fringilla mi vel fermentum pulvinar. Ut venenatis nisi lorem, sit amet lacinia orci sollicitudin eget. In mattis est ex, eu tristique orci dignissim varius.",
            price: {
              value: 500,
              unit: PriceUnit.stack
            },
            picture: "images/italian-food-2157246__340.png",
          }
        ]
      }
    ]
  },
]
