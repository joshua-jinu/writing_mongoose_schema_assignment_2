const express = require('express');
const { resolve } = require('path');
const blogRouter = require('blog.router.js')

const app = express();
const port = 3010;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.use('/blog', blogRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
