const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const URI =
  'mongodb+srv://solo:solo123@cluster0.9yj6afl.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'solo',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const listSchema = new Schema({
  item: { type: String, required: true },
});

const List = mongoose.model('List', listSchema);

module.exports = List;
