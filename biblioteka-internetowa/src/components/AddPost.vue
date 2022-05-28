<template>
    <div id="mainDiv">
        <div class="container">
            <form class="row g-3 justify-content-md-center" @submit.prevent="addPost">
              
                <div class="col-md-4">
                    <label for="inputTitle" class="form-label" >Tytuł</label>
                    <input type="text" class="form-control" id="inputTitle" v-model="title" :class="{error: titleNotValid}">
                </div>
                <div class="col-md-8">
                    <label for="inputAbout" class="form-label">Opis</label>
                    <input type="text" class="form-control" id="inputAbout" v-model="about" :class="{error: aboutNotValid}">
                </div>
                <div class="col-md-12">
                    <label for="inputContent" class="form-label">Treść</label>
                    <textarea class="form-control" id="inputContent" rows="8" v-model="content" :class="{error: contentNotValid}"></textarea>
                </div>
                <div class="col-md-6">
                    <label for="inputTags" class="form-label">Tagi</label>
                    <input type="text" class="form-control" id="inputTags" v-model="tags" :class="{error: tagsNotValid}">
                </div>
                
                <div class="col-md-6">
                    <button class="btn btn-primary" type="submit"       
                    style="margin: 2.5%; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%); width:35%">Dodaj post</button>
                </div>
            </form>
              <p v-if="errors.size">
                    <b>Wystąpiły blędy:</b>
                    <ul>
                        <li v-for="error in errors" :key="error">
                                {{ error }}
                        </li>
                    </ul>
                </p>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    const about = ref('')
    const content = ref('')
    const tags = ref('')
    const title = ref('')
    const errors = ref(new Set([]))
    const titleNotValid = ref(false)
    const aboutNotValid = ref(false)
    const contentNotValid = ref(false)
    const tagsNotValid = ref(false)
    
    function addPost() {

        if (title.value.length < 5){
            errors.value.add('tytul')
            titleNotValid.value = true
        }else{
            errors.value.delete('tytul')
            titleNotValid.value = false
        }

        if (about.value.length < 5){
            errors.value.add('opis')
            aboutNotValid.value = true
        }else{
            errors.value.delete('opis')
            aboutNotValid.value = false
        }

        if (content.value.length < 5){
            errors.value.add('tresc')
            contentNotValid.value = true
        }else{
            errors.value.delete('tresc')
            contentNotValid.value = false
        }
        console.log(titleNotValid.value)
       
        var tagsArr = tags.value.split(', ')
        
        if (tagsArr[0] == ''){
            errors.value.add('tagi')
            tagsNotValid.value = true
        }else{
            errors.value.delete('tagi')
            tagsNotValid.value = false
        }
        
        if (errors.value.size == 0){
        db.collection('news').add({
                    about: about.value,
                    content: content.value,
                    date: firebase.firestore.Timestamp.fromDate(new Date()),
                    title: title.value,
                    tags: tagsArr
    }
    )}
    
    }
    

</script>

<style>
.error{
    border: 2px solid red;
}
</style>