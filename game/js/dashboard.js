// journey button utility
// Sample stages (you can add more dynamically)
const journeyStages = [
    { 
        name: 'Stage 1', 
        isLocked: false, 
        background: 'https://media.tenor.com/PAQPlyrZCWUAAAAM/im-waiting.gif', 
        hoverBackground: 'https://media.tenor.com/py4yxjBVLLcAAAAM/fnaf-memes.gif',
        height: '300px' 
    },
    { 
        name: 'Stage 2', 
        isLocked: true, 
        background: 'https://media.tenor.com/hh6n7Ou_OnUAAAAM/math-hangover.gif', 
        hoverBackground: 'https://media.tenor.com/auCXKd9tFigAAAAM/jujutsu-kaisen-jjk.gif',
        height: '300px' 
    },
    { 
        name: 'Stage 3', 
        isLocked: true, 
        background: 'https://media1.tenor.com/m/q5xsitefxAcAAAAC/toilet-bound-hanako-kun-jibaku-shounen-hanako-kun.gif', 
        hoverBackground: 'https://media1.tenor.com/m/RSc9Gw10HnsAAAAd/shrek-smirk-shrek-sus.gif',
        height: '300px' 
    }
    // Add more stages as needed
];
// Function to open the journey popup
function openJourneyPopup() {
    document.getElementById('stages').innerHTML = ''; // Clear previous stages

    // Add stages dynamically
    journeyStages.forEach(stage => {
        const stageElement = document.createElement('div');
        stageElement.className = 'stage';

        // Create an overlay for the stage name
        const overlay = document.createElement('div');
        overlay.className = 'stage-overlay';
        overlay.textContent = stage.name;

        // Append the overlay to the stage
        stageElement.appendChild(overlay);

        // Set click event for the stage
        stageElement.onclick = () => handleStageClick(stage);

        // Add lock icon if the stage is locked
        if (stage.isLocked) {
            const lockIcon = document.createElement('span');
            lockIcon.innerHTML = '&#128274;'; // You can replace this with an actual lock icon
            overlay.appendChild(lockIcon);
        }

        // Set background and height styles
        stageElement.style.backgroundImage = `url(${stage.background})`;
        stageElement.style.height = stage.height;

        // Add hover effect using JavaScript
        stageElement.onmouseover = () => {
            stageElement.style.backgroundImage = `url(${stage.hoverBackground})`;
        };
        stageElement.onmouseout = () => {
            stageElement.style.backgroundImage = `url(${stage.background})`;
        };

        document.getElementById('stages').appendChild(stageElement);
    });

    document.getElementById('journeyPopup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}
// Function to handle stage click
function handleStageClick(stage) {
    if (stage.isLocked) {
        alert('Stage is locked. Complete previous stages first.');
    } else {
        // Add logic for what happens when a stage is clicked
        alert(`Clicked on ${stage.name}`);
    }
}
// Function to close the journey popup
function closeJourneyPopup() {
    document.getElementById('journeyPopup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}



// Function to open the profile popup
function openProfilePopup() {
    // Your logic to fetch and add user details dynamically goes here
    const userDetails = getUserDetails(); // Replace this with your function to fetch user details
    document.getElementById('userDetailsTable').innerHTML = userDetails;

    document.getElementById('profilePopup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}
// Function to close the profile popup
function closeProfilePopup() {
    document.getElementById('profilePopup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}
// Set the avatar background dynamically (replace 'path/to/avatar.jpg' with the actual path)
document.getElementById('avatar').style.backgroundImage = 'url(path/to/avatar.jpg)';
// Function to fetch user details (replace this with your actual data)
function getUserDetails() {
    const user = {
        name: 'John Doe',
        age: 25,
        email: 'john@example.com'
    };

    // Build HTML for user details table
    const userDetailsHTML = `
        <tr>
            <td>Name:</td>
            <td>${user.name}</td>
        </tr>
        <tr>
            <td>Age:</td>
            <td>${user.age}</td>
        </tr>
        <tr>
            <td>Email:</td>
            <td>${user.email}</td>
        </tr>
    `;

    return userDetailsHTML;
}
