const { check, body } = require('express-validator');
const db = require("../database/models");

module.exports = [

    check('name')
        .notEmpty().withMessage('El nombre es obligatorio').bail()
        .isAlpha('es-ES').withMessage('No se permite esos caracteres').bail()
        .isLength({
            min: 2
        }).withMessage('Como mínimo 2 caracteres'),

    check('surname')
        .notEmpty()
        .withMessage("El apellido es obligatorio")
        .bail()
       
        .bail()
        .isLength({
            min: 2,
        })
        .withMessage("Como mínimo 2 caracteres"),

    /* body("email")
        .notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('Debe ser un email válido').bail()
        .custom((value) => {
            return db.User.findOne({
                where: {
                    email: value,
                },
            }).then((user) => {
                if (user||(user.email)) {
                    return Promise.reject("Este email ya está registrado");
                }
            });
        }),
 */

        check("email")
    .notEmpty().withMessage('El email es obligatorio').bail()
    .isEmail().withMessage('Debe ser un email válido').bail()
    .custom((value) => {
      return db.User.findOne({
        where: {
          email: value
        }
      }).then((user) => {
        if(user) {
          return Promise.reject('El email ya existe')
        }
      })     
    }).withMessage('El email ya se encuentra registrado'),

    check('tel')
        .notEmpty().withMessage('EL numero de telefono es obligatorio').bail()
        .isLength({
            min: 8,
            max: 15
        }).withMessage('Ingrese su numero con el codigo de area'),
    check('password')
        .notEmpty().withMessage('La contraseña es obligatoria').bail()
        .isLength({
            min: 6,
            max: 12
        }).withMessage('La contraseña debe tener entre 6 y 12 caracteres'),
    body('password2')
        .notEmpty().withMessage('Vuelve a reingresar tu contraseña').bail()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                return false
            } else {
                return true
            }
        }).withMessage('Las contraseñas no coinciden'),
    /* body('avatar')
    .notEmpty().withMessage('Agrega una imagen de perfil').bail()
    .custom((value,{req}) => {
        if(req.files[0]){
            return true
        }else {
            return false
        }
    }).withMessage('Debes agregar una imagen')
*/
]