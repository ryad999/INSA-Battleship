document.addEventListener('DOMContentLoaded', () => {
    const newsData = [
        { title: "Nouvelle fonctionnalité", description: "Comming SOON : Ajout d'un mode multijoueur amélioré avec des récompenses exclusives.", image: "images/image1.png" },
        { title: "Mise à jour", description: "Correction de bugs critiques et optimisation des performances pour garantir une fluidité exceptionnelle sur les appareils mobiles. Les améliorations visent à offrir une navigation sans accroc, avec des temps de chargement réduits et une compatibilité renforcée pour toutes les plateformes modernes. Les joueurs peuvent désormais profiter d'une expérience ininterrompue, même sur les appareils les plus modestes.", image: "images/image2.jpg" },
        { title: "Événement spécial", description: "Un tournoi en ligne palpitant, ouvert à tous les joueurs, offrant l'opportunité de remporter des prix incroyables. Ce grand événement met en avant la stratégie, la compétition et la camaraderie, rassemblant la communauté dans un défi sensationel. Préparez-vous à montrer vos compétences et à atteindre de nouveaux sommets dans un cadre compétitif et convivial.", image: "images/image3.png" }
    ];

    let currentIndex = 0;
    const carousel = document.querySelector('.news-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function updateCarousel(direction) {
        carousel.classList.remove('active');
        carousel.classList.add(direction === 'next' ? 'slide-out-left' : 'slide-out-right');

        setTimeout(() => {
            currentIndex = (direction === 'next')
                ? (currentIndex + 1) % newsData.length
                : (currentIndex - 1 + newsData.length) % newsData.length;

            const { title, description, image } = newsData[currentIndex];
            carousel.innerHTML = `
                <img src="${image}" alt="${title}">
                <div class="content">
                    <h3>${title}</h3>
                    <p>${description}</p>
                </div>
            `;

            carousel.classList.add(direction === 'next' ? 'slide-in-right' : 'slide-in-left');
        }, 350);

        setTimeout(() => {
            carousel.classList.remove('slide-out-left', 'slide-out-right', 'slide-in-right', 'slide-in-left');
            carousel.classList.add('active');
        }, 550);
    }

    prevBtn.addEventListener('click', () => updateCarousel('prev'));
    nextBtn.addEventListener('click', () => updateCarousel('next'));

    updateCarousel('next');
});
