<template lang="pug">
form.new-note(@submit.prevent="onSubmit")
  input.new-note__input(type=text placeholder="Take a note" v-model="desc" )
  IconButton.new-note__btn(icon="add")
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import IconButton from '@/components/IconButton.vue';

export default defineComponent({
  name: 'NewNote',
  setup(props, { emit }) {
    const desc = ref();

    const onSubmit = () => {
      if (desc.value) {
        emit('submit', desc.value);
        desc.value = '';
      }
    };

    return { desc, onSubmit };
  },
  components: { IconButton },
  emits: ['submit'],
});
</script>

<style scoped lang="scss">
.new-note {
  position: relative;
  display: flex;
  align-items: center;

  &__input {
    background: #fff;
    width: 100%;
    height: rem-calc(58);
    border: 1px solid $color-input-border;
    font-weight: 400;
    font-family: $font-family;
    padding: 0 rem-calc(50) 0 rem-calc(30);
    border-radius: rem-calc(12);
    box-sizing: border-box;

    &::placeholder {
      color: $color-input-placeholder;
    }

    &:focus {
      border-color: darken($color-input-border, 20);
      outline: none;
    }
  }

  &__btn {
    position: absolute;
    right: rem-calc(10);
  }

  &:first-child {
    .new-note__input {
      border-radius: rem-calc(12) rem-calc(12) 0 0;
    }
  }

}
</style>
