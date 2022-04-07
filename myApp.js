var mongoose = require('mongoose');
require('dotenv').config();

const mySecret = process.env['MONGO_URI'];
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });

//create a person schema called personSchema
const { Schema } = mongoose;
const personSchema = new Schema({
  name : { type: String, required: true },
  age :  Number,
  favoriteFoods : [String]
});
//create a model called Person from the personSchema
const Person = mongoose.model("Person", personSchema);

var createAndSavePerson = (done) => {
  var personA = new Person({name: "Alan", age:30, favoriteFoods:["eggs","lemon","salmon"]});
/*
person.save(function(err, data) {
  //   ...do your stuff here...
});
*/
  personA.save(function(err, data) {
     if (err) return console.error(err);
    done(null, data)
});
};

//Create many People with `Model.create()`
var arrayOfPeople = [
  {name: "Brian", age:30, favoriteFoods:["banana","lemon","salmon"]},
  {name: "Charlie", age:30, favoriteFoods:["chocolate","lemon","salmon"]}
];

const createManyPeople = (arrayOfPeople, done) => {
Person.create(arrayOfPeople, (err, people) => {
 if (err) return console.error(err);
    done(null, people)
});
};

//Use model.find() to Search Your Database
const findPeopleByName = (personName, done) => {
Person.find({name: personName}, (err, personFound) => {
 if (err) return console.error(err);
    done(null, personFound)
});
};

//Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food, done) => {
Person.findOne({favoriteFoods: food}, (err, personFound) => {
 if (err) return console.error(err);
    done(null, personFound)
});
};

//MongoDB automatically adds the field _id
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, personFound) => {
    if (err) return console.error(err);
    done(null, personFound)
});
};
//Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

    // .findById() method to find a person by _id with the parameter personId as search key. 
    Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};
//Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    {name: personName}, 
    {age: ageToSet},
    {new: true},
    (err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
};

//findByIdAndRemove()
const removeById = (personId, done) => {
  Person.findByIdAndRemove(
    personId,  
    (err, personFound) => {
    if (err) return console.error(err);
    done(null, personFound)
    }
  )
};
//remove()
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove(
    {name: nameToRemove},  
    (err, personFound) => {
    if (err) return console.error(err);
    done(null, personFound)
    }
  )
};
//Chain Search Query Helpers to Narrow Search Results
const queryChain = (done) => {
  
  const foodToSearch = "burrito";
  
  Person.find({ favoriteFoods: foodToSearch })
        .sort({ name:1 })// Here: 1 for ascending	order and -1 for descending order.
        .limit(2)// return array which has n items in it.
        .select({ age: 0 })// Here: 0 means false and thus hide name property; 1 means true so age property will show.
        .exec((err, peopleFound) => {
           if (err) return console.error(err);
            done(null, peopleFound)
          })//callback to exec()
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
