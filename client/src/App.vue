<template lang="pug">
#app.todo-app
  .todo-app__wrapper
    SearchBox(v-model="searchKey")
    .todo-app__search-title(v-if="searchKey") searching for {{searchKey}}
    NewNote.todo-app__new-note(@submit="newNoteSubmit" v-model="newNote")
    .todo-app__notes(v-if="items.length")
      Note(
        v-for="item in items"
        :key="item._id"
        :description="item.description"
        :done="item.done"
        :created="item.createdAt"
        @delete="deleteNote(item._id)"
        @done="onDone(item._id, $event)"
        :loading="item._id === loadingId"
      )
    div.todo-app__pagination(v-if="hasNextPage || hasPrevPage")
      Pagination(:has-next="hasNextPage" :has-prev="hasPrevPage" @next="nextPage" @prev="prevPage")
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useToast } from 'vue-toastification';

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
    const perPage = parseInt(process.env.VUE_APP_PER_PAGE, 10);
    const loadingId = ref('');
    const loading = ref(false);
    const newNote = ref('');
    const toast = useToast();

    const offset = ref(0);
    const getTodos = (limit = perPage, description?: string) => {
      loading.value = true;
      api.todo.get({ limit, offset: offset.value, description }).then((res) => {
        items.value = res.data.items;
        hasNextPage.value = res.data.meta.hasNextPage;
        hasPrevPage.value = res.data.meta.hasPrevPage;
      }).catch((e) => {
        console.error(e);
        toast.error('error getting todos from server');
      }).finally(() => { loading.value = false; });
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
        newNote.value = '';
      }).catch((e) => {
        console.error(e);
        toast.error('error creating newNote');
      });
    };

    const deleteNote = (id: string) => {
      loadingId.value = id;
      api.todo.delete(id).then(() => {
        getTodos();
      }).catch((e) => {
        console.error(e);
        toast.error('error deleting note');
      }).finally(() => {
        loadingId.value = '';
      });
    };

    const onDone = (id: string, isDone: boolean) => {
      loadingId.value = id;
      api.todo.change(id, isDone).then((res) => {
        items.value = items.value.map((item) => {
          // eslint-disable-next-line no-underscore-dangle
          if (item._id === id) {
            return res.data;
          }

          return item;
        });
      }).catch((e) => {
        console.error(e);
        toast.error('error changing note');
      }).finally(() => {
        loadingId.value = '';
      });
    };

    const searchKey = ref('');

    watch(
      searchKey,
      (key) => {
        if (key) {
          offset.value = 0;
          getTodos(perPage, key);
        } else {
          getTodos(perPage);
        }
      },
    );

    return {
      items,
      hasPrevPage,
      hasNextPage,
      nextPage,
      prevPage,
      getTodos,
      newNoteSubmit,
      deleteNote,
      onDone,
      loadingId,
      newNote,
      searchKey,
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

  &__search-title {
    font-weight: 200;
    margin-top: rem-calc(16);
  }
}
</style>
