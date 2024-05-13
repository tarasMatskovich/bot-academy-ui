<template>
        <div class="alert" v-show="show">
            <TransitionGroup name="error" tag="ul">
                <li class="error rounded-lg"
                    v-for="(item, i) in getErrors"
                    :key="i"
                >
                    <v-alert
                        dismissible
                        type="error"
                        elevation="2"
                    >
                        {{ item }}
                    </v-alert>
                </li>
            </TransitionGroup>
        </div>
</template>

<script>
    export default {
        name: "ErrorBag",
        computed: {
            getErrors() {
                return this.$store.getters['errors/getErrors'];
            },
            show() {
                return this.getErrors.length;
            }
        }
    }
</script>

<style scoped>
    .alert {
        width: 400px;
        position: absolute;
        top: 20px;
        right: 20px;
    }
    .error {
        transition: all 0.5s;
        list-style-type: none;
    }
    .error-enter, .card-leave-to
        /* .card-leave-active for <2.1.8 */ {
        opacity: 0;
        transform: scale(0);
    }
    .error-enter-to {
        opacity: 1;
        transform: scale(1);
    }
    .error-leave-active {
        /*position: absolute;*/
    }
    .error-move {
        opacity: 1;
        transition: all 0.5s;
    }
</style>
