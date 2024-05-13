<template>
    <v-form
        ref="signInForm"
        v-model="valid"
        lazy-validation
    >
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

        <v-row>
            <v-col style="padding-top: 0;">
                <v-switch
                    v-model="rememberMe"
                    label="Remember me"
                    style="margin-top: 0;"
                ></v-switch>
            </v-col>
            <v-col style="padding-top: 3px; text-align: right">
                <a href="/" class="auth-link">Forgot password</a>
            </v-col>
        </v-row>

        <v-btn
            color="#215DE8"
            class="mr-4"
            @click="signIn"
            width="100%"
            style="color: #fff;"
            x-large
        >
            Sign in
        </v-btn>

        <v-row align="center" style="margin-bottom: 20px; margin-top: 20px;">
            <v-divider style="margin-left: 13px;"></v-divider>
            <span style="color: rgba(0, 0, 0, 0.6);">or</span>
            <v-divider style="margin-right: 13px;"></v-divider>
        </v-row>

        <v-btn
            outlined
            width="100%"
            x-large
        >
            <v-icon left>
                mdi-google
            </v-icon>
            Sign in with Google
        </v-btn>

        <p style="margin-top: 20px;">
            <span style="margin-right: 10px;">Don`t have an Account?</span>
            <router-link to="/sign-up" class="auth-link">Sign up now</router-link>
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
        name: "SignInForm",
        computed: {
            showLoader() {
                return this.$store.getters["users/isLoading"];
            }
        },
        data: () => ({
            showPassword: false,
            valid: true,
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
            signIn () {
                if(!this.$refs.signInForm.validate()) {
                    return;
                }
                this.$store.dispatch('users/login', {
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
