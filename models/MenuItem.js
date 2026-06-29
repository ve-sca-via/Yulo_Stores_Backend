import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema(
  {
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
    name: { type: String, required: true, trim: true },
    description: { type: String },
    image: { type: String },
    prepTime: { type: Number },
    foodType: { type: String, enum: ['veg', 'non_veg', 'egg'], required: true },
    sellingPrice: { type: Number, required: true, min: 0 },
    discountedPrice: { type: Number, default: null },
    ingredients: [String],
    isAvailable: { type: Boolean, default: true },
    addons: [{
      name: { type: String, required: true },
      foodType: { type: String, enum: ['veg', 'non_veg', 'egg'], default: 'veg' },
      quantity: { type: Number, default: 1 },
      unit: { type: String, default: 'Piece' },
      price: { type: Number, required: true },
      image: { type: String, default: null },
      imagePublicId: { type: String, default: null },
      isAvailable: { type: Boolean, default: true },
    }],
  },
  { timestamps: true }
);

menuItemSchema.virtual('effectivePrice').get(function () {
  return this.discountedPrice ?? this.sellingPrice;
});

menuItemSchema.set('toJSON', { virtuals: true });
menuItemSchema.set('toObject', { virtuals: true });

menuItemSchema.index({ restaurantId: 1, categoryId: 1 });
menuItemSchema.index({ restaurantId: 1, isAvailable: 1 });
menuItemSchema.index({ name: 'text' });

export default mongoose.model('MenuItem', menuItemSchema);
