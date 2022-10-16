var express = require('express');
const CategoryModel = require('../models/CategoryModel') 
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  CategoryModel.find((err, data) => {
    if (!err) {
      //res.send(data)
      //render ra trang index ở thư mục views/sCategory
      res.render('category/index', { categories: data })
    }
  })
})

router.get("/add", (req, res) => {
  res.render("category/add");
});

router.post("/add", (req, res) => {
  var toy = new CategoryModel(req.body);
  toy.save((err) => {
    if (!err) {
      console.log("Add toy succeed !");
      res.redirect("/category");
    }
  });
});
//render ra form 
router.get("/edit/:id",(req,res)=>{
  CategoryModel.findById(req.params.id,(err,data)=>{
    if(!err){
      //render ra file: edit.hbs
      //gui du lieu cua object student de load vao form edit
      //student (ten) , data (du lieu) 
      res.render("category/edit", {category: data})
    }
  })
})
//xu ly du lieu
router.post("/edit/:id", (req,res)=>{
  CategoryModel.findByIdAndUpdate(req.params.id, req.body, (err) => {
    if (!err) {
      console.log("Edit toy succeed !")
      res.redirect("/category")
    }
  })
})
router.get("/delete/:id", (req,res)=>{
  CategoryModel.findByIdAndDelete(req.params.id, (err)=>{
    if(err){
      console.log(err)
    }else{
      console.log("Delete toy success")
      res.redirect("/category")
    }
  })
})
router.get("/detail/:id", (req, res) => {
  //lấy giá trị id của document gửi từ url
  var student_id = req.params.id;
  //tìm kiếm document trong collection theo id
  CategoryModel.findById(student_id, (err, data) => {
    if (!err) {
      //render ra file detail chứa dữ liệu của document
      res.render("category/detail", { category: data });
    }
    });
    });

module.exports = router;
