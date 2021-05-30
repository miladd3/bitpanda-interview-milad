<template lang="pug">
.pagination
  .pagination__line(v-if="hasNext && hasPrev")
  button.pagination__button.pagination__back(@click="$emit('prev')" v-if="hasPrev")
    i.icon-arrow-left
  button.pagination__button.pagination__forward(@click="$emit('next')" v-if="hasNext")
    i.icon-arrow-right
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Pagination',
  emits: ['prev', 'next'],
  props: {
    hasPrev: {
      type: Boolean,
      default: false,
    },
    hasNext: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped lang="scss">
.pagination {
  height: rem-calc(34);
  display: flex;
  background: #ffffff;
  border-radius: rem-calc(12);
  position: relative;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.17);

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    border: 0;
    background: none;
    width: rem-calc(35);
    padding: 0;
    color: $color-gray-8;
    cursor: pointer;
  }

  &__line {
    display: block;
    height: rem-calc(20);
    width: 1px;
    background: $color-gray-5;
    position: absolute;
    left: 50%;
  }
}
</style>
