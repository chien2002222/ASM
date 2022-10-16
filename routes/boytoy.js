var express = require('express');
const BoytoyModel = require('../models/BoytoyModel')
var router = express.Router();

/* GET home page. */
//URL: localhost:3000/student
router.get('/', (req, res) => {
    BoytoyModel.find((err, data) => {
      if (!err) {
        //res.send(data)
        //render ra trang index ở thư mục views/student
        res.render('boytoy/index', { boytoys: data })
      }
    })
  })
  router.get('/list', (req, res) => {
    BoytoyModel.find((err, data) => {
      if (!err) {
        //res.send(data)
        //render ra trang index ở thư mục views/student
        res.render('boytoy/list', { boytoys: data })
      }
    })
  })

  router.get("/add", (req, res) => {
    res.render("boytoy/add");
  });
  
  router.post("/add", (req, res) => {
    var toy = new BoytoyModel(req.body);
    toy.save((err) => {
      if (!err) {
        console.log("Add toy succeed !");
        res.redirect("/boytoy");
      }
    });
  });
  //render ra form 
  router.get("/edit/:id",(req,res)=>{
    BoytoyModel.findById(req.params.id,(err,data)=>{
      if(!err){
        //render ra file: edit.hbs
        //gui du lieu cua object student de load vao form edit
        //student (ten) , data (du lieu) 
        res.render("boytoy/edit", {boytoys: data})
      }
    })
  })
  //xu ly du lieu
  router.post("/edit/:id", (req,res)=>{
    BoytoyModel.findByIdAndUpdate(req.params.id, req.body, (err) => {
      if (err) {
        console.log(err)}

       else {
        console.log("Edit toy succeed !")
        res.redirect("/boytoy")
      }
    })
  })
  router.get("/delete/:id", (req,res)=>{
    BoytoyModel.findByIdAndDelete(req.params.id, (err)=>{
      if(err){
        console.log(err)
      }else{
        console.log("Delete toy success")
        res.redirect("/boytoy")
      }
    })
  })
  router.get("/detail/:id", (req, res) => {
    //lấy giá trị id của document gửi từ url
    var student_id = req.params.id;
    //tìm kiếm document trong collection theo id
    BoytoyModel.findById(student_id, (err, data) => {
      if (!err) {
        //render ra file detail chứa dữ liệu của document
        res.render("boytoy/detail", { boytoys: data });
      }
      });
      });
router.post('/search', (req, res) => {
  BoytoyModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
      if (!err) {
          res.render('boytoy/index', { boytoys: data })
      }
  })
})

//sort function
router.get('/sort/asc', (req, res) => {
  BoytoyModel.find()
      .sort({ name: 1 })
      .exec((err, data) => {
          if (!err) {
              res.render('boytoy/list', { boytoys: data })
          }
      })
})
router.get('/sort/desc', (req, res) => {
  BoytoyModel.find()
      .sort({ name: -1 })
      .exec((err, data) => {
          if (!err) {
              res.render('boytoy/list', {boytoys: data })
          }
      })
})
module.exports = router;
