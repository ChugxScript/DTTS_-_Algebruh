// Initialize Firebase with your configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getFirestore, collection, orderBy, onSnapshot, query, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Get a Firestore instance
const db = getFirestore(firebaseApp);

// Reference to the messages collection
const messagesCollection = collection(db, 'messages');

// Form submission for writing data
const writeForm = document.getElementById('writeForm');
writeForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const messageInput = document.getElementById('message');
    const message = messageInput.value;

    try {
        // Add a new document with a generated id.
        await addDoc(messagesCollection, {
            message: message,
            timestamp: serverTimestamp()
        });

        console.log('Message written to Firestore');
        messageInput.value = ''; // Clear the input field
    } catch (error) {
        console.error('Error writing document: ', error);
    }
});

// Real-time listener for reading data
const messageList = document.getElementById('messageList');

// Use the query function to specify the ordering
const q = query(messagesCollection, orderBy('timestamp', 'desc'));

onSnapshot(q, (snapshot) => {
    messageList.innerHTML = ''; // Clear the list

    snapshot.forEach((doc) => {
        const data = doc.data();
        const li = document.createElement('li');
        li.textContent = data.message;
        messageList.appendChild(li);
    });
});
