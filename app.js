//node --watch ./app.js                 para ejecutar
const express = require('express');
const cors = require('cors'); // Importar cors
const crypto = require('node:crypto');

const datos = require('./datos.json');

const app = express();

// Configurar CORS para permitir cualquier origen
app.use(cors());
app.use(express.json());

app.disable('x-powered-by');

const dts = [];
for (let i = 0; i < 3; i++) {
    const data = datos[i]; // data es un arreglo
    data.forEach(element => {
        dts.push(element);
    });
}

// Recuperar usuarios
app.get('/datos', (req, res) => {
    res.json(dts);
});

// Recuperar clientes
app.get('/datos/clientes', (req, res) => {
    const clint = dts.filter(c => c.tipo == 1);
    return res.json(clint);
});

// Recuperar profesores
app.get('/datos/profesores', (req, res) => {
    const clint = dts.filter(c => c.tipo == 2);
    return res.json(clint);
});

// Validar cliente (puedes ajustar las reglas de validación según lo necesario)
function validateCliente(cliente) {
    const requiredFields = ['usuario', 'nombre', 'contraseña', 'imagen', 'tipo'];
    const errors = [];

    for (const field of requiredFields) {
        if (!cliente[field]) {
            errors.push(`El campo ${field} es obligatorio.`);
        }
    }

    if (cliente.tipo !== 1) {
        errors.push('El tipo del cliente debe ser 1.');
    }

    return errors.length === 0
        ? { success: true, data: cliente }
        : { success: false, error: { message: JSON.stringify(errors) } };
}

// Agregar cliente
app.post('/cliente', (req, res) => {
    const result = validateCliente(req.body);

    if (!result.success) {
        // 422 Unprocessable Entity
        return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    // Crear nuevo cliente
    const newCliente = {
        id: crypto.randomUUID(), // Generar un UUID único
        ...result.data
    };

    // Agregar cliente al arreglo en memoria
    dts.push(newCliente);

    // Responder con el cliente creado
    res.status(201).json(newCliente);
});

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
});
