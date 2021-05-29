<template lang="pug">
  label.check-box(:class="{'check-box__checked': valueLocal}")
    input.check-box__input(type="checkbox" v-model="valueLocal")
    i.icon-check.check-box__icon
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'CheckBox',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
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
.check-box {
  background: #ffffff;
  border-radius: 50%;
  box-sizing: border-box;
  width: rem-calc(29);
  height: rem-calc(29);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid $color-checkbox-border;

  &__input {
    display: none;
  }

  &__icon {
    opacity: 0;
    visibility: hidden;
    color: $color-checkbox-icon;
    transition: all 0.1s ease-in-out;
    transform: translateY(rem-calc(-6));
  }

  &.check-box__checked {
    border-color: $color-checkbox-border-checked;
  }

  &.check-box__checked &__icon {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
}
</style>
