datos=[[
    {
        "usuario":"juank",
        "id":"241bf55d-b649-4109-af7c-0e6890ded3fc",
        "contraseña":"juank12345",
        "tipo":1,
        "nivel":0,
        "meta":"bajar peso",
        "dieta":"para el desalluno guevos y pan almuerzo agua y pa la comido chuñpe ambre",
        "historial":[{
            "musculo":"pecho",
            "tiempo":60,
            "feha":"12/09/2024"
        },
        {
            "musculo":"pierna",
            "tiempo":70,
            "feha":"13/09/2024"
        }],
        "reservas":[{
            "evento":"baile salsa",
            "imagen":"https://s2.ppllstatics.com/canarias7/www/multimedia/202208/13/media/cortadas/Bailarines%20durante%20la%20pasada%20edicion%20del%20Canarias%20Open%20Salsa%20(2)-kdL-U170972954962pKB-1248x770@Canarias7.jpg",
            "fecha":"06/12/2024"
            }]
    }
    
],
[{
    "usuario":"carloss",
    "id":"b6e03689-cccd-478e-8565-d92f40813b13",
    "contraseña":"carloss12345",
    "tipo":2
}],
[{
    "usuario":"admin",
    "id":"b6e03689-cccd-478e-8565-d92f40813b25",
    "contraseña":"carloss12345",
    "tipo":3
}]
]

/* const dts=[]
for (let i = 0; i < 3; i++) {
    const data = datos[i]; // data es un arreglo
    data.forEach(element => {
      dts.push(element)
    });
  }

  console.log(dts)
 */

  const hist = [];

  for (let i = 0; i < 1; i++) {
    const data = datos[i]; // data es un arreglo
    data.forEach((element) => {
      
        hist.push(...element.historial); // Agregar los elementos del historial al arreglo final
      
    });
  }
  
  console.log(hist);
/* 
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

    // Buscar cliente por usuario
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

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
});
 */