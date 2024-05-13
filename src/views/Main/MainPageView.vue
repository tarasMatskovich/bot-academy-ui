<template>
    <div>
        <v-app-bar
            color="#102D70"
            dense
            dark
        >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>Bot academy</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-menu
                left
                bottom
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item
                        v-for="n in 5"
                        :key="n"
                        @click="() => {}"
                    >
                        <v-list-item-title>Option {{ n }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
        <v-row>
            <v-col cols="2" class="side-bar">
                <v-navigation-drawer
                    v-model="drawer"
                    permanent
                    style="height: calc(100vh - 48px)"
                >
                    <template v-slot:prepend>
                        <v-list-item
                            lines="two"
                        >
                            <v-list-item-avatar style="cursor: pointer">
                                <v-menu
                                    v-model="showMenu"
                                    offset-y
                                    offset-x
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-img
                                            src="https://randomuser.me/api/portraits/men/85.jpg"
                                            v-bind="attrs"
                                            v-on="on"
                                        ></v-img>
                                    </template>

                                    <v-list>
                                        <v-list-item
                                            v-for="(item, i) in userItems"
                                            :key="i"
                                            link
                                            :to="item.link"
                                        >
                                            <v-list-item-icon>
                                                <v-icon v-text="item.icon"></v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title v-text="item.title"></v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item
                                            link
                                            @click="logout"
                                        >
                                            <v-list-item-icon>
                                                <v-icon>mdi-application-import</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title>Logout</v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>Taras</v-list-item-title>
                                <v-list-item-subtitle>matskovich.taras@gmail.com</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </template>

                    <v-divider></v-divider>

                    <v-list dense>
                        <v-list-item
                            v-for="item in items"
                            :key="item.title"
                            :to="item.link"
                            link
                            color="#4f7eee"
                            :ripple="false"
                        >
                            <v-list-item-icon>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-icon>
                            {{item.title}}
                        </v-list-item>
                    </v-list>
                </v-navigation-drawer>
            </v-col>
            <v-col cols="10" class="main-page-view">
                <v-container>
                    <v-col>
                        <div class="text-h4">Welcome to your Workspace</div>
                    </v-col>
                    <v-col cols="2">
                        <v-btn
                            color="#215DE8"
                            class="mr-4"
                            @click="start"
                            width="100%"
                            style="color: #fff;"
                        >
                            Create
                        </v-btn>
                    </v-col>
                </v-container>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import UsersApi from "@/api/users/users-api";
    export default {
        name: "MainPageView",
        computed: {
            isLoggedIn() {
                return this.$store.getters["users/isLoggedIn"];
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('users/logout')
                    .then(() => {
                        this.$router.push('/sign-in')
                    });
            },
            getMe() {
                UsersApi.me()
                    .then((response) => {
                        alert(response.data.data.attributes.name)
                    })
            }
        },
        data () {
            return {
                drawer: true,
                showMenu: false,
                items: [
                    { title: 'Home', icon: 'mdi-home', link: '/' },
                    { title: 'Users', icon: 'mdi-account-group-outline', link: '/users' },
                ],
                userItems: [
                    {
                        title: 'Account',
                        icon: 'mdi-account-edit',
                        link: '/account'
                    },
                    {
                        title: 'Subscription',
                        icon: 'mdi-office-building-cog-outline',
                        link: '/subscription'
                    }
                ],
                mini: true,
            }
        },
    }
</script>

<style scoped>
    .main-logo {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .main-page-view {
        background-color: #EDF1FD;
        padding-bottom: 0;
        padding-right: 0;
        padding-left: 0;
    }

    .side-bar {
        padding-right: 0;
        padding-bottom: 0;
    }
</style>
