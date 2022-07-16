import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a course title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  weeks: {
    type: String,
    required: [true, 'Please add number of weeks'],
  },
  tuition: {
    type: Number,
    required: [true, 'Please add a tuition cost'],
  },
  minimumSkill: {
    type: String,
    required: [true, 'Please add a minimum skill'],
    enum: ['beginner', 'intermediate', 'advanced'],
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
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

CourseSchema.statics.getAverageCost = async function (bootcampId) {
  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: {
        _id: '$bootcamp',
        averageCost: { $avg: '$tuition' },
      },
    },
  ]);

  const averageCost = obj && obj[0] && obj[0]['averageCost'];

  return averageCost ? Math.ceil(obj && obj[0] && obj[0]['averageCost']) : 0;
};

CourseSchema.post('save', async function () {
  const averageCost = await this.constructor.getAverageCost(this.bootcamp);

  try {
    await this.model('Bootcamp').findByIdAndUpdate(this.bootcamp, {
      averageCost,
    });
  } catch (err) {
    console.log(err);
  }
});

CourseSchema.post('remove', async function () {
  const averageCost = await this.constructor.getAverageCost(this.bootcamp);
  console.log(averageCost);
  try {
    await this.model('Bootcamp').findByIdAndUpdate(this.bootcamp, {
      averageCost,
    });
  } catch (err) {
    console.log(err);
  }
});

export const Course = mongoose.model('Course', CourseSchema);
