<template>
    <div>
      <h4 class="genre-title"><router-link class="genre-title" :to="{ name : 'Search', params:{sv: genre}}">{{ genre.charAt(0).toUpperCase() + genre.slice(1) }}</router-link></h4>
      <div class="row justify-content-center">
        <div v-for="b of genreBooks" :key="b" class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 py-2">
          <router-link :to="{name:'Details', params:{bookId: b.bookId}}" custom v-slot="{ navigate }">
          <div class="card h-100" role="link" @click="navigate">
            <img :src=b.cover class="card-img cover-small">
            
            <div class="card-body align-items-center d-flex justify-content-center">
              <text class="card-title">{{ b.title }}</text>
            </div>
        
            <div class="card-footer">
              <text class="card-subtitle">{{ b.author }}</text>
            </div>
          </div>
          </router-link>
        </div>
      </div><hr>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'

    const props = defineProps(["genre"])
    const genre = props.genre
    const genreBooks = ref([])
    const genresObj = ref({
        'fantasy': [
            "CK2X54CfyG3RJFgUVTqT", "Dv475VsxfgCF6yfUORSz", "I5rmOxfUHAJvoI5z6RD2", "Krv3C671UgFlor50GnKd", 
            "LT1HUIroCNArvfymICkF", "MUmmgDF9tqJRvSAefxYb", "fhUWX6ux6uMHchEkAh5O", "htIOLzMeyx1BWz9ooceT", 
            "llHrzeYHowrcSxao7Dph", "rERgJRb7e2lMsslNMzME", "xrNVRJDkpNii1GgoVEFO"],
          'kryminał': [
            "0Iuhd7iMFaJx86DYsZyt", "7JcWuIoQBsokLmY42CR6", "EJAJIFsLo73WSyDfAjNs", "P9Y2a7GboQIwyhdN9Z4x",
            "TJW0k2m2NOoupfmPHzZz", "VlAUBA73GIXriKdIZdes", "arsN8K25wIgQUNP61JKg", "jGMwdzGudHPVwqjCwQjV", 
            "jv1Uej9gkjKJYiYZy4Pw", "mStCZcJ1aK6v2qQ4UFlF", "nrm19sNZif0t0U2gmzaw", "vrxR1tUaxBVXM6PLYxP8"], 
          'science fiction': [
            "BQJLTIe0PFXcZscutxLP", "HXucceQgo2jI2cXhzN1U", "I5rmOxfUHAJvoI5z6RD2", "JJUY8MBvddfmAuITxVNC", 
            "Krv3C671UgFlor50GnKd", "RrvRGf3E6rjOJ4eozYcH", "UignjgecotQcbYwmy6qY", "eAD9PsQ0HpZ4H98VJnqF", 
            "htIOLzMeyx1BWz9ooceT", "llHrzeYHowrcSxao7Dph", "rERgJRb7e2lMsslNMzME", "y8CPEKvOwPa7aCd5s9Cl"], 
          'literatura piękna': [
            "3blZ8x8Kd1KZxioCAzgT", "5lLS098ZP7LHSPXzsr3o", "7i2eRtOD5Y1LAofkmll2", "AfeYi2dSmPOpfiyiP7Ag", 
            "EblYORxWFe9Em1s4SY6f", "PuyqAJpXHxk31Z8s96Ui", "S5LFjvctyPey5tLVj2pf", "ZSX2QFPzzIQ09tyEUAQx", 
            "eUIy56TuX87T15CVQMOO", "vFYCJE4fdFlzXa7EZUdn", "zf5bBCYFl5aa6zpCmJaa"], 
          'romans': [
            "08wP4BWO8UzHh3bb0KgV", "AYlt12SBYa9zbW5TiH8C", "DLJHIykOJ35uTNpH0O3i", "NEGJtCOzhAo3MOXTbs2j", 
            "QM7uBXcV8bS4oBrADLzB", "QMCnDsRvvvxyebtgTJJq", "R0YVL4s5euDrHKN0L3kN", "WT91IC55MhHDgYgRzd0F", 
            "g92tU932qNpOpSemd0Ek", "l26Hng8VsWrUdVczCI81", "pIwwxrz5nQS7QFX0alC3", "qedqXkn1VivGkP3jUIcQ"], 
          'horror': [
            "0IFM7eaIoIigecH6Oxq0", "3L1TX23HmHPCYMfSMUgK", "6mcqIMTRy4XUSYu69eYP", "7kIlQH4T3OkwO3q2DvFO", 
            "JjXV775UIZRs4m1kpt2x", "QNcAD6h2CH0P7zi3RUFQ", "bYbsLF7dptUTwrlajmru", "eky7iOCyDJ4LPMbU7Fx2", 
            "juP5md4O1MRAWvLjVAtk", "r6VeJInZFV8irAG5lDHd", "x7PWy4FeGXVFnssm50RT"], 
          'popularnonaukowa': [
            "18Jf0VamDKSV0AByeEyb", "8dPmxBB7c3m7OzwS5hop", "FivMyNLDgGaAJQNLLtIU", "H0o3z37uMHVHGRCV05X7", 
            "R3D65cD0OKJ3aqKcuW7s", "Wqfr7LT9VFHQ8EMDp0hN", "YMv0j7FMVHceeJeQV73Z", "cP6x2Jfctm3VvkywWXNI", 
            "pw1gJbUc9F5ICRFMKEo5", "wLZIQqdKVCIsbdvwCfP1"],  
          'literatura młodzieżowa': [
            "4dHX66v2eQz4105NXw94", "5vYK2G7DXVkEESyLixTo", "CK2X54CfyG3RJFgUVTqT", "FZ626ATMtYWX8jhDdcFr", 
            "cbvwO4Dd76ZAg4U3CFCP", "i7wWEQfsoj9uovRBcq95", "iZCw0ssNNAp6eCGHGNy4", "mc0MyUHCw3StDy57M16j", 
            "mdc8vyoZbcKqn1zzR5O6", "u4an9fULsIXMaUA27wT1", "u9RFCJ2kUl4x3JpSJbS6", "y8bhOL9N96hmKDqXITuB"],
          'literatura faktu': [
            "0rA4Q3EGCo0ySYEURSbW", "2DpICDAdvd73084v0X5O", "AJf8z4kX4Xy28OqPDGR1", "FeK7hNqjxyWbkR1KU6P4", 
            "JpoCp0zusiTC0hRQPSdb", "KAIAjlmyBFoWAcuEDprs", "KRB8mwX6S0CyZv7NQp7N", "SsJ766pZ6Y33lccyatYs", 
            "lrk2STDSRARJcTKJE1Tk", "lu7fgtpsKSkIyU0bwrXP", "m44LPtvmJgmXUYUigkJ7", "mhoThhY43zfcRMD6lbXz"],        
        })

    onMounted(() => {
        
        var genre = genresObj.value[props.genre]
        let nBooks = 6
        for (let i=0; i<nBooks; i++){
            
            let randomBookId = genre.sample()
            db.collection("books").doc(randomBookId).get().then((doc) => {
                var data = {
                    bookId : doc.id,
                    title : doc.data().title,
                    author : doc.data().author,
                    genre : doc.data().genre,
                    cover : doc.data().cover
                }
                genreBooks.value.push(data)
            })
           
            genre.splice(genre.indexOf(randomBookId), 1)
         } 

         
    
    })

    
    Array.prototype.sample = function() {
      return this[Math.floor(Math.random()*this.length)]
    }


</script>


<style scoped>
.genre-title{
  text-decoration: none;
  color: #106e07;
  margin-bottom: 20px;
  margin-top: 40px;
  text-align: center;

}

.card-footer {
  text-align: center;
}

hr {
  margin: 40px 0px 35px 0px;
}
</style>