var books = []
db.collection('books').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        books.push(doc.data())
    });
    console.log(books)
})