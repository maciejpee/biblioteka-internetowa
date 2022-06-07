<template>

    <div v-if="!user">
        <p>Musisz być zalogowany, żeby wypożyczyć książkę.</p>
    </div>

    <div v-else-if="alreadyBorrowed">
        <p>Wypożyczono książkę</p>
    </div>

    <div class="row" v-else-if="copiesAvailable > 0 & !alreadyBorrowed">
        <div class="col-auto me-auto">
            <p>Dostępnych egzemplarzy: {{copiesAvailable}}</p>
        </div>
        <div v-if="canBorrow" class="col-auto">
            <button  class="btn btn-success shadow-none" type="button" @click="borrowBook">Wypożycz</button>
        </div>
        <div v-else>
            <p>Osiągnałeś limit wypożyczeń (maksymalnie 5 książek).</p>
        </div>
    </div>
    
    <div v-else-if="alreadyInQueue">
        <p>Jesteś zapisany do kolejki na pozycji: {{queuePosition}}</p>
    </div>

    <div v-else>
        <button class="btn btn-warning" type="button" @click="signToQueue">Zapisz się do kolejki</button>
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
    const canBorrow = ref(false)
    onMounted(() => {
        for (let copy of props.copies){
            copiesArr.value.push(copy)
            if (!copy.date){
                copiesAvailable.value = copiesAvailable.value + 1
            }
        }
        if (user) {
            db.collection("users").doc(user.uid).get().then((doc)=>{
                console.log(doc.data().borrowed);
                if (doc.data().borrowed.length < 5){
                    canBorrow.value = true
                }
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
                if (doc.data().queue.includes(user.uid)) {
                    alreadyInQueue.value = true
                    queuePosition.value = doc.data().queue.indexOf(user.uid) + 1
                }
            })
             

        }
        
    })


    function borrowBook(){
        let copyFound = false
        let currentDate = new Date()
        let borrowDate = firebase.firestore.Timestamp.fromDate(currentDate)
        
        currentDate.setMonth(currentDate.getMonth()+1)

        let returnDate = firebase.firestore.Timestamp.fromDate(currentDate)

        if (canBorrow.value){
            for (let copy of copiesArr.value){
                copiesArr.value[copy.index] = copy.date
                if (!copyFound){
                    if (!copy.date | copy.date == ''){
                        copiesArr.value[copy.index] = borrowDate
                        copyFound = true
                    }
                }
                
            }
            alreadyBorrowed.value = true
            
            db.collection("books").doc(props.bookId).update({
                copies: copiesArr.value
           })
    
            db.collection("users").doc(user.uid).update({
                borrowed: firebase.firestore.FieldValue.arrayUnion({bookId:props.bookId, borrowDate:borrowDate, returnDate:returnDate})
          })
            
        }
        
    }

    function signToQueue(){ 
        db.collection('users').doc(user.uid).get().then((doc) => {
            var waiting = doc.data().waiting
            waiting.push(props.bookId)
            db.collection('users').doc(user.uid).update({
                waiting: waiting
        })})
        if (!alreadyInQueue.value){
        db.collection("books").doc(props.bookId).update({
            queue: firebase.firestore.FieldValue.arrayUnion(user.uid)
        })
        db.collection("books").doc(props.bookId).get().then((doc) => {
            alreadyInQueue.value = true
            queuePosition.value = doc.data().queue.indexOf(user.uid) + 1
        })
    }
}

</script>

<style>
</style>