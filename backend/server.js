const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors()); // Frontend connection permission
app.use(express.json()); // JSON data handle panna

// 1. MongoDB Atlas Connection
const dbURI = 'mongodb+srv://admin:cafe123@cluster0.nfyxkt9.mongodb.net/cafe_db?retryWrites=true&w=majority';

mongoose.connect(dbURI)
    .then(() => console.log("MongoDB Atlas Connected Successfully! ✅"))
    .catch(err => console.log("Connection Error: ❌", err));

// 2. Data Structures (Schemas & Models)

// Menu Schema
const MenuSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number
});
const Menu = mongoose.model('Menu', MenuSchema);

// Order Schema
const OrderSchema = new mongoose.Schema({
    items: Array,
    totalPrice: Number,
    orderDate: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', OrderSchema);

// Cart Schema (Oru thadava mattum thaan irukanum)
const CartSchema = new mongoose.Schema({
    userId: { type: String, default: "admin" }, 
    items: Array
});
const Cart = mongoose.model('Cart', CartSchema);

// User Schema
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

// 3. API Routes

// Login API
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (user) {
            res.json({ success: true, message: "Login Successful! ✅" });
        } else {
            res.status(401).json({ success: false, message: "Invalid Email or Password! ❌" });
        }
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

// Menu Fetch API
app.get('/api/menu', async (req, res) => {
    try {
        const items = await Menu.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Cart APIs (Sync & Persistence)
app.get('/api/cart', async (req, res) => {
    try {
        const userCart = await Cart.findOne({ userId: "admin" });
        res.json(userCart ? userCart.items : []);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/api/cart/add', async (req, res) => {
    const { item } = req.body;
    try {
        let userCart = await Cart.findOne({ userId: "admin" });
        if (!userCart) {
            userCart = new Cart({ userId: "admin", items: [item] });
        } else {
            userCart.items.push(item);
        }
        await userCart.save();
        res.json(userCart.items);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Place Order API
app.post('/api/place-order', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        
        // Order potta apram cart-ah empty panna (Optional)
        await Cart.findOneAndUpdate({ userId: "admin" }, { items: [] });
        
        res.json({ message: "Order placed successfully! 🎉" });
    } catch (err) {
        res.status(500).json({ message: "Order failed!" });
    }
});

// 4. Server Start
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));