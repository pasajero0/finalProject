const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  slug: {
    type: String,
    required:[true, 'The slug is required'],
    unique: true
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  parent: {
    type: Number
  },
  position: {
    type: Number
  },
  filters: {
    type: Object
  }
});

departmentSchema.options.toJSON = {
  transform: (doc, ret, options) => {
    ret.id = ret._id+'';
    delete ret._id;
    delete ret.__v;
    return ret;
  }
};

module.exports = mongoose.model('Department', departmentSchema);
