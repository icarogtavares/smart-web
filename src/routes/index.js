import express from 'express'

const router = express.Router();

const locais = [
  {nome: "Benfica", url: "locais/1"},
  {nome: "Aldeota", url: "locais/2"},
  {nome: "Parquelândia", url: "locais/3"},
  {nome: "Damas", url: "locais/4"},
  {nome: "Edson Queiroz", url: "locais/5"}
]

router.get('/', (req, res, next) => {
  res.render('home/login');
})

.get('/home', (req, res, next) => {
  res.render('home/home', {locais: locais});
})

.get('/historico', (req, res, next) => {
  res.render('home/historico', {locais: locais});
})

.get('/locais/:id', (req, res, next) => {
  res.render('home/local', {locais: locais, local: req.params.id});
})

export default router;
