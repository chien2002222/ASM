const mongoose = require('mongoose')
var CategorySchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    company: String,
    description: String
  },
  {
    versionKey: false //optional (to remove _v: 0 when add new data)
  }
)

//Note: tham số cuối cùng bắt buộc phải là tên của collection (table) trong DB
var CategoryModel = mongoose.model('Category', CategorySchema, 'category')
module.exports = CategoryModel