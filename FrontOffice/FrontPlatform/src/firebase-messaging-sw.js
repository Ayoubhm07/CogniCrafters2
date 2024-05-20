importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyBoTg2HfC987ifBjJEckvrfJyYMaTQRu2U",
    authDomain: "angular-eb4ef.firebaseapp.com",
    projectId: "angular-eb4ef",
    storageBucket: "angular-eb4ef.appspot.com",
    messagingSenderId: "435331239834",
    appId: "1:435331239834:web:b04db1c4fa7a38a8c8f423",
    measurementId: "G-6Q4EMW7R7X"
  };
firebase.initializeApp(firebaseConfig);
const messaging= firebase.messaging()
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
      .then(function(registration) {
        console.log('Registration successful, scope is:', registration.scope);
      }).catch(function(err) {
        console.log('Service worker registration failed, error:', err);
      });
    }