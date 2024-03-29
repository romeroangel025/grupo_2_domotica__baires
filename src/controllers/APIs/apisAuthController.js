const db = require("../../database/models");
const { compareSync, hashSync, hash, setRandomFallback } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { literal } = require("sequelize");

module.exports = {
  // register controller
  register: async (req, res) => {
    const { name, surname, email, password, avatar, tel } = req.body;

    try {
      if (!email || !password) {
        res.status(401).json({
          ok: false,
          status: 401,
        });
      }

      const { id, rol } = await db.User.create({
        name: name?.trim(),
        surname: surname?.trim(),
        email: email?.trim(),
        tel,
        password: await hash(password?.trim(), 10),
        rol: "user",
        avatar: req.file?.filename || "userDefault.png",
        createdAt: new Date(),
        updateAt: new Date(),
      });

      const token = await sign({ id, rol }, "domotica16", { expiresIn: "4h" });

      return res.status(201).json({
        ok: true,
        status: 201,
        token,
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        status: 500,
        msg: "Error en el servidor",
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(401).json({
          ok: false,
          status: 401,
          msg: "El email y password son requeridos",
        });
      }

      const {
        id,
        rol,
        password: passwordHash,
      } = await db.User.findOne({ where: { email } });

      if (!id) {
        return res.status(404).json({
          ok: false,
          status: 404,
          msg: "El usuario no existe",
        });
      }

      if (!compareSync(password, passwordHash)) {
        return res.status(401).json({
          ok: false,
          status: 401,
          msg: "El password es incorrecto",
        });
      }

      const token = await sign({ id, rol }, "domotica16", { expiresIn: "4h" });

      return res.status(200).json({
        ok: true,
        status: 200,
        token,
        urlData: `${req.protocol}://${req.get("host")}/APIs/auth/me/${token}`,
      });
    } catch (error) {
      res.status(401).json({
        ok: false,
        status: 500,
        msg: error.message,
      });
    }
  },
  getUserAuthenticated: async (req, res) => {
    try {
      const options = {
        attributes: {
          exclude: ["deletedAt", "password"],
          include: [
            [
              literal(
                `CONCAT( '${req.protocol}://${req.get(
                  "host"
                )}/APIs/users/image/',avatar )`
              ),
              "avatar",
            ],
          ],
        },
      };

      const { id } = req.userToken;
      const data = await db.User.findByPk(id, options);

      res.status(200).json({
        ok: true,
        status: 200,
        data,
      });

      //{id,rol}
    } catch (error) {
      res.status(500).json({
        ok: false,
        status: 500,
        msg: error.message || "Error en el servidor",
      });
    }
  },
};
