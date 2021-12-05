const router = require('express').Router();
const { Blogpost, User, Comment } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all galleries for homepage
router.get('/', async (req, res) => {

  try {
    const BlogpostData = await Blogpost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const blogposts = BlogpostData.map((blogpost) =>
      blogpost.get({ plain: true })
    );

    res.render('homepage', {
      blogposts,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userPostData = await Blogpost.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ]
    });
    const userPosts = userPostData.map((userPost) =>
      userPost.get({ plain: true })
    );
    res.render('dashboard', {
      userPosts,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/newpost',withAuth, async (req, res) => {
  res.render('newpost');
});

router.get('/comments/:id', withAuth, async (req, res) => {
  try {
    const activePostData = await Blogpost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        }
      ]
    });
    const postData = activePostData.get({ plain: true })
    const postCommentsData = await Comment.findAll({
      where: {
        post_id: req.params.id
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        }
      ]
    });
    const commentsData = postCommentsData.map((comments) => 
    comments.get({ plain: true })
    );
    res.render('comments', {
      postData,
      commentsData
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/updatepost/:id', withAuth, async (req, res) => {
  try {
    const updatePostData = await Blogpost.findByPk(req.params.id);
    const currentPostData = updatePostData.get({ plain: true })
    
    res.render('updatepost', {
      currentPostData
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

module.exports = router;
