import { 
    getCurrentUserFromFirestore,
    getShopCharsFromFirestore,
    getShopItemsFromFirestore, 
    db
} from "./getFirestore.js";
import { 
    getDoc,
    doc, 
    updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";


export const showUserConfidentialFund = async () => {
    const shopUserConfidentialFund = document.getElementById('shopUserConfidentialFund');
    shopUserConfidentialFund.innerHTML = '';

    // create p element for the label
    const userConfFundLabel = document.createElement('p');
    userConfFundLabel.textContent = 'Current Confidential Fund: ';

    // get the latest user conf fund
    const userLatestConfFund = await getCurrentUserFromFirestore();
    // create span element to display the latest user conf fund
    const userLatestConfFundElement = document.createElement('span');
    userLatestConfFundElement.textContent = userLatestConfFund[0].userConfidentialFund;

    userConfFundLabel.appendChild(userLatestConfFundElement);
    shopUserConfidentialFund.appendChild(userConfFundLabel);
}


// shop chars
export const showShopChars = async () => {
    const shopItemsContainer = document.getElementById('shopItemsContainer');
    shopItemsContainer.innerHTML = '';

    // get the latest shop characters from firebase
    const currentShopChars = await getShopCharsFromFirestore();

    let rowCounter = 0;
    let currentRow;

    currentShopChars.forEach((character) => {
        if (rowCounter % 5 === 0) {
            // Create a new row every 5 items
            currentRow = document.createElement('div');
            shopItemsContainer.appendChild(currentRow);
        }
        const currShopCharsElement = document.createElement('div');
        currShopCharsElement.className = 'shop-display-owned-charsNitems';

        // Add click event to show character details
        currShopCharsElement.addEventListener('click', () => showShopCharDetails(character));

        const currShopCharsImg = document.createElement('img');
        currShopCharsImg.src = character.char_img_src;
        currShopCharsImg.alt = character.char_name;

        const currShopCharsNameTextElement = document.createElement('p');
        currShopCharsNameTextElement.textContent = character.char_name;
        const currShopCharsPriceNameTextElement = document.createElement('p');
        currShopCharsPriceNameTextElement.textContent = 'C. Fund: ';
        const currShopCharsPriceTextElement = document.createElement('span');
        currShopCharsPriceTextElement.textContent = character.char_price;
        currShopCharsPriceNameTextElement.appendChild(currShopCharsPriceTextElement);

        currShopCharsElement.appendChild(currShopCharsImg);
        currShopCharsElement.appendChild(currShopCharsNameTextElement);
        currShopCharsElement.appendChild(currShopCharsPriceNameTextElement);
        shopItemsContainer.appendChild(currShopCharsElement);
        rowCounter++;
    });
}
const shopCatCharacters = document.getElementById('shopCatCharacters');
shopCatCharacters.addEventListener('click', function() {
    showShopChars();
})

let selectedShopCharacter = '';
const showShopCharDetails = (character) => {
    const shopCharDetailsPopup = document.getElementById('shopCharDetailsPopup');
    const shopCharDetailsImg = document.getElementById('shopCharDetailsImg');
    const shopCharDetailsContents = document.getElementById('shopCharDetailsContents');
    shopCharDetailsPopup.style.display = 'block';
    shopCharDetailsImg.innerHTML = '';
    shopCharDetailsContents.innerHTML = '';
    
    // create img element then append to the div
    const charElement = document.createElement('div');
    const charImg = document.createElement('img');
    charImg.src = character.char_img_src;
    charImg.alt = character.char_name;

    const charNameTextElement = document.createElement('p');
    charNameTextElement.textContent = character.char_name;
    const charPriceNameTextElement = document.createElement('p');
    charPriceNameTextElement.textContent = 'C. Fund: ';
    const charPriceTextElement = document.createElement('span');
    charPriceTextElement.textContent = character.char_price;
    charPriceNameTextElement.appendChild(charPriceTextElement);

    charElement.appendChild(charImg);
    charElement.appendChild(charNameTextElement);
    charElement.appendChild(charPriceNameTextElement);
    shopCharDetailsImg.appendChild(charElement);

    // create table element for the char details then append to the div
    const charDetailTable = document.createElement('table');
    const orderDetails = ['char_name', 'char_hp', 'char_atk'];
    // Populate details as rows in the table based on the specified order
    orderDetails.forEach((detailKey) => {
        if (character.hasOwnProperty(detailKey)) {
            const row = document.createElement('tr');
            const cell1 = document.createElement('td');
            const cell2 = document.createElement('td');
            cell1.textContent = detailKey;
            cell2.textContent = character[detailKey];
            row.appendChild(cell1);
            row.appendChild(cell2);
            charDetailTable.appendChild(row);
        }
    });
    shopCharDetailsContents.appendChild(charDetailTable);

    selectedShopCharacter = character;
}
const buyCharButton = document.getElementById('buyCharButton');
buyCharButton.addEventListener('click', function() {
    const character = selectedShopCharacter;
    checkCharUserFund(character);
});
const checkCharUserFund = async (character) => {
    const shopCharConfirmationPopup = document.getElementById('shopCharConfirmationPopup');
    shopCharConfirmationPopup.style.display = 'block';

    // show user latest funds
    const shopCharConfirmationUserConfidentialFund = document.getElementById('shopCharConfirmationUserConfidentialFund');
    shopCharConfirmationUserConfidentialFund.innerHTML = '';
    // create p element for the label
    const userConfFundLabel = document.createElement('p');
    userConfFundLabel.textContent = 'Current Confidential Fund: ';
    // get the latest user conf fund
    const userLatestConfFund = await getCurrentUserFromFirestore();
    // create span element to display the latest user conf fund
    const userLatestConfFundElement = document.createElement('span');
    userLatestConfFundElement.textContent = userLatestConfFund[0].userConfidentialFund;
    userConfFundLabel.appendChild(userLatestConfFundElement);
    shopCharConfirmationUserConfidentialFund.appendChild(userConfFundLabel);

    // show character clicked without detail table
    const shopCharConfirmationImg = document.getElementById('shopCharConfirmationImg');
    shopCharConfirmationImg.innerHTML = '';
    // create img element then append to the div
    const charElement = document.createElement('div');
    const charImg = document.createElement('img');
    charImg.src = character.char_img_src;
    charImg.alt = character.char_name;
    const charNameTextElement = document.createElement('p');
    charNameTextElement.textContent = character.char_name;
    const charPriceNameTextElement = document.createElement('p');
    charPriceNameTextElement.textContent = 'C. Fund: ';
    const charPriceTextElement = document.createElement('span');
    charPriceTextElement.textContent = character.char_price;
    charPriceNameTextElement.appendChild(charPriceTextElement);
    charElement.appendChild(charImg);
    charElement.appendChild(charNameTextElement);
    charElement.appendChild(charPriceNameTextElement);
    shopCharConfirmationImg.appendChild(charElement);
}
const confirmBuyCharButton = document.getElementById('confirmBuyCharButton');
confirmBuyCharButton.addEventListener('click', async function() {
    const char = selectedShopCharacter;
    const currentUserDataItem = await getCurrentUserFromFirestore();
    let checkUserConfidentialFund = currentUserDataItem[0].userConfidentialFund;
    if (checkUserConfidentialFund >= char.char_price) {
        // Retrieve the user document from Firestore
        const userRef = doc(db, 'users', currentUserDataItem[0].currUser_uid);
        const userDoc = await getDoc(userRef);
        checkUserConfidentialFund -= char.char_price;

        if (userDoc.exists()) {
            const userData = userDoc.data();

            // Check if the character is not already in userCharacterOwned
            let characterAlreadyOwned = false;

            for (const userCharacterOwned of userData.userCharacterOwned) {
                if (userCharacterOwned.char_uid === char.char_uid) {
                    characterAlreadyOwned = true;
                    break;
                }
            }
            if (!characterAlreadyOwned) { 
                const updatedUserCharacterOwned = [...userData.userCharacterOwned, char];
                await updateDoc(userRef, {
                    userCharacterOwned: updatedUserCharacterOwned,
                    userConfidentialFund: checkUserConfidentialFund,
                });
                console.log('Character appended to userCharacterOwned:', char);

                const latestUserCharacterOwned = await getCurrentUserFromFirestore();
                const checkLatestUserCharacterOwned = latestUserCharacterOwned[0].userCharacterOwned;
                let isCharFound = false;
                checkLatestUserCharacterOwned.forEach(charOwned => {
                    if (charOwned.char_uid == char.char_uid) {
                        const shopCharSuccessPopup = document.getElementById('shopCharSuccessPopup');
                        shopCharSuccessPopup.style.display = 'block';

                        // show user latest funds
                        const shopCharSucessUserConfidentialFund = document.getElementById('shopCharSucessUserConfidentialFund');
                        shopCharSucessUserConfidentialFund.innerHTML = '';
                        // create p element for the label
                        const userSucessConfFundLabel = document.createElement('p');
                        userSucessConfFundLabel.textContent = 'Current Confidential Fund: ';
                        // get the latest user conf fund
                        const userSucessLatestConfFund = latestUserCharacterOwned;
                        // create span element to display the latest user conf fund
                        const userSucessLatestConfFundElement = document.createElement('span');
                        userSucessLatestConfFundElement.textContent = userSucessLatestConfFund[0].userConfidentialFund;
                        userSucessConfFundLabel.appendChild(userSucessLatestConfFundElement);
                        shopCharSucessUserConfidentialFund.appendChild(userSucessConfFundLabel);
        
                        // show item purchase 
                        const shopCharSuccessImg = document.getElementById('shopCharSuccessImg');
                        shopCharSuccessImg.innerHTML = '';
                        // create img element then append to the div
                        const sucessItemElement = document.createElement('div');
                        const sucessItemImg = document.createElement('img');
                        sucessItemImg.src = charOwned.char_img_src;
                        sucessItemImg.alt = charOwned.char_name;
                        const sucessItemNameTextElement = document.createElement('p');
                        sucessItemNameTextElement.textContent = charOwned.char_name;
                        const sucessItemPriceNameTextElement = document.createElement('p');
                        sucessItemPriceNameTextElement.textContent = 'C. Fund: ';
                        const sucessItemPriceTextElement = document.createElement('span');
                        sucessItemPriceTextElement.textContent = charOwned.char_price;
                        sucessItemPriceNameTextElement.appendChild(sucessItemPriceTextElement);
                        sucessItemElement.appendChild(sucessItemImg);
                        sucessItemElement.appendChild(sucessItemNameTextElement);
                        sucessItemElement.appendChild(sucessItemPriceNameTextElement);
                        shopCharSuccessImg.appendChild(sucessItemElement);
                        isCharFound = true;
                    }
                })
                if (!isCharFound) {
                    console.log('Character not found in userData');
                }
            } else {
                const shopCharAlreadyOwnedPopup = document.getElementById('shopCharAlreadyOwnedPopup');
                shopCharAlreadyOwnedPopup.style.display = 'block';

                // show user latest funds
                const shopCharAlreadyOwnedUserConfidentialFund = document.getElementById('shopCharAlreadyOwnedUserConfidentialFund');
                shopCharAlreadyOwnedUserConfidentialFund.innerHTML = '';
                // create p element for the label
                const userNotEnoughFundConfFundLabel = document.createElement('p');
                userNotEnoughFundConfFundLabel.textContent = 'Current Confidential Fund: ';
                // get the latest user conf fund
                const userNotEnoughFundLatestConfFund = await getCurrentUserFromFirestore();
                // create span element to display the latest user conf fund
                const userNotEnoughFundLatestConfFundElement = document.createElement('span');
                userNotEnoughFundLatestConfFundElement.textContent = userNotEnoughFundLatestConfFund[0].userConfidentialFund;
                userNotEnoughFundConfFundLabel.appendChild(userNotEnoughFundLatestConfFundElement);
                shopCharAlreadyOwnedUserConfidentialFund.appendChild(userNotEnoughFundConfFundLabel);

                // show item purchase 
                const shopCharAlreadyOwnedImg = document.getElementById('shopCharAlreadyOwnedImg');
                shopCharAlreadyOwnedImg.innerHTML = '';
                // create img element then append to the div
                const failedItemElement = document.createElement('div');
                const failedItemImg = document.createElement('img');
                failedItemImg.src = char.char_img_src;
                failedItemImg.alt = char.char_name;
                const failedItemNameTextElement = document.createElement('p');
                failedItemNameTextElement.textContent = char.char_name;
                const failedItemPriceNameTextElement = document.createElement('p');
                failedItemPriceNameTextElement.textContent = 'C. Fund: ';
                const failedItemPriceTextElement = document.createElement('span');
                failedItemPriceTextElement.textContent = char.char_price;
                failedItemPriceNameTextElement.appendChild(failedItemPriceTextElement);
                failedItemElement.appendChild(failedItemImg);
                failedItemElement.appendChild(failedItemNameTextElement);
                failedItemElement.appendChild(failedItemPriceNameTextElement);
                shopCharAlreadyOwnedImg.appendChild(failedItemElement);
            }
        } else {
            console.log('User document not found');
        }
    } else {
        const shopCharNotEnoughFundsPopup = document.getElementById('shopCharNotEnoughFundsPopup');
        shopCharNotEnoughFundsPopup.style.display = 'block';

        // show user latest funds
        const shopCharNotEnoughFundUserConfidentialFund = document.getElementById('shopCharNotEnoughFundUserConfidentialFund');
        shopCharNotEnoughFundUserConfidentialFund.innerHTML = '';
        // create p element for the label
        const userNotEnoughFundConfFundLabel = document.createElement('p');
        userNotEnoughFundConfFundLabel.textContent = 'Current Confidential Fund: ';
        // get the latest user conf fund
        const userNotEnoughFundLatestConfFund = await getCurrentUserFromFirestore();
        // create span element to display the latest user conf fund
        const userNotEnoughFundLatestConfFundElement = document.createElement('span');
        userNotEnoughFundLatestConfFundElement.textContent = userNotEnoughFundLatestConfFund[0].userConfidentialFund;
        userNotEnoughFundConfFundLabel.appendChild(userNotEnoughFundLatestConfFundElement);
        shopCharNotEnoughFundUserConfidentialFund.appendChild(userNotEnoughFundConfFundLabel);

        // show item purchase 
        const shopCharNotEnoughFundsImg = document.getElementById('shopCharNotEnoughFundsImg');
        shopCharNotEnoughFundsImg.innerHTML = '';
        // create img element then append to the div
        const failedItemElement = document.createElement('div');
        const failedItemImg = document.createElement('img');
        failedItemImg.src = char.char_img_src;
        failedItemImg.alt = char.char_name;
        const failedItemNameTextElement = document.createElement('p');
        failedItemNameTextElement.textContent = char.char_name;
        const failedItemPriceNameTextElement = document.createElement('p');
        failedItemPriceNameTextElement.textContent = 'C. Fund: ';
        const failedItemPriceTextElement = document.createElement('span');
        failedItemPriceTextElement.textContent = char.char_price;
        failedItemPriceNameTextElement.appendChild(failedItemPriceTextElement);
        failedItemElement.appendChild(failedItemImg);
        failedItemElement.appendChild(failedItemNameTextElement);
        failedItemElement.appendChild(failedItemPriceNameTextElement);
        shopCharNotEnoughFundsImg.appendChild(failedItemElement);
    }
})
const closeShopCharSuccessPopup = document.getElementById('closeShopCharSuccessPopup');
closeShopCharSuccessPopup.addEventListener('click', function() {
    showUserConfidentialFund();
})
const buyCharNotEnoughFunds = document.getElementById('buyCharNotEnoughFunds');
buyCharNotEnoughFunds.addEventListener('click', function() {
    showUserConfidentialFund();
})
const shopCharAlreadyOwnedPopup = document.getElementById('shopCharAlreadyOwnedPopup');
shopCharAlreadyOwnedPopup.addEventListener('click', function() {
    showUserConfidentialFund();
})



// show shop items
const showShopItems = async () => {
    const shopItemsContainer = document.getElementById('shopItemsContainer');
    shopItemsContainer.innerHTML = '';

    // get the latest user shop items
    const currentShopItems = await getShopItemsFromFirestore();

    let rowCounter = 0;
    let currentRow;

    currentShopItems.forEach((item) => {
        if (rowCounter % 5 === 0) {
            // Create a new row every 5 items
            currentRow = document.createElement('div');
            shopItemsContainer.appendChild(currentRow);
        }
        const currShopItemsElement = document.createElement('div');
        currShopItemsElement.className = 'shop-display-owned-charsNitems';

        // Add click event to show item details
        currShopItemsElement.addEventListener('click', () => showShopItemDetails(item));

        const currShopItemsImg = document.createElement('img');
        currShopItemsImg.src = item.item_img_src;
        currShopItemsImg.alt = item.item_name;

        const currShopItemNameTextElement = document.createElement('p');
        currShopItemNameTextElement.textContent = item.item_name;
        const currShopItemPriceNameElement = document.createElement('p');
        currShopItemPriceNameElement.textContent = 'C. Fund: ';
        const currShopItemPriceElement = document.createElement('span');
        currShopItemPriceElement.textContent = item.item_price;
        currShopItemPriceNameElement.appendChild(currShopItemPriceElement)

        currShopItemsElement.appendChild(currShopItemsImg);
        currShopItemsElement.appendChild(currShopItemNameTextElement);
        currShopItemsElement.appendChild(currShopItemPriceNameElement);
        shopItemsContainer.appendChild(currShopItemsElement);
        rowCounter++;
    });
}
const shopCatItems = document.getElementById('shopCatItems');
shopCatItems.addEventListener('click', function() {
    showShopItems();
})

let selectedShopItem = '';
const showShopItemDetails = (item) => {
    const shopItemDetailsPopup = document.getElementById('shopItemDetailsPopup');
    const shopItemDetailsImg = document.getElementById('shopItemDetailsImg');
    const shopItemDetailsContents = document.getElementById('shopItemDetailsContents');
    shopItemDetailsPopup.style.display = 'block';
    shopItemDetailsImg.innerHTML = '';
    shopItemDetailsContents.innerHTML = '';
    
    // create img element then append to the div
    const itemElement = document.createElement('div');
    const itemImg = document.createElement('img');
    itemImg.src = item.item_img_src;
    itemImg.alt = item.item_name;

    const itemNameTextElement = document.createElement('p');
    itemNameTextElement.textContent = item.item_name;
    const itemPriceNameTextElement = document.createElement('p');
    itemPriceNameTextElement.textContent = 'C. Fund: ';
    const itemPriceTextElement = document.createElement('span');
    itemPriceTextElement.textContent = item.item_price;
    itemPriceNameTextElement.appendChild(itemPriceTextElement);

    itemElement.appendChild(itemImg);
    itemElement.appendChild(itemNameTextElement);
    itemElement.appendChild(itemPriceNameTextElement);
    shopItemDetailsImg.appendChild(itemElement);

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
    shopItemDetailsContents.appendChild(itemDetailTable);

    selectedShopItem = item;
}
const buyItemButton = document.getElementById('buyItemButton');
buyItemButton.addEventListener('click', function() {
    const item = selectedShopItem;
    checkUserFund(item);
});
const checkUserFund = async (item) => {
    const shopConfirmationPopup = document.getElementById('shopConfirmationPopup');
    shopConfirmationPopup.style.display = 'block';

    // show user latest funds
    const shopConfirmationUserConfidentialFund = document.getElementById('shopConfirmationUserConfidentialFund');
    shopConfirmationUserConfidentialFund.innerHTML = '';
    // create p element for the label
    const userConfFundLabel = document.createElement('p');
    userConfFundLabel.textContent = 'Current Confidential Fund: ';
    // get the latest user conf fund
    const userLatestConfFund = await getCurrentUserFromFirestore();
    // create span element to display the latest user conf fund
    const userLatestConfFundElement = document.createElement('span');
    userLatestConfFundElement.textContent = userLatestConfFund[0].userConfidentialFund;
    userConfFundLabel.appendChild(userLatestConfFundElement);
    console.log('why this prints double if i cancel then clicked again?');
    shopConfirmationUserConfidentialFund.appendChild(userConfFundLabel);

    // show item clicked without detail table
    const shopConfirmationImg = document.getElementById('shopConfirmationImg');
    shopConfirmationImg.innerHTML = '';
    // create img element then append to the div
    const itemElement = document.createElement('div');
    const itemImg = document.createElement('img');
    itemImg.src = item.item_img_src;
    itemImg.alt = item.item_name;
    const itemNameTextElement = document.createElement('p');
    itemNameTextElement.textContent = item.item_name;
    const itemPriceNameTextElement = document.createElement('p');
    itemPriceNameTextElement.textContent = 'C. Fund: ';
    const itemPriceTextElement = document.createElement('span');
    itemPriceTextElement.textContent = item.item_price;
    itemPriceNameTextElement.appendChild(itemPriceTextElement);
    itemElement.appendChild(itemImg);
    itemElement.appendChild(itemNameTextElement);
    itemElement.appendChild(itemPriceNameTextElement);
    shopConfirmationImg.appendChild(itemElement);
}
const confirmBuyButton = document.getElementById('confirmBuyButton');
confirmBuyButton.addEventListener('click', async function() {
    const item = selectedShopItem;
    const currentUserDataItem = await getCurrentUserFromFirestore();
    let checkUserConfidentialFund = currentUserDataItem[0].userConfidentialFund;
    if (checkUserConfidentialFund >= item.item_price) {
        // Retrieve the user document from Firestore
        const userRef = doc(db, 'users', currentUserDataItem[0].currUser_uid);
        const userDoc = await getDoc(userRef);
        checkUserConfidentialFund -= item.item_price;

        if (userDoc.exists()) {
            const userData = userDoc.data();
            const updatedUserInventoryItems = [...userData.userInventoryItems, item];
            await updateDoc(userRef, {
                userInventoryItems: updatedUserInventoryItems,
                userConfidentialFund: checkUserConfidentialFund,
            });
            console.log('Item appended to userInventoryItems:', item);

            const latestUserInventoryItems = await getCurrentUserFromFirestore();
            const checkLatestUserInventoryItems = latestUserInventoryItems[0].userInventoryItems;
            let isItemFound = false;
            checkLatestUserInventoryItems.forEach(inventoryItems => {
                if (inventoryItems.item_uid == item.item_uid) {
                    const shopSuccessPopup = document.getElementById('shopSuccessPopup');
                    shopSuccessPopup.style.display = 'block';

                    // show user latest funds
                    const shopSucessUserConfidentialFund = document.getElementById('shopSucessUserConfidentialFund');
                    shopSucessUserConfidentialFund.innerHTML = '';
                    // create p element for the label
                    const userSucessConfFundLabel = document.createElement('p');
                    userSucessConfFundLabel.textContent = 'Current Confidential Fund: ';
                    // get the latest user conf fund
                    const userSucessLatestConfFund = latestUserInventoryItems;
                    // create span element to display the latest user conf fund
                    const userSucessLatestConfFundElement = document.createElement('span');
                    userSucessLatestConfFundElement.textContent = userSucessLatestConfFund[0].userConfidentialFund;
                    userSucessConfFundLabel.appendChild(userSucessLatestConfFundElement);
                    shopSucessUserConfidentialFund.appendChild(userSucessConfFundLabel);
    
                    // show item purchase 
                    const shopSuccessImg = document.getElementById('shopSuccessImg');
                    shopSuccessImg.innerHTML = '';
                    // create img element then append to the div
                    const sucessItemElement = document.createElement('div');
                    const sucessItemImg = document.createElement('img');
                    sucessItemImg.src = inventoryItems.item_img_src;
                    sucessItemImg.alt = inventoryItems.item_name;
                    const sucessItemNameTextElement = document.createElement('p');
                    sucessItemNameTextElement.textContent = inventoryItems.item_name;
                    const sucessItemPriceNameTextElement = document.createElement('p');
                    sucessItemPriceNameTextElement.textContent = 'C. Fund: ';
                    const sucessItemPriceTextElement = document.createElement('span');
                    sucessItemPriceTextElement.textContent = inventoryItems.item_price;
                    sucessItemPriceNameTextElement.appendChild(sucessItemPriceTextElement);
                    sucessItemElement.appendChild(sucessItemImg);
                    sucessItemElement.appendChild(sucessItemNameTextElement);
                    sucessItemElement.appendChild(sucessItemPriceNameTextElement);
                    shopSuccessImg.appendChild(sucessItemElement);
                    isItemFound = true;
                }
            })
            if (!isItemFound) {
                console.log('Item not found in userData');
            }
        } else {
            console.log('User document not found');
        }
    } else {
        const shopNotEnoughFundsPopup = document.getElementById('shopNotEnoughFundsPopup');
        shopNotEnoughFundsPopup.style.display = 'block';

        // show user latest funds
        const shopNotEnoughFundUserConfidentialFund = document.getElementById('shopNotEnoughFundUserConfidentialFund');
        shopNotEnoughFundUserConfidentialFund.innerHTML = '';
        // create p element for the label
        const userNotEnoughFundConfFundLabel = document.createElement('p');
        userNotEnoughFundConfFundLabel.textContent = 'Current Confidential Fund: ';
        // get the latest user conf fund
        const userNotEnoughFundLatestConfFund = await getCurrentUserFromFirestore();
        // create span element to display the latest user conf fund
        const userNotEnoughFundLatestConfFundElement = document.createElement('span');
        userNotEnoughFundLatestConfFundElement.textContent = userNotEnoughFundLatestConfFund[0].userConfidentialFund;
        userNotEnoughFundConfFundLabel.appendChild(userNotEnoughFundLatestConfFundElement);
        shopNotEnoughFundUserConfidentialFund.appendChild(userNotEnoughFundConfFundLabel);

        // show item purchase 
        const shopNotEnoughFundsImg = document.getElementById('shopNotEnoughFundsImg');
        shopNotEnoughFundsImg.innerHTML = '';
        // create img element then append to the div
        const failedItemElement = document.createElement('div');
        const failedItemImg = document.createElement('img');
        failedItemImg.src = item.item_img_src;
        failedItemImg.alt = item.item_name;
        const failedItemNameTextElement = document.createElement('p');
        failedItemNameTextElement.textContent = item.item_name;
        const failedItemPriceNameTextElement = document.createElement('p');
        failedItemPriceNameTextElement.textContent = 'C. Fund: ';
        const failedItemPriceTextElement = document.createElement('span');
        failedItemPriceTextElement.textContent = item.item_price;
        failedItemPriceNameTextElement.appendChild(failedItemPriceTextElement);
        failedItemElement.appendChild(failedItemImg);
        failedItemElement.appendChild(failedItemNameTextElement);
        failedItemElement.appendChild(failedItemPriceNameTextElement);
        shopNotEnoughFundsImg.appendChild(failedItemElement);
    }
})
const shopSuccessPopup = document.getElementById('shopSuccessPopup');
shopSuccessPopup.addEventListener('click', function() {
    showUserConfidentialFund();
})
const shopNotEnoughFundsPopup = document.getElementById('shopNotEnoughFundsPopup');
shopNotEnoughFundsPopup.addEventListener('click', function() {
    showUserConfidentialFund();
})