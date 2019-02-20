const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  added: {
    type: Number
  },
  company: {
    type: String
  },
  country: {
    type: String
  },
  size: {
    type: String
  },
  color: {
    type: String
  },
  gender: {
    type: String
  },
  category: {
    type: String
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  picture: {
    type: String
  },
  isBrandNew: {
    type: Boolean
  },
  isPopular: {
    type: Boolean
  },
  isAvailable: {
    type: Boolean
  },
  rate: {
    type: Number
  }
});

productSchema.options.toJSON = {
  transform: (doc, ret, options) => {
    ret.id = ret._id+'';
    ret.added = new Date(new Date().setTime(ret.added)).toUTCString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
};

function addCreatedDate(next) {
  const product = this;
  if (!product.added) {
    product.added = new Date().getTime();
  }
  next();
}

productSchema.pre('save', addCreatedDate);

module.exports = mongoose.model('Product', productSchema);
