const express = require('express');
const cors = require('cors'); // Importar cors
const crypto = require('node:crypto');
const z = require('zod'); // Importar Zod

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

// Esquema de validación para cliente
const clienteSchema = z.object({
    usuario: z.string().min(1, "El campo 'usuario' es obligatorio."),
    nombre: z.string().min(1, "El campo 'nombre' es obligatorio."),
    contraseña: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
    imagen: z.string().url("El campo 'imagen' debe ser una URL válida."),
    tipo: z.literal(1, "El tipo del cliente debe ser 1."),
    nivel: z.number().nonnegative("El nivel debe ser un número no negativo."),
    meta: z.string().optional(),
    historial: z.array(z.any()).optional(), // Permitir un array vacío o con datos
    reservas: z.array(z.any()).optional(),  // Permitir un array vacío o con datos
});

// Esquema de validación para historial
const historialSchema = z.object({
    usuario: z.string().min(1, "El campo 'usuario' es obligatorio."),
    musculo: z.string().min(1, "El campo 'musculo' es obligatorio."),
    tiempo: z.number().min(1, "El campo 'tiempo' debe ser mayor a 0."),
    fecha: z.string().min(1, "El campo 'fecha' es obligatorio."),
});

// Recuperar usuarios
app.get('/datos', (req, res) => {
    res.json(dts);
});

// Recuperar clientes
app.get('/datos/clientes', (req, res) => {
    const clientes = dts.filter(c => c.tipo === 1);
    res.json(clientes);
});

// Recuperar profesores
app.get('/datos/profesores', (req, res) => {
    const profesores = dts.filter(c => c.tipo === 2);
    res.json(profesores);
});

// Agregar cliente
app.post('/cliente', (req, res) => {
    const validation = clienteSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({ error: validation.error.errors });
    }

    const newCliente = {
        id: crypto.randomUUID(),
        ...validation.data,
        historial: [], // Asegúrate de inicializar el array
        reservas: [],  // Asegúrate de inicializar el array
    };

    dts.push(newCliente);
    res.status(201).json(newCliente);
});

// Agregar historial a un cliente por usuario
app.post('/cliente/historial', (req, res) => {
    const validation = historialSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({ error: validation.error.errors });
    }

    const { usuario, musculo, tiempo, fecha } = validation.data;

    
    const cliente = dts.find(c => c.usuario === usuario);

    if (!cliente || cliente.tipo !== 1) {
        return res.status(404).json({ error: "Cliente no encontrado o no es de tipo 1." });
    }

    if (!cliente.historial) {
        cliente.historial = [];
    }

    const newHistorial = { musculo, tiempo, fecha };
    cliente.historial.push(newHistorial);

    res.status(201).json({ message: "Historial agregado correctamente.", historial: newHistorial });
});


//eleminar evento

app.delete('/cliente/evento', (req, res) => {
    const { usuario, evento } = req.body;

    if (!usuario || !evento) {
        return res.status(400).json({ error: "Usuario y evento son obligatorios." });
    }

    
    const cliente = dts.find(c => c.usuario === usuario && c.tipo === 1);

    if (!cliente) {
        return res.status(404).json({ error: "Cliente no encontrado." });
    }

    if (!cliente.reservas || !Array.isArray(cliente.reservas)) {
        return res.status(404).json({ error: "El cliente no tiene reservas." });
    }

   
    const reservasIniciales = cliente.reservas.length;
    cliente.reservas = cliente.reservas.filter(reserva => reserva.evento !== evento);

    if (cliente.reservas.length === reservasIniciales) {
        return res.status(404).json({ error: "Reserva no encontrada para el evento especificado." });
    }

    res.status(200).json({ message: "Reserva eliminada correctamente.", reservas: cliente.reservas });
});

// Actualizar dieta de un cliente
app.patch('/cliente/dieta', (req, res) => {
    const { usuario, dieta } = req.body;

    // Validación de datos
    if (!usuario || !dieta) {
        return res.status(400).json({ error: "Usuario y dieta son obligatorios." });
    }

    // Buscar cliente
    const cliente = dts.find(c => c.usuario === usuario && c.tipo === 1);

    if (!cliente) {
        return res.status(404).json({ error: "Cliente no encontrado o no es de tipo 1." });
    }

    // Actualizar la dieta
    cliente.dieta = dieta;

    res.status(200).json({ message: "Dieta actualizada correctamente.", cliente });
});


const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
});
