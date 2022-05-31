<template>
    <div class="row" v-if="nearestDate">
        <div class="col-auto me-auto">
            <p>Najbliższy dostępny egzemplarz: {{ nearestDate }}</p>
        </div>
        
        <div class="col-auto">
            <button type="button" class="btn btn-warning">Zapisz się do kolejki</button>
        </div>
    </div>
    
    <div class="row" v-else>
        <div class="col-auto me-auto">
            <p>Dostępny egzemplarz</p>
        </div>
        <div class="col-auto">
            <button class="btn btn-success" type="button">Wypożycz</button>
        </div>
        
    </div>
    
    
</template>

<script setup>
    import { ref, onMounted } from 'vue'

    const props = defineProps(["copies"])
    const nearestDate = ref(null)

    console.log(copiesArr);
    onMounted(() => {
        props.copies.sort(function(x, y){
            return x.date - y.date;
        })
        for(let i = 0; i < props.copies.length; i++){
            if (!props.copies[i].date) {
                break;
            } else {
                if (props.copies[i].date.getDate() < 10) {
                    var day = "0" + props.copies[i].date.getDate();
                } else {
                    var day = props.copies[i].date.getDate();
                }
                if (props.copies[i].date.getMonth() + 1) {
                    var month = "0" + (props.copies[i].date.getMonth() + 1);
                } else {
                    var month = props.copies[i].date.getMonth() + 1;
                }
                var date = day + '/' + month + '/' + props.copies[i].date.getFullYear();
                nearestDate.value = date
                break;
            }
        }
    })

</script>

<style>
</style>