<template lang="pug">
.search-box
  input.search-box__input(placeholder="Search" v-model="valueLocal" type="search")
  i.icon-search.search-box__icon
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchBox',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const valueLocal = computed({
      get: () => props.modelValue,
      set: (val) => {
        emit('update:modelValue', val);
      },
    });

    return { valueLocal };
  },
  emits: ['update:modelValue'],

});
</script>

<style scoped lang="scss">
.search-box {
  position: relative;
  align-items: center;
  display: flex;

  &__input {
    background-color: $color-gray-1;
    border: none;
    height: rem-calc(32);
    border-radius: rem-calc(12);
    font-weight: 300;
    padding: 0 rem-calc(16) 0 rem-calc(32);
    outline: none;
    width: 100%;
    box-sizing: border-box;

    &:focus {
      box-shadow: inset 0 0 4px $color-gray-5;
    }
  }

  &__icon {
    position: absolute;
    color: $color-gray-8;
    left: rem-calc(8);
  }
}
</style>
