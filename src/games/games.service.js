const db = require("../db");

function listGames(){
    return db('games').select('*');
}

function getGame(game_id){
    return db('games').where({game_id}).first();
}

async function addGame(game_name){
    const data = await db('games').insert({game_name}, '*');
    // console.log(data);
    return data[0];
}

module.exports = {
    listGames,
    addGame,
    getGame,
}