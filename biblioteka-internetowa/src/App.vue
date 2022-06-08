<template>
  <div>
    <Navbar/>
    <router-view></router-view>
  </div>
</template>

<script>
  import Navbar from './components/Navbar.vue'
  
  export default {
    components: { Navbar, },
    data() {
      return {
        url: location.href
      }
    }
  }
</script>
 
<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Raleway&family=Roboto:wght@300&display=swap');

html {
    height: 100%;
    font-size: 100%;
}
body {
    background: rgb(182, 221, 162);
    height: 100%;
}
/* rgb(194, 211, 190); */
/* rgb(182, 221, 162); */
/* rgb(182, 221, 175); */
/* rgb(182, 221, 150); */

.mainDiv {
  background-color: #ffffff;
  height: 80%;
  margin-left: 9%;
  margin-right: 9%;
  margin-top: 4%;
  padding: 45px 50px 35px 50px;
  border-radius: 20px;
}

/* book card*/
img.cover-small {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 75%;
}
.card {
	background: #ffffff;
	border-radius: 8px 8px 8px 8px;
  padding: 20px 0px 0px 0px;
}
.card-title {
  letter-spacing: 0.1px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 600;
  font-size: 14px;
  
}
.card-subtitle {
  font-size: 14px;
  margin: 0px 5px 8px 5px;
  font-family: 'Roboto', sans-serif;
}
.card-vol {
  font-size: 14px;
  opacity: 70%;
  margin: 0px 5px 2px 5px;
}
.card-footer {
  font-family: 'Roboto', sans-serif;
  text-align: center;
}

.card-body {
  text-align: center;
}

.card:hover{
    box-shadow: 2px 1px 1px 1px rgba(0,0,0,0.06);
    transform: scale(1.01);
    cursor: pointer;
}

/* small book card */
/*  */


/* forms */
.form-label {
    font-size: 14px;
    opacity: 0.8;
    margin-bottom: -5px;
}

/* profile */
.profile-title {
    font-weight: 700;
    margin-top: 10px;
    margin-bottom: 25px;
    margin-left: 20px;
    color: #0f7c05;
    letter-spacing: 0.5;
}
.profile-title-list {
    font-weight: 700;
    margin-top: 10px;
    margin-bottom: 40px;
    margin-left: 20px;
    color: #0f7c05;
    letter-spacing: 0.5;
}

/* profile book list */
img.cover-list {
    width: 65%;
    height: auto;
    margin-left: 20px;
}
p.author-list {
  font-size: 15px;
  opacity: 0.9;
}
hr.list {
    margin: 50px 0px 40px 0px;
}
.info-list {
  font-size: 14px;
  opacity: 0.7;
}

/* button */
.btn-success, .btn-success:active, .btn-success:visited {
    background-color: #0f7c05;
}
.btn-success:hover {
    background-color: #0e6406;
}

/* forms */
input.green, textarea.green {
  padding: 8px;
  border-radius: 6px;
  margin-bottom: 10px;
  border: 1px solid rgb(148, 166, 124);
  -webkit-transition: all 0.15s ease-out;
  -moz-transition: all 0.1s ease-out;
  -ms-transition: all 0.1s ease-out;
  -o-transition: all 0.1s ease-out; 
  transition: all 0.1s ease-out;
} 
input.green:focus,textarea.green:focus {
  border: 1px solid rgba(69, 171, 29, 0.453);
  border-radius: 6px;
  outline: 2px ridge rgba(96, 236, 41, 0.573);
  -webkit-box-shadow: none;
  box-shadow: none;
}
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active{
    -webkit-box-shadow: 0 0 0 30px rgba(182, 221, 162, 0.13) inset !important;
    box-shadow: none;
}

/* titles and text */
h3.title {
  font-weight: 700;
  font-size: 28px;
  letter-spacing: 1.2px;
  text-align: center;
  margin-bottom: 30px;
  margin-top: 24px;
  color: #106e07;
}
hr.hr-title {
  width:27%;
  margin: auto;
  margin-top:-5px;
  margin-bottom:25px;
}
  hr.hr-marg {
    margin: 25px 0px 30px 0px;
  }
   hr.hr-marg2 {
    margin: 45px 0px 45px 0px;
  }

.genre-title {
  color: #106e07;
  margin-bottom: 20px;
  margin-top: 40px;
  text-align: center;
}

.modal-title {
  color: #106e07;
}

.modal-header {
  text-align: center;
}

</style>