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
    <hr>
</template>

<script>
export default {
    props: ["copies"],
    data () {
        return {
            nearestDate: null
        }
    },
    created () {
        this.copies.sort(function(x, y){
            return x.date - y.date;
        })
        for(let i = 0; i < this.copies.length; i++){
            if (!this.copies[i].date) {
                break;
            } else {
                if (this.copies[i].date.getDate() < 10) {
                    var day = "0" + this.copies[i].date.getDate();
                } else {
                    var day = this.copies[i].date.getDate();
                }
                if (this.copies[i].date.getMonth() + 1) {
                    var month = "0" + (this.copies[i].date.getMonth() + 1);
                } else {
                    var month = this.copies[i].date.getMonth() + 1;
                }
                var date = day + '/' + month + '/' + this.copies[i].date.getFullYear();
                this.nearestDate = date
                break;
            }
        }
    } 
}
</script>