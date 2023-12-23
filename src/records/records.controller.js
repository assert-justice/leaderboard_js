const { getGame } = require('../games/games.service');
const { listRecords, addRecord, getRecordByName, updateRecord } = require("./records.service");

async function gameExists(req, res, next){
    const { game_id } = req.params;
    if(game_id === null || game_id === undefined){
        return next(400);
    }
    const game = await getGame(game_id);
    if(game === null || game === undefined){
        return next(401);
    }
    res.locals = {...res.locals, game_id, game};
    next();
}

async function hasPlayerData(req, res, next){
    const {player_name, player_score} = req.params;
    if(player_name === null || player_name === undefined){
        return next(402);
    }
    if(player_score === null || player_score === undefined){
        return next(403);
    }
    res.locals = {...res.locals, player_name, player_score};
    next();
}

async function list(req, res){
    const data = await listRecords(res.locals.game_id);
    // filter out the duplicate names. todo: get better at sql
    const mem = new Map();
    for (const {player_name, player_score} of data) {
        if(!mem.has(player_name)) mem.set(player_name, 0);
        if(mem.get(player_name) < player_score){
            mem.set(player_name, player_score);
        }
    }
    let temp = [...mem.entries()].sort((a,b)=>a.player_score-b.player_score);
    if(req.query.sort === 'increasing') temp.reverse();
    res.send(temp.map(([n,s])=>({player_name: n, player_score: s})));
}

async function add(_, res){
    const {game_id, player_name, player_score} = res.locals;
    const data = await addRecord(game_id, player_name, player_score);
    res.send(data);
    // const entry = await getRecordByName(player_name);
    // if(entry){
    //     const data = await updateRecord(game_id, entry.record_id, player_score);
    //     res.send(data);
    // }
    // else{
    //     const data = await addRecord(game_id, player_name, player_score);
    //     res.send(data);
    // }
}

module.exports = {
    list: [gameExists, list],
    add: [gameExists, hasPlayerData, add],
}