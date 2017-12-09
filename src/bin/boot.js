import { configureExpress } from './middlewares'
import debug from 'debug'

export const startApp = (id) => {
  const smartDebug = debug(`smart-web:${id}:`);
  
  var app = configureExpress();
  app.listen(app.get('port'), () => {
    smartDebug(`Listening on port ${app.get('port')}`);
  });

}