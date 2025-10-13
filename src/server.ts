import express from 'express';
import cors from 'cors';
import loginRoute from './backend/routes/loginRoute';

const app = express()
const PORT = 3000

app.use(cors())

app.use(express.json())

app.use('/api/login', loginRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);       
})
