let { getImgCarousel } = require("../data/dataBase");
let path = require("path");
const db = require("../database/models");
const { Op } = require("sequelize");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
  index: (req, res) => {
    db.Product.findAll({
      limit: 12,
      where: {
        discount: {
          [Op.gte]: 15,
        },
      },
      include: [
        { association: "category" },
        { association: "images" },
        { association: "colors" },
        { association: "season" },
        { association: "sizes" },
      ],
    }).then((products) => {
      res.render("products/home", {
        products,
        title: "Nuestras Ofertas",
        position: "",
        carousel: getImgCarousel,
        toThousand,
        session: req.session,
      });
    });
  },
  afip: (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/img/afip.png"));
  },

  search: (req, res) =>{
    db.Product.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${req.query.keys}%`,
            },
          },
          {
            description: {
              [Op.like]: `%${req.query.keys}%`,
            }
          }
        ]
      },
      include: [
        { association: "category" },
        { association: "images" },
        { association: "colors" },
        { association: "season" },
        { association: "sizes" },
      ],
    })
    .then(products =>{
      db.Color.findAll()
      .then(colors => {
        db.Size.findAll()
        .then(sizes => {
          res.render("products/listProducts", {
            toThousand,
            colors,
            sizes,
            search: req.query.keys,
            position: "",
            display: "display:grid;",
            products,
            session: req.session,
          });
        })
      })
    })
  }
};
