import { Schema, model } from 'mongoose'

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  available: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

export const categoryModel = model('Category', categorySchema)
