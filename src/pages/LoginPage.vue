<template>
  <div class="q-pa-md row window-height col-12 items-center justify-between flex flex-center absolute-full bg-primary">
    <div class="col-xs-12 offset-xs-0 col-sm-4 absolute-center cyberpunk-border text-primary">
      <q-card class="col-12">
        <q-card-section class="text-h1 text-primary text-uppercase text-bold text-center text-center">
          <q-img src="/img/logo.png"
                 style=" max-width: 125px" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-form @submit="onSubmit"
                  class="q-gutter-md q-mt-md">
            <q-input
              v-model="formData.email"
              type="email"
              label="Email address"
              filled
              :disable="loading"
              class="q-mb-md"
              color="primary"
              autocomplete="email"
              label-color="primary"
              input-class="text-primary"
              :error="errors.email.hasError"
              :error-message="errors.email.error"
            />

            <q-input
              v-model="formData.password"
              :type="passwordType"
              label="Password"
              filled
              :disable="loading"
              color="primary"
              autocomplete="new-password"
              label-color="primary"
              input-class="text-primary"
              :error="errors.password.hasError"
              :error-message="errors.password.error"
            >
              <template v-slot:append>
                <q-icon
                  style="cursor:pointer"
                  :name="passwordIcon"
                  @click="togglePassword"
                />
              </template>
            </q-input>

            <div hidden>
              <q-checkbox
                v-model="formData.rememberMe"
                dense
                keep-color
                color="primary"
                label-color="primary"
                input-class="text-primary"
                label="Remember me"
              />
            </div>
            <div class="q-pt-md row justify-between">
              <q-btn label="Login"
                     type="submit"
                     color="primary"
                     icon="login"
                     :loading="loading"
                     class="col-5" />
              <q-btn
                class="col-5"
                label="Forgot password"
                disable
                color="primary"
                icon="key"
                :loading="loading"
                @click="forgetPassword"
              />
            </div>
          </q-form>
          <div class="flex justify-center q-mt-md">
            <q-btn @click="goToRegister" class="full-width" label="Dont have an account? register"/>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import {api} from 'boot/axios';
import {userStore} from 'stores/user';

export default {
  data() {
    return {
      userStore   : userStore(),
      loading     : false,
      passwordType: 'password',
      passwordIcon: 'visibility',
      formData    : {
        name                 : '',
        email                : '',
        password             : '',
        password_confirmation: '',
        rememberMe           : true,
      },
      errors : {
        email : {
          hasError: false,
          error: ""
        },
        password: {
          hasError: false,
          error: "",
        }
      }
    };
  },
  methods: {
    onSubmit() {
      this.loading = true;
      api.post('/login', this.formData)
          .then((response) =>
          {
            this.userStore.login(response.data.user, response.data.token);
            this.$router.go('/');
          })
      .catch((errors) =>
         {
           Object.keys(errors).forEach((error)=> {
             this.errors[error].hasError=true;
             this.errors[error].error=errors[error][0];
           });
         })
      .finally(() =>
        {
          this.loading = false;
        });
    },
    forgetPassword() {
      //TODO: forgot password page
      this.$router.push('/forgot-password');
    },
    goToRegister(){
      this.$router.push('/register');
    },
    togglePassword() {
      if (this.passwordType === 'password')
        {
          this.passwordType = 'text';
          this.passwordIcon = 'visibility_off';
        }
      else
        {
          this.passwordType = 'password';
          this.passwordIcon = 'visibility';
        }
    },
  },
};
</script>
