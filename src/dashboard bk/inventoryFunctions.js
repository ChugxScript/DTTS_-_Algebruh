import { getCurrentUserFromFirestore } from "./getFirestore.js";
import { showCharacterDetails } from "./profileFunctions.js";

export const userShowInventoryChars = async () => {
    const inventoryItemsContainer = document.getElementById('inventoryItemsContainer');
    inventoryItemsContainer.innerHTML = '';

    // get the latest user inventory items
    const currentUserData = await getCurrentUserFromFirestore();
    const currUserCharactersOwned = currentUserData[0].userCharacterOwned;

    let rowCounter = 0;
    let currentRow;

    currUserCharactersOwned.forEach((character) => {
        if (rowCounter % 5 === 0) {
            // Create a new row every 5 items
            currentRow = document.createElement('div');
            inventoryItemsContainer.appendChild(currentRow);
        }
        const currOwnedCharsElement = document.createElement('div');
        currOwnedCharsElement.className = 'inventory-display-owned-charsNitems';

        // Add click event to show character details
        currOwnedCharsElement.addEventListener('click', () => showCharacterDetails(character));

        const currOwnedCharsImg = document.createElement('img');
        currOwnedCharsImg.src = character.char_img_src;
        currOwnedCharsImg.alt = character.char_name;

        const currOwnedCharsNameTextElement = document.createElement('p');
        currOwnedCharsNameTextElement.textContent = character.char_name;

        currOwnedCharsElement.appendChild(currOwnedCharsImg);
        currOwnedCharsElement.appendChild(currOwnedCharsNameTextElement);
        inventoryItemsContainer.appendChild(currOwnedCharsElement);
        rowCounter++;
    });
}
const invCatCharacters = document.getElementById('invCatCharacters');
invCatCharacters.addEventListener('click', function() {
    userShowInventoryChars();
})

const userShowInventoryItems = async () => {
    const inventoryItemsContainer = document.getElementById('inventoryItemsContainer');
    inventoryItemsContainer.innerHTML = '';

    // get the latest user inventory items
    const currentUserData = await getCurrentUserFromFirestore();
    const currUserInvItems = currentUserData[0].userInventoryItems;

    let rowCounter = 0;
    let currentRow;

    currUserInvItems.forEach((item) => {
        if (rowCounter % 5 === 0) {
            // Create a new row every 5 items
            currentRow = document.createElement('div');
            inventoryItemsContainer.appendChild(currentRow);
        }
        const currOwnedItemsElement = document.createElement('div');
        currOwnedItemsElement.className = 'inventory-display-owned-charsNitems';

        // Add click event to show item details
        currOwnedItemsElement.addEventListener('click', () => showItemDetails(item));

        const currOwnedItemsImg = document.createElement('img');
        currOwnedItemsImg.src = item.item_img_src;
        currOwnedItemsImg.alt = item.item_name;

        const currOwnedItemNameTextElement = document.createElement('p');
        currOwnedItemNameTextElement.textContent = item.item_name;

        currOwnedItemsElement.appendChild(currOwnedItemsImg);
        currOwnedItemsElement.appendChild(currOwnedItemNameTextElement);
        inventoryItemsContainer.appendChild(currOwnedItemsElement);
        rowCounter++;
    });
}
const showItemDetails = (item) => {
    const inventoryItemDetailsPopup = document.getElementById('inventoryItemDetailsPopup');
    const inventoryItemDetailsImg = document.getElementById('inventoryItemDetailsImg');
    const inventoryItemDetailsContents = document.getElementById('inventoryItemDetailsContents');
    inventoryItemDetailsPopup.style.display = 'block';
    inventoryItemDetailsImg.innerHTML = '';
    inventoryItemDetailsContents.innerHTML = '';
    
    // create img element then append to the div
    const itemElement = document.createElement('div');
    const itemImg = document.createElement('img');
    itemImg.src = item.item_img_src;
    itemImg.alt = item.item_name;

    const itemNameTextElement = document.createElement('p');
    itemNameTextElement.textContent = item.item_name;

    itemElement.appendChild(itemImg);
    itemElement.appendChild(itemNameTextElement);
    inventoryItemDetailsImg.appendChild(itemElement);

    // create table element for the item details then append to the div
    const itemDetailTable = document.createElement('table');
    const orderDetails = ['item_name', 'item_description'];
    // Populate details as rows in the table based on the specified order
    orderDetails.forEach((detailKey) => {
        if (item.hasOwnProperty(detailKey)) {
            const row = document.createElement('tr');
            const cell1 = document.createElement('td');
            const cell2 = document.createElement('td');
            cell1.textContent = detailKey;
            cell2.textContent = item[detailKey];
            row.appendChild(cell1);
            row.appendChild(cell2);
            itemDetailTable.appendChild(row);
        }
    });
    inventoryItemDetailsContents.appendChild(itemDetailTable);
}
const invCatItems = document.getElementById('invCatItems');
invCatItems.addEventListener('click', function() {
    userShowInventoryItems();
})