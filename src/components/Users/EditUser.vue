<template>
  <v-dialog v-model="show" persistent transition="dialog-bottom-transition" max-width="500px">
    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="show = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Edit User</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-row dense>
            <v-col cols="12" sm="4" md="12">
              <v-text-field
                v-model="email"
                prepend-icon="mdi-email"
                label="Email"
                maxlength="50"
                :rules="emailRules"
                dense
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12" sm="4" md="12">
              <v-text-field
                v-model="firstName"
                prepend-icon="mdi-account"
                label="First Name"
                maxlength="50"
                :rules="requiredRules"
                dense
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12" sm="4" md="12">
              <v-text-field
                v-model="lastName"
                prepend-icon="mdi-account"
                label="Last Name"
                maxlength="50"
                :rules="requiredRules"
                dense
                required
              ></v-text-field>
            </v-col>           
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" :disabled="!valid" @click.stop="editUserData()">Save</v-btn>
          <v-btn color="error" @click.stop="show=false">Exit</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  data: (vm) => ({
    email: null,
    firstName: null,
    lastName: null,
    valid: false,
    lazy: false,
    requiredRules: [(v) => !!v || "Required field"],
    emailRules: [
      v =>
        !v ||
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "Invalid Email"
    ]
  }),

  props: ["visible", "user"],

  computed: {
    show: {
      get() {
        if (this.visible)
        {
          this.email = this.user.email
          this.firstName = this.user.first_name
          this.lastName = this.user.last_name
        }
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$refs.form.resetValidation();
          document.getElementsByClassName("v-dialog--active")[0].scrollTop = 0;
          this.$emit("close");
        }
      },
    },
  },

  methods: {
    editUserData() {
      this.$swal({
        title: "Edit User",
        text: "Are you sure?",
        icon: "success",
        type: "success",
        showCancelButton: true,
        background: "#ececec",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        showCloseButton: true,
        showLoaderOnConfirm: true,
      }).then((result) => {
        if (result.value) {
          const userData = {
            id: this.user.id,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName
          };

          this.$store.dispatch('editUserDataById',userData)
          this.$refs.form.resetValidation();
          this.$emit('close')
        }
      });
    },

    showAlert(alertInfo) {
      alertInfo.vm.$swal.fire({
        icon: alertInfo.icon,
        title: alertInfo.title,
        showConfirmButton: false,
        background: "#ececec",
        timer: 2000,
      });
    },
  },

};
</script>