const { getGame } = require('../games/games.service');
const { listRecords, addRecord } = require("./records.service");

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
    res.send(await listRecords(res.locals.game_id, req.query.sort));
}

async function add(_, res){
    const {game_id, player_name, player_score} = res.locals;
    const data = await addRecord(game_id, player_name, player_score);
    res.send(data);
}

module.exports = {
    list: [gameExists, list],
    add: [gameExists, hasPlayerData, add],
}