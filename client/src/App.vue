<template lang="pug">
  #app.todo-app
    .todo-app__wrapper
      SearchBox
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import SearchBox from '@/components/SearchBox.vue';

export default defineComponent({
  name: 'App',
  components: { SearchBox },
  setup() {
    // utilise todo-bitpanda-server to get data

    return {
      message: 'Todo list should be here',
    };
  },
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100,300;400&display=swap');
@import "styles/global";

.todo-app {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $color-bg;
  height: 100vh;

  .todo-app__wrapper {
    max-width: $wrapper-width;
    width: 100%;
  }
}
</style>
