const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Custom middleware to check working hours
function workingHoursMiddleware(req, res, next) {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send('Sorry, our website is only available during working hours (Monday to Friday, 9 to 17).');
  }
}

// Apply the working hours middleware
app.use(workingHoursMiddleware);

// Serve static files (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><link rel="stylesheet" type="text/css" href="style.css"></head>
      <body>
        <nav>
          <a href="/">Home</a>
          <a href="/services">Our Services</a>
          <a href="/contact">Contact Us</a>
        </nav>
        <h1>Home Page</h1>
        <p>Welcome to our home page!</p>
      </body>
    </html>
  `);
});

app.get('/services', (req, res) => {
  res.send(`
    <html>
      <head><link rel="stylesheet" type="text/css" href="style.css"></head>
      <body>
        <nav>
          <a href="/">Home</a>
          <a href="/services">Our Services</a>
          <a href="/contact">Contact Us</a>
        </nav>
        <h1>Our Services</h1>
        <p>Here are the services we offer.</p>
      </body>
    </html>
  `);
});

app.get('/contact', (req, res) => {
  res.send(`
    <html>
      <head><link rel="stylesheet" type="text/css" href="style.css"></head>
      <body>
        <nav>
          <a href="/">Home</a>
          <a href="/services">Our Services</a>
          <a href="/contact">Contact Us</a>
        </nav>
        <h1>Contact Us</h1>
        <p>Get in touch with us!</p>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})
