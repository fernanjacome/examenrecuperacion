const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');


const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json()); 

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'asignaciones_db'
});

connection.connect((error) => {
    if(error){ 
        console.error('Error al conectar la base de datos:', error);
    } else {
        console.log('Conexion de la base de datos exitosa');
    }
});

app.post('/registro', (req, res) => {
    const asignacion = req.body;
    const query = 'INSERT INTO asignaciones SET ?';

    connection.query(query, asignacion, (error, results) => {
        if (error) {
            console.error('Error al registrar asignacion:', error);
            res.status(500).send('Error interno del servidor');
        } else {
            res.status(200).send('Asignacion registrada exitosamente');
        }
    });
});


app.get('/consultar', (req, res) => {
  const query = 'SELECT * FROM asignaciones';

  connection.query(query, (error, results) => {
    if(error) {
        console.error('Error al consultar asignaciones: ', error);
        res.status(500).send('Error interno del servidor');
    } else {
        res.status(500).json(results);
    }
  })
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
