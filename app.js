const accounts = [
    { name: "Persona 1", password: "1234", balance: 500 },
    { name: "Persona 2", password: "5678", balance: 1000 },
    { name: "Persona 3", password: "abcd", balance: 800 }
];

let currentAccount = null;

function login() {
    let accountSelect = document.getElementById("account-select");
    let selectedAccountIndex = accountSelect.value;
    let passwordInput = document.getElementById("password");
    let errorMsg = document.getElementById("error-msg");

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
    document.getElementById("login").style.display = "none";;
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

// Vamos aqui para validar las condiones de tope saldo y unidad de ingreso

function deposit() {
    let amount = prompt("Ingresa el monto a depositar:");
    amount = parseInt(amount);

    if (isNaN(amount) || amount <= 0) {
        alert("Ingresa un monto válido.");
        return;
    }

    currentAccount.balance += amount;
    var result = document.getElementById("result");
    result.textContent = "Monto ingresado: $" + amount + "\nNuevo saldo total: $" + currentAccount.balance.toFixed(2);
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
