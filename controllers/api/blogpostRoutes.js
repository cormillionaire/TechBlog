const router = require('express').Router();
const { Blogpost } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogpostData = await Blogpost.findAll({
    });
    res.status(200).json(blogpostData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newBlogpost = await Blogpost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlogpost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    
    const updateBlogpost = await Blogpost.update({
      name: req.body.name,
      description: req.body.description
    },
    {
      where: {
        id: req.params.id,
      }
    });
    console.log("blog "+updateBlogpost);
    res.status(200).json(updateBlogpost);
  } catch (err) {
    console.log("error "+err);
    res.status(400).json(err);
    
  }
});

router.delete('/:id' , async (req, res) => {
  try {
    const blogpostData = await Blogpost.destroy({
      where: {
        id: req.params.id
      },
    });

    if (!blogpostData) {
      res.status(404).json({ message: 'No post with this id!' });
      return;
    }

    res.status(200).json(blogpostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
