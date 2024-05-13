<template>
    <div>
        <v-container :fluid="true" style="padding: 0">
            <v-row>
                <v-col :cols="4" style="padding-bottom: 0;">
                    <v-img
                        :src="require('../../assets/auth_main.jpg')"
                        aspect-ratio="1"
                        height="100vh"
                        max-width="100%"
                    >
                        <v-overlay
                            absolute
                            color="#0C2255"
                            opacity="0.75"
                        >
                        </v-overlay>
                    </v-img>
                </v-col>
                <v-col :cols="8" style="padding-bottom: 0;">
                    <div class="d-flex justify-center align-center" style="height: 100vh">
                        <div style="width: 330px">
                            <div>
                                <v-img :src="require('../../assets/logo.svg')" style="float: left; margin-right: 20px"></v-img>
                                <h2>Bot Academy</h2>
                                <br>
                            </div>
                            <SignInForm></SignInForm>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import SignInForm from "@/components/Auth/SignInForm";

    export default {
        name: "SignInView",
        components: {
            SignInForm
        }
    }
</script>

<style scoped>
    .v-input__control{
        min-height: 20px !important;
    }
</style>
