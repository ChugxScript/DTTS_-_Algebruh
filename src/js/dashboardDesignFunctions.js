const dashboardGB = 'https://media1.tenor.com/m/zKedQzm-07MAAAAd/sword.gif';

function init () {
    const mainContent = document.getElementById('mainContent');
    const profileContentContainer = document.getElementById('profileContentContainer');
    const editProfilePopup = document.getElementById('editProfilePopup');
    const profileCharactersDetailsPopup = document.getElementById('profileCharactersDetailsPopup');
    const inventoryContentContainer = document.getElementById('inventoryContentContainer');

    profileContentContainer.style.display = 'none';
    editProfilePopup.style.display = 'none';
    profileCharactersDetailsPopup.style.display = 'none';
    inventoryContentContainer.style.display = 'none';

    // main background
    mainContent.style.backgroundImage = `url(${dashboardGB})`;
    mainContent.style.backgroundRepeat = 'no-repeat';
    mainContent.style.backgroundSize = 'cover';
    mainContent.style.backgroundPosition = 'center';
}

function profileContent() {
    const profileContentContainer = document.getElementById('profileContentContainer');
    profileContentContainer.style.display = 'block';
}
function closeProfileCharactersDetailsPopup() {
    const profileCharactersDetailsPopup = document.getElementById('profileCharactersDetailsPopup');
    profileCharactersDetailsPopup.style.display = 'none';
}
function showEditProfilePopup() {
    const editProfilePopup = document.getElementById('editProfilePopup');
    editProfilePopup.style.display = 'block';
}
function closeEditProfilePopup() {
    const editProfilePopup = document.getElementById('editProfilePopup');
    editProfilePopup.style.display = 'none';
}


document.addEventListener("DOMContentLoaded", function() {
    init();
});