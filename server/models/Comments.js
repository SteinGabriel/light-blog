const mongoose = require('mongoose')

const { Schema } = mongoose

const CommentsSchema = new Schema(
  {
    post_id: String,
    body: String
  },
  { timestamps: true }
)

CommentsSchema.method.toJSON = function() {
  return {
    _id: this._id,
    post_id: this.post_id,
    body: this.body,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  }
}

mongoose.model('Comments', CommentsSchema)
