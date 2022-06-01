<template>
    <div class="row">
        <div class="col-auto me-auto">
            <p>Dostępne egzemplarze: {{copiesAvailable}}/{{copiesArr.length}}</p>
            
        </div>
        <div class="col-auto" v-if="copiesAvailable > 0 & !alreadyBorrowed">
            <button class="btn btn-success" type="button" @click="borrowBook">Wypożycz</button>
        </div>
        <div v-else-if="alreadyBorrowed">
            <div style="background-color: red">Już wypożyczyłeś tę książkę</div>
        </div>
        <div class="col-auto" v-else>
            <button class="btn btn-danger" type="button" @click="signToQueue" v-if="!alreadyInQueue">Zapisz się do kolejki</button>
            <div v-else>Jesteś już zapisany do kolejki na pozycji {{queuePosition}}</div>
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
    const alreadyBorrowed = ref(false)
    const alreadyInQueue = ref(false)
    const queuePosition = ref(0)
    
    
    onMounted(() => {
        for (let copy of props.copies){
            copiesArr.value.push(copy)
            if (!copy.date){
                copiesAvailable.value = copiesAvailable.value + 1
            }
        }
        db.collection("users").doc(user.uid).get().then((doc)=>{
            console.log(doc.data().borrowed);
            for (let m of doc.data().borrowed){
                for(let [key, value] of Object.entries(m)){
                    if (key == 'bookId'){
                        if (value == props.bookId){
                            alreadyBorrowed.value = true
                        }
                    }
                }
            }
        })
        db.collection("books").doc(props.bookId).get().then((doc)=>{
            console.log(doc.data().copies_queue);
            for (let m of doc.data().copies_queue){
                   if (m == user.uid){
                       alreadyInQueue.value = true
                       queuePosition.value += 1
                   }
            }
        })
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
                if (!copy.date | copy.date == ''){
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

    function signToQueue(){

       if (!alreadyInQueue.value){
        db.collection("books").doc(props.bookId).update({
            copies_queue: firebase.firestore.FieldValue.arrayUnion(user.uid)

       })

    }
}

</script>

<style>
</style>