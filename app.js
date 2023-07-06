setInterval(() => {
    const currentDate = new Date();
    const clockText = currentDate.toLocaleString();
    document.getElementById("dateTime").textContent = clockText;
}, 1000);

const btnHelp = document.querySelector("#btnHelp");
const btnClose = document.getElementById("btnClose");
const historyLogin = [];

const accounts = [
    { name: "", password: "3698", balance: 500 },
    { name: "Oscar", password: "1234", balance: 1000 },
    { name: "Lorena", password: "5678", balance: 1000 },
    { name: "Miguel", password: "abcd", balance: 800 }
];

let currentAccount = null;

function login() {
    let accountSelect = document.getElementById("account-select");
    let selectedAccountIndex = accountSelect.value;
    let passwordInput = document.getElementById("password");
    let errorMsg = document.getElementById("error-msg");
    // Esto es para que lo agregue al array del historial
    let selectedOption = accountSelect.options[accountSelect.selectedIndex];
    let selecUser = selectedOption.text;
    let currentDate = new Date();
    let clockText = currentDate.toLocaleString();
    let history = "Ingreso " + selecUser + " en " + clockText;
    
    if (passwordInput.value === accounts[selectedAccountIndex].password) {
        currentAccount = accounts[selectedAccountIndex];
        accountSelect.disabled = true;
        passwordInput.disabled = true;
        errorMsg.textContent = "";
        showActions();
        // Aqui agrega al array
        historyLogin.push(history);
    } else {
        errorMsg.textContent = "Contraseña incorrecta. Intenta nuevamente.";
    }
    passwordInput.value = "";
}

function showActions() {
    document.getElementById("login").style.display = "none";
    document.getElementById("actions").style.display = "flex";
    document.getElementById("actions").style.flexDirection = "column";
    document.getElementById("btnShow").style.margin = "0 0 5px 0";
    document.getElementById("btnDeposit").style.margin = "0 0 5px 0";
    document.getElementById("btnWithdraw").style.margin = "0 0 5px 0";

}

function showBalance() {
    let result = document.getElementById("result");
    document.getElementById("result").style.fontSize = "var(--sm)";
    result.textContent = "Saldo actual: $" + currentAccount.balance;
}

function deposit() {
    let amount = prompt("Ingresa el monto a depositar:");
    amount = parseInt(amount);
    let balance = currentAccount.balance;
    let amountEnter = currentAccount.balance + amount;

    if (isNaN(amount) || amount <= 0) {
        alert("Ingresa un monto válido.");
        return;
    }

    if (amountEnter > 10000) {
        alert("No puedes incluir esta cantidad, excede tu monto");
        return;
    }

    currentAccount.balance += amount;
    let result = document.getElementById("result");
    result.textContent = "Monto ingresado: $" + amount + "\nNuevo saldo total: $" + currentAccount.balance.toFixed(2);
}

function withdraw() {
    var amount = prompt("Ingresa el monto a retirar:");
    amount = parseInt(amount);
    let balance = currentAccount.balance;
    let amountOut = currentAccount.balance - amount;

    if (isNaN(amount) || amount <= 0) {
        alert("Ingresa un monto válido.");
        return;
    }

    if (amountOut < 10) {
        alert("No puedes sacar esta cantidad, debes dejar minimo 10");
        return;
    }

    currentAccount.balance -= amount;
    var result = document.getElementById("result");
    result.textContent = "Monto retirado: $" + amount + "\nNuevo saldo total: $" + currentAccount.balance.toFixed(2);
}

function logout() {
    var accountSelect = document.getElementById("account-select");
    var passwordInput = document.getElementById("password");

    currentAccount = null;
    accountSelect.disabled = false;
    passwordInput.disabled = false;
    passwordInput.value = "";
    document.getElementById("actions").style.display = "none";
    document.getElementById("login").style.display = "block";
    document.getElementById("result").textContent = "";
}

// Funciones del nav

btnHelp.addEventListener("click", function () {
    document.getElementById("login").style.display = "none";
    document.getElementById("help").style.display = "flex";
    document.getElementById("help").style.flexDirection = "column";
    document.getElementById("help").style.fontSize = "var(--sm)";
})
    
btnClose.addEventListener("click", function(){
    var accountSelect = document.getElementById("account-select");
    var passwordInput = document.getElementById("password");
    
    currentAccount = null;
    accountSelect.disabled = false;
    passwordInput.disabled = false;
    passwordInput.value = "";
    document.getElementById("help").style.display = "none";
    document.getElementById("login").style.display = "block";
    document.getElementById("result").textContent = "";
    
})

