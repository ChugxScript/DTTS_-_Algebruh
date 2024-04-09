import { showProfileContent } from "./profileFunctions.js";
import { userShowInventoryChars } from "./inventoryFunctions.js";
import { showJourneyContentContainer } from "./journeyFunctions.js";
import { showShopChars, showUserConfidentialFund } from "./shopFunctions.js";

let previousCategory = null;
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', async function() {
        const contentId = this.getAttribute('data-content');
        const content = document.getElementById(contentId);
        const category = this.textContent;

        if (previousCategory !== null) {
            // If the previous category is the same as the current one
            if (previousCategory === content) {
                // Toggle the display of the content
                content.style.display = content.style.display === 'none' ? 'block' : 'none';
                // Update the previous category to null since it's toggled
                previousCategory = null;
            } else {
                // Hide the previous category
                previousCategory.style.display = 'none';
                // Show the clicked category
                content.style.display = 'block';
                // Update the previous category to the current one
                previousCategory = content;
            }
        } else {
            // Show the clicked category if there's no previous category
            content.style.display = 'block';
            // Update the previous category to the current one
            previousCategory = content;
        }

        // If the category is Profile and the content is displayed, show the profile content
        if (category === 'Profile' && content.style.display === 'block') {
            await showProfileContent();
        }
        if (category === 'Inventory' && content.style.display === 'block') {
            await userShowInventoryChars();
        }
        if (category === 'Journey' && content.style.display === 'block') {
            await showJourneyContentContainer();
        }
        if (category === 'Shop' && content.style.display === 'block') {
            await showUserConfidentialFund();
            await showShopChars();
        }
        
        // Toggle active class
        menuItems.forEach(item => {
            item.classList.remove('active');
        });
        this.classList.toggle('active');
    });
});