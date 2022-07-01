
onlyUsers = async (req, res, next) => {
        // if (req.session.first_name) {
       if ( req.session.first_name) {
        next()
    } else {
      res.status(401).send({ err: 'you need to login first  onlyUsers' })
    }

}  


onlyAdmin = async (req, res, next) => {
    if (req.session.admin == true) {
        next()
    } else {
        res.status(401).send({ err: 'I see you Yossi ... dont break my code please' })
    }

}


module.exports = { onlyUsers, onlyAdmin }