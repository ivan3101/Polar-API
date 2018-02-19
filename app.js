const Express = require('express');
const App = Express();
const Routes = require('./API/Routes');
const PORT = process.env.PORT || 3000;

App.use('/', Routes);
App.listen(PORT, () => console.log(`API is running in port: ${PORT}`));