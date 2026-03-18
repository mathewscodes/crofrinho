import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
    collection, 
    addDoc, 
    query, 
    where, 
    onSnapshot, 
    orderBy 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// --- 1. SELEÇÃO DE ELEMENTOS COM VERIFICAÇÃO ---
const btnLogout = document.getElementById("btn-logout");
const userGreeting = document.getElementById("user-greeting");
const transactionForm = document.getElementById("transaction-form");
const transactionList = document.getElementById("transaction-list");
const totalBalanceEl = document.getElementById("total-balance");
const totalIncomeEl = document.getElementById("total-income");
const totalExpenseEl = document.getElementById("total-expense");

// Elementos de Contas
const accountForm = document.getElementById("account-form");
const accBankSelect = document.getElementById("acc-bank-select");
const accCustomName = document.getElementById("acc-custom-name");
const accSelectTransaction = document.getElementById("acc-select"); 
const accountsListDisplay = document.getElementById("accounts-list");

let currentUser = null;

// --- 2. VERIFICAÇÃO DE AUTENTICAÇÃO ---
onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        if (userGreeting) userGreeting.innerText = `Olá, ${user.email.split('@')[0]}!`;
        carregarLancamentos(); 
        carregarContas();
    } else {
        window.location.href = "index.html";
    }
});

// --- 3. LÓGICA DE CONTAS ---

// Mostrar/Esconder campo "Outro"
if (accBankSelect && accCustomName) {
    accBankSelect.addEventListener("change", (e) => {
        accCustomName.style.display = (e.target.value === "Outro") ? "block" : "none";
        accCustomName.required = (e.target.value === "Outro");
    });
}

// Salvar Nova Conta
if (accountForm) {
    accountForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        let nomeFinal = accBankSelect.value;
        if (nomeFinal === "Outro") nomeFinal = accCustomName.value;

        try {
            await addDoc(collection(db, "contas"), {
                userId: currentUser.uid,
                nome: nomeFinal,
                dataCriacao: new Date()
            });
            accountForm.reset();
            accCustomName.style.display = "none";
        } catch (error) {
            console.error("Erro ao salvar conta:", error);
        }
    });
}

function carregarContas() {
    const q = query(collection(db, "contas"), where("userId", "==", currentUser.uid));
    onSnapshot(q, (snapshot) => {
        let selectHtml = '<option value="" disabled selected>Selecionar Conta...</option>';
        let chipsHtml = "";

        snapshot.forEach((doc) => {
            const conta = doc.data();
            selectHtml += `<option value="${doc.id}">${conta.nome}</option>`;
            chipsHtml += `<div class="account-chip"><small>Banco</small><p>${conta.nome}</p></div>`;
        });

        if (accSelectTransaction) accSelectTransaction.innerHTML = selectHtml;
        if (accountsListDisplay) accountsListDisplay.innerHTML = chipsHtml;
    });
}

// --- 4. LÓGICA DE LANÇAMENTOS ---

if (transactionForm) {
    transactionForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const desc = document.getElementById("desc").value;
        const amount = parseFloat(document.getElementById("amount").value);
        const type = document.getElementById("type").value;
        const contaId = accSelectTransaction.value;

        if (!contaId) return alert("Selecione uma conta primeiro!");

        try {
            await addDoc(collection(db, "transacoes"), {
                userId: currentUser.uid,
                contaId: contaId,
                descricao: desc,
                valor: amount,
                tipo: type,
                data: new Date()
            });
            transactionForm.reset();
        } catch (error) {
            console.error("Erro ao lançar:", error);
        }
    });
}

function carregarLancamentos() {
    const q = query(
        collection(db, "transacoes"),
        where("userId", "==", currentUser.uid),
        orderBy("data", "desc")
    );

    onSnapshot(q, (snapshot) => {
        let html = "";
        let incomes = 0, expenses = 0;

        snapshot.forEach((doc) => {
            const data = doc.data();
            if (data.tipo === "income") incomes += data.valor;
            else expenses += data.valor;

            html += `
                <li class="transaction-item">
                    <span>${data.descricao}</span>
                    <strong class="${data.tipo === 'income' ? 'val-income' : 'val-expense'}">
                        ${data.tipo === 'income' ? '+' : '-'} R$ ${data.valor.toLocaleString('pt-br', {minimumFractionDigits: 2})}
                    </strong>
                </li>`;
        });

        if (transactionList) transactionList.innerHTML = html;
        atualizarPlacar(incomes, expenses);
    });
}

function atualizarPlacar(inc, exp) {
    if (totalIncomeEl) totalIncomeEl.innerText = `R$ ${inc.toFixed(2)}`;
    if (totalExpenseEl) totalExpenseEl.innerText = `R$ ${exp.toFixed(2)}`;
    if (totalBalanceEl) totalBalanceEl.innerText = `R$ ${(inc - exp).toFixed(2)}`;
}

if (btnLogout) {
    btnLogout.addEventListener("click", () => signOut(auth));
}