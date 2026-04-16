const folderStructure = [
    {
        name: "ecommerce",
        children: [
            {
                name: "home",
                description: "Recursos visuales y contenido principal de la página de inicio",
                children: [
                    {
                        name: "alkosto",
                        children: [
                            { name: "botonera-categorias" },
                            { name: "beneficios" },
                            { name: "medios-pago" },
                            {
                                name: "visuales",
                                children: [
                                    {
                                        name: "2025",
                                        children: [
                                            {
                                                name: "diciembre",
                                                children: [{ name: "navidad" }, { name: "blackdays" }]
                                            }
                                        ]
                                    },
                                    {
                                        name: "2026",
                                        children: [
                                            {
                                                name: "enero",
                                                children: [{ name: "cocina-nueva", children: [{ name: "hero-dest-ofertas-cocina.webp" }] }, { name: "estrenar-te-renueva" }, { name: "general" }]
                                            },
                                            { name: "febrero" },
                                            { name: "marzo" },
                                            { name: "recurrentes" }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: "ktronix",
                        children: [
                            { name: "botonera-categorias" },
                            { name: "beneficios" },
                            { name: "medios-pago" },
                            {
                                name: "visuales",
                                children: [
                                    {
                                        name: "2025",
                                        children: [
                                            { name: "noviembre", children: [{ name: "blackdays" }] },
                                            { name: "diciembre", children: [{ name: "navidad" }] }
                                        ]
                                    },
                                    {
                                        name: "2026",
                                        children: [
                                            { name: "enero", children: [{ name: "inicia-2026" }] },
                                            { name: "recurrentes" }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: "alkomprar",
                        children: [
                            { name: "botonera-categorias" },
                            { name: "beneficios" },
                            { name: "medios-pago" },
                            {
                                name: "visuales",
                                children: [
                                    {
                                        name: "2026",
                                        children: [
                                            { name: "enero", children: [{ name: "general" }, { name: "evento" }, { name: "tecno" }] },
                                            { name: "febrero" },
                                            { name: "marzo" },
                                            { name: "recurrentes" }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: "kalley",
                        children: [
                            { name: "botonera-categorias" },
                            { name: "beneficios" },
                            { name: "medios-pago" },
                            { name: "zona-seo" },
                            {
                                name: "visuales",
                                children: [
                                    {
                                        name: "2026",
                                        children: [
                                            { name: "enero", children: [{ name: "general" }, { name: "evento" }] },
                                            { name: "recurrentes" }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: "dinamicos",
                description: "Módulos dinámicos, banners HTML y carruseles que cambian frecuentemente",
                children: [
                    {
                        name: "alkosto",
                        children: [
                            { name: "2025", children: [{ name: "noviembre" }, { name: "diciembre" }] },
                            {
                                name: "2026",
                                children: [
                                    { name: "enero", children: [{ name: "general" }, { name: "evento" }] },
                                    { name: "febrero", children: [{ name: "general" }, { name: "evento" }] }
                                ]
                            }
                        ]
                    },
                    {
                        name: "ktronix",
                        children: [
                            {
                                name: "2026",
                                children: [
                                    { name: "enero", children: [{ name: "general" }, { name: "evento" }] },
                                    { name: "febrero", children: [{ name: "general" }, { name: "evento" }] }
                                ]
                            }
                        ]
                    },
                    {
                        name: "general",
                        description: "Eventos que se comparten en tiendas y usan el mismo material",
                        children: [
                            {
                                name: "2026",
                                children: [
                                    { name: "enero", children: [{ name: "hot-sale" }, { name: "evento" }] },
                                    { name: "febrero", children: [{ name: "electro-ala-fija" }, { name: "evento" }] }
                                ]
                            }
                        ]
                    },
                    {
                        name: "alkomprar",
                        children: [
                            {
                                name: "2026",
                                children: [
                                    { name: "enero", children: [{ name: "general" }, { name: "evento" }] },
                                    { name: "febrero", children: [{ name: "general" }, { name: "evento" }] }
                                ]
                            }
                        ]
                    },
                    {
                        name: "kalley",
                        children: [
                            {
                                name: "2026",
                                children: [
                                    { name: "enero", children: [{ name: "general" }, { name: "evento" }] },
                                    { name: "febrero", children: [{ name: "general" }, { name: "evento" }] }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: "banners",
                description: "Banners comerciales y creativos organizados por categoría y semana",
                children: [
                    {
                        name: "alkosto",
                        children: [
                            {
                                name: "2026",
                                children: [
                                    { name: "cel", children: [{ name: "ene-3", children: [{ name: "ak-samsung-galaxy-top.webp" }] }, { name: "ene-10" }, { name: "ene-17" }] },
                                    { name: "comp" },
                                    { name: "tv" },
                                    { name: "emails" }
                                ]
                            }
                        ]
                    },
                    {
                        name: "ktronix",
                        children: [
                            {
                                name: "2026",
                                children: [
                                    { name: "cel", children: [{ name: "ene-3" }, { name: "ene-10" }, { name: "ene-17" }] },
                                    { name: "comp" },
                                    { name: "tv" },
                                    { name: "emails" }
                                ]
                            }
                        ]
                    },
                    {
                        name: "alkomprar",
                        children: [
                            {
                                name: "2026",
                                children: [
                                    { name: "cel", children: [{ name: "ene-3" }, { name: "ene-10" }, { name: "ene-17" }] },
                                    { name: "comp" },
                                    { name: "tv" },
                                    { name: "emails" }
                                ]
                            }
                        ]
                    },
                    {
                        name: "kalley",
                        children: [
                            {
                                name: "2026",
                                children: [
                                    { name: "cel", children: [{ name: "ene-3" }, { name: "ene-10" }, { name: "ene-17" }] },
                                    { name: "comp" },
                                    { name: "tv" },
                                    { name: "emails" }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: "catalog",
                description: "Recursos transversales de separata",
                children: [
                    { name: "separata-alkosto-ktronix-abr.pdf" }
                ]
            },
            {
                name: "landings",
                description: "Recursos para páginas de marca, categorías, institucional y blogs",
                children: [
                    {
                        name: "alkosto",
                        children: [
                            { name: "brands", children: [{ name: "cristar" }, { name: "hankook" }] },
                            { name: "blogs" },
                            { name: "categorias", children: [{ name: "cam" }, { name: "jug" }, { name: "hog" }] },
                            { name: "institucional", children: [{ name: "plan-retoma" }] },
                            { name: "ofertas" }
                        ]
                    },
                    {
                        name: "ktronix",
                        children: [
                            { name: "brands" },
                            { name: "blogs" },
                            { name: "ofertas" }
                        ]
                    },
                    {
                        name: "alkomprar",
                        children: [
                            { name: "brands" },
                            { name: "blogs" },
                            { name: "ofertas" }
                        ]
                    },
                    {
                        name: "kalley",
                        children: [
                            { name: "brands" },
                            { name: "blogs" },
                            { name: "categorias", children: [{ name: "cam" }, { name: "jug" }, { name: "hog" }] },
                            { name: "institucional", children: [{ name: "plan-retoma" }] },
                            { name: "ofertas" }
                        ]
                    }, {
                        name: "general",
                        description: "Recursos generales de las marcas",
                        children: [
                            { name: "brands" },
                            { name: "blogs" }
                        ]
                    }
                ]
            },
            {
                name: "algolia",
                description: "Donde se almacenan las imagenes de las facetas",
                children: [
                    {
                        name: "categorias",
                        children: [
                            {
                                name: "bi-406",
                                children: [
                                    {
                                        name: "alkomprar",
                                        children: [
                                            { name: "card-nav-comedores.png" },
                                            { name: "card-nav-mesa-auxiliar.png" },
                                            { name: "card-nav-mesa-noche.png" },
                                            { name: "card-nav-mesas-plastico.png" }
                                        ]


                                    },
                                    {
                                        name: "alkosto",


                                    },
                                    {
                                        name: "ktronix",


                                    }
                                ]

                            },
                            {
                                name: "bi-viju",
                                children: [
                                    {
                                        name: "alkomprar"

                                    },
                                    {
                                        name: "alkosto"

                                    },
                                    {
                                        name: "ktronix"

                                    }

                                ]

                            },
                            {
                                name: "complementos-tv",
                                children: [
                                    {
                                        name: "alkomprar"

                                    },
                                    {
                                        name: "alkosto"

                                    },
                                    {
                                        name: "ktronix"

                                    },

                                ]

                            }
                        ]
                    },
                    {
                        name: "logos",
                        children: [{ name: "logo-challenger.png" }]
                    },
                    { name: "marcas" }
                ]
            }
        ]
    }
];
