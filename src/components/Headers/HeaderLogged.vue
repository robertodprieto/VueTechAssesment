<template>
     
    <v-app-bar
      app
      color="indigo"
      dark
      
    >
        <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
     <v-app-bar-nav-icon v-bind="attrs" v-on="on" @click.stop="menu=!menu"></v-app-bar-nav-icon> 
      </template>
      <span>Menú</span>
        </v-tooltip>
     
  
      <v-navigation-drawer 
      v-model="menu"
      height="538px"
      width="280px"
      app
      absolute
      temporary
      >
        <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="../../../public/AvatarDr.png">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{user}}</v-list-item-title>
            <v-list-item-subtitle>{{institution}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider></v-divider>
      <v-list dense>
       
         <v-list-group
          no-action
          prepend-icon="mdi-account-multiple"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Users</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="(userMenu, i) in usersMenu"
            :key="i"
            :to="userMenu[1]"
            link
          >
            <v-list-item-title v-text="userMenu[0]"></v-list-item-title>
            
          </v-list-item>
        </v-list-group>              
         </v-list>
        </v-navigation-drawer>
        <v-divider vertical></v-divider>
         <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
           <v-btn class="ml-3" icon small v-bind="attrs" v-on="on" to="/Home">
          <v-icon>mdi-home</v-icon>
         </v-btn>
          </template> 
           <span>Home</span>
        </v-tooltip>
    </v-app-bar>   
</template>

<script>
  export default {
    data () {
      return {
        user: 'Roberto Prieto',
        institution: 'Fligoo',
        menu: false,
        usersMenu:[
        ['Users Managment','/UserManagment'],
        ],
        group: null,
      }
    },
    watch: {
      group () {
        this.drawer = false
      },
    }
  }
</script>