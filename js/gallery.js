const preloadImage = url => new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = url;
});

const photo = async (id, image, alt, description = '') => {
    await preloadImage(image);
    window.scrollTo(0, 0);
    document.getElementById('modal').innerHTML = `
        <div class='gallery-modal' id='modal_${id}'>
            <div class="gallery-modal-close"><button onclick='closeModal("${id}")'>&times;</button></div>
            <div class='gallery-modal-content'>
                <img src='${image}' alt='${alt}'/>${description ? `<p>${description}</p>` : ''}
            </div>
            <div class='gallery-modal-navigation'>
                <button onclick='navigate("${id}", "prev")'>←</button>
                <button onclick='navigate("${id}", "next")'>→</button>
            </div>
        </div>
    `;
};

const closeModal = id => {
    window.scrollTo(0, 0);
    document.getElementById(`modal_${id}`).remove();
};

const navigate = async (id, direction) => {
    const photo = document.getElementById(`photo_${id}`);
    const div = direction === 'prev' ? photo.previousElementSibling : photo.nextElementSibling;

    if (!div) {
        console.log("Invalid direction or no adjacent element");
        return;
    }

    try {
        await preloadImage(div.querySelector('img').src);
        div.click();
    } catch (error) {
        console.error("Error preloading image:", error);
    }
};
