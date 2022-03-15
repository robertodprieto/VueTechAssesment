<template>
  <div class="container">
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Users</v-toolbar-title>
      </v-toolbar>

      <v-data-table
        :headers="headers"
        :items="usersList"
        class="elevation-1"
        item-key="id"
        :items-per-page="items_per_page"
        ref="myTable"
        :disable-sort="true"
        hide-default-footer
        :page.sync="page"
        @page-count="pageCount = $event"
      >
        <template v-slot:item.avatar="{ item }">
          <img :src="item.avatar" alt="" width="50" height="50" />
        </template>
        <template v-slot:item.actions="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                medium
                color="purple"
                class="mr-3"
                v-on="on"
                v-bind="attrs"
                @click.stop="editUser(item)"
                >mdi-pencil</v-icon
              >
            </template>
            <span>Edit User</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                medium
                v-on="on"
                color="red"
                v-bind="attrs"
                @click="deleteUser(item)"
                >mdi-delete</v-icon
              >
            </template>
            <span>Delete User</span>
          </v-tooltip>
        </template>
      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
      <v-card-actions>
        <v-btn color="warning" @click.stop="getUsersFromApi()"
          >Reload data from API</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn color="success" @click.stop="createUser()">Create User</v-btn>
        <v-btn color="error" @click.stop="exit()">Exit</v-btn>
      </v-card-actions>
      <EditUser
        :visible="showEditUser"
        :user="userToEdit"
        @close="closeEditUser()"
      ></EditUser>
      <CreateUser
        :visible="showCreateUser"
        @close="closeCreateUser()"
      ></CreateUser>
    </v-card>
  </div>
</template>
<style scoped>
::v-deep .v-data-table__empty-wrapper {
  display: none;
}
</style>
<script>
import { mapGetters } from "vuex";
import router from "../../router/index.js";
import EditUser from "../Users/EditUser.vue";
import CreateUser from "../Users/CreateUser.vue";
import usersApi from "../Users/resource";

export default {
  data: (vm) => ({
    headers: [
      { text: "Id", value: "id" },
      { text: "Email", value: "email" },
      { text: "First Name", value: "first_name" },
      { text: "Last Name", value: "last_name" },
      { text: "Avatar", value: "avatar" },
      { text: "Actions", value: "actions" },
    ],
    page: 1,
    pageCount: 0,
    showEditUser: false,
    showCreateUser: false,
    userToEdit: {},
    editedIndex: -1,
  }),

  computed: {
    ...mapGetters({
      usersList: "getUsersList",
      items_per_page: "getItemsPerPage",
    }),
  },

  methods: {
    exit() {
      router.push({ path: "/Home" });
    },
    showAlert(alertInfo) {
      alertInfo.vm.$swal.fire({
        icon: alertInfo.icon,
        title: alertInfo.title,
        showConfirmButton: false,
        background: "#ececec",
        timer: 1500,
      });
    },
    deleteUser(user) {
      this.$swal({
        title: "Delete User",
        text: "Are you sure?",
        icon: "success",
        background: "#ececec",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        showCloseButton: true,
        showLoaderOnConfirm: true,
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch("deleteUserById", user.id);
        }
      });
    },
    closeEditUser() {
      this.showEditUser = false;
    },
    closeCreateUser() {
      this.showCreateUser = false;
    },
    editUser(user) {
      this.editedIndex = this.$store.state.usersList.indexOf(user);
      this.userToEdit = Object.assign({}, user);
      this.showEditUser = true;
    },
    createUser() {
      this.showCreateUser = true;
    },
    getUsersFromApi() {
      const payload = {
        uri: "/users",
        cb: (data) => {
          loadUsers(data);
        },
      };
      usersApi.getFromApi(payload);
    },
    loadUsers(data) {
      this.dispatch("loadUsers", data);
    },
  },
  components: {
    EditUser,
    CreateUser,
  },
};
</script>
