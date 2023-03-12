const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const tagData = await Tag.findAll({
    include: model[{Product}],
    attributes: ['id', 'tagName', 'productName']
  })
  .then(tagData => res.json(tagData))
  .catch(error => {
    console.log(error);
    res.status(400).json(error);
  });
});


router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tagData = await Tag.findOne({
    where: {id: req.params.id},
    include: model[{Product}],
    attributes: [['product_name', 'price', 'stock']]
  }) .then(tagData => {
    if (!tagData) {
      res.status(400).json;
      return;
    }
    res.json(tagData);
  })
  .catch(error => {
    console.log(error);
    res.status(400).json(error);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
  .then(tagData => res.json(tagData))
  .catch(error => {
    console.log(error);
    res.status(400).json(error);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(tagData => {
      if (!tagData) {
        res.status(400).json;
        return;
      }
      res.json(tagData)
    })
    .catch(error => {
      console.log(error);
      res.status(400).json(error);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(tagData => {
    if (!tagData) {
      res.status(400).json;
      return;
    }
    res.json(tagData);
  })
  .catch(error => {
    console.log(error);
    res.status(400).json(error);
  });
});

module.exports = router;
