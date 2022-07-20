import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a title for the review'],
    maxlength: 100,
  },
  text: {
    type: String,
    required: [true, 'Please add some text'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, 'Please add a rating between 1 and 10'],
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

ReviewSchema.statics.getAverageRating = async function (bootcampId) {
  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: {
        _id: '$bootcamp',
        averageRating: { $avg: '$rating' },
      },
    },
  ]);

  const averageRating = obj && obj[0] && obj[0]['averageRating'];

  return averageRating ? Math.ceil(averageRating) : 0;
};

ReviewSchema.post('save', async function () {
  const averageRating = await this.constructor.getAverageRating(this.bootcamp);

  try {
    await this.model('Bootcamp').findByIdAndUpdate(this.bootcamp, {
      averageRating,
    });
  } catch (err) {
    console.log(err);
  }
});

ReviewSchema.post('remove', async function () {
  const averageRating = await this.constructor.getAverageRating(this.bootcamp);

  try {
    await this.model('Bootcamp').findByIdAndUpdate(this.bootcamp, {
      averageRating,
    });
  } catch (err) {
    console.log(err);
  }
});

export const Review = new mongoose.model('Review', ReviewSchema);
