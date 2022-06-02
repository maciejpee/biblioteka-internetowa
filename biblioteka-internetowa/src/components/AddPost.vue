<template>
    <div id="mainDiv">
        <div class="container">
            <form class="row g-3 justify-content-md-center" @submit.prevent="addPost">

                <div class="col-md-1"></div>
                <div class="col-md-10">
                    <label for="inputTitle" class="form-label" >Tytuł</label>
                    <input type="text" class="form-control" id="inputTitle" v-model="title" :class="titleWarning">
                    <small v-show="titleAlertVisible" id="titleHelpBlock" class="form-text text-danger">
                    Tytuł powinien mieć co najmniej 10 znaków.
                    </small>
                </div>
                <div class="col-md-1"></div>

                <div class="col-md-1"></div>
                <div class="col-md-10">
                    <label for="inputContent" class="form-label">Treść</label>
                    <textarea class="form-control" id="inputContent" rows="8" v-model="content" :class="contentWarning"></textarea>
                    <small v-show="contentAlertVisible" id="contentHelpBlock" class="form-text text-danger">
                    Treść powinina zawierać co najmniej 50 znaków.
                    </small>
                </div>
                <div class="col-md-1"></div>

                <div class="col-md-1"></div>
                <div class="col-md-5">
                    <label for="inputAbout" class="form-label">Opis</label>
                    <input type="text" class="form-control" id="inputAbout" v-model="about" :class="aboutWarning">
                    <small v-show="aboutAlertVisible" id="aboutHelpBlock" class="form-text text-danger">
                    Opis powinien mieć co najmniej 10 znaków (data dodawana jest od razu).
                    </small>
                </div>
                <div class="col-md-5">
                    <label for="inputTags" class="form-label">Tagi</label>
                    <input type="text" class="form-control" id="inputTags" v-model="tags" :class="tagsWarning">
                    <small v-show="tagsAlertVisible" id="tagsHelpBlock" class="form-text text-danger">
                    Należy podać conajmniej 1 tag.
                    </small>
                </div>
                <div class="col-md-1"></div>
                
                <div class="col-md-6 d-grid text-center">
                    <button class="btn btn-primary" type="submit" style="width:250px">Dodaj post</button>
                </div>
            </form>
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
    const titleAlertVisible = ref(false)
    const aboutAlertVisible = ref(false)
    const contentAlertVisible = ref(false)
    const tagsAlertVisible = ref(false)


    const titleWarning = ref('')
    const aboutWarning = ref('')
    const contentWarning = ref('')
    const tagsWarning = ref('')
    
    function addPost() {
        titleAlertVisible.value = false
        aboutAlertVisible.value = false
        contentAlertVisible.value = false
        tagsAlertVisible.value = false

        titleWarning.value = ''
        aboutWarning.value = ''
        contentWarning.value = ''
        tagsWarning.value = ''


        if (title.value.length < 10){
            titleAlertVisible.value = true
            titleWarning.value = 'border-danger'
            errors.value.add('title')
        }else{
            errors.value.delete('title')
        }
        if (about.value.length < 10){
            aboutAlertVisible.value = true
            aboutWarning.value = 'border-danger'
            errors.value.add('about')
        }else{
            errors.value.delete('about')
        }
        if (content.value.length < 50){
            contentAlertVisible.value = true
            contentWarning.value = 'border-danger'
            errors.value.add('content')
        }else{
            errors.value.delete('content')
        }

        var tagsArr = tags.value.split(',')
        if (tagsArr[0] == ''){
            tagsAlertVisible.value = true
            tagsWarning.value = 'border-danger'
            errors.value.add('tags')
        }else{
            errors.value.delete('tags')
        }

       
        if (errors.value.size == 0){
        db.collection('news').add({
                    about: about.value,
                    content: content.value,
                    date: firebase.firestore.Timestamp.fromDate(new Date()),
                    title: title.value,
                    tags: tagsArr
    }
    ).then( () =>{
        alert('Dodano do bazy')
        location.reload()
    })
    }
    
    }
    

</script>

<style scoped>
.error{
    border: 2px solid red;
}

input, textarea {
  padding: 8px;
  border: 0;
  box-shadow: 0 0 15px 4px rgba(0,0,0,0.03);
  border-radius: 6px;
  margin-bottom: 11px;
}

.form-label {
    font-size: 14px;
    opacity: 0.8;
    margin-bottom: -5px;
    margin-top: 15px;
}

.d-grid {
    margin-top: 40px;
}

.container {
    padding-bottom: 42px;
}
</style>