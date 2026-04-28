import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
      minlength: [2, 'Student name must be at least 2 characters'],
      maxlength: [50, 'Student name cannot exceed 50 characters'],
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      enum: {
        values: [
          'Mathematics',
          'Physics',
          'Chemistry',
          'Biology',
          'Computer Science',
          'History',
          'English',
          'Other'
        ],
        message: '{VALUE} is not a valid subject',
      },
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
      validate: {
        validator: Number.isInteger,
        message: 'Rating must be an integer',
      },
    },
    comments: {
      type: String,
      trim: true,
      maxlength: [500, 'Comments cannot exceed 500 characters'],
      default: '',
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
feedbackSchema.index({ subject: 1, createdAt: -1 });
feedbackSchema.index({ studentName: 1 });

// Middleware to update the updatedAt field
feedbackSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
