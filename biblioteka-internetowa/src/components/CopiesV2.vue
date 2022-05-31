<template>
    <div class="row">
        <div class="col-auto me-auto">
            <p>Dostępne egzemplarze: {{copiesAvailable}}/{{copiesArr.length}}</p>
            
        </div>
        <div class="col-auto" v-if="copiesAvailable > 0">
            <button class="btn btn-success" type="button" @click="borrowBook">Wypożycz</button>
        </div>
        <div class="col-auto" v-else>
            <button class="btn btn-danger" type="button">Zapisz się do kolejki</button>
        </div>
        
    </div>
    
    
</template>

<script setup>
    import { ref, onMounted } from 'vue'

    const props = defineProps(["copies", 'bookId'])
    const nearestDate = ref(null)
    const copiesArr = ref([])
    const copiesFinal = ref([])
    const copiesAvailable = ref(0)
    const user = firebase.auth().currentUser;
    
    onMounted(() => {
        for (let copy of props.copies){
            copiesArr.value.push(copy)
            if (!copy.date){
                copiesAvailable.value = copiesAvailable.value + 1
            }
        }
    })

    function borrowBook(){
        let copyFound = false
        let currentDate = new Date()
        let borrowDate = firebase.firestore.Timestamp.fromDate(currentDate)
        
        currentDate.setMonth(currentDate.getMonth()+1)

        let returnDate = firebase.firestore.Timestamp.fromDate(currentDate)


        for (let copy of copiesArr.value){
            copiesArr.value[copy.index] = copy.date
            if (!copyFound){
                if (!copy.date){
                    copiesArr.value[copy.index] = borrowDate
                    copyFound = true
                }
            }
            
        }
        
        db.collection("books").doc(props.bookId).update({
            copies: copiesArr.value
       })

        db.collection("users").doc(user.uid).update({
            borrowed: firebase.firestore.FieldValue.arrayUnion({bookId:props.bookId, borrowDate:borrowDate, returnDate:returnDate})
      })
        
    }

</script>

<style>
</style>