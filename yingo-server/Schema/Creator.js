const CreatorSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    traits: {
      type: [String],
      required: true
    }
  });
  
  const YouTuber = mongoose.model('Creator', CreatorSchema);
  