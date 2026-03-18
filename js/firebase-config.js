// Importando as funções necessárias do Firebase via CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Suas chaves de configuração (substitua pelos seus dados reais)
const firebaseConfig = {
  apiKey: "AIzaSyACtOrLD88DY7jg9YwqBpDnFHJIZDJx3LA",
  authDomain: "crofrinho-fb56b.firebaseapp.com",
  projectId: "crofrinho-fb56b",
  storageBucket: "crofrinho-fb56b.firebasestorage.app",
  messagingSenderId: "479202210403",
  appId: "1:479202210403:web:52b189c321742816a0fe56"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);

// Exportando os serviços que vamos usar nos outros arquivos
export const auth = getAuth(app);
export const db = getFirestore(app);