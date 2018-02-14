import request = require('request')
import _ = require('lodash')
import { ITeam } from './db/teams';

export function createGame(teams: ITeam[], cb: (id: number) => void) {
    const formData = {
        "game_form[width]": 20,
        "game_form[height]": 20,
        "game_form[delay]": 10,
        "game_form[recv_timeout]": 200,
        "game_form[max_food]": 10,
        "game_form[snake_start_length]": 3,
        "game_form[dec_health_points]": 1,
        "game_form[game_mode]": "multiplayer"
    }
    let count = 0
    teams.forEach(element => {
        const urlKey = `game_form[snakes][${count}][url]`
        formData[urlKey] = element.snakeUrl
        const nameKey = `game_form[snakes][${count}][name]`
        formData[nameKey] = element.teamName
        count++
    });
    console.log(formData)
    request.post({ url: process.env.BATTLESNAKE_SERVER_HOST, formData: formData }, (err, res, body) => {
        const gameId = _.get(res.headers.location.split('/'), 1)
        if (cb) {
            cb(gameId)
        }
    })
}

export function getGameStatus(gameId: number, cb: (json: object) => void) {
    request.get({ url: `${process.env.BATTLESNAKE_SERVER_HOST}/status/${gameId}` }, (err, res, body) => {
        cb(body)
    })
}