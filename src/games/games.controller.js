const { listGames, addGame } = require("./games.service");

async function list(req, res, next){
    res.send(await listGames());
}

async function hasName(req, res, next){
    //
}

async function add(req, res, next){
    const data = await addGame(req.params.name);
    res.send(data);
}

module.exports = {
    list,
    add,
}