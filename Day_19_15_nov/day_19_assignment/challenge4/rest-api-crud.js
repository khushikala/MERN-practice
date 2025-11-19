
const express = require("express");

const app = express();
// midleware to pass json data
app.use(express.json());


let books= [{id:1 , title:"Master Express.js", author:"Azat Mardan"},
    {id:2, title:"Node.js",author:"Sebastian Springer"}
];



// return all books
app.get("/books",(req,res)=>{
    res.json(books);
});

// post  to add new book
app.post("/books",(req,res)=>{
    const{title,author}=req.body;

    // velidation
    if(!title || ! author){
        return resizeBy.status(400).json({error:"title and author are required"});
    }
    
  const newBooks = {
    // generate id
    id:books.length +1,
    title,
    author
  }

  books.push(newBooks);

  res.status(201).json({message:"Book added successfully" ,book:newBooks});
  });


//put to  update book
  app.put("/books/:id",(req,res)=>{
    // get book id from url params
    const bookId = parseInt(req.params.id);
    const {title , author}= req.body;
    // find book
    const book =books.find(b=> b.id === bookId);
    if(!book){
        return res.status(400).json({error:"Book not found"});
    }

    if(title){
        book.title=title;
    }

    if(author){
        book.author=author;
    }
    res.json({message:"Book updated successfully", book});
  });

  // delete book
  app.delete("/books/:id",(req,res)=>{
    const bookId = parseInt(req.params.id);

    // find book
    const index = books.findIndex(b=> b.id === bookId);

    if(index === -1){
        return res.status(400).json({error:"Book not found"});
    }
   const deletedBook = books.splice(index,1);
    res.json({message:"Book deleted successfully",book:deletedBook});
  });

  
  // start server 

  app.listen(4000,()=>{
    console.log("Visiting http://localhost:4000");
  });