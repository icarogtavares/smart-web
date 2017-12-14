import express from 'express'
import axios from 'axios'

const router = express.Router();

const locais = [
  {nome: "Pici", url: "/locais/1"},
  {nome: "Aldeota", url: "/locais/2", avg: 42},
  {nome: "Parquelândia", url: "/locais/3", avg: 43},
  {nome: "Damas", url: "/locais/4", avg: 45},
  {nome: "Edson Queiroz", url: "/locais/5", avg: 37}
]

router.get('/', (req, res, next) => {
  res.render('home/login');
})

.get('/home', (req, res, next) => {
  res.render('home/home', {locais: locais});
})

.get('/historico', (req, res, next) => {
  axios.get('http://localhost:3000/noises/avg')
  .then(response => {
    locais[0].avg = response.data.avg || 50;
    res.render('home/historico', {locais: locais});
  })
  .catch(error => {
    next(error);
  });
  
})

// .get('/locais/:id', (req, res, next) => {
//   const id_local = Number(req.params.id)-1;
//   const existeLocal = locais.length > id_local;
//   if(existeLocal) {
//     return res.render('home/local', {ip: process.env.MQTT || 'localhost', locais: locais, id_local: id_local});
//   }
//   return next();
// })

.get('/locais', (req, res, next) => {
    res.render('home/locais', {ip: process.env.MQTT || 'localhost', locais: locais});
})

export default router;
