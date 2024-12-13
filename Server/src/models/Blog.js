const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: {
    type: String,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    name: {
      type: String,
      required: true
    },
    department: String,
    linkedin: {
      type: String,
      required: true
    },
    imageUrl: String,
    imagePublicId: String
  },
  coverImage: String,
  coverImagePublicId: String,
  publishedDate: Date,
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  claps: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Blog', blogSchema);