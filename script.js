const API_KEY = 'DEMO_KEY';


// APOD

async function getAPOD() {

    const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
    );

    const data = await response.json();

    document.getElementById('apod-image').src = data.url;
    document.getElementById('apod-title').textContent = data.title;
    document.getElementById('apod-date').textContent = data.date;
    document.getElementById('apod-description').textContent = data.explanation;
}
// =========================
// APOD NASA
// =========================

async function getAPOD() {

    try {

        const response = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
        );

        const data = await response.json();

        console.log(data);

        const apodImage = document.getElementById('apod-image');
        const apodTitle = document.getElementById('apod-title');
        const apodDate = document.getElementById('apod-date');
        const apodDescription = document.getElementById('apod-description');

        // Verificar si NASA devolvió imagen
        if (data.media_type === "image") {

            apodImage.src = data.hdurl || data.url;

        } else {

            // Imagen de respaldo si NASA devuelve video
            apodImage.src =
                "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1600";

        }

        apodTitle.textContent = data.title;
        apodDate.textContent = data.date;
        apodDescription.textContent = data.explanation;

    } catch (error) {

        console.error("Error cargando APOD:", error);

        document.getElementById('apod-title').textContent =
            "No se pudo cargar la imagen astronómica";

        document.getElementById('apod-description').textContent =
            "Verifica tu conexión o intenta nuevamente.";
    }
}

// ASTEROIDS

async function getAsteroids() {

    const response = await fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?api_key=${API_KEY}`
    );

    const data = await response.json();

    const asteroidGrid = document.getElementById('asteroid-grid');

    const dates = Object.keys(data.near_earth_objects);

    dates.forEach(date => {

        data.near_earth_objects[date].slice(0, 3).forEach(asteroid => {

            const card = document.createElement('div');
            card.classList.add('asteroid-card');

            card.innerHTML = `
                <h3>${asteroid.name}</h3>

                <p>
                    <strong>Diámetro:</strong>
                    ${Math.round(
                        asteroid.estimated_diameter.meters.estimated_diameter_max
                    )} m
                </p>

                <p>
                    <strong>Peligroso:</strong>
                    ${asteroid.is_potentially_hazardous_asteroid ? 'Sí' : 'No'}
                </p>

                <p>
                    <strong>Velocidad:</strong>
                    ${Math.round(
                        asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour
                    )} km/h
                </p>
            `;

            asteroidGrid.appendChild(card);
        });
    });
}


// GALLERY

async function getGallery() {

    const response = await fetch(
        `https://images-api.nasa.gov/search?q=space&media_type=image`
    );

    const data = await response.json();

    const gallery = document.getElementById('gallery-grid');

    data.collection.items.slice(0, 30).forEach(item => {

        const image = document.createElement('img');

        image.src = item.links[0].href;

        image.loading = 'lazy';

        image.addEventListener('click', () => {
            window.open(item.links[0].href, '_blank');
        });

        gallery.appendChild(image);
    });
}


// DARK MODE

const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});


// LOAD

getAPOD();
getAsteroids();
getGallery();
