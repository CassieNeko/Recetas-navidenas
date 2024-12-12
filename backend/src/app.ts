import express from 'express';
import cors from 'cors';
import recipesRoutes from './routes/recipeRoutes';
import userRoutes from './routes/userRoutes';

const app=express();

app.use(cors());
app.use(express.json());

app.use('/api/recipes', recipesRoutes);
app.use('/api/users', userRoutes);

export default app;