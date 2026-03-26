const express = require("express");

const app = express();

app.listen(PORT, '0.0.0.0', () => {
  console.log(` hola mundo en el puerto ${PORT}`);
});


