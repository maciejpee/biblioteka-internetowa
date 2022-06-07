<template>
    <div class="mainDiv">
        <div class="container">
            <h3 class="title">Dodaj książkę</h3>
            <hr class="hr-title">
            <form class="row g-3 justify-content-md-center" @submit.prevent="addBook">

                <div class="col-md-1"></div>
                <div class="col-md-5">
                    <label for="inputTitle" class="form-label">Tytuł</label>
                    <input type="text" class="form-control green" id="inputTitle" v-model="title" :class="titleWarning">
                    <small v-show="titleAlertVisible" id="titleHelpBlock" class="form-text text-danger">
                    Tytuł nie może być pusty.
                    </small>
                </div>
                <div class="col-md-1"></div>
                
                <div class="col-md-4">
                    <label for="inputAuthor" class="form-label">Autor</label>
                    <input type="text" class="form-control green" id="inputAuthor" v-model="author" :class="authorWarning">
                    <small v-show="authorAlertVisible" id="authorHelpBlock" class="form-text text-danger">
                    Autor nie może być pusty.
                    </small>
                </div>
                <div class="col-md-1"></div>

                <div class="col-md-1"></div>
                <div class="col-md-5">
                    <label for="inputOriginalTitle" class="form-label">Tytuł oryginału</label>
                    <input type="text" class="form-control green" id="inputOriginalTitle" v-model="originalTitle" :class="originalTitleWarning">
                    <small v-show="originalTitleAlertVisible" id="originalTitleHelpBlock" class="form-text text-danger">
                    Tytuł oryginału nie może być pusty.
                    </small>
                </div>
                <div class="col-md-1"></div>

                <div class="col-md-4">
                    <label for="inputTranslation" class="form-label">Tłumaczenie</label>
                    <input type="text" class="form-control green" id="inputTranslation" v-model="translation" :class="translationWarning">
                    <small v-show="translationAlertVisible" id="translationHelpBlock" class="form-text text-danger">
                    Pole tłumaczenia nie może być puste.
                    </small>
                </div>
                <div class="col-md-1"></div>

                <div class="col-md-1"></div>
                <div class="col-md-5">
                    <label for="inputSeries" class="form-label">Cykl</label>
                    <input type="text" class="form-control green" id="inputSeries" v-model="series" :class="seriesWarning">
                    <small v-show="seriesAlertVisible" id="cycleHelpBlock" class="form-text text-danger">
                    Cykl nie może być pusty.
                    </small>
                </div>

                <div class="col-md-1"></div>
                <div class="col-md-2">
                    <label for="inputVolume" class="form-label">Numer tomu</label>
                    <input type="number" class="form-control green" id="inputVolume" v-model="volume" :class="volumeWarning">
                    <small v-show="volumeAlertVisible" id="tomeHelpBlock" class="form-text text-danger">
                    Numer tomu nie może być pusty.
                    </small>
                </div>
                <div class="col-md-2">
                    <label for="inputPages" class="form-label">Ilość stron</label>
                    <input type="number" class="form-control green" id="inputPages" v-model="pageCount" :class="pageWarning">
                    <small v-show="pageAlertVisible" id="pageHelpBlock" class="form-text text-danger">
                    Ilość stron nie może być pusta.
                    </small>
                </div>
                <div class="col-md-1"></div>

                <div class="col-md-1"></div>
                <div class="col-md-5">
                    <label for="inputPublishing" class="form-label">Wydawnictwo</label>
                    <input type="text" class="form-control green" id="inputPublishing" v-model="publishing" :class="publishingWarning">
                    <small v-show="publishingAlertVisible" id="publishingHelpBlock" class="form-text text-danger">
                    Wydawca nie może być pusty.
                    </small>
                </div>

                <div class="col-md-1"></div>
                <div class="col-md-2">
                    <label for="inputRelease" class="form-label">Rok wydania</label>
                    <input type="number" class="form-control green" id="inputRelease" v-model="releaseYear" :class="releaseYearWarning">
                    <small v-show="releaseYearAlertVisible" id="releaseYearHelpBlock" class="form-text text-danger">
                    Rok wydania nie może być pusty.
                    </small>
                </div>
                <div class="col-md-2">
                    <label for="inputCopies" class="form-label">Ilość egzemplarzy</label>
                    <input type="number" class="form-control green" id="inputCopies" v-model="copies" :class="copiesWarning">
                    <small v-show="copiesAlertVisible" id="copiesHelpBlock" class="form-text text-danger">
                    Ilość egzemplarzy nie może być pusta.
                    </small>
                </div>
                <div class="col-md-1"></div>

                <div class="col-md-1"></div>
                <div class="col-md-5">
                    <label for="inputGenre" class="form-label">Gatunki</label>
                    <input type="text" class="form-control green" id="inputGenre" v-model="genre" :class="genreWarning">
                    <small v-show="genreAlertVisible" id="genreHelpBlock" class="form-text text-danger">
                    Gatunek nie może być pusty.
                    </small>
                </div>

                <div class="col-md-1"></div>
                <div class="col-md-4">
                    <label for="inputIsbn" class="form-label">ISBN</label>
                    <input type="text" class="form-control green" id="inputIsbn" v-model="isbn" :class="isbnWarning">
                    <small v-show="isbnAlertVisible" id="isbnHelpBlock" class="form-text text-danger">
                    Numer ISBN nie może być pusty.
                    </small>
                </div>
                <div class="col-md-1"></div>

                <div class="col-md-1"></div>
                <div class="col-md-10">
                    <label for="inputDesc" class="form-label">Opis</label>
                    <textarea class="form-control green" id="inputDesc" rows="8" v-model="desc" :class="descWarning"></textarea>
                    <small v-show="descAlertVisible" id="descHelpBlock" class="form-text text-danger">
                    Opis nie może być pusty.
                    </small>
                </div>
                <div class="col-md-1"></div>

                <div class="col-md-1"></div>
                <div class="col-md-10">
                    <label for="formFile" class="form-label">Okładka</label>
                    <input class="form-control green" type="file" id="formFile" @change="handleFileUpload( $event )" :class="coverWarning">
                    <small v-show="coverAlertVisible" id="coverHelpBlock" class="form-text text-danger">
                    Okładka nie może być pusta.
                    </small>
                </div>
                <div class="col-md-1"></div>

                <div class="col-md-1"></div>
                <div v-show="successAlertVisible" class="col-md-5 alert alert-success text-center" role="alert">
                Książka dodana pomyślnie! Możesz dodawać kolejne pozycje.
                </div>
                <div class="col-md-1"></div>
                
                <div class="col-md-12 text-center">
                    <button class="btn btn-success shadow-none" type="submit" style="width:250px">Dodaj książkę</button>
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
    
    const errors = ref(new Set([]))

    const successAlertVisible = ref(false)

    //validation
    const titleAlertVisible = ref(false)
    const authorAlertVisible = ref(false)
    const seriesAlertVisible = ref(false)
    const volumeAlertVisible = ref(false)
    const coverAlertVisible = ref(false)
    const releaseYearAlertVisible = ref(false)
    const descAlertVisible = ref(false)
    const pageAlertVisible = ref(false)
    const genreAlertVisible = ref(false)
    const publishingAlertVisible = ref(false)
    const isbnAlertVisible = ref(false)
    const originalTitleAlertVisible = ref(false)
    const translationAlertVisible = ref(false)
    const copiesAlertVisible = ref(false)

    //error messages
    const titleWarning = ref('')
    const authorWarning = ref('')
    const seriesWarning = ref('')
    const volumeWarning = ref('')
    const coverWarning = ref('')
    const releaseYearWarning = ref('')
    const descWarning = ref('')
    const pageWarning = ref('')
    const genreWarning = ref('')
    const publishingWarning = ref('')
    const isbnWarning = ref('')
    const originalTitleWarning = ref('')
    const translationWarning = ref('')
    const copiesWarning = ref('')

    function handleFileUpload(event) {
        cover.value = event.target.files[0]
    }
    
    function addBook() {
        titleAlertVisible.value = false
        authorAlertVisible.value = false
        seriesAlertVisible.value = false
        volumeAlertVisible.value = false
        coverAlertVisible.value = false
        releaseYearAlertVisible.value = false
        descAlertVisible.value = false
        pageAlertVisible.value = false
        genreAlertVisible.value = false
        publishingAlertVisible.value = false
        isbnAlertVisible.value = false
        originalTitleAlertVisible.value = false
        translationAlertVisible.value = false
        copiesAlertVisible.value = false

        titleWarning.value = ''
        authorWarning.value = ''
        seriesWarning.value = ''
        volumeWarning.value = ''
        coverWarning.value = ''
        releaseYearWarning.value = ''
        descWarning.value = ''
        pageWarning.value = ''
        genreWarning.value = ''
        publishingWarning.value = ''
        isbnWarning.value = ''
        originalTitleWarning.value = ''
        translationWarning.value = ''
        copiesWarning.value = ''

        if (!title.value){
            titleAlertVisible.value = true
            titleWarning.value = 'border-danger'
            errors.value.add('title')
        }else{
            errors.value.delete('title')
        }

        if (!author.value){
            authorAlertVisible.value = true
            authorWarning.value = 'border-danger'
            errors.value.add('author')
        }else{
            errors.value.delete('author')
        }

        if (!releaseYear.value){
            releaseYearAlertVisible.value = true
            releaseYearWarning.value = 'border-danger'
            errors.value.add('rYear')
        }else{
            errors.value.delete('rYear')
        }
        
        if (!desc.value){
            descAlertVisible.value = true
            descWarning.value = 'border-danger'
            errors.value.add('desc')
        }else{
            errors.value.delete('desc')
        }

        if (!pageCount.value){
            pageAlertVisible.value = true
            pageWarning.value = 'border-danger'
            errors.value.add('page')
        }else{
            errors.value.delete('page')
        }

        if (!genre.value){
            genreAlertVisible.value = true
            genreWarning.value = 'border-danger'
            errors.value.add('genre')
        }else{
            errors.value.delete('genre')
        }

        if (!publishing.value){
            publishingAlertVisible.value = true
            publishingWarning.value = 'border-danger'
            errors.value.add('publishing')
        }else{
            errors.value.delete('publishing')
        }

        if (!isbn.value){
            isbnAlertVisible.value = true
            isbnWarning.value = 'border-danger'
            errors.value.add('isbn')
        }else{
            errors.value.delete('isbn')
        }

        if (!copies.value){
            copiesAlertVisible.value = true
            copiesWarning.value = 'border-danger'
            errors.value.add('copies')
        }else{
            errors.value.delete('copies')
        }

        if (!cover.value){
            coverAlertVisible.value = true
            coverWarning.value = 'border-danger'
            errors.value.add('cover')
        }else{
            errors.value.delete('cover')
        }

        if (errors.value.size == 0){
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

                        var queue = []

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
                            queue: queue,
                        })
                        .then(function onSuccess(res) {
                        successAlertVisible.value = true;
                        })
                        .catch(function onError(err) {
                        console.error(err);
                        })
                    })
                }
            )
        }
    }
</script>

<style scoped>
.container {
    padding-top: 0px;
    padding-bottom: 30px;
}
hr.hr-title {
    margin-bottom:45px;
}
</style>