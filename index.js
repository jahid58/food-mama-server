const express = ('express');
const cors = ('cors');
const bodyParser = ('body-parser');
const app =express();
const port = process.DB_PORT || 5000;
app.use(cors);
app.use(bodyParser);
app.listen(port)