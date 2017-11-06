const {User} = require('./../models/user')

var authenticate =(req, res, next) =>{
  let token = req.header('x-auth')
  console.log(`token->${token}`)
  User.findByToken(token).then(user => {

    if(!user){
      return Promise.reject('Usuario no encontrado')
    }
    req.user = user
    req.token = token
    next()
  }).catch((error) => {
    console.log(`Error buscando usuario -> ${error}`)
    res.status(401).send()
  })
}

module.exports = {authenticate}
