const User = require('../models/user')
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
/* O ideal, é que assim como as senhas a secret esteja em uma variavel de ambiente, e nao diretamente no código,
* Mas, para fins de testes e verificaçoes no jwt.io, definirei a secret_jwt abaixo:
*/
const secret_jwt = process.env.SECRET_JWT
const salt = bcrypt.genSaltSync(10);

module.exports = {
    async create(req,res,next){        
        await check('password').isLength({ min: 6 }).run(req);
        await check('confirmpassword').custom((value, { req }) => value === req.body.password)
        .run(req);
        await check('name').exists().run(req);
        await check('username').custom(async function (value) {
           let userfind =  await User.find({username: value})
           if(userfind.length > 0){
            throw new Error('Username in use');
        }
        }).withMessage('must be at least 5 chars long')
        .run(req);

        const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  User.create({
    username: req.body.username,
    password:  bcrypt.hashSync(req.body.password, salt),
    name :req.body.name,
    createdAt: Date(),
    typeUser:req.body.typeUser
  }).then(user => next());
},
    async auth(req, res){
        var jwt = require('jsonwebtoken');
        await check('password').isLength({ min: 6 }).run(req);
        await check('username').exists().run(req);
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
          }
    let userfind = await User.find({username:req.body.username })
    if(userfind.length > 0 ){
            if( bcrypt.compareSync(req.body.password , userfind[0].password) ){
                let usuario = userfind[0]
                 usuario['password'] = null
            var token = jwt.sign({ usuario}, secret_jwt ,  {
                expiresIn: 3000 // expires in 5min
              });
              res.status(200).send({ 'access_token': token });
            }
            else{
                res.status(500).send({'error':'Login inválido!'});
    
            }
          }else{
            res.status(500).send({'error':'Login inválido!'});

        }


    },
    verifyJWT(req, res, next){
        var token = req.headers['authorization'];
        token = token.split('Bearer ')[1]
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
        
        jwt.verify(token, secret_jwt, function(err, decoded) {
          if (err) return res.status(400).send({ auth: false, message: 'Failed to authenticate token.' });
          
          // se tudo estiver ok, salva no request para uso posterior
          req.userId = decoded.usuario._id;
          req.typeUser = decoded.usuario.typeUser
          next();
        });
      },
      async profile(req,res){

        let userfind = await User.find({_id:req.userId})
         userfind[0]['password'] = null;
    
        res.json(userfind)
    }
}
