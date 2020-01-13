var express=require('express');
var router = express.Router();
var taskDal = require('../dal/taskDal');

router.get('/')