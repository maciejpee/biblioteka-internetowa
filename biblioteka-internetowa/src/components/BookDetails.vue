<template>
    <div id="mainDiv">
        <h1>{{ bookDetails.title }} - {{ bookDetails.author }}</h1>
        <p>{{ bookDetails.desc }}</p>
    </div>
</template>

<script> 
    export default {
        props: ['bookId'],
        data() {
            return {
                bookDetails: {},
            }
        },
        created() { 
            db.collection('books').doc(this.bookId).get().then((doc) => {
                this.bookDetails['title'] = doc.data().title,
                this.bookDetails['author'] = doc.data().author
                this.bookDetails['desc'] = doc.data().desc
            })
        }  
    }
</script>