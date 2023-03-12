const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
Category.findAll({
  include: [{model: Product}]
}).then(categoryData => res.json(categoryData))
.catch(error => {
  console.log(error);
  res.status(400).json(error);
});
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
    const categoryData = await Category.findByPk(req.params.id, { //REF - findByPk: https://sequelize.org/docs/v6/core-concepts/model-querying-finders/
      include: [{model: Product}]
    }).then(categoryData => {
      if (!categoryData) {
        res.status(400).json({message: 'This category could not be found with this id'});
        return;
      }
      res.json(categoryData);
    }).catch(error => {
      console.log(error);
      res.status.apply(400).json(error);
    });               
});

router.post('/', async (req, res) => {
  // create a new category
  const categoryData = await Category.create(req.body, {
    include: [{model: 'category_name'}]
  }).then(categoryData => res.json(categoryData))
    .catch(error => {
      console.log(error)
      res.status(400).json(error);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((category) => {
    res.status(200).json(category);
  }).catch(error)
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  const categoryData = Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(categoryData => res.status(200).json(categoryData))
    .catch((err) => {
      res.status(500).json(err)
    })
});

module.exports = router;
