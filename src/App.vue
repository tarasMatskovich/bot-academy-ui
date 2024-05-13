<template>
  <v-app>
    <v-main>
      <router-view/>
      <ErrorBag/>
    </v-main>
  </v-app>
</template>

<script>
import ErrorBag from "./components/Error/ErrorBag"

export default {
  name: 'App',
  components: {
    ErrorBag
  },
  data: () => ({
    //
  }),
};
</script>
