var mongoose = require('mongoose');
var ProductSchema = new mongoose.Schema({
  title: String,
  price: String,
  ordered: {type: Number, default: 0},
  value: {type: Number, default: 0},
  productUrl
});
ProductSchema.methods.order = function(cb) {
  this.ordered += 1;
  this.save(cb);
};
mongoose.model('Product', ProductSchema);
