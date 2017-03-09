const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/slides', express.static(path.join(__dirname, 'slides')));

const headlines = [
  'Vi är specialister inom verksamhetsutveckling och IT',
  'Vi kör med precache och går nästan offline 😏',
  'Vi cachar dynamiskt och går helt offline 😎',
  'Vi trixar med responsen 😜',
  'Vi har custom 404 och offline-sida 😚'
];

app.get('/', (req, res) => {
  res.render('index', { headline: headlines[0] });
});

app.get('/blog', (req, res) => {
  res.render('blog', {
    swPath: '/swBlog.js',
    swScope: '/blog'
  });
});

app.get('/blog/:post', (req, res) => {
  res.render(`posts/${req.params.post}`);
});

// service worker subpages
app.get(/\/\d/, (req, res, next) => {
  const index = Number(req.path.replace(/\//g, ''));
  const headline = headlines[index];
  const swScope = `/${index}`;
  const swPath = `/sw${index}.js`;

  // only render view if there is an accompanying SW
  fs.access(path.join(__dirname, 'public', swPath), (err) => {
    if (err) return next();
    res.render('sw', { headline, swPath, swScope });
  });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});
