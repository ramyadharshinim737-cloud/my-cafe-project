// Login Function - Backend kooda connect panna
async function handleLogin() {
    // Inga 'username' nu irukkuradha 'email' nu maathunga (HTML-la 'email' id irundha)
    const email = document.getElementById('email').value; 
    const password = document.getElementById('password').value;

    console.log("Attempting login for:", email);

    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (response.ok) {
            alert("Login Successful! Welcome to Aroma Cafe.");
            window.location.href = "dashboard.html";
        } else {
            alert(result.message || "Invalid Email or Password!");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Backend server connection error! Docker check pannunga.");
    }
}

// Cart and Checkout logic (idhai appadiye maintain pannunga)
let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    total += parseFloat(price);
    document.getElementById('cart-items').innerText = `Items: ${cart.length}`;
    document.getElementById('total-price').innerText = total;
    alert(`${name} added to cart!`);
}