<template>
    <v-form
        ref="signUpForm"
        v-model="valid"
        lazy-validation
    >
        <h4 style="margin-bottom: 10px;">Create your account</h4>

        <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Name"
            required
            outlined
            dense
        ></v-text-field>

        <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
            outlined
            dense
        ></v-text-field>

        <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            @click:append="showPassword = !showPassword"
            outlined
            dense
        ></v-text-field>

        <v-btn
            color="#215DE8"
            class="mr-4"
            @click="signUp"
            width="100%"
            style="color: #fff;"
            x-large
        >
            Sign Up
        </v-btn>

        <p style="margin-top: 20px;">
            <span style="margin-right: 10px;">Already have an Account?</span>
            <router-link to="/sign-in" class="auth-link">Sign in now</router-link>
        </p>
        <v-overlay :value="showLoader">
            <v-progress-circular
                indeterminate
                size="64"
            ></v-progress-circular>
        </v-overlay>
    </v-form>
</template>

<script>
    export default {
        name: "SignUpForm",
        computed: {
            showLoader() {
                return this.$store.getters["users/isLoading"];
            }
        },
        data: () => ({
            showPassword: false,
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            password: '',
            passwordRules: [
                v => !!v || 'Password is required'
            ],
            rememberMe: false
        }),

        methods: {
            signUp () {
                if(!this.$refs.signUpForm.validate()) {
                    return;
                }
                this.$store.dispatch('users/signUp', {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }).then(() => {
                    this.$router.push("/")
                })
            }
        },
    }
</script>

<style scoped>
    .auth-link {
        color: #215DE8;
        text-decoration: none;
        font-weight: bold;
    }
</style>
