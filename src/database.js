const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb+srv://kelvinn01:pollitopio01@kelvinn-l4hwk.mongodb.net/test?retryWrites=true&w=majority', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: true

})
  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err));