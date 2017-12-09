import logger from 'morgan'
import bodyParser from 'body-parser'
import express from 'express'

import routes from '../routes/'

export const configureExpress = () => {
  var app = express();

  app.set('port', process.env.PORT || '4000');

  if (app.get('env') === 'development') {
    app.use(logger('dev'));
  }

  app.use(express.static('public'))
  app.set('view engine', 'ejs');
  app.set('views', './src/views');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use('/', routes);

  app.use((req, res, next) => {
    res.status(404).render("erros/404")
  });

  app.use((err, req, res, next) => {
    res.status(500).render("erros/500");
  });

  return app;
}