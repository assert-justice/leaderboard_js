const db = require('./db.js');
const app = require('./app.js');
const port = 5001;

app.listen(port, ()=>{
    console.log(`Listening at port ${port}`);
});