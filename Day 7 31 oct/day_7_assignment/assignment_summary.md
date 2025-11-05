# MongoDB Data Modeling and CRUD Operations Assignment

## Database: BookVerseDB

### Collections Structure

#### Authors Collection
```javascript
{
  _id: ObjectId,
  name: String,
  nationality: String,
  birthYear: Number
}
```

#### Books Collection
```javascript
{
  _id: ObjectId,
  title: String,
  genre: String,
  publicationYear: Number,
  authorId: ObjectId, // Reference to Authors collection
  ratings: [{
    user: String,
    score: Number,
    comment: String
  }]
}
```

#### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  joinDate: Date
}
```

## User Story 1: Database Setup and Data Modeling

### Database Creation
```javascript
use BookVerseDB
```

### Sample Data Insertion

#### Authors Insertion
```javascript
db.Authors.insertMany([
  { name: "khushi", nationality: "indian", birthYear: 2002 },
  { name: "jony", nationality: "america", birthYear: 2000 },
  { name: "don", nationality: "russia", birthYear: 1995 }
]);
```

#### Books Insertion
```javascript
db.Books.insertMany([
  {
    "title": "1984",
    "genre": "Dystopian",
    "publicationYear": 1949,
    "authorId": ObjectId("69079b20dda5fb3b80596092"),
    "ratings": [{ "user": "khushi", "score": 5, "comment": "A chilling masterpiece." }]
  },
  // ... additional books
]);
```

#### Users Insertion
```javascript
db.Users.insertMany([
  {
    "name": "khushi",
    "email": "khushi@example.com",
    "joinDate": ISODate("2023-06-15T00:00:00Z")
  },
  // ... additional users
]);
```

## User Story 2: CRUD Operations

### Create Operations
```javascript
// Insert new author
db.Authors.insertOne({ name: "dac", nationality: "Indian", birthyear: 1970 });

// Insert new book
db.Books.insertOne({
  title: "globbi",
  genre: "Science Fiction",
  publicationYear: 1949,
  authorId: authorResult.insertedId,
  ratings: [{ "user": "yash", "score": 8, "comment": "Brilliant allegory." }]
});
```

### Read Operations
```javascript
// Find all Science Fiction books
db.Books.find({ genre: "Science Fiction" });

// Find all authors
db.Authors.find({});
```

### Update Operations
```javascript
// Update author birth year
db.Authors.updateOne(
  { name: "dac" },
  { $set: { birthyear: 2001 } }
);

// Update book title
db.Books.updateOne(
  { title: "1984" },
  { $set: { title: "crimes of the future" } }
);

// Add rating using $push
db.Books.updateOne(
  { title: "crimes of the future" },
  {
    $push: {
      ratings: {
        user: "harshu",
        score: 9,
        comment: "mind bending"
      }
    }
  }
);
```

### Delete Operations
```javascript
// Delete user
db.Users.deleteOne({ name: "dac" });
```

## User Story 3: Querying and Filtering Data

### Query 1: Books published after 2015
```javascript
db.Books.find({
  publicationYear: { $gt: 2015 }
});
```
**Expected Result:** Books with publicationYear > 2015 (Project Hail Mary - 2021)

### Query 2: Authors with Fantasy books
```javascript
db.Authors.aggregate([
  {
    $lookup: {
      from: "Books",
      localField: "_id",
      foreignField: "authorId",
      as: "books"
    }
  },
  {
    $match: {
      "books.genre": "Fantasy"
    }
  },
  {
    $project: {
      name: 1,
      nationality: 1,
      birthYear: 1,
      fantasyBooks: {
        $filter: {
          input: "$books",
          as: "book",
          cond: { $eq: ["$$book.genre", "Fantasy"] }
        }
      }
    }
  }
]);
```
**Expected Result:** Authors who wrote Fantasy books (khushi, don)

### Query 3: Users joined within last 6 months
```javascript
db.Users.find({
  joinDate: {
    $gte: ISODate("2025-05-01T00:00:00Z")
  }
});
```
**Expected Result:** Users with recent join dates (harsh - joined 2024-09-05)

### Query 4: Books with average rating > 4
```javascript
db.Books.aggregate([
  {
    $addFields: {
      averageRating: {
        $avg: "$ratings.score"
      }
    }
  },
  {
    $match: {
      averageRating: { $gt: 4 }
    }
  },
  {
    $project: {
      title: 1,
      genre: 1,
      publicationYear: 1,
      authorId: 1,
      ratings: 1,
      averageRating: 1
    }
  }
]);
```
**Expected Result:** Books with average rating > 4 (most books in collection)

## Data Relationships

- **One-to-Many**: Authors → Books (via authorId reference)
- **Embedded Documents**: Books → Ratings (embedded rating objects)

## Key Concepts Demonstrated

1. **NoSQL Data Modeling**: Schema design for MongoDB collections
2. **References vs Embedding**: Using references for authors, embedding for ratings
3. **CRUD Operations**: Create, Read, Update, Delete operations
4. **Query Operators**: $gt, $gte for comparisons
5. **Update Modifiers**: $set, $push for document updates
6. **Aggregation Framework**: $lookup, $match, $project, $addFields, $avg
7. **Array Operations**: Filtering embedded arrays
8. **Date Queries**: ISODate comparisons

## Files Included

- `BookVerseDB.Authors.json` - Exported Authors collection
- `BookVerseDB.Books.json` - Exported Books collection
- `BookVerseDB.Users.json` - Exported Users collection
- `user story 1 inserdata/` - Initial data insertion queries
- `user story 2 crud/Crud.ts` - TypeScript CRUD operations implementation
- `user story 3 queries/` - Filtering and aggregation queries