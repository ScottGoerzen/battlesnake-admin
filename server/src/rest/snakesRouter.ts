import express = require('express')
import { Router } from 'express'
import { ensureAuthenticated } from '../passport-auth'
import * as _ from 'lodash'

export const router = Router()

router.get('/', ensureAuthenticated, async (req: express.Request, res: express.Response) => {
    const snakes = _.range(0, 10).map(i => {
        return {
            name: `SWU Training Snake ${i}`,
            url: `https://battlesnake-training-snakes.herokuapp.com/snake_${i}`
        }
    })

    snakes.push({
        name: "DSnek",
        url: "https://dsnek.herokuapp.com"
    })

    res.send(snakes)
})