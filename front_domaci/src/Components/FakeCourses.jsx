const FakeCourses = [
  {
    id: 1,
    naziv: "Osnove programiranja",
    opis: "Kurs o osnovama programiranja za početnike.",
    image: "/images/osnove_programiranja.jpg",  
    kreator: "Marko Marković",
    kategorija: "Programiranje",
    kreirano: "2024-01-01",
    azurirano: "2024-06-01",
    prijave: [
      { id: 1, status: "Prijavljen"},
      { id: 3, status: "Na Cekanju"},
      { id: 8, status: "Odbijen"}
    ],

    casovi: [
      {
        id: 1,
        naziv: "Uvod u programiranje",
        opis: "Osnove sintakse i logike.",
        video: {
          title: "Uvod u temu",
          url: "https://www.example.com/video1.mp4"
        },
        images: [
          { src: "/images/uvod_programiranje_1.jpg", alt: "Slika 1" },
          { src: "/images/uvod_programiranje_2.jpg", alt: "Slika 2" }
        ],
        pdfs: [
          { title: "Dokument 1", url: "https://www.example.com/document1.pdf" },
          { title: "Dokument 2", url: "https://www.example.com/document2.pdf" }
        ]
      },
      {
        id: 2,
        naziv: "Kontrola toka",
        opis: "Uslovi i petlje u programiranju.",
        video: {
          title: "Uslovi i petlje",
          url: "https://www.example.com/video2.mp4"
        },
        images: [
          { src: "/images/kontrola_toka_1.jpg", alt: "Slika 1" },
          { src: "/images/kontrola_toka_2.jpg", alt: "Slika 2" }
        ],
        pdfs: [
          { title: "Dokument 1", url: "https://www.example.com/document1.pdf" },
          { title: "Dokument 2", url: "https://www.example.com/document2.pdf" }
        ]
      }
    ]
  },
  {
    id: 2,
    naziv: "Napredni JavaScript",
    opis: "Duboko razumevanje modernog JavaScript-a.",
    image: "/images/napredni_js.jpg", 
    kreator: "Jelena Petrović",
    kategorija: "Programiranje",
    kreirano: "2024-02-15",
    azurirano: "2024-07-20",
    prijave: [
      {id: 2, status: "Prijavljen"},
      {id: 3, status: "Na Cekanju"},
      {id: 1, status: "Odbijen"},
      {id: 1, status: "Prijavljen"}
    ],
    casovi: [
      {
        id: 1,
        naziv: "ES6 i dalje",
        opis: "Pregled ES6 funkcionalnosti.",
        video: {
          title: "Pregled ES6",
          url: "https://www.example.com/video3.mp4"
        },
        images: [
          { src: "/images/es6_1.jpg", alt: "Slika 1" }
        ],
        pdfs: [
          { title: "ES6 dokument", url: "https://www.example.com/document3.pdf" }
        ]
      },
      {
        id: 2,
        naziv: "Asinhrono programiranje",
        opis: "Rad sa Promise i async/await.",
        video: {
          title: "Asinhrono programiranje",
          url: "https://www.example.com/video4.mp4"
        },
        images: [
          { src: "/images/asinhrono_programiranje_1.jpg", alt: "Slika 1" },
          { src: "/images/asinhrono_programiranje_2.jpg", alt: "Slika 2" }
        ],
        pdfs: [
          { title: "Promise dokument", url: "https://www.example.com/document4.pdf" },
          { title: "Async/Await dokument", url: "https://www.example.com/document5.pdf" }
        ]
      }
    ]
  },
  {
    id: 3,
    naziv: "UX Dizajn za početnike",
    opis: "Osnovni principi UX dizajna.",
    image: "/images/ux_dizajn.jpg",  
    kreator: "Ana Jovanović",
    kategorija: "Dizajn",
    kreirano: "2024-03-10",
    azurirano: "2024-08-05",
    prijave: [
      { id: 3, status: "Prijavljen" },
      { id: 5, status: "Odbijen" },
      { id: 6, status: "Na Cekanju" }
    ],
    casovi: [
      {
        id: 1,
        naziv: "Osnove UX-a",
        opis: "Šta je UX dizajn i zašto je važan?",
        video: {
          title: "Osnove UX-a",
          url: "https://www.example.com/video5.mp4"
        },
        images: [
          { src: "/images/ux_osnove_1.jpg", alt: "Slika 1" }
        ],
        pdfs: [
          { title: "Dokument o UX-u", url: "https://www.example.com/document6.pdf" }
        ]
      },
      {
        id: 2,
        naziv: "Wireframes",
        opis: "Kako kreirati žičane modele.",
        video: {
          title: "Kreiranje wireframe-ova",
          url: "https://www.example.com/video6.mp4"
        },
        images: [
          { src: "/images/wireframe_1.jpg", alt: "Slika 1" },
          { src: "/images/wireframe_2.jpg", alt: "Slika 2" }
        ],
        pdfs: [
          { title: "Wireframe dokument", url: "https://www.example.com/document7.pdf" }
        ]
      }
    ]
  },
  {
    id: 4,
    naziv: "Uvod u fiziku",
    opis: "Osnovne zakone fizike sa primerima.",
    image: "/images/uvod_u_fiziku.jpg",
    kreator: "Jelena Petrović",
    kategorija: "Fizika",
    kreirano: "2024-05-10",
    azurirano: "2024-08-10",
    prijave: [
      { id: 3, status: "Prijavljen" },
      { id: 5, status: "Odbijen" },
      { id: 6, status: "Na Cekanju" }
    ],
    casovi: [
      {
        id: 1,
        naziv: "Kinematika",
        opis: "Uvod u kretanje objekata.",
        video: {
          title: "Kinematika",
          url: "https://www.example.com/video7.mp4"
        },
        images: [
          { src: "/images/kinematika_1.jpg", alt: "Slika 1" }
        ],
        pdfs: [
          { title: "Kinematika dokument", url: "https://www.example.com/document8.pdf" }
        ]
      }
    ]
  },
  {
    id: 5,
    naziv: "Osnove matematike",
    opis: "Osnovne matematičke funkcije i teorije.",
    image: "/images/osnove_matematike.jpg",
    kreator: "Ana Jovanović",
    kategorija: "Matematika",
    kreirano: "2024-04-20",
    azurirano: "2024-07-01",
    prijave: [
      { id: 4, status: "Na Cekanju" },
      { id: 2, status: "Prijavljen" },
      { id: 9, status: "Prijavljen" },
      { id: 8, status: "Odbijen" },
      { id: 9, status: "Na Cekanju" }
    ],
    casovi: [
      {
        id: 1,
        naziv: "Algebra",
        opis: "Osnove algebre i matematičkih operacija.",
        video: {
          title: "Algebra",
          url: "https://www.example.com/video8.mp4"
        },
        images: [
          { src: "/images/algebra_1.jpg", alt: "Slika 1" }
        ],
        pdfs: [
          { title: "Algebra dokument", url: "https://www.example.com/document9.pdf" }
        ]
      }
    ]
  },
  {
    id: 6,
    naziv: "Uvod u ekonomiju",
    opis: "Osnovni pojmovi ekonomije.",
    image: "/images/uvod_u_ekonomiju.jpg",
    kreator: "Ana Jovanović",
    kategorija: "Ekonomija",
    kreirano: "2024-06-10",
    azurirano: "2024-08-01",
    prijave: [
      { id: 1, status: "Odbijen" },
      { id: 3, status: "Prijavljen" },
      { id: 10, status: "Na Cekanju" },
      { id: 4, status: "Prijavljen" }
    ],  
    casovi: [
      {
        id: 1,
        naziv: "Makroekonomija",
        opis: "Pregled osnovnih makroekonomskih principa.",
        video: {
          title: "Makroekonomija",
          url: "https://www.example.com/video9.mp4"
        },
        images: [
          { src: "/images/makroekonomija_1.jpg", alt: "Slika 1" }
        ],
        pdfs: [
          { title: "Makroekonomija dokument", url: "https://www.example.com/document10.pdf" }
        ]
      }
    ]
  },
  {
    id: 7,
    naziv: "Napredni dizajn",
    opis: "Napredne tehnike dizajniranja.",
    image: "/images/napredni_dizajn.jpg",
    kreator: "Marko Marković",
    kategorija: "Dizajn",
    kreirano: "2024-07-25",
    azurirano: "2024-08-05",
    prijave: [
      { id: 5, status: "Prijavljen" },
      { id: 6, status: "Na Cekanju" },
      { id: 7, status: "Odbijen" },
      { id: 8, status: "Prijavljen" },
      { id: 1, status: "Na Cekanju" }
    ],
    casovi: [
      {
        id: 1,
        naziv: "Kreacija i tipografija",
        opis: "Veštine tipografije u dizajnu.",
        video: {
          title: "Tipografija",
          url: "https://www.example.com/video10.mp4"
        },
        images: [
          { src: "/images/tipografija_1.jpg", alt: "Slika 1" }
        ],
        pdfs: [
          { title: "Tipografija dokument", url: "https://www.example.com/document11.pdf" }
        ]
      }
    ]
  },
  {
    id: 8,
    naziv: "Računarske mreže",
    opis: "Osnove računarskih mreža i protokola.",
    image: "/images/racunarske_mreze.jpg",
    kreator: "Marko Marković",
    kategorija: "Računarske nauke",
    kreirano: "2024-08-01",
    azurirano: "2024-09-01",
    prijave: [
      { id: 2, status: "Prijavljen" },
      { id: 7, status: "Na Cekanju" },
      { id: 9, status: "Odbijen" },
      { id: 3, status: "Na Cekanju" },
      { id: 3, status: "Prijavljen" },
      { id: 10, status: "Prijavljen" }
    ],
    casovi: [
      {
        id: 1,
        naziv: "Uvod u mreže",
        opis: "Osnove računarskih mreža, vrste mreža i osnovni protokoli.",
        video: {
          title: "Uvod u računarske mreže",
          url: "https://www.example.com/video11.mp4"
        },
        images: [
          { src: "/images/intro_mreze_1.jpg", alt: "Slika 1" }
        ],
        pdfs: [
          { title: "Dokument o mrežama", url: "https://www.example.com/document12.pdf" }
        ]
      },
      {
        id: 2,
        naziv: "IP protokoli",
        opis: "Razumevanje IP adresa i njihova primena.",
        video: {
          title: "IP protokoli",
          url: "https://www.example.com/video12.mp4"
        },
        images: [
          { src: "/images/ip_protokoli_1.jpg", alt: "Slika 1" }
        ],
        pdfs: [
          { title: "IP dokument", url: "https://www.example.com/document13.pdf" }
        ]
      }
    ]
  },
  {
    id: 9,
    naziv: "Digitalni marketing",
    opis: "Kako koristiti digitalne kanale za marketing.",
    image: "/images/digitalni_marketing.jpg",
    kreator: "Jelena Petrović",
    kategorija: "Marketing",
    kreirano: "2024-06-15",
    azurirano: "2024-08-20",
    prijave: [
      { id: 1, status: "Prijavljen" },
      { id: 6, status: "Prijavljen" },
      { id: 4, status: "Odbijen" },
      { id: 2, status: "Na Cekanju" }
    ],
    casovi: [
      {
        id: 1,
        naziv: "SEO optimizacija",
        opis: "Tehnike za poboljšanje rangiranja sajtova na pretraživačima.",
        video: {
          title: "SEO optimizacija",
          url: "https://www.example.com/video13.mp4"
        },
        images: [
          { src: "/images/seo_optimizacija_1.jpg", alt: "Slika 1" }
        ],
        pdfs: [
          { title: "SEO dokument", url: "https://www.example.com/document14.pdf" }
        ]
      },
      {
        id: 2,
        naziv: "SMM i društvene mreže",
        opis: "Kako koristiti društvene mreže za promociju brenda.",
        video: {
          title: "SMM i društvene mreže",
          url: "https://www.example.com/video14.mp4"
        },
        images: [
          { src: "/images/smm_drustvene_mreze_1.jpg", alt: "Slika 1" }
        ],
        pdfs: [
          { title: "SMM dokument", url: "https://www.example.com/document15.pdf" }
        ]
      }
    ]
  },
  {
    id: 10,
    naziv: "Osnove elektronike",
    opis: "Upoznavanje sa osnovnim principima elektronike.",
    image: "/images/osnove_elektronike.jpg",
    kreator: "Marko Marković",
    kategorija: "Elektronika",
    kreirano: "2024-07-05",
    azurirano: "2024-09-10",
    prijave: [
      { id: 2, status: "Prijavljen" },
      { id: 6, status: "Odbijen" },
      { id: 4, status: "Prijavljen" },
      { id: 7, status: "Na Cekanju" }
    ],
    casovi: [
      {
        id: 1,
        naziv: "Električni krugovi",
        opis: "Razumevanje osnovnih električnih krugova i komponenti.",
        video: {
          title: "Električni krugovi",
          url: "https://www.example.com/video15.mp4"
        },
        images: [
          { src: "/images/elektricni_krugovi_1.jpg", alt: "Slika 1" }
        ],
        pdfs: [
          { title: "Električni krug dokument", url: "https://www.example.com/document16.pdf" }
        ]
      },
      {
        id: 2,
        naziv: "Poluprovodnici",
        opis: "Uvod u rad sa poluprovodnicima.",
        video: {
          title: "Poluprovodnici",
          url: "https://www.example.com/video16.mp4"
        },
        images: [
          { src: "/images/poluprovodnici_1.jpg", alt: "Slika 1" }
        ],
        pdfs: [
          { title: "Poluprovodnici dokument", url: "https://www.example.com/document17.pdf" }
        ]
      }
    ]
  }
];



  
  export default FakeCourses;
  