import { getCurrentUserFromFirestore } from "./getFirestore.js";

export const showInventoryBruhs = async () => {
    const inventoryContainer = document.getElementById('inventoryContainer');
    inventoryContainer.style.display = 'flex';

    const user = await getCurrentUserFromFirestore();
    const ownedBruhs = user.user_bruhs;


    const charactersContainer = document.getElementById('invCatContainer');
    charactersContainer.innerHTML = '';

    let rowCounter = 0;
    let currentRow;

    ownedBruhs.forEach((character) => {
        if (rowCounter % 3 === 0) {
            // Create a new row every 2 items
            currentRow = document.createElement('div');
            currentRow.className = 'prelude-character-selection-row';
            charactersContainer.appendChild(currentRow);
        }
        const characterElement = document.createElement('span');

        // Add click event to show character details
        characterElement.addEventListener('click', () => showCharacterDetails(character));

        const characterImg = document.createElement('img');
        characterImg.src = character.bruh_img;
        characterImg.alt = character.bruh_name;

        const charNameTextElement = document.createElement('p');
        charNameTextElement.textContent = character.bruh_name;

        characterElement.appendChild(characterImg);
        characterElement.appendChild(charNameTextElement);
        currentRow.appendChild(characterElement);
        rowCounter++;
    });
}
const invCatBruhs = document.getElementById('invCatBruhs');
invCatBruhs.addEventListener('click', function() {
    showInventoryBruhs();
})

const showCharacterDetails = (character) => {
    const invShowDetails = document.getElementById('invShowDetails');
    const invDetIMG = document.getElementById('invDetIMG');
    const invDetTable = document.getElementById('invDetTable');
    invShowDetails.style.display = 'flex';
    invDetIMG.innerHTML = ''; 
    invDetTable.innerHTML = ''; 

    const charImg = document.createElement('img');
    charImg.src = character.bruh_img;
    invDetIMG.appendChild(charImg);

    const itemDetailTable = document.createElement('table');
    const orderDetails = ['bruh_name', 'bruh_hp', 'bruh_atk', 'bruh_description'];
    // Populate details as rows in the table based on the specified order
    orderDetails.forEach((detailKey) => {
        if (character.hasOwnProperty(detailKey)) {
            const row = document.createElement('tr');
            const cell1 = document.createElement('td');
            const cell2 = document.createElement('td');
            cell1.textContent = alterDetailKey(detailKey);
            cell2.textContent = character[detailKey];
            row.appendChild(cell1);
            row.appendChild(cell2);
            itemDetailTable.appendChild(row);
        }
    });
    invDetTable.appendChild(itemDetailTable);
}
function alterDetailKey(detailKey) {
    switch (detailKey) {
        case 'bruh_name':
        case 'item_name':
            return 'Name';
        case 'bruh_hp':
            return 'HP';
        case 'bruh_atk':
            return 'ATK';
        case 'bruh_description':
        case 'item_description':
            return 'Description';
        default:
            return '';
    }
}





const showInventoryItems = async () => {
    const user = await getCurrentUserFromFirestore();
    const ownedItems = user.user_inventoryItems;


    const itemsContainer = document.getElementById('invCatContainer');
    itemsContainer.innerHTML = '';

    if (ownedItems.length === 0) {
        itemsContainer.textContent = 'No items';
    }

    let rowCounter = 0;
    let currentRow;

    ownedItems.forEach((item) => {
        if (rowCounter % 3 === 0) {
            // Create a new row every 2 items
            currentRow = document.createElement('div');
            currentRow.className = 'prelude-character-selection-row';
            itemsContainer.appendChild(currentRow);
        }
        const itemElement = document.createElement('span');

        // Add click event to show item details
        itemElement.addEventListener('click', () => showItemDetails(item));

        const itemImg = document.createElement('img');
        itemImg.src = item.item_img;
        itemImg.alt = item.item_name;

        const charNameTextElement = document.createElement('p');
        charNameTextElement.textContent = item.item_name;

        itemElement.appendChild(itemImg);
        itemElement.appendChild(charNameTextElement);
        currentRow.appendChild(itemElement);
        rowCounter++;
    });
}
const invCatItems = document.getElementById('invCatItems');
invCatItems.addEventListener('click', function() {
    showInventoryItems();
})

const  showItemDetails = (item) => {
    const invShowDetails = document.getElementById('invShowDetails');
    const invDetIMG = document.getElementById('invDetIMG');
    const invDetTable = document.getElementById('invDetTable');
    invShowDetails.style.display = 'flex';
    invDetIMG.innerHTML = ''; 
    invDetTable.innerHTML = ''; 

    const itemImg = document.createElement('img');
    itemImg.src = item.item_img;
    invDetIMG.appendChild(itemImg);

    const itemDetailTable = document.createElement('table');
    const orderDetails = ['item_name', 'item_description'];
    // Populate details as rows in the table based on the specified order
    orderDetails.forEach((detailKey) => {
        if (item.hasOwnProperty(detailKey)) {
            const row = document.createElement('tr');
            const cell1 = document.createElement('td');
            const cell2 = document.createElement('td');
            cell1.textContent = alterDetailKey(detailKey);
            cell2.textContent = item[detailKey];
            row.appendChild(cell1);
            row.appendChild(cell2);
            itemDetailTable.appendChild(row);
        }
    });
    invDetTable.appendChild(itemDetailTable);
}