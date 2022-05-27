<template>
    <div id="mainDiv">
        <div class="container">
            <form class="row g-3 justify-content-md-center">
                <div class="col-md-6">
                    <label for="inputTitle" class="form-label">Tytuł</label>
                    <input type="text" class="form-control" id="inputTitle" v-model="title">
                </div>

                <div class="col-md-6">
                    <label for="inputAuthor" class="form-label">Autor</label>
                    <input type="text" class="form-control" id="inputAuthor" v-model="author">
                </div>

                <div class="col-md-8">
                    <label for="inputSeries" class="form-label">Cykl</label>
                    <input type="text" class="form-control" id="inputSeries" v-model="series">
                </div>

                <div class="col-md-4">
                    <label for="inputVolume" class="form-label">Numer tomu</label>
                    <input type="number" class="form-control" id="inputVolume" v-model="volume">
                </div>

                <div class="col-md-8">
                    <label for="inputGenre" class="form-label">Gatunki</label>
                    <input type="text" class="form-control" id="inputGenre" v-model="genre">
                </div>

                <div class="col-md-4">
                    <label for="inputPages" class="form-label">Ilość stron</label>
                    <input type="number" class="form-control" id="inputPages" v-model="pageCount">
                </div>

                <div class="col-md-8">
                    <label for="inputPublishing" class="form-label">Wydawnictwo</label>
                    <input type="text" class="form-control" id="inputPublishing" v-model="publishing">
                </div>

                <div class="col-md-4">
                    <label for="inputRelease" class="form-label">Rok wydania</label>
                    <input type="number" class="form-control" id="inputRelease" v-model="releaseYear">
                </div>

                <div class="col-md-8">
                    <label for="inputIsbn" class="form-label">ISBN</label>
                    <input type="text" class="form-control" id="inputIsbn" v-model="isbn">
                </div>

                <div class="col-md-4">
                    <label for="inputCopies" class="form-label">Ilość egzemplarzy</label>
                    <input type="number" class="form-control" id="inputCopies" v-model="copies">
                </div>

                <div class="col-md-6">
                    <label for="inputOriginalTitle" class="form-label">Tytuł oryginału</label>
                    <input type="text" class="form-control" id="inputOriginalTitle" v-model="originalTitle">
                </div>

                <div class="col-md-6">
                    <label for="inputTranslation" class="form-label">Tłumaczenie</label>
                    <input type="text" class="form-control" id="inputTranslation" v-model="translation">
                </div>

                <div class="col-md-12">
                    <label for="inputDesc" class="form-label">Opis</label>
                    <textarea class="form-control" id="inputDesc" rows="8" v-model="desc"></textarea>
                </div>

                <div class="col-md-12">
                    <label for="formFile" class="form-label">Okładka</label>
                    <input class="form-control" type="file" id="formFile" @change="handleFileUpload( $event )">
                </div>
                <br><br><br><br>
                <div class="d-grid">
                    <button class="btn btn-primary" type="button" @click="addBook">Dodaj książkę</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    const title = ref(null)
    const author = ref(null)
    const series = ref(null)
    const volume = ref(null)
    const cover = ref(null)
    const releaseYear = ref(null)
    const desc = ref(null)
    const pageCount = ref(null)
    const genre = ref(null)
    const publishing = ref(null)
    const isbn = ref(null)
    const originalTitle = ref(null)
    const translation = ref(null)
    const copies = ref(null)

    function handleFileUpload(event) {
        cover.value = event.target.files[0]
    }
    
    function addBook() {
        var storage = firebase.storage().ref(cover.value.name)
        var uploadTask = storage.put(cover.value)

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log('Upload is ' + progress + '% done')
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        console.log('Upload is paused')
                        break
                    case firebase.storage.TaskState.RUNNING:
                        console.log('Upload is running')
                        break
                }
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        break
                    case 'storage/canceled':
                        break
                    case 'storage/unknown':
                        break
                 }
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    console.log('File available at', downloadURL)

                    var genreArr = genre.value.split(", ")

                    var copiesArr = []
                    for (let i = 0; i < copies.value; i++) {
                        copiesArr.push(null)
                    }

                    db.collection('books').add({
                        title: title.value,
                        author: author.value,
                        series: series.value,
                        volume: volume.value,
                        release_year: releaseYear.value,
                        desc: desc.value,
                        page_count: pageCount.value,
                        publishing: publishing.value,
                        isbn: isbn.value,
                        original_title: originalTitle.value,
                        translation: translation.value,
                        cover: downloadURL,
                        genre: genreArr,
                        copies: copiesArr,
                    })
                })
            }
        )
    }
</script>

<style>

</style>