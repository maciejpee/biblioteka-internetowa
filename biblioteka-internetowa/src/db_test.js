var books = []
db.collection('books').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        //console.log("Autor: " + doc.data().author)
        //console.log(doc.data())
        books.push(doc.data())
    });
    console.log(books)
})