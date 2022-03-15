<template>
  <v-dialog v-model="show" persistent transition="dialog-bottom-transition" max-width="500px">
    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="show = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Create User</v-toolbar-title>
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
          <v-row dense>
            <v-col cols="12" sm="4" md="12">
              <v-file-input
                :rules="avatarRules"
                :accept="acceptedFormats()"
                prepend-icon="mdi-file-document"
                v-model="image"
                show-size
                chips
                label="Avatar"
                dense
              ></v-file-input>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" :disabled="!valid" @click.stop="createUser()">Save</v-btn>
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
    image: null,
    valid: false,
    lazy: false,
    requiredRules: [(v) => !!v || "Required field"],
    emailRules: [
      v =>
        !v ||
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "Invalid Email"
    ],
    avatarRules: [
      (value) =>
        !value || value.size < 20480000 || "The file size must not exceed 20MB",
      (v) => !!v || "Required field"
    ]
  }),

  props: ["visible"],

  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$refs.form.resetValidation();
          document.getElementsByClassName("v-dialog--active")[0].scrollTop = 0;
          this.cleanModels();
          this.$emit('close');
        }
      },
    },
  },

  methods: {
    acceptedFormats(){
      return ".jpg, .jpeg, .png, .tiff"
    },
    createUser() {
      this.$swal({
        title: "Create User",
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
          
          var avatarImage = this.getBase64Image(this.image)

          const userData = {
            id: 0,
            email: this.email,
            first_name: this.firstName,
            last_name: this.lastName,
            avatar: avatarImage
          };

          this.$store.dispatch('createUser',userData)
          this.$refs.form.resetValidation();
          this.cleanModels()
          this.$emit('close')
        }
      });
    },
    cleanModels(){
      this.email = ''
      this.firstName = ''
      this.lastName = ''
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
    getBase64Image(img)
    {
      return URL.createObjectURL(img);      
    }
  },
};
</script>