const dashboardGB = 'https://media1.tenor.com/m/zKedQzm-07MAAAAd/sword.gif';

function init () {
    const mainContent = document.getElementById('mainContent');
    const profileContentContainer = document.getElementById('profileContentContainer');
    const editProfilePopup = document.getElementById('editProfilePopup');
    const profileCharactersDetailsPopup = document.getElementById('profileCharactersDetailsPopup');
    const inventoryContentContainer = document.getElementById('inventoryContentContainer');
    const inventoryItemDetailsPopup = document.getElementById('inventoryItemDetailsPopup');
    const journeyContentContainer = document.getElementById('journeyContentContainer');
    const shopContentContainer = document.getElementById('shopContentContainer');
    const shopItemDetailsPopup = document.getElementById('shopItemDetailsPopup');
    const shopConfirmationPopup = document.getElementById('shopConfirmationPopup');
    const shopSuccessPopup = document.getElementById('shopSuccessPopup');
    const shopNotEnoughFundsPopup = document.getElementById('shopNotEnoughFundsPopup');
    const settingsContentContainer = document.getElementById('settingsContentContainer');
    
    profileContentContainer.style.display = 'none';
    editProfilePopup.style.display = 'none';
    profileCharactersDetailsPopup.style.display = 'none';
    inventoryContentContainer.style.display = 'none';
    inventoryItemDetailsPopup.style.display = 'none';
    journeyContentContainer.style.display = 'none';
    shopContentContainer.style.display = 'none';
    shopItemDetailsPopup.style.display = 'none';
    shopConfirmationPopup.style.display = 'none';
    shopSuccessPopup.style.display = 'none';
    shopNotEnoughFundsPopup.style.display = 'none';
    settingsContentContainer.style.display = 'none';

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
function closeInvItemDetailsPopup() {
    const inventoryItemDetailsPopup = document.getElementById('inventoryItemDetailsPopup');
    inventoryItemDetailsPopup.style.display = 'none';
}
function closeShopItemDetailsPopup() {
    const shopItemDetailsPopup = document.getElementById('shopItemDetailsPopup');
    shopItemDetailsPopup.style.display = 'none';
}
function closeShopConfirmationPopup() {
    const shopConfirmationPopup = document.getElementById('shopConfirmationPopup');
    shopConfirmationPopup.style.display = 'none';
}
function closeShopSuccessPopup() {
    const shopSuccessPopup = document.getElementById('shopSuccessPopup');
    shopSuccessPopup.style.display = 'none';
    const shopConfirmationPopup = document.getElementById('shopConfirmationPopup');
    shopConfirmationPopup.style.display = 'none';
}
function closeShopNotEnoughFundsPopup() {
    const shopNotEnoughFundsPopup = document.getElementById('shopNotEnoughFundsPopup');
    shopNotEnoughFundsPopup.style.display = 'none';
    const shopConfirmationPopup = document.getElementById('shopConfirmationPopup');
    shopConfirmationPopup.style.display = 'none';
}


document.addEventListener("DOMContentLoaded", function() {
    init();
});