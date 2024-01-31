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


// shop functions
const shopItems = {
    promoSale: [
        { 
            image: 'https://media.tenor.com/2r3Ub1sj-M8AAAAj/picachu.gif', 
            text: 'Pikachuchu',
            imgWidth: '100px',
            details: 
            {
                name: 'Pikachuchu',
                Type: 'Electric',
                Abilities: 'Can charge your phone.',
                SpecialAbility: 'Shing shing',
                PersonalityTraits: 'Like to explode things specially phones.',
                Origin: 'Meralco',
                Skills: 'instant outlet',
                Height: 'Helloght',
                Weight: 'okay take your time',
                Appearance: 'kinda yellowishishnessheeeesh',
                Backstory: 'i dont know. how am i suppose to know',
                Alignment: 'vertical',
                Habitat: 'in your mind'
            }              
        },
        { 
            image: 'https://media.tenor.com/C23FXbKvxwwAAAAj/dracula-vampire.gif', 
            text: 'Bornicles',
            imgWidth: '100px',
            details: 
            {
                name: 'Bornicles',
                Type: 'horny virgin',
                Abilities: 'pdf file WAHAHAHAHAHAHAHA if you get then laugh',
                SpecialAbility: 'too r18+ to say HAHAHAHAHA',
                PersonalityTraits: 'horn horn',
                Origin: 'his mother',
                Skills: 'bruh isnt same as abilities?',
                Height: '3 inches',
                Weight: '3 inches.. hmmm remind me of something',
                Appearance: 'ugly bastard',
                Backstory: 'he got rejected so he decided to be jst horn horn',
                Alignment: 'diagonal',
                Habitat: 'below the soil'
            }
        },
        { 
            image: 'https://media.tenor.com/8DBL8P0pmgYAAAAj/purple-bat.gif', 
            text: 'D Bruh',
            imgWidth: '100px',
            details: 
            {
                name: 'D Bruh',
                Type: 'food',
                Abilities: 'Chinese virus',
                SpecialAbility: 'PANDEMIIIC',
                PersonalityTraits: 'delicious',
                Origin: 'cave',
                Skills: 'can fly',
                Height: 'too dark to measure',
                Weight: 'it violate the gravity',
                Appearance: 'bruh its too dark to see',
                Backstory: 'people hungry then boom. bat.',
                Alignment: 'inverted horizontal',
                Habitat: 'asain stomach'
            }              
        },
        { 
            image: 'https://media.tenor.com/1C6VkCoV_9UAAAAj/ghost-phantom.gif', 
            text: 'Jav.ghost',
            imgWidth: '100px',
            details: 
            {
                name: 'Jav.ghost',
                Type: 'cant say',
                Abilities: 'good actor back when its alive',
                SpecialAbility: 'cant say HAHAHAH',
                PersonalityTraits: 'go tru wall',
                Origin: 'human',
                Skills: 'can scare the shit out of you',
                Height: 'i cant see it nruh its a ghost',
                Weight: '-1',
                Appearance: 'transparent',
                Backstory: 'what do you think?',
                Alignment: 'round',
                Habitat: 'crowd'
            }              
        },
        { 
            image: 'https://media.tenor.com/PeVD5gpFXxwAAAAM/pepe-dancing.gif', 
            text: 'pepe',
            imgWidth: '100px',
            details: 
            { 
                name: 'pepe',
                Type: 'pepe',
                Abilities: 'pepe',
                SpecialAbility: 'pepe',
                PersonalityTraits: 'pepe',
                Origin: 'pepe',
                Skills: 'pepe',
                Height: 'pepe',
                Weight: 'pepe',
                Appearance: 'pepe',
                Backstory: 'pepe',
                Alignment: 'pepe',
                Habitat: 'pepe'
            } 
        },
        { 
            image: 'https://media.tenor.com/Ivb2PnLZzsUAAAAM/fire-elmo.gif', 
            text: 'burn mo',
            imgWidth: '100px',
            details: 
            { 
                name: 'burn mo',
                Type: 'i dont a keyboard',
                Abilities: 'cook',
                SpecialAbility: 'bake',
                PersonalityTraits: 'anger issue',
                Origin: 'cotton',
                Skills: 'can drink food',
                Height: 'too hot to measure',
                Weight: 'the tool melted',
                Appearance: 'red',
                Backstory: 'got scolded by his father then boom.',
                Alignment: 'upward',
                Habitat: 'kitchen'
            } 
        },
        { 
            image: 'https://media.tenor.com/aUBZyEAgKTUAAAAM/ben-and-ben-paolo.gif', 
            text: 'ben',
            imgWidth: '100px',
            details: 
            { 
                name: 'ben',
                Type: '1',
                Abilities: 'sing',
                SpecialAbility: 'guitar',
                PersonalityTraits: 'voice',
                Origin: 'rich family',
                Skills: 'can sing',
                Height: 'tall',
                Weight: 'kinda ----',
                Appearance: 'person',
                Backstory: 'g',
                Alignment: 'music',
                Habitat: 'stage'
            } 
        },
        { 
            image: 'https://media.tenor.com/O1z3EhbPH2wAAAAM/mahiwaga-benand-ben.gif', 
            text: 'ben n ben',
            imgWidth: '100px',
            details: 
            { 
                name: 'ben n ben',
                Type: '2',
                Abilities: 'sing sing',
                SpecialAbility: 'guitar guitar',
                PersonalityTraits: 'voice voice',
                Origin: 'rich rich family',
                Skills: 'can sing sing',
                Height: 'tall tall',
                Weight: 'kinda ---- ----',
                Appearance: 'person person',
                Backstory: 'g g',
                Alignment: 'music music',
                Habitat: 'stage stage'
            } 
        },
        { 
            image: 'https://media.tenor.com/7zUwCo9n4iEAAAAM/jollibae-jollibee.gif', 
            text: 'jolibonk',
            imgWidth: '100px',
            details: 
            { 
                name: 'jolibonk',
                Type: 'hunter',
                Abilities: 'hunt',
                SpecialAbility: 'hunting',
                PersonalityTraits: 'hunting',
                Origin: 'because of bornicles',
                Skills: 'hunting',
                Height: 'tall',
                Weight: 'big',
                Appearance: 'red white',
                Backstory: 'bornicles is born then boom. jolibonk',
                Alignment: 'hoooooooooorizontal',
                Habitat: 'near restaurant'
            } 
        },
        { 
            image: 'https://media.tenor.com/5rBZWnplJ54AAAAM/mcdonalds-mcdo.gif', 
            text: 'mcdede',
            imgWidth: '100px',
            details: 
            { 
                name: 'mcdede',
                Type: 'clown',
                Abilities: 'can make your crush with you together',
                SpecialAbility: 'break ups',
                PersonalityTraits: 'clown',
                Origin: 'break ups',
                Skills: 'toxixity',
                Height: 'tall as fk',
                Weight: 'thin as fk',
                Appearance: 'clown',
                Backstory: 'hes a foreigner so tf i know',
                Alignment: 'veeeeeeeeeeertical',
                Habitat: 'near restaurant'
            } 
        },
        { 
            image: 'https://media.tenor.com/CBOjsCUCFOUAAAAM/jhonny-sins-reyiz-wink.gif', 
            text: 'jhonny',
            imgWidth: '100px',
            details: 
            { 
                name: 'jhonny',
                Type: 'actor',
                Abilities: 'holy shit',
                SpecialAbility: 'goodness gracious',
                PersonalityTraits: 'collector',
                Origin: 'from that black orange site',
                Skills: 'oh hell no',
                Height: 'tf i know',
                Weight: 'tf i know',
                Appearance: 'bulky',
                Backstory: 'brother of bornicles',
                Alignment: 'top bottom left right; you name it',
                Habitat: 'front of camera'
            } 
        },
        // Add more promo items
    ],
    characters: [
        { 
            image: 'https://media.tenor.com/Q5tczjjhTuYAAAAM/spiderman-emo.gif', 
            text: 'Pikachuchu',
            imgWidth: '100px',
            details: 
            {
                name: 'Pikachuchu',
                Type: 'Electric',
                Abilities: 'Can charge your phone.',
                SpecialAbility: 'Shing shing',
                PersonalityTraits: 'Like to explode things specially phones.',
                Origin: 'Meralco',
                Skills: 'instant outlet',
                Height: 'Helloght',
                Weight: 'okay take your time',
                Appearance: 'kinda yellowishishnessheeeesh',
                Backstory: 'i dont know. how am i suppose to know',
                Alignment: 'vertical',
                Habitat: 'in your mind'
            }              
        },
        { 
            image: 'https://media.tenor.com/0BTtuQIJYeEAAAAM/vamp-vampire.gif', 
            text: 'Bornicles',
            imgWidth: '100px',
            details: 
            {
                name: 'Bornicles',
                Type: 'horny virgin',
                Abilities: 'pdf file WAHAHAHAHAHAHAHA if you get then laugh',
                SpecialAbility: 'too r18+ to say HAHAHAHAHA',
                PersonalityTraits: 'horn horn',
                Origin: 'his mother',
                Skills: 'bruh isnt same as abilities?',
                Height: '3 inches',
                Weight: '3 inches.. hmmm remind me of something',
                Appearance: 'ugly bastard',
                Backstory: 'he got rejected so he decided to be jst horn horn',
                Alignment: 'diagonal',
                Habitat: 'below the soil'
            }
        },
        { 
            image: 'https://media.tenor.com/2h7UGrpFjyoAAAAj/bat-vampire.gif', 
            text: 'D Bruh',
            imgWidth: '100px',
            details: 
            {
                name: 'D Bruh',
                Type: 'food',
                Abilities: 'Chinese virus',
                SpecialAbility: 'PANDEMIIIC',
                PersonalityTraits: 'delicious',
                Origin: 'cave',
                Skills: 'can fly',
                Height: 'too dark to measure',
                Weight: 'it violate the gravity',
                Appearance: 'bruh its too dark to see',
                Backstory: 'people hungry then boom. bat.',
                Alignment: 'inverted horizontal',
                Habitat: 'asain stomach'
            }              
        },
        { 
            image: 'https://media.tenor.com/yGWVrpqCrH8AAAAM/neko-cat.gif', 
            text: 'Jav.ghost',
            imgWidth: '100px',
            details: 
            {
                name: 'Jav.ghost',
                Type: 'cant say',
                Abilities: 'good actor back when its alive',
                SpecialAbility: 'cant say HAHAHAH',
                PersonalityTraits: 'go tru wall',
                Origin: 'human',
                Skills: 'can scare the shit out of you',
                Height: 'i cant see it nruh its a ghost',
                Weight: '-1',
                Appearance: 'transparent',
                Backstory: 'what do you think?',
                Alignment: 'round',
                Habitat: 'crowd'
            }              
        },
        { 
            image: 'https://media.tenor.com/PeVD5gpFXxwAAAAM/pepe-dancing.gif', 
            text: 'pepe',
            imgWidth: '100px',
            details: 
            { 
                name: 'pepe',
                Type: 'pepe',
                Abilities: 'pepe',
                SpecialAbility: 'pepe',
                PersonalityTraits: 'pepe',
                Origin: 'pepe',
                Skills: 'pepe',
                Height: 'pepe',
                Weight: 'pepe',
                Appearance: 'pepe',
                Backstory: 'pepe',
                Alignment: 'pepe',
                Habitat: 'pepe'
            } 
        },
        { 
            image: 'https://media.tenor.com/Y3MVMPEVU8MAAAAM/elmo-sesame-street.gif', 
            text: 'burn mo',
            imgWidth: '100px',
            details: 
            { 
                name: 'burn mo',
                Type: 'i dont a keyboard',
                Abilities: 'cook',
                SpecialAbility: 'bake',
                PersonalityTraits: 'anger issue',
                Origin: 'cotton',
                Skills: 'can drink food',
                Height: 'too hot to measure',
                Weight: 'the tool melted',
                Appearance: 'red',
                Backstory: 'got scolded by his father then boom.',
                Alignment: 'upward',
                Habitat: 'kitchen'
            } 
        },
        { 
            image: 'https://media.tenor.com/ZBe_W71AbgIAAAAM/staring.gif', 
            text: 'ben?',
            imgWidth: '100px',
            details: 
            { 
                name: 'ben?',
                Type: '1',
                Abilities: 'sing',
                SpecialAbility: 'guitar',
                PersonalityTraits: 'voice',
                Origin: 'rich family',
                Skills: 'can sing',
                Height: 'tall',
                Weight: 'kinda ----',
                Appearance: 'person',
                Backstory: 'g',
                Alignment: 'music',
                Habitat: 'stage'
            } 
        },
        { 
            image: 'https://media.tenor.com/WACmHWGgUFUAAAAM/spider-man-ned-leeds.gif', 
            text: 'ben n ben?',
            imgWidth: '100px',
            details: 
            { 
                name: 'ben n ben?',
                Type: '2',
                Abilities: 'sing sing',
                SpecialAbility: 'guitar guitar',
                PersonalityTraits: 'voice voice',
                Origin: 'rich rich family',
                Skills: 'can sing sing',
                Height: 'tall tall',
                Weight: 'kinda ---- ----',
                Appearance: 'person person',
                Backstory: 'g g',
                Alignment: 'music music',
                Habitat: 'stage stage'
            } 
        },
        { 
            image: 'https://media.tenor.com/KCVGTvWtkUAAAAAj/minecraft-minecraft-bee.gif', 
            text: 'jolibonk',
            imgWidth: '100px',
            details: 
            { 
                name: 'jolibonk',
                Type: 'hunter',
                Abilities: 'hunt',
                SpecialAbility: 'hunting',
                PersonalityTraits: 'hunting',
                Origin: 'because of bornicles',
                Skills: 'hunting',
                Height: 'tall',
                Weight: 'big',
                Appearance: 'red white',
                Backstory: 'bornicles is born then boom. jolibonk',
                Alignment: 'hoooooooooorizontal',
                Habitat: 'near restaurant'
            } 
        },
        { 
            image: 'https://media.tenor.com/cT8OtWuVpJYAAAAj/jevil.gif', 
            text: 'mcdede',
            imgWidth: '100px',
            details: 
            { 
                name: 'mcdede',
                Type: 'clown',
                Abilities: 'can make your crush with you together',
                SpecialAbility: 'break ups',
                PersonalityTraits: 'clown',
                Origin: 'break ups',
                Skills: 'toxixity',
                Height: 'tall as fk',
                Weight: 'thin as fk',
                Appearance: 'clown',
                Backstory: 'hes a foreigner so tf i know',
                Alignment: 'veeeeeeeeeeertical',
                Habitat: 'near restaurant'
            } 
        },
        { 
            image: 'https://media.tenor.com/UBe2BQaAJyUAAAAM/eating-the-chip-chips.gif', 
            text: 'jhonny',
            imgWidth: '100px',
            details: 
            { 
                name: 'jhonny',
                Type: 'actor',
                Abilities: 'holy shit',
                SpecialAbility: 'goodness gracious',
                PersonalityTraits: 'collector',
                Origin: 'from that black orange site',
                Skills: 'oh hell no',
                Height: 'tf i know',
                Weight: 'tf i know',
                Appearance: 'bulky',
                Backstory: 'brother of bornicles',
                Alignment: 'top bottom left right; you name it',
                Habitat: 'front of camera'
            } 
        },
        // Add more characters
    ],
    items: [
        { 
            image: 'https://media.tenor.com/OKHYynDekG0AAAAM/cat-kitty.gif', 
            text: 'Pikachuchu',
            imgWidth: '100px',
            details: 
            {
                name: 'Pikachuchu',
                Type: 'Electric',
                Abilities: 'Can charge your phone.',
                SpecialAbility: 'Shing shing',
                PersonalityTraits: 'Like to explode things specially phones.',
                Origin: 'Meralco',
                Skills: 'instant outlet',
                Height: 'Helloght',
                Weight: 'okay take your time',
                Appearance: 'kinda yellowishishnessheeeesh',
                Backstory: 'i dont know. how am i suppose to know',
                Alignment: 'vertical',
                Habitat: 'in your mind'
            }              
        },
        { 
            image: 'https://media.tenor.com/e-4puhD5S7AAAAAM/vampire.gif', 
            text: 'Bornicles',
            imgWidth: '100px',
            details: 
            {
                name: 'Bornicles',
                Type: 'horny virgin',
                Abilities: 'pdf file WAHAHAHAHAHAHAHA if you get then laugh',
                SpecialAbility: 'too r18+ to say HAHAHAHAHA',
                PersonalityTraits: 'horn horn',
                Origin: 'his mother',
                Skills: 'bruh isnt same as abilities?',
                Height: '3 inches',
                Weight: '3 inches.. hmmm remind me of something',
                Appearance: 'ugly bastard',
                Backstory: 'he got rejected so he decided to be jst horn horn',
                Alignment: 'diagonal',
                Habitat: 'below the soil'
            }
        },
        { 
            image: 'https://media.tenor.com/_9c8gr3z7N8AAAAM/eeeee-eeeeee.gif', 
            text: 'D Bruh',
            imgWidth: '100px',
            details: 
            {
                name: 'D Bruh',
                Type: 'food',
                Abilities: 'Chinese virus',
                SpecialAbility: 'PANDEMIIIC',
                PersonalityTraits: 'delicious',
                Origin: 'cave',
                Skills: 'can fly',
                Height: 'too dark to measure',
                Weight: 'it violate the gravity',
                Appearance: 'bruh its too dark to see',
                Backstory: 'people hungry then boom. bat.',
                Alignment: 'inverted horizontal',
                Habitat: 'asain stomach'
            }              
        },
        { 
            image: 'https://media.tenor.com/y5h0o7hBmFoAAAAM/censored-psychedelic.gif', 
            text: 'Jav.ghost',
            imgWidth: '100px',
            details: 
            {
                name: 'Jav.ghost',
                Type: 'cant say',
                Abilities: 'good actor back when its alive',
                SpecialAbility: 'cant say HAHAHAH',
                PersonalityTraits: 'go tru wall',
                Origin: 'human',
                Skills: 'can scare the shit out of you',
                Height: 'i cant see it nruh its a ghost',
                Weight: '-1',
                Appearance: 'transparent',
                Backstory: 'what do you think?',
                Alignment: 'round',
                Habitat: 'crowd'
            }              
        },
        { 
            image: 'https://media.tenor.com/PeVD5gpFXxwAAAAM/pepe-dancing.gif', 
            text: 'pepe',
            imgWidth: '100px',
            details: 
            { 
                name: 'pepe',
                Type: 'pepe',
                Abilities: 'pepe',
                SpecialAbility: 'pepe',
                PersonalityTraits: 'pepe',
                Origin: 'pepe',
                Skills: 'pepe',
                Height: 'pepe',
                Weight: 'pepe',
                Appearance: 'pepe',
                Backstory: 'pepe',
                Alignment: 'pepe',
                Habitat: 'pepe'
            } 
        },
        { 
            image: 'https://media.tenor.com/MUzqlnfVEpcAAAAM/elmo-dancing.gif', 
            text: 'burn mo',
            imgWidth: '100px',
            details: 
            { 
                name: 'burn mo',
                Type: 'i dont a keyboard',
                Abilities: 'cook',
                SpecialAbility: 'bake',
                PersonalityTraits: 'anger issue',
                Origin: 'cotton',
                Skills: 'can drink food',
                Height: 'too hot to measure',
                Weight: 'the tool melted',
                Appearance: 'red',
                Backstory: 'got scolded by his father then boom.',
                Alignment: 'upward',
                Habitat: 'kitchen'
            } 
        },
        { 
            image: 'https://media.tenor.com/tpmdi0kVXUEAAAAM/jayesh-creepy-smile.gif', 
            text: 'ben?',
            imgWidth: '100px',
            details: 
            { 
                name: 'ben?',
                Type: '1',
                Abilities: 'sing',
                SpecialAbility: 'guitar',
                PersonalityTraits: 'voice',
                Origin: 'rich family',
                Skills: 'can sing',
                Height: 'tall',
                Weight: 'kinda ----',
                Appearance: 'person',
                Backstory: 'g',
                Alignment: 'music',
                Habitat: 'stage'
            } 
        },
        { 
            image: 'https://media.tenor.com/CfgU30sl8SoAAAAM/heatblast.gif', 
            text: 'ben n ben?',
            imgWidth: '100px',
            details: 
            { 
                name: 'ben n ben?',
                Type: '2',
                Abilities: 'sing sing',
                SpecialAbility: 'guitar guitar',
                PersonalityTraits: 'voice voice',
                Origin: 'rich rich family',
                Skills: 'can sing sing',
                Height: 'tall tall',
                Weight: 'kinda ---- ----',
                Appearance: 'person person',
                Backstory: 'g g',
                Alignment: 'music music',
                Habitat: 'stage stage'
            } 
        },
        { 
            image: 'https://media.tenor.com/sIHmKOSGxLAAAAAj/minecraft-bee.gif', 
            text: 'jolibonk',
            imgWidth: '100px',
            details: 
            { 
                name: 'jolibonk',
                Type: 'hunter',
                Abilities: 'hunt',
                SpecialAbility: 'hunting',
                PersonalityTraits: 'hunting',
                Origin: 'because of bornicles',
                Skills: 'hunting',
                Height: 'tall',
                Weight: 'big',
                Appearance: 'red white',
                Backstory: 'bornicles is born then boom. jolibonk',
                Alignment: 'hoooooooooorizontal',
                Habitat: 'near restaurant'
            } 
        },
        { 
            image: 'https://media.tenor.com/tgLqArxTRLEAAAAj/pennywise-it.gif', 
            text: 'mcdede',
            imgWidth: '100px',
            details: 
            { 
                name: 'mcdede',
                Type: 'clown',
                Abilities: 'can make your crush with you together',
                SpecialAbility: 'break ups',
                PersonalityTraits: 'clown',
                Origin: 'break ups',
                Skills: 'toxixity',
                Height: 'tall as fk',
                Weight: 'thin as fk',
                Appearance: 'clown',
                Backstory: 'hes a foreigner so tf i know',
                Alignment: 'veeeeeeeeeeertical',
                Habitat: 'near restaurant'
            } 
        },
        { 
            image: 'https://media.tenor.com/MJzTYA-O6-sAAAAM/johnny-sins-what.gif', 
            text: 'jhonny',
            imgWidth: '100px',
            details: 
            { 
                name: 'jhonny',
                Type: 'actor',
                Abilities: 'holy shit',
                SpecialAbility: 'goodness gracious',
                PersonalityTraits: 'collector',
                Origin: 'from that black orange site',
                Skills: 'oh hell no',
                Height: 'tf i know',
                Weight: 'tf i know',
                Appearance: 'bulky',
                Backstory: 'brother of bornicles',
                Alignment: 'top bottom left right; you name it',
                Habitat: 'front of camera'
            } 
        },
        // Add more items
    ],
    specials: [
        { 
            image: 'https://media.tenor.com/ncw4TwGIB-gAAAAM/patrick-star-meme-patrick.gif', 
            text: 'Pikachuchu',
            imgWidth: '100px',
            details: 
            {
                name: 'Pikachuchu',
                Type: 'Electric',
                Abilities: 'Can charge your phone.',
                SpecialAbility: 'Shing shing',
                PersonalityTraits: 'Like to explode things specially phones.',
                Origin: 'Meralco',
                Skills: 'instant outlet',
                Height: 'Helloght',
                Weight: 'okay take your time',
                Appearance: 'kinda yellowishishnessheeeesh',
                Backstory: 'i dont know. how am i suppose to know',
                Alignment: 'vertical',
                Habitat: 'in your mind'
            }              
        },
        { 
            image: 'https://media.tenor.com/A6yMWPpfp0UAAAAM/catpire.gif', 
            text: 'Bornicles',
            imgWidth: '100px',
            details: 
            {
                name: 'Bornicles',
                Type: 'horny virgin',
                Abilities: 'pdf file WAHAHAHAHAHAHAHA if you get then laugh',
                SpecialAbility: 'too r18+ to say HAHAHAHAHA',
                PersonalityTraits: 'horn horn',
                Origin: 'his mother',
                Skills: 'bruh isnt same as abilities?',
                Height: '3 inches',
                Weight: '3 inches.. hmmm remind me of something',
                Appearance: 'ugly bastard',
                Backstory: 'he got rejected so he decided to be jst horn horn',
                Alignment: 'diagonal',
                Habitat: 'below the soil'
            }
        },
        { 
            image: 'https://media.tenor.com/cZ9C1IuyzfIAAAAM/marge-marge-simpson.gif', 
            text: 'D Bruh',
            imgWidth: '100px',
            details: 
            {
                name: 'D Bruh',
                Type: 'food',
                Abilities: 'Chinese virus',
                SpecialAbility: 'PANDEMIIIC',
                PersonalityTraits: 'delicious',
                Origin: 'cave',
                Skills: 'can fly',
                Height: 'too dark to measure',
                Weight: 'it violate the gravity',
                Appearance: 'bruh its too dark to see',
                Backstory: 'people hungry then boom. bat.',
                Alignment: 'inverted horizontal',
                Habitat: 'asain stomach'
            }              
        },
        { 
            image: 'https://media.tenor.com/toq9nTtLTQkAAAAM/pixels-censored.gif', 
            text: 'Jav.ghost',
            imgWidth: '100px',
            details: 
            {
                name: 'Jav.ghost',
                Type: 'cant say',
                Abilities: 'good actor back when its alive',
                SpecialAbility: 'cant say HAHAHAH',
                PersonalityTraits: 'go tru wall',
                Origin: 'human',
                Skills: 'can scare the shit out of you',
                Height: 'i cant see it nruh its a ghost',
                Weight: '-1',
                Appearance: 'transparent',
                Backstory: 'what do you think?',
                Alignment: 'round',
                Habitat: 'crowd'
            }              
        },
        { 
            image: 'https://media.tenor.com/PeVD5gpFXxwAAAAM/pepe-dancing.gif', 
            text: 'pepe',
            imgWidth: '100px',
            details: 
            { 
                name: 'pepe',
                Type: 'pepe',
                Abilities: 'pepe',
                SpecialAbility: 'pepe',
                PersonalityTraits: 'pepe',
                Origin: 'pepe',
                Skills: 'pepe',
                Height: 'pepe',
                Weight: 'pepe',
                Appearance: 'pepe',
                Backstory: 'pepe',
                Alignment: 'pepe',
                Habitat: 'pepe'
            } 
        },
        { 
            image: 'https://media.tenor.com/BKsXw5L8HrgAAAAM/heavymetalboxmansemocollection-heavymetalboxmansgifcollection.gif', 
            text: 'burn mo?',
            imgWidth: '100px',
            details: 
            { 
                name: 'burn mo?',
                Type: 'i dont a keyboard',
                Abilities: 'cook',
                SpecialAbility: 'bake',
                PersonalityTraits: 'anger issue',
                Origin: 'cotton',
                Skills: 'can drink food',
                Height: 'too hot to measure',
                Weight: 'the tool melted',
                Appearance: 'red',
                Backstory: 'got scolded by his father then boom.',
                Alignment: 'upward',
                Habitat: 'kitchen'
            } 
        },
        { 
            image: 'https://media.tenor.com/-mML4Y_zFxUAAAAM/pink-guy-filthy-frank.gif', 
            text: 'ben?',
            imgWidth: '100px',
            details: 
            { 
                name: 'ben?',
                Type: '1',
                Abilities: 'sing',
                SpecialAbility: 'guitar',
                PersonalityTraits: 'voice',
                Origin: 'rich family',
                Skills: 'can sing',
                Height: 'tall',
                Weight: 'kinda ----',
                Appearance: 'person',
                Backstory: 'g',
                Alignment: 'music',
                Habitat: 'stage'
            } 
        },
        { 
            image: 'https://media.tenor.com/TmbNLu_okcUAAAAM/grey-matter-ben10.gif', 
            text: 'ben n ben?',
            imgWidth: '100px',
            details: 
            { 
                name: 'ben n ben?',
                Type: '2',
                Abilities: 'sing sing',
                SpecialAbility: 'guitar guitar',
                PersonalityTraits: 'voice voice',
                Origin: 'rich rich family',
                Skills: 'can sing sing',
                Height: 'tall tall',
                Weight: 'kinda ---- ----',
                Appearance: 'person person',
                Backstory: 'g g',
                Alignment: 'music music',
                Habitat: 'stage stage'
            } 
        },
        { 
            image: 'https://media.tenor.com/yEy_ZmU0UIYAAAAM/abelha.gif', 
            text: 'jolibonk',
            imgWidth: '100px',
            details: 
            { 
                name: 'jolibonk',
                Type: 'hunter',
                Abilities: 'hunt',
                SpecialAbility: 'hunting',
                PersonalityTraits: 'hunting',
                Origin: 'because of bornicles',
                Skills: 'hunting',
                Height: 'tall',
                Weight: 'big',
                Appearance: 'red white',
                Backstory: 'bornicles is born then boom. jolibonk',
                Alignment: 'hoooooooooorizontal',
                Habitat: 'near restaurant'
            } 
        },
        { 
            image: 'https://media.tenor.com/z_xjEpPyswcAAAAM/joker-pixel.gif', 
            text: 'mcdede',
            imgWidth: '100px',
            details: 
            { 
                name: 'mcdede',
                Type: 'clown',
                Abilities: 'can make your crush with you together',
                SpecialAbility: 'break ups',
                PersonalityTraits: 'clown',
                Origin: 'break ups',
                Skills: 'toxixity',
                Height: 'tall as fk',
                Weight: 'thin as fk',
                Appearance: 'clown',
                Backstory: 'hes a foreigner so tf i know',
                Alignment: 'veeeeeeeeeeertical',
                Habitat: 'near restaurant'
            } 
        },
        { 
            image: 'https://media.tenor.com/I-cTGJkdO8MAAAAM/johnnysins-johnny.gif', 
            text: 'jhonny',
            imgWidth: '100px',
            details: 
            { 
                name: 'jhonny',
                Type: 'actor',
                Abilities: 'holy shit',
                SpecialAbility: 'goodness gracious',
                PersonalityTraits: 'collector',
                Origin: 'from that black orange site',
                Skills: 'oh hell no',
                Height: 'tf i know',
                Weight: 'tf i know',
                Appearance: 'bulky',
                Backstory: 'brother of bornicles',
                Alignment: 'top bottom left right; you name it',
                Habitat: 'front of camera'
            } 
        },
        // Add more special items
    ],
};
function openShopPopup() {
    // Populate the items for the default category
    showCategory('promoSale');
    document.getElementById('shopPopup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}
function closeShopPopup() {
    document.getElementById('shopPopup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}
function showCategory(category) {
    const shopItemsContainer = document.getElementById('shopItemsContainer');
    shopItemsContainer.innerHTML = ''; // Clear previous items

    const categoryItems = shopItems[category];

    let rowCounter = 0;
    let currentRow;

    categoryItems.forEach(item => {
        if (rowCounter % 5 === 0) {
            // Create a new row every 5 items
            currentRow = document.createElement('div');
            currentRow.className = 'shop-item-row';
            shopItemsContainer.appendChild(currentRow);
        }

        const itemElement = document.createElement('div');
        itemElement.className = 'shop-item';

        itemElement.onclick = () => openItemDetailsPopup(item);

        const imageElement = document.createElement('img');
        imageElement.src = item.image;
        imageElement.alt = 'Shop Item';
        imageElement.style.width = item.imgWidth;
        imageElement.style.height = item.imgWidth;

        const textElement = document.createElement('div');
        textElement.textContent = category === 'characters' ? item.details.name : item.text;

        itemElement.appendChild(imageElement);
        itemElement.appendChild(textElement);

        shopItemsContainer.appendChild(itemElement);
        rowCounter++;
    });
}
// Function to open the item details popup
function openItemDetailsPopup(item) {
    const itemDetailsPopup = document.getElementById('itemDetailsPopup');
    const itemDetailsContent = document.getElementById('itemDetailsContent');
    
    // Clear previous content
    itemDetailsContent.innerHTML = '';

    // Create container for image and details
    const imageDDetailsContainer = document.createElement('div');
    imageDDetailsContainer.className = 'shop-item-details-container';

    // Create container for image 
    const imageContainer = document.createElement('div');
    imageContainer.className = 'shop-item-details-container';

    // Create image element
    const imageElement = document.createElement('img');
    imageElement.src = item.image;
    imageElement.alt = 'Item Details';
    imageElement.className = 'shop-item-details-img';
    imageContainer.appendChild(imageElement);

    // Create container for details
    const detailsContainer = document.createElement('div');
    detailsContainer.className = 'shop-item-details-details';

    // Create details element as a table
    const detailsElement = document.createElement('table');
    detailsElement.className = 'shop-item-details-details';

    // Populate details as rows in the table
    for (const detailKey in item.details) {
        if (item.details.hasOwnProperty(detailKey)) {
            const row = document.createElement('tr');
            const cell1 = document.createElement('td');
            const cell2 = document.createElement('td');
            cell1.textContent = detailKey;
            cell2.textContent = item.details[detailKey];
            row.appendChild(cell1);
            row.appendChild(cell2);
            detailsElement.appendChild(row);
        }
    }
    // append details to the div
    detailsContainer.appendChild(detailsElement);

    // Append image and details div to container 
    imageDDetailsContainer.appendChild(imageContainer);
    imageDDetailsContainer.appendChild(detailsContainer);
    itemDetailsContent.appendChild(imageDDetailsContainer);

    // Add a "Buy" button
    const buyButton = document.createElement('button');
    buyButton.textContent = 'Buy';
    buyButton.onclick = () => openConfirmationPopup(item);
    itemDetailsContent.appendChild(buyButton);

    // Show the popup
    itemDetailsPopup.style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}
// Function to open the confirmation popup
function openConfirmationPopup(item) {
    const confirmationPopup = document.getElementById('confirmationPopup');
    confirmationPopup.style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    
    // Store the selected item in a variable for later use
    selectedItem = item;
}
// Function to confirm the purchase
function confirmPurchase() {
    // Handle the purchase logic here using the selectedItem variable
    alert('Item purchased:', selectedItem);
    console.log('Item purchased:', selectedItem);

    // Close the confirmation popup
    closeConfirmationPopup();
}
// Function to close the confirmation popup
function closeConfirmationPopup() {
    document.getElementById('confirmationPopup').style.display = 'none';
}
// Function to close the item details popup
function closeItemDetailsPopup() {
    document.getElementById('itemDetailsPopup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}



// inventory functions
function openInventoryPopup() {
    // Populate the items for the default category
    showInventoryCategory('characters');
    document.getElementById('inventoryPopup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}
function closeInventoryPopup() {
    document.getElementById('inventoryPopup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}
function showInventoryCategory(category) {
    const inventoryItemsContainer = document.getElementById('inventoryItemsContainer');
    inventoryItemsContainer.innerHTML = ''; // Clear previous items

    const categoryItems = shopItems[category];

    let rowCounter = 0;
    let currentRow;

    categoryItems.forEach(item => {
        if (rowCounter % 5 === 0) {
            // Create a new row every 5 items
            currentRow = document.createElement('div');
            currentRow.className = 'inventory-item-row';
            inventoryItemsContainer.appendChild(currentRow);
        }

        const itemElement = document.createElement('div');
        itemElement.className = 'inventory-item';

        itemElement.onclick = () => openInventoryItemDetailsPopup(item);

        const imageElement = document.createElement('img');
        imageElement.src = item.image;
        imageElement.alt = 'Inventory Item';
        imageElement.style.width = item.imgWidth;
        imageElement.style.height = item.imgWidth;

        const textElement = document.createElement('div');
        textElement.textContent = category === 'characters' ? item.details.name : item.text;

        itemElement.appendChild(imageElement);
        itemElement.appendChild(textElement);

        inventoryItemsContainer.appendChild(itemElement);
        rowCounter++;
    });
}
// Function to open the item details popup
function openInventoryItemDetailsPopup(item) {
    const itemInventoryDetailsPopup = document.getElementById('itemInventoryDetailsPopup');
    const itemInventoryDetailsContent = document.getElementById('itemInventoryDetailsContent');
    
    // Clear previous content
    itemInventoryDetailsContent.innerHTML = '';

    // Create container for image and details
    const imageDDetailsContainer = document.createElement('div');
    imageDDetailsContainer.className = 'inventory-item-details-container';

    // Create container for image 
    const imageContainer = document.createElement('div');
    imageContainer.className = 'inventory-item-details-container';

    // Create image element
    const imageElement = document.createElement('img');
    imageElement.src = item.image;
    imageElement.alt = 'Item Details';
    imageElement.className = 'inventory-item-details-img';
    imageContainer.appendChild(imageElement);

    // Create container for details
    const detailsContainer = document.createElement('div');
    detailsContainer.className = 'inventory-item-details-details';

    // Create details element as a table
    const detailsElement = document.createElement('table');
    detailsElement.className = 'inventory-item-details-details';

    // Populate details as rows in the table
    for (const detailKey in item.details) {
        if (item.details.hasOwnProperty(detailKey)) {
            const row = document.createElement('tr');
            const cell1 = document.createElement('td');
            const cell2 = document.createElement('td');
            cell1.textContent = detailKey;
            cell2.textContent = item.details[detailKey];
            row.appendChild(cell1);
            row.appendChild(cell2);
            detailsElement.appendChild(row);
        }
    }
    // append details to the div
    detailsContainer.appendChild(detailsElement);

    // Append image and details div to container 
    imageDDetailsContainer.appendChild(imageContainer);
    imageDDetailsContainer.appendChild(detailsContainer);
    itemInventoryDetailsContent.appendChild(imageDDetailsContainer);

    // Show the popup
    itemInventoryDetailsPopup.style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}
// Function to close the item details popup
function closeItemInventoryDetailsPopup() {
    document.getElementById('itemInventoryDetailsPopup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}