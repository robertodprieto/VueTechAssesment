<template>
  <div class="pa-4" style="background: #a1a1a1">
    <h2 style="color: white" class="mx-auto my-4 py-0">
      Welcome {{user}}!
    </h2>

    <v-card class="mb-2" color="blue" dark tile>
      <v-card-title>
        <v-icon large left>mdi-star</v-icon>
        <span class="title font-weight-light">Quick Access</span>
      </v-card-title>
      <v-card-text>
        <v-row align="center" justify="center">
          <v-col cols="12" md="3" sm="12">
            <v-row align="center" justify="center">
              <v-card
                dark
                color="#1574db"
                height="160"
                width="220"
                to="/UserManagment"
              >
                <v-card-title class="headline layout justify-center">
                  <v-col cols="12" class="headline layout justify-center">
                    <h3>
                      <v-icon x-large>mdi-account</v-icon>
                    </h3>
                  </v-col>
                  <h5>Users Managment</h5>
                </v-card-title>
              </v-card>
            </v-row>
          </v-col>         
        </v-row>         
      </v-card-text>
    </v-card>
  </div>
</template>
<style scoped>
.multi-line {
  white-space: pre-line;
}
</style>
<script>

export default {
  data: (vm) => ({
    user: 'Roberto Prieto',
  }),
};
</script>