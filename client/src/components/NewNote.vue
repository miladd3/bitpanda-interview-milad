<template lang="pug">
  form.new-note
    input.new-note__input(type=text placeholder="Take a note" v-model="valueLocal")
    IconButton.new-note__btn(icon="add")
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';

import IconButton from '@/components/IconButton.vue';

export default defineComponent({
  name: 'NewNote',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  components: { IconButton },
  setup(props, { emit }) {
    const valueLocal = computed({
      get: () => props.value,
      set: (val) => {
        emit('input', val);
      },
    });

    return { valueLocal };
  },
  emits: ['input'],
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
    border-radius: rem-calc(12) rem-calc(12) 0 0;
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

}
</style>
