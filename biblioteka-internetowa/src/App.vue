<template>
  <Navbar/>
  <router-view></router-view>

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
  padding: 35px 50px 35px 50px;
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
	border: 1;
	border-radius: 8px 8px 8px 8px;
  padding: 20px 8px 5px 8px;
}
.card-title {
  font-size: 17px;
	letter-spacing: 0.4px;
  margin: 8px;
  font-family: 'Ubuntu, Times New Roman';
	letter-spacing: 0.5px;
  font-weight: 600;
}
.card-subtitle {
  font-size: 14px;
  margin: 0px 5px 8px 5px;
}
.card-vol {
  font-size: 14px;
  opacity: 70%;
  margin: 0px 5px 2px 5px;
}
.card:hover{
    box-shadow: 2px 1px 1px 1px rgba(0,0,0,0.06);
    transform: scale(1.02);
    cursor: pointer;
}

/* small book card */
/*  */

/* modal */
input.input-modal {
  padding: 7px;
  border-radius: 6px;
  margin-bottom: 10px;
}

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
a.title-link {
    font-size: 18px;
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
input.add, textarea.add {
  padding: 8px;
  border-radius: 6px;
  margin-bottom: 10px;
  border: 1px solid rgb(94, 95, 93);
  -webkit-transition: all 0.15s ease-out;
  -moz-transition: all 0.1s ease-out;
  -ms-transition: all 0.1s ease-out;
  -o-transition: all 0.1s ease-out; 
  transition: all 0.1s ease-out;
} 
input.add:focus,textarea.add:focus {
  border: 1px solid rgba(61, 148, 26, 0.74);
  border-radius: 6px;
  outline: 2px ridge rgba(96, 236, 41, 0.573);
  -webkit-box-shadow: none;
}

/* ??? */
.container {
  margin-top: 70px;
  padding: 25px;
  background-color: #ffffff;
}

/* titles and text */
h3.title {
  font-weight: 800;
  font-size: 28px;
  letter-spacing: 1.2px;
  text-align: center;
  margin-bottom: 30px;
  margin-top: 20px;
  color: #106e07;
}

</style>