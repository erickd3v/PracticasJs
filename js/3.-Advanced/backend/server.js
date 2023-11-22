import express from 'express';
import fs from 'fs';
import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const app = express();
const PORT = process.env.PORT ?? 4500;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'img/');
    },
    filename:(req, file, cb) => {
        const uniqueSuffix =  Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileName = file.fieldname + '-' + uniqueSuffix + file.originalname.toLowerCase
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static(join(__dirname, '../frontend')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.post('/enviar-formulario', upload.single('image'), (req, res) => {
    const { title, text } = req.body;
    const imagePath = req.file ? req.file.filename: null;

    const filePath = join(__dirname + 'api/data.json');

    let books = [];

    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        books = JSON.parse(fileContent);
    } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
    }

    const newBook = {
        title,
        text,
        url: slug,
        image: imagePath,
    }
    books.push(newBook)

    const jsonData = JSON.stringify(books, null, 2);

    try {
        fs.writeFileSync(filePath, jsonData, 'utf-8');
        res.redirect(`/blog/${slug}`); // Redirigir a la página del blog después de enviar el formulario
        res.json({ message: `Datos guardados con exito` })
    } catch (err) {
        console.error('Error al guardar los datos en el archivo JSON:', err);
        res.status(500).json({ message: 'Error al guardar los datos' });
    }
});

app.get('/recuperar-Json', (req, res) => {
    const filePath = join(__dirname, 'api/data.json');

    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const jsonData = JSON.parse(fileContent);

        let responseString = '';
        jsonData.forEach((blog) => {
            responseString += `
                <div>
                    <h1>${blog.title}</h1>
                    <p>${blog.text}</p>
                </div>
            `;
        });

        res.send(responseString);
    } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
        res.status(500).json({ message: 'Error al recuperar los datos JSON' });
    }
});

app.get('/blog/:slug', (req, res) => {
    const { slug } = req.params;

    const filePath = join(__dirname, 'api/data.json');

    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const jsonData = JSON.parse(fileContent);

        const blog = jsonData.find(blog => blog.url === slug);

        if(!blog) {
            return res.status(404).send(`Blog no encontrado`);
        }

        res.send(`
            <div>
                <h1>${blog.title}</h1>
                <p>${blog.text}</p>
                <img src="/${blog.image} " atl="Blog image">
            </div>
        `);
    } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
        res.status(500).json({ message: 'Error al recuperar los datos JSON' });
    }
});

app.listen(PORT, () => {
    console.log(`server at http://localhost:${PORT}`);
});