<template lang="pug">
  button.button-icon(@click="onClick")
    i.button-icon__icon(:class="`icon-${icon}`")
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'IconButton',
  props: {
    icon: {
      type: String,
      default: '',
      required: true,
    },
  },
  setup(props, { emit }) {
    const onClick = (e: Event) => {
      emit('click', e);
    };

    return { onClick };
  },
  emits: ['click'],
});
</script>

<style scoped lang="scss">
.button-icon {
  border: none;
  width: rem-calc(38);
  height: rem-calc(38);
  background: #ffffff;
  padding: 0;
  cursor: pointer;
  color: $color-icon;

  &__icon {
    font-size: rem-calc(14);
  }

  &:hover {
    color: darken($color-icon,20);
  }
}
</style>
