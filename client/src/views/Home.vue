<template>
  <home-page />
</template>

<script>
// importing a component from ../components/ (just another way to render a page)
import homePage from "../components/homePage";

export default {
  name: "Home",

  components: {
    homePage,
  },
};
</script>
