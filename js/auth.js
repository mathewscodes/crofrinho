import { auth } from "./firebase-config.js";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const authForm = document.getElementById("auth-form");
const authTitle = document.getElementById("auth-title");
const btnAction = document.getElementById("btn-action");
const toggleAuth = document.getElementById("toggle-auth");
const btnGoogle = document.getElementById("btn-google");

let isLogin = true;

// 1. Alternar entre Login e Cadastro
toggleAuth.addEventListener("click", () => {
    isLogin = !isLogin;
    authTitle.innerText = isLogin ? "Login" : "Cadastro";
    btnAction.innerText = isLogin ? "Entrar" : "Criar Conta";
    toggleAuth.innerHTML = isLogin 
        ? "Não tem conta? <span>Cadastre-se aqui</span>" 
        : "Já tem conta? <span>Faça login</span>";
});

// 2. Login com E-mail e Senha
authForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        if (isLogin) {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = "dashboard.html";
        } else {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Conta criada com sucesso!");
            location.reload();
        }
    } catch (error) {
        alert("Erro: " + error.message);
    }
});

// 3. Login com Google
btnGoogle.addEventListener("click", async () => {
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
        window.location.href = "dashboard.html";
    } catch (error) {
        console.error("Erro no login Google:", error);
        alert("Erro ao entrar com Google.");
    }
});

// 4. Observador de estado
onAuthStateChanged(auth, (user) => {
    if (user && window.location.pathname.includes("index.html")) {
        window.location.href = "dashboard.html";
    }
});