<template lang="pug">
#app.todo-app
  .todo-app__wrapper
    SearchBox
    NewNote.todo-app__new-note
    .todo-app__notes
      Note(
        v-for="item in items"
        :key="item._id"
        :description="item.description"
        :done="item.done"
        :created="item.createdAt"
        @changed="item = $event"
      )
    div.todo-app__pagination
      Pagination(has-next has-prev)
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-floating-promises */
import { defineComponent, ref } from 'vue';

import api from '@/api';
import NewNote from '@/components/NewNote.vue';
import Note from '@/components/Note.vue';
import Pagination from '@/components/Pagination.vue';
import SearchBox from '@/components/SearchBox.vue';
import { Item } from '@/models/item';

export default defineComponent({
  name: 'App',
  components: {
    Pagination, Note, NewNote, SearchBox,
  },
  setup() {
    // utilise todo-bitpanda-server to get data
    const items = ref<Array<Item>>([]);

    api.todo.getTodo({ limit: 12 }).then((res) => {
      items.value = res.data.items;
      console.log(res.data);
    });

    return {
      message: 'Todo list should be here',
      items,
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

  &__wrapper {
    max-width: $wrapper-width;
    width: 100%;
  }

  &__new-note {
    margin-top: rem-calc(16);
  }

  &__pagination {
    margin-top: rem-calc(16px);
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
