import mongoose from 'mongoose';

const drinkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    enum: ['wine', 'soju', 'beer', 'whiskey', 'cocktail', 'sake', 'brandy'],
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  abv: {
    type: Number,
    required: true,
    min: 0,
    max: 95
  },
  sweetness: {
    type: Number,
    min: 1,
    max: 5,
    default: 3
  },
  acidity: {
    type: Number,
    min: 1,
    max: 5,
    default: 3
  },
  body: {
    type: Number,
    min: 1,
    max: 5,
    default: 3
  },
  scents: [String],
  tastes: [String],
  description: String,
  imageUrl: String,
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Drink = mongoose.model('Drink', drinkSchema);

export default Drink;
