const CACHE_NAME = "fishing-v3";


const ARCHIVOS = [

    "./",
    "./index.html",
    "./styles.css",
    "./manifest.json",

    /* IMÁGENES */

    "./assets/Icono app.jpeg",
    "./assets/Pez.jpeg",
    "./assets/Cola de pez.jpeg",
    "./assets/Tiburon lateral.jpeg",
    "./assets/Tiburon mordida.jpeg",

    /* AUDIO */

    "./assets/Beach party.mp4",
    "./assets/Sonido riesgo bajo.mp4",
    "./assets/Sonido riesgo medio.mp4",
    "./assets/Sonido riesgo alto.mp4"

];


self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches.open(
                CACHE_NAME
            ).then(
                cache => {

                    return cache.addAll(
                        ARCHIVOS
                    );

                }
            )

        );

        self.skipWaiting();

    }
);


self.addEventListener(
    "activate",
    event => {

        event.waitUntil(

            caches.keys().then(
                keys => {

                    return Promise.all(

                        keys
                            .filter(
                                key =>
                                    key !==
                                    CACHE_NAME
                            )
                            .map(
                                key =>
                                    caches.delete(
                                        key
                                    )
                            )

                    );

                }
            )

        );

        self.clients.claim();

    }
);


self.addEventListener(
    "fetch",
    event => {

        event.respondWith(

            caches.match(
                event.request
            ).then(
                response => {

                    return (
                        response ||
                        fetch(
                            event.request
                        )
                    );

                }
            )

        );

    }
);