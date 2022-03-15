<template>
  <v-app>
    <HeaderLogged :key="$route.fullPath"></HeaderLogged>
    <v-main class="center">
      <transition name="slide">
        
      <router-view></router-view>
     
      </transition>
     
    </v-main>
    
    <Footer></Footer>
  </v-app>
  
</template>
<style scoped>

.center{
  
  display: flex;
  align-items: center;

 }
 .slide-enter {
       opacity: 0;
   }

   .slide-enter-active {

        animation: slide-in 1s ease-out forwards;
        transition: 0.5s
   }

    .slide-move {
        transition: transform 1s
    }
   .slide-leave-active {
       animation: slide-out 1s ease-out forwards;
       transition: opacity 1s;
       opacity: 0;
       position: absolute;
   }

   @keyframes slide-in {
        from{
            transform: translateY(20px);
       }
       to {
            transform: translateY(0);
       }
   }

   @keyframes slide-out {
        from{
            transform: translateY(0);
       }
       to {
            transform: translateY(20px);
       }
   }
</style>
<script>
import Header from './components/Headers/Header.vue'
import Footer from './components/Headers/Footer.vue'
import HeaderLogged from './components/Headers/HeaderLogged.vue'

export default {
  name: 'App',

  components: {
    Header,
    HeaderLogged,
    Footer
  },

  data: () => ({
    //
  }),
};
</script>
