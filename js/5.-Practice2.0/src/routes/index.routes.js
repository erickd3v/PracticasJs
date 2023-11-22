import { Router, text } from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

router.get('/', (req, res) => {
});

router.post('/enviar-formulario', (req, res) => {
    res.sendFile(join(__dirname, 'views', 'index.html'))
    const { title, text, texto2 } = req.body;

    const filePath = join(__dirname,'..', 'api/data.json');

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
        texto2,
    }
    books.push(newBook)

    const jsonData = JSON.stringify(books, null, 2);

    try {
        fs.writeFileSync(filePath, jsonData, 'utf-8');
        res.redirect(`/recuperar-Json`);
        res.json({ message: `Datos guardados con éxito` });
    } catch (err) {
        console.error('Error al guardar los datos en el archivo JSON:', err);
        res.status(500).json({ message: 'Error al guardar los datos' });
    }
});

router.get('/recuperar-Json', (req, res) => {
    const filePath = join(__dirname, '..', 'api/data.json');

    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        
        const books = JSON.parse(fileContent);

        let responseString = '';
        books.forEach((blog) => {
            responseString += `
                <div>
                    <h1>${blog.title}</h1>
                    <p>${blog.text[0]}</p>
                    <img src="/upload/${blog.text[1]}" alt="${blog.text[1]}">
                </div>
            `;
            // console.log(books)
        });

        res.send(responseString);
        // res.json(books)
    } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
        res.status(500).json({ message: 'Error al recuperar los datos JSON' });
    }
});

export default router