const mongoose = require('mongoose');

const GadgetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'smartphone',
        'laptop',
        'tablet',
        'smartwatch',
        'headphones',
        'camera',
        'gaming',
        'other',
      ],
      default: 'other',
      // e.g 'smartphone', 'laptop'
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be greater than 0'],
    },
    specifications: {
      Processor: {
        type: String,
        required: [true, 'Processor is required'],
      }, // e.g 'A17 Bionic chip'
      RAM: {
        type: String,
        required: [true, 'RAM is required'],
      }, // e.g '8GB'
      Storage: {
        type: String,
        required: [true, 'Storage is required'],
      }, // e.g '256GB'
      ScreenSize: {
        type: String,
        required: [true, 'Screen size is required'],
      }, // e.g '6.1 inches'
      Battery: {
        type: String,
        required: [true, 'Battery is required'],
      }, // e.g '3200mAh'
      Camera: {
        type: String,
        required: [true, 'Camera is required'],
      }, // e.g '12MP'
      OS: {
        type: String,
        required: [true, 'OS is required'],
      }, // e.g 'iOS 17'
    },
    images: [
      {
        url: String,
        altText: {
          type: String,
          // default should be the name of the gadget
          default: this.name,
        },
      },
    ],
    releaseDate: {
      type: Date,
    },
    rating: {
      average: {
        type: Number,
        default: 0,
        min: [0, 'Rating cannot be less than 0'],
        max: [5, 'Rating cannot be greater than 5'],
      },
      count: {
        type: Number,
        default: 0,
        min: [0, 'Rating count cannot be negative'],
      },
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Added by is required'],
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Gadget', GadgetSchema);
