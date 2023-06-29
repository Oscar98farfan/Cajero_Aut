// Cuentas de ejemplo
var accounts = [
    { name: "Persona 1", password: "1234", balance: 500 },
    { name: "Persona 2", password: "5678", balance: 1000 },
    { name: "Persona 3", password: "abcd", balance: 800 }
];

var currentAccount = null;

function login() {
    var accountSelect = document.getElementById("account-select");
    var selectedAccountIndex = accountSelect.value;
    var passwordInput = document.getElementById("password");
    var errorMsg = document.getElementById("error-msg");

    if (passwordInput.value === accounts[selectedAccountIndex].password) {
        currentAccount = accounts[selectedAccountIndex];
        accountSelect.disabled = true;
        passwordInput.disabled = true;
        errorMsg.textContent = "";
        showActions();
    } else {
        errorMsg.textContent = "Contraseña incorrecta. Intenta nuevamente.";
    }

    passwordInput.value = "";
}

function showActions() {
    document.getElementById("login").style.display = "none";
    document.getElementById("actions").style.display = "block";
}

function showBalance() {
    var resultDiv = document.getElementById("result");
    resultDiv.textContent = "Saldo actual: $" + currentAccount.balance;
}

function deposit() {
    var amount = prompt("Ingresa el monto a ingresar:");
    amount = parseFloat(amount);

    if (isNaN(amount) || amount <= 0) {
        alert("Ingresa un monto válido.");
        return;
    }

    currentAccount.balance += amount;
    var resultDiv = document.getElementById("result");
    resultDiv.textContent = "Monto ingresado: $" + amount + "\nNuevo saldo total: $" + currentAccount.balance.toFixed(2);
}

function withdraw() {
    var amount = prompt("Ingresa el monto a retirar:");
    amount = parseFloat(amount);

    if (isNaN(amount) || amount <= 0) {
        alert("Ingresa un monto válido.");
        return;
    }

    if (currentAccount.balance - amount < 10 || currentAccount.balance - amount > 990) {
        alert("La operación excede los límites permitidos.");
        return;
    }

    currentAccount.balance -= amount;
    var resultDiv = document.getElementById("result");
    resultDiv.textContent = "Monto retirado: $" + amount + "\nNuevo saldo total: $" + currentAccount.balance.toFixed(2);
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
