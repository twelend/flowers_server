const db = require('../db')

class FlowerController {
    async createFlower(req, res) {
        const {
        name,
        type,
        characteristics,
        country,
        season,
        sort_provider,
        room_type,
        img 
        } = req.body

        const newFlower = await db.query(`INSERT INTO flower (name, type, characteristics, country, season, sort_provider, room_type, img) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [name, type, characteristics, country, season, sort_provider, room_type, img])
        res.json(newFlower)
    }

    async getFlowers(req, res) {
        const flowers = await db.query(`SELECT * FROM flower ORDER BY id`)
        res.json(flowers.rows)
    }
    // async getFlowersByCountry(req, res) {
    //     const flowers = await db.query(`SELECT * FROM flower WHERE country = $1 ORDER BY id`, [req.params.country])
    //     res.json(flowers.rows)
    // }
    // async getFlowersByType(req, res) {
    //     const flowers = await db.query(`SELECT * FROM flower WHERE type = $1 ORDER BY id`, [req.params.type])
    //     res.json(flowers.rows)
    // }
    // async getFlowersByRoomType(req, res) {
    //     const flowers = await db.query(`SELECT * FROM flower WHERE room_type = $1 ORDER BY id`, [req.params.room_type])
    //     res.json(flowers.rows)
    // }
}

module.exports = new FlowerController()