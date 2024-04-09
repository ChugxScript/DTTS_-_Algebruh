import { 
    db,
    getCurrentUserFromFirestore, 
    getBruhsFromFirestore, 
    getItemsFromFirestore 
} from "./getFirestore.js";
import { 
    getDoc,
    doc, 
    updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";


export const showShopBruhs = async () => {
    const shopContainer = document.getElementById('shopContainer');
    shopContainer.style.display = 'flex';

    const user = await getCurrentUserFromFirestore();
    const ownedBruhs = user.user_bruhs;
    const Allbruhs = await getBruhsFromFirestore();
    // const ownedBruhUIDs = []
    // const shopBruhs = [];


    const ownedBruhUIDs = ownedBruhs.map(b => b.bruh_uid);
    const shopBruhs = Allbruhs.filter(b => !ownedBruhUIDs.includes(b.bruh_uid));
 
    
    console.log(`ownedBruhs: ${JSON.stringify(ownedBruhs)}`);
    console.log(`Allbruhs: ${JSON.stringify(Allbruhs)}`);
    console.log(`ownedBruhUIDs: ${JSON.stringify(ownedBruhUIDs)}`);
    console.log(`shopBruhs: ${JSON.stringify(shopBruhs)}`);

    const charactersContainer = document.getElementById('shopCatContainer');
    charactersContainer.innerHTML = '';

    let rowCounter = 0;
    let currentRow;

    shopBruhs.forEach((character) => {
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
const shopBruhs = document.getElementById('shopBruhs');
shopBruhs.addEventListener('click', function() {
    showShopBruhs();
})

const showShopItems = async () => {
    const items = await getItemsFromFirestore();
    const itemsContainer = document.getElementById('shopCatContainer');
    itemsContainer.innerHTML = '';

    let rowCounter = 0;
    let currentRow;

    items.forEach((item) => {
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
const shopItems = document.getElementById('shopItems');
shopItems.addEventListener('click', function() {
    showShopItems();
})





let selectedItem = null;
let currCategory = null;
let currUser = null;
const showCharacterDetails = (character) => {
    const shopShowDetails = document.getElementById('shopShowDetails');
    const shopDetIMG = document.getElementById('shopDetIMG');
    const shopDetTable = document.getElementById('shopDetTable');
    shopShowDetails.style.display = 'flex';
    shopDetIMG.innerHTML = ''; 
    shopDetTable.innerHTML = ''; 

    const charImg = document.createElement('img');
    charImg.src = character.bruh_img;
    shopDetIMG.appendChild(charImg);

    const itemDetailTable = document.createElement('table');
    const orderDetails = ['bruh_name', 'bruh_hp', 'bruh_atk', 'bruh_description', 'bruh_price'];
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
    shopDetTable.appendChild(itemDetailTable);

    selectedItem = character;
    currCategory = 'bruh';
}

const  showItemDetails = (item) => {
    const shopShowDetails = document.getElementById('shopShowDetails');
    const shopDetIMG = document.getElementById('shopDetIMG');
    const shopDetTable = document.getElementById('shopDetTable');
    shopShowDetails.style.display = 'flex';
    shopDetIMG.innerHTML = ''; 
    shopDetTable.innerHTML = ''; 

    const itemImg = document.createElement('img');
    itemImg.src = item.item_img;
    shopDetIMG.appendChild(itemImg);

    const itemDetailTable = document.createElement('table');
    const orderDetails = ['item_name', 'item_description', 'item_price'];
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
    shopDetTable.appendChild(itemDetailTable);

    selectedItem = item;
    currCategory = 'item';
}

const shopBuyBtn1 = document.getElementById('shopBuyBtn1');
shopBuyBtn1.addEventListener('click', function() {
    showAreYouSure(selectedItem, currCategory);
})


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
        case 'item_price':
        case 'bruh_price':
            return 'Price';
        case 'user_confidentialFund':
            return 'Confidential Fund';
        default:
            return '';
    }
}


const showAreYouSure = async (item, category) => { 
    const areYouSure = document.getElementById('areYouSure');
    const shopDetIMG2 = document.getElementById('shopDetIMG2');
    const shopDetTable2 = document.getElementById('shopDetTable2');
    areYouSure.style.display = 'flex';
    console.log(`item: ${JSON.stringify(item)}`);
    console.log(`category: ${category}`);


    const user = await getCurrentUserFromFirestore();
    const user_stats = user.user_stats;
    currUser = user;

    if (category === 'bruh') {
        shopDetIMG2.innerHTML = ''; 
        shopDetTable2.innerHTML = ''; 
        const itemImg = document.createElement('img');
        itemImg.src = item.bruh_img;
        shopDetIMG2.appendChild(itemImg);

        const itemDetailTable = document.createElement('table');
        const orderDetails = ['bruh_name', 'bruh_price', 'user_confidentialFund'];
        // Populate details as rows in the table based on the specified order
        orderDetails.forEach((detailKey) => {
            if (item.hasOwnProperty(detailKey) || user_stats.hasOwnProperty(detailKey)) {
                const row = document.createElement('tr');
                const cell1 = document.createElement('td');
                const cell2 = document.createElement('td');
                cell1.textContent = alterDetailKey(detailKey);
                if (detailKey === 'user_confidentialFund') {
                    cell2.textContent = user_stats[detailKey];
                } else {
                    cell2.textContent = item[detailKey];
                }
                row.appendChild(cell1);
                row.appendChild(cell2);
                itemDetailTable.appendChild(row);
            }
        });
        shopDetTable2.appendChild(itemDetailTable);

    } else {
        shopDetIMG2.innerHTML = ''; 
        shopDetTable2.innerHTML = ''; 
        const itemImg = document.createElement('img');
        itemImg.src = item.item_img;
        shopDetIMG2.appendChild(itemImg);

        const itemDetailTable = document.createElement('table');
        const orderDetails = ['item_name', 'item_price', 'user_confidentialFund'];
        // Populate details as rows in the table based on the specified order
        orderDetails.forEach((detailKey) => {
            if (item.hasOwnProperty(detailKey) || user_stats.hasOwnProperty(detailKey)) {
                const row = document.createElement('tr');
                const cell1 = document.createElement('td');
                const cell2 = document.createElement('td');
                cell1.textContent = alterDetailKey(detailKey);
                if (detailKey === 'user_confidentialFund') {
                    cell2.textContent = user_stats[detailKey];
                } else {
                    cell2.textContent = item[detailKey];
                }
                row.appendChild(cell1);
                row.appendChild(cell2);
                itemDetailTable.appendChild(row);
            }
        });
        shopDetTable2.appendChild(itemDetailTable);
    }
}
const shopBuyBtn2 = document.getElementById('shopBuyBtn2');
shopBuyBtn2.addEventListener('click', function() {
    makePurchase(selectedItem, currCategory, currUser);
})


const makePurchase = async (item, category, user) => {
    const currUserRef = doc(db, 'users', user.currUser_uid);
    const userDoc = await getDoc(currUserRef);
    const userData = userDoc.data();
    const userStats = userData.user_stats;
    const userInv = userData.user_inventoryItems;

    console.log(`****item: ${JSON.stringify(item)}`);

    if (category === 'bruh') {
        if(userStats.user_confidentialFund >= item.bruh_price) {
            const updateUserBruhs = [...user.user_bruhs, item];
            const updatedUserStats = {
                user_level: userStats.user_level,
                user_score: userStats.user_score,
                user_answerTotalTime: userStats.user_answerTotalTime,
                user_correctAnswers: userStats.user_correctAnswers,
                user_difficultQuestionsAnswered: userStats.user_difficultQuestionsAnswered,
                user_easyQuestionsAnswered: userStats.user_easyQuestionsAnswered,
                user_bonusTaken: userStats.user_bonusTaken,
                user_incorrectAnswers: userStats.user_incorrectAnswers,
                user_confidentialFund: userStats.user_confidentialFund - item.bruh_price
            };  
            await updateDoc(currUserRef, { 
                user_bruhs: updateUserBruhs,
                user_stats: updatedUserStats
            });
            displayBuyResult(item, category, true);
        } else {
            displayBuyResult(item, category, false);
        }

    } else {
        if(userStats.user_confidentialFund >= item.item_price) {
            const updateUserItems = [...user.user_inventoryItems, item];
            const updatedUserStats = {
                user_level: userStats.user_level,
                user_score: userStats.user_score,
                user_answerTotalTime: userStats.user_answerTotalTime,
                user_correctAnswers: userStats.user_correctAnswers,
                user_difficultQuestionsAnswered: userStats.user_difficultQuestionsAnswered,
                user_easyQuestionsAnswered: userStats.user_easyQuestionsAnswered,
                user_bonusTaken: userStats.user_bonusTaken,
                user_incorrectAnswers: userStats.user_incorrectAnswers,
                user_confidentialFund: userStats.user_confidentialFund - item.item_price
            };  
            await updateDoc(currUserRef, { 
                user_inventoryItems: updateUserItems,
                user_stats: updatedUserStats
            });
            displayBuyResult(item, category, true);
        } else {
            displayBuyResult(item, category, false);
        }
    }
}

const displayBuyResult = async (item, category, result) => {
    const displayBuyResult = document.getElementById('displayBuyResult');
    const resultH1 = document.getElementById('resultH1');
    const resultH2 = document.getElementById('resultH2');
    const shopDetIMG3 = document.getElementById('shopDetIMG3');
    const shopDetTable3 = document.getElementById('shopDetTable3');
    const shopBtn3 = document.getElementById('shopBtn3');
    displayBuyResult.style.display = 'flex';
    resultH1.innerHTML = ''; 
    resultH2.innerHTML = '';
    shopBtn3.innerHTML = '';

    const user = await getCurrentUserFromFirestore();
    const user_stats = user.user_stats;

    if (result) {
        resultH1.textContent = 'ARIGATO GUZAIMASU!';
        resultH2.textContent = 'PURCHASE SUCCESSFUL';
        shopBtn3.textContent = 'NICE';
        resultH1.style.color = 'greenyellow';
        resultH2.style.color = 'greenyellow';
    } else {
        resultH1.textContent = 'PURCHASE UNSUCCESSFUL';
        resultH2.textContent = 'NOT ENOUGH CONFIDENTIAL FUND';
        shopBtn3.textContent = 'HMMP! OKAY!';
        resultH1.style.color = 'red';
        resultH2.style.color = 'red';
    }
    if (category === 'bruh') {
        shopDetIMG3.innerHTML = ''; 
        shopDetTable3.innerHTML = '';
        const itemImg = document.createElement('img');
        itemImg.src = item.bruh_img;
        shopDetIMG3.appendChild(itemImg);

        const itemDetailTable = document.createElement('table');
        const orderDetails = ['bruh_name', 'bruh_price', 'user_confidentialFund'];
        // Populate details as rows in the table based on the specified order
        orderDetails.forEach((detailKey) => {
            if (item.hasOwnProperty(detailKey) || user_stats.hasOwnProperty(detailKey)) {
                const row = document.createElement('tr');
                const cell1 = document.createElement('td');
                const cell2 = document.createElement('td');
                cell1.textContent = alterDetailKey(detailKey);
                if (detailKey === 'user_confidentialFund') {
                    cell2.textContent = user_stats[detailKey];
                } else {
                    cell2.textContent = item[detailKey];
                }
                row.appendChild(cell1);
                row.appendChild(cell2);
                itemDetailTable.appendChild(row);
            }
        });
        shopDetTable3.appendChild(itemDetailTable);
    } else {
        shopDetIMG3.innerHTML = ''; 
        shopDetTable3.innerHTML = '';
        const itemImg = document.createElement('img');
        itemImg.src = item.item_img;
        shopDetIMG3.appendChild(itemImg);

        const itemDetailTable = document.createElement('table');
        const orderDetails = ['item_name', 'item_price', 'user_confidentialFund'];
        // Populate details as rows in the table based on the specified order
        orderDetails.forEach((detailKey) => {
            if (item.hasOwnProperty(detailKey) || user_stats.hasOwnProperty(detailKey)) {
                const row = document.createElement('tr');
                const cell1 = document.createElement('td');
                const cell2 = document.createElement('td');
                cell1.textContent = alterDetailKey(detailKey);
                if (detailKey === 'user_confidentialFund') {
                    cell2.textContent = user_stats[detailKey];
                } else {
                    cell2.textContent = item[detailKey];
                }
                row.appendChild(cell1);
                row.appendChild(cell2);
                itemDetailTable.appendChild(row);
            }
        });
        shopDetTable3.appendChild(itemDetailTable);
    }

    shopBtn3.addEventListener('click', function() {
        const areYouSure = document.getElementById('areYouSure');
        displayBuyResult.style.display = 'none';
        areYouSure.style.display = 'none';
        if (category === 'bruh') {
            showShopBruhs();
        } else {
            showShopItems();
        }
    })
}