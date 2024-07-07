// import the mongoose library 

const mongoose = require('mongoose')

// create the schema 

const UserSchema = new mongoose.Schema({
    Name : String,
    Email : String,
    Age : Number
})

// create the model it will take two arguments collection name, and schema name 

const UserModel = mongoose.model("users", UserSchema)

module.exports = UserModel;

/*

In the context of Mongoose and MongoDB:

Collection: In MongoDB, a collection is a group of documents stored in the database. It is roughly equivalent to a table in a relational database. Each collection is uniquely identified by its name and can contain any number of documents. Documents within a collection do not need to have the same structure or fields.

Schema: A schema in Mongoose is a blueprint that defines the structure of documents in a MongoDB collection. It specifies the fields and their types that a document in the collection can have. While MongoDB itself is schema-less, Mongoose adds a layer of schema validation and type casting to ensure that data stored in the database conforms to the specified schema.

Model: A model in Mongoose is a constructor function that represents a collection in MongoDB and provides an interface for querying and manipulating documents in that collection. Models are created using the mongoose.model() method, which takes two arguments: the name of the collection and the schema that defines the structure of documents in the collection. Models allow you to perform CRUD (Create, Read, Update, Delete) operations on the documents in the collection.

In summary, a collection is a group of documents, a schema defines the structure of documents in a collection, and a model provides an interface for interacting with documents in a collection based on the defined schema.




*/