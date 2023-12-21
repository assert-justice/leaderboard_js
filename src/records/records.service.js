const db = require("../db");

function listRecords(game_id, sort){
    if(sort === 'increasing') return db('records').select('*')
        .where({game_id}).orderBy('player_score', 'asc');
    else if(sort === 'decreasing') return db('records').select('*')
        .where({game_id}).orderBy('player_score', 'desc');
    else return db('records').select('*').where({game_id});
}

async function addRecord(game_id, player_name, player_score){
    const data = await db('records').insert({game_id, player_name, player_score}, '*');
    // console.log(data);
    return data[0];
}

module.exports = {
    listRecords,
    addRecord,
}