const mongoose = require('mongoose')
var BoytoySchema = new mongoose.Schema(
  {
    name: String,
    brand: String,
    image: String,
    price: Number,
    year: Number
  },
  {
    versionKey: false //optional (to remove _v: 0 when add new data)
  }
)

//Note: tham số cuối cùng bắt buộc phải là tên của collection (table) trong DB
var BoytoyModel = mongoose.model('Boy toy', BoytoySchema, 'toy')
module.exports = BoytoyModel