const router = require('express').Router()
const { onlyUsers, onlyAdmin } = require('../cookis')
const SQL = require('../dbconfig')



// user
router.get('/', onlyUsers, async (req, res) => {

    try {

        const likedFeed = await SQL(`
        SELECT DISTINCT vacations.* ,users.id as userid
        FROM masima_3.liks
        INNER JOIN users on liks.liked_by = users.id
        INNER JOIN vacations on liks.vacation = vacations.id
        WHERE liked_by = ${req.session.personid}
       
    `)

        const likedsID = []

        for (const i of likedFeed) {
            likedsID.push(i.id)
        }


        if (likedsID.length) {

            const didntLikedFeed = await SQL(`
                SELECT DISTINCT vacations.*
                FROM vacations
                INNER JOIN liks on liks.vacation = vacations.id 
                WHERE vacations.id  NOT in (${[likedsID]})
        `)
            const resOrNewFeed = await SQL(`
        SELECT DISTINCT vacations.*
        FROM vacations
        WHERE vacations.id not in(SELECT liks.vacation from liks )
        `)

            res.send([...likedFeed, ...didntLikedFeed, ...resOrNewFeed])

        } else {
            const all = await SQL(`
            SELECT * FROM masima_3.vacations
            `)
            res.send(all)
        }

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

})


// user
router.get('/likesToPosts/:postid', onlyUsers, async (req, res) => {

    try {

        const [postToLIke] = await SQL(`
        SELECT * FROM vacations WHERE id =${req.params.postid}
        `)

        if (!postToLIke) {
            return res.send("no post fund")
        }

    const [howManyLikes] = await SQL(`
    SELECT count(liked_by) FROM liks
    WHERE vacation =${req.params.postid}
    `)

        const likes = howManyLikes["count(liked_by)"]
        console.log(likes)

        res.send({ likes })
        // res.send(likes)

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

})


// user
router.put('/like/:postid', onlyUsers, async (req, res) => {

    try {
        const liked_by = req.session.personid
        const vacation = req.params.postid

        const [post] = await SQL(`
        SELECT id
        FROM liks
        WHERE liked_by =${liked_by} AND vacation =${vacation}
        `)

        if (post) {
            await SQL(`
            DELETE FROM liks WHERE liked_by =${liked_by} AND vacation =${vacation}
            `)
            return res.send({ msg: "removd", post })
        }

        await SQL(`
        INSERT into liks(liked_by,vacation)
        VALUES(${liked_by},${vacation})
        `)
        res.send({ msg: 'like add' })

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})


// admin
router.post('/', onlyAdmin, async (req, res) => {

    try {
        const { destination, description, starts_at, ends_at, price, img } = req.body

        if (!destination || !description || !starts_at || !ends_at || !price) {
            return res.send({ err: 'somting is missing' })
        }

        if (img) {
            await SQL(`
            insert into Vacations(destination,description,starts_at,ends_at,price,img)
            values("${destination}","${description}", "${starts_at}","${ends_at}",${price},"${img}")
            `)

        } else {
            await SQL(`
            insert into Vacations(destination,description,starts_at,ends_at,price)
            values("${destination}","${description}", "${starts_at}",${ends_at},${price})
            `)
        }

        res.send({ mag: 'Vacation add' })

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

})


// admin
router.put('/:postid', onlyAdmin, async (req, res) => {

    try {
        const { destination, description, starts_at, ends_at, price, img } = req.body

        if (!destination || !description || !starts_at || !ends_at || !price) {
            return res.send({ err: 'somting is missing' })
        }

        if (img) {
            await SQL(`
       
            UPDATE vacations set destination="${destination}",
            description="${description}",
            starts_at="${starts_at}",
            ends_at="${ends_at}",
            img="${img}",
            price=${price}
            
            WHERE vacations.id =${req.params.postid}
             `)

        } else {

            await SQL(`
            UPDATE vacations set destination="${destination}",
            description="${description}",
            starts_at="${starts_at}",
            ends_at="${ends_at}",
            price=${price}
            
            WHERE vacations.id =${req.params.postid}
       
             `)

        }


        const x = await SQL(`
        SELECT * FROM vacations
        WHERE id = ${req.params.postid}
        `)

        res.send({ msg: 'Changes  acceptedd', x })


    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

})


// admin
router.delete('/:postid', onlyAdmin, async (req, res) => {
    try {

        await SQL(`
        DELETE from vacations WHERE id =${req.params.postid}
        `)

        res.send({ msg: 'post deleted ' })


    } catch (error) {
        console.log(error)
        res.sendStatus(500)

    }

})



// admin
router.get('/likedPosts', onlyAdmin, async (req, res) => {

    try {
        const likedFeed = await SQL(`

        SELECT vacations.destination ,
        count(vacations.destination) as Amount
        FROM masima_3.liks      
        INNER JOIN users on liks.liked_by = users.id
        INNER JOIN vacations on liks.vacation = vacations.id
        GROUP BY( vacations.destination)
       
    `)

        res.send(likedFeed)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

})





module.exports = router