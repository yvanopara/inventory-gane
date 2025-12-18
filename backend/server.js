// server.js
import dotenv from 'dotenv';
import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import productRouter from './routes/productRoute.js';
import salesRouter from './routes/salesRoute.js';
import StockMovement from './models/stockMovementModel.js';
import stockMovementRoutes from './routes/stockMovementRoutes.js';
import userRouter from './routes/userRoute.js';
import telegramRoute from './routes/telegramRoute.js';
import './controllers/stateMessages.js';

const port = 5000;
const app = express();
dotenv.config();

// ✅ CORS DOIT ÊTRE ICI (AVANT TOUTES LES ROUTES)
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://admin-lgl7.onrender.com",
    "https://inventory2-uexd.onrender.com",
    "https://user-0qe3.onrender.com",
  ],
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: ["Content-Type", "Authorization", "token"],
  credentials: true
}));


// Middleware JSON
app.use(express.json());

// Connexion DB
connectDB();

// Routes
app.use("/api/products", productRouter);
app.use("/api/sales", salesRouter);
app.use("/api/stockMovementRoutes", stockMovementRoutes);
app.use('/api/user', userRouter);
app.use("/telegram", telegramRoute);

// Test
app.get("/", (req, res) => {
  res.json({ message: "Backend en ligne avec CORS OK 🚀" });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${port}`);
});
