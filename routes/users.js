var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');

  res.json([
  	{id:1, name:"Joe"},
  	{id:2, name:"Den"},
  	{id:3, name:"Lee"},
  	{id:4, name:"Ann"},
  	{id:5, name:"John"},
  	{id:6, name:"Jane"},
  ])

});

module.exports = router;
