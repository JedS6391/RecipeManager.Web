// Used to serve the application via
const express = require('express');
const app = express();

const path = `${__dirname}/dist/RecipeManager`;

console.log(`Serving web application from: ${path}...`);

// Serve content from dist folder
app.use(express.static(path));

// Support PathLocationStrategy routing
app.get('/*', function(req, res) {
    res.sendFile(`${path}/index.html`);
});

app.listen(process.env.PORT || 8080);