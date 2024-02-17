const dashboardGB = 'https://media1.tenor.com/m/zKedQzm-07MAAAAd/sword.gif';

function init () {
    const mainContent = document.getElementById('mainContent');
    const profileContentContainer = document.getElementById('profileContentContainer');
    const editProfilePopup = document.getElementById('editProfilePopup');
    const profileCharactersDetailsPopup = document.getElementById('profileCharactersDetailsPopup');
    const inventoryContentContainer = document.getElementById('inventoryContentContainer');
    const inventoryItemDetailsPopup = document.getElementById('inventoryItemDetailsPopup');
    const journeyContentContainer = document.getElementById('journeyContentContainer');
    const journeyContentContainerConfirmation = document.getElementById('journeyContentContainerConfirmation');
    const journeyContentContainerConfirmLocked = document.getElementById('journeyContentContainerConfirmLocked');
    const shopContentContainer = document.getElementById('shopContentContainer');
    const shopCharDetailsPopup = document.getElementById('shopCharDetailsPopup');
    const shopCharConfirmationPopup = document.getElementById('shopCharConfirmationPopup');
    const shopCharSuccessPopup = document.getElementById('shopCharSuccessPopup');
    const shopCharNotEnoughFundsPopup = document.getElementById('shopCharNotEnoughFundsPopup');
    const shopCharAlreadyOwnedPopup = document.getElementById('shopCharAlreadyOwnedPopup');
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
    journeyContentContainerConfirmation.style.display = 'none';
    journeyContentContainerConfirmLocked.style.display = 'none';
    shopContentContainer.style.display = 'none';
    shopCharDetailsPopup.style.display = 'none';
    shopCharConfirmationPopup.style.display = 'none';
    shopCharSuccessPopup.style.display = 'none';
    shopCharNotEnoughFundsPopup.style.display = 'none';
    shopCharAlreadyOwnedPopup.style.display = 'none';
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
document.addEventListener("DOMContentLoaded", function() {
    init();
});

// profile
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

// inventory
function closeInvItemDetailsPopup() {
    const inventoryItemDetailsPopup = document.getElementById('inventoryItemDetailsPopup');
    inventoryItemDetailsPopup.style.display = 'none';
}

// journey
function closeJourneyContentContainerConfirmation() {
    const journeyContentContainerConfirmation = document.getElementById('journeyContentContainerConfirmation');
    journeyContentContainerConfirmation.style.display = 'none';
}
function closeJourneyContentContainerConfirmLocked() {
    const journeyContentContainerConfirmLocked = document.getElementById('journeyContentContainerConfirmLocked');
    journeyContentContainerConfirmLocked.style.display = 'none';
}

// shop
function closeShopCharDetailsPopup() {
    const shopCharDetailsPopup = document.getElementById('shopCharDetailsPopup');
    shopCharDetailsPopup.style.display = 'none';
}
function closeShopCharConfirmationPopup() {
    const shopCharConfirmationPopup = document.getElementById('shopCharConfirmationPopup');
    shopCharConfirmationPopup.style.display = 'none';
}
function closeShopCharSuccessPopup() {
    const shopCharSuccessPopup = document.getElementById('shopCharSuccessPopup');
    shopCharSuccessPopup.style.display = 'none';
    const shopCharConfirmationPopup = document.getElementById('shopCharConfirmationPopup');
    shopCharConfirmationPopup.style.display = 'none';
}
function closeShopCharNotEnoughFundsPopup() {
    const shopCharNotEnoughFundsPopup = document.getElementById('shopCharNotEnoughFundsPopup');
    shopCharNotEnoughFundsPopup.style.display = 'none';
    const shopCharConfirmationPopup = document.getElementById('shopCharConfirmationPopup');
    shopCharConfirmationPopup.style.display = 'none';
}
function closeShopCharAlreadyOwnedPopup() {
    const shopCharAlreadyOwnedPopup = document.getElementById('shopCharAlreadyOwnedPopup');
    shopCharAlreadyOwnedPopup.style.display = 'none';
    const shopCharConfirmationPopup = document.getElementById('shopCharConfirmationPopup');
    shopCharConfirmationPopup.style.display = 'none';
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