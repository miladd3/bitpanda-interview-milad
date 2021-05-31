<template lang="pug">
#app.todo-app
  .todo-app__wrapper
    SearchBox
    NewNote.todo-app__new-note(@submit="newNoteSubmit")
    .todo-app__notes
      Note(
        v-for="item in items"
        :key="item._id"
        :description="item.description"
        :done="item.done"
        :created="item.createdAt"
        @changed="item = $event"
        @delete="deleteNote(item._id)"
      )
    div.todo-app__pagination(v-if="hasNextPage || hasPrevPage")
      Pagination(:has-next="hasNextPage" :has-prev="hasPrevPage" @next="nextPage" @prev="prevPage")
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import api from '@/api';
import NewNote from '@/components/NewNote.vue';
import Note from '@/components/Note.vue';
import Pagination from '@/components/Pagination.vue';
import SearchBox from '@/components/SearchBox.vue';
import { Item } from '@/models/Item';

export default defineComponent({
  name: 'App',
  components: {
    Pagination, Note, NewNote, SearchBox,
  },
  setup() {
    const items = ref<Array<Item>>([]);
    const hasNextPage = ref<boolean>(false);
    const hasPrevPage = ref<boolean>(false);
    const offset = ref(0);
    const perPage = parseInt(process.env.VUE_APP_PER_PAGE, 10);

    const getTodos = (limit = perPage) => {
      api.todo.get({ limit, offset: offset.value }).then((res) => {
        items.value = res.data.items;
        hasNextPage.value = res.data.meta.hasNextPage;
        hasPrevPage.value = res.data.meta.hasPrevPage;
      }).catch((e) => {
        console.error(e);
      });
    };

    const nextPage = () => {
      offset.value += perPage;
      getTodos();
    };

    const prevPage = () => {
      offset.value -= perPage;
      getTodos();
    };

    const newNoteSubmit = (desc: string) => {
      api.todo.create(desc).then(() => {
        getTodos();
      }).catch((e) => {
        console.error(e);
      });
    };

    const deleteNote = (id: string) => {
      api.todo.delete(id).then(() => {
        getTodos();
      }).catch((e) => {
        console.error(e);
      });
    };

    return {
      message: 'Todo list should be here',
      items,
      hasPrevPage,
      hasNextPage,
      nextPage,
      prevPage,
      getTodos,
      newNoteSubmit,
      deleteNote,
    };
  },
  mounted() {
    this.getTodos();
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
  min-height: 100vh;
  padding: rem-calc(16px);
  box-sizing: border-box;

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
