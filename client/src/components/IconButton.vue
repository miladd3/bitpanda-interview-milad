<template lang="pug">
  button.button-icon(@click="onClick")
    i.button-icon__icon(:class="`icon-${icon}`" :style="{fontSize: remSize}")
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';

import remCalc from '@/utils/rem-calc';

export default defineComponent({
  name: 'IconButton',
  props: {
    icon: {
      type: String,
      default: '',
      required: true,
    },
    size: {
      type: Number,
      default: 14,
    },
  },
  setup(props, { emit }) {
    const onClick = (e: Event) => {
      emit('click', e);
    };
    const remSize = computed(() => remCalc(props.size));

    return { onClick, remSize };
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

  &:hover {
    color: darken($color-icon,20);
  }
}
</style>
