document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Page refresh aaguratha thadukkum

    // User enter panna details-ah edukkurom
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log("Logging in with:", username);

    // Ippo oru dummy check (Pinadi backend kooda connect pannuvom)
    if (username === "admin" && password === "cafe123") {
        alert("Login Successful! Welcome to Aroma Cafe.");
        
        // Success aanathum dashboard-ku kooptu povom
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Username or Password. Try again!");
    }let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    total += parseFloat(price);
    
    // UI-ah update panrom
    document.getElementById('cart-items').innerText = `Items: ${cart.length}`;
    document.getElementById('total-price').innerText = total;
    
    alert(`${name} added to cart!`);
}

function checkout() {
    if(cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert(`Order Placed Successfully! Total: ₹${total}`);
        cart = [];
        total = 0;
        document.getElementById('cart-items').innerText = `Items: 0`;
        document.getElementById('total-price').innerText = "0";
    }
}
});