const express = require("express");
const mysql = require("mysql2");

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
// Configuración de la base de datos

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((error) => {
  if (error) {
    console.error("Error al conectar a la base de datos:", error);
    return;
  }
  console.log("Conectado a la base de datos con éxito");
});
//Ruta base GET/ 
app.get ("/", (request, response) => {
  response.json({
    status:true
  })
})
// GET: init 
app.get ("/init", (request, response) => {
    const sql = `CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL
    )`;
    db.query(sql, (error, result) => {
        if (error) {
            console.error("Error al crear la tabla:", error);
            response.status(500).json({ status: false, message: "Error al crear la tabla" });
            return;
        }
        response.json({ status: true, message: "Tabla creada con éxito" })
    })
})
// usuarios -> id, nombre 
app.post("/usuarios/crear", (request, response) => {
    const nombre = request.body.nombre;

    db.query("INSERT INTO usuarios (nombre) VALUES (?)", [nombre], (error, result) => {
        if (error) {
            return response.status(500).json({ status: false, message: "Error al crear el usuario" });
        }
        response.status(201).json({ status: true, message: "Usuario creado con éxito" })
    })

})
    //get 
app.get("/usuarios", (request, response) => {
 
   db.query("SELECT * FROM usuarios", (error, resultado) => {
            if (error) {
                return response.status(500).json({ status: false, message: "Error al obtener los usuarios" });
            }
            response.json({usuarios: resultado})
        })

})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

