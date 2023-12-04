import express from 'express';
import multer, { diskStorage } from 'multer';
import indexRoutes from './routes/index.routes.js'
import{ dirname, join } from 'path';

const __filename = new URL(import.meta.url).pathname;
const __dirname = dirname(__filename);

const storages = diskStorage({
    destination: join(__dirname, 'public', 'upload'),
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
});

// Initializations
const app = express();

// Setting
const PORT = process.env.PORT ?? 1224;

// middlewares
app.use(multer({
    storage: storages,
    dest:join(__dirname, 'public', 'upload'),
}).single('image'));

// Servir archivos estáticos
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static(join(__dirname, 'views')));
app.use(express.static(join(__dirname, 'public')));


// Routes

app.use(indexRoutes);

// Start the server

app.listen(PORT, () => {
    console.log(`Server on port http://localhost:${PORT}`)
});