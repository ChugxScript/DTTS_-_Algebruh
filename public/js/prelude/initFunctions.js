document.addEventListener('DOMContentLoaded', function () {
    // Set the gigaGuideImg dynamically
    const movableImage = document.getElementById('gigaGuide');
    const gigaGuideImg = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.noelshack.com%2Ffichiers%2F2019%2F41%2F7%2F1571000104-chad2.png&f=1&nofb=1&ipt=0eb377992866e6086127a914e26503e8a1101ad88638b49febb767a43211e778&ipo=images';
    movableImage.src = gigaGuideImg;
});


function closePreludeCharactersDetailsPopup() {
    const preludeCharactersDetailsPopup = document.getElementById('preludeCharactersDetailsPopup');
    preludeCharactersDetailsPopup.style.display = 'none';
}