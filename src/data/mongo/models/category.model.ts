import { Schema, model } from 'mongoose'

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
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

categorySchema.set('toJSON', {
  // add prop id into response
  virtuals: true,
  versionKey: false,
  transform(doc, ret, options) {
    delete ret._id
  },
})

export const CategoryModel = model('Category', categorySchema)
