<template lang="pug">
  .note(:class="{'note__done': done, 'note__edit': edit}")
    CheckBox.note__checkbox(v-model="done")
    input.note__input(
      type="text"
      v-model="description"
      @focus="onFocus"
      @blur="onBlur"
      @change="onDescChange"
      )
    .note__desc {{ description }}
      span.note__time(v-if="created") {{formattedTime}}
    IconButton.note__remove(icon="remove" :size="11")
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { computed, defineComponent, ref } from '@vue/composition-api';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import CheckBox from '@/components/CheckBox.vue';
import IconButton from '@/components/IconButton.vue';

dayjs.extend(relativeTime);

export default defineComponent({
  name: 'Note',
  components: { IconButton, CheckBox },
  props: {
    done: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: '',
    },
    created: {
      type: String,
      default: '',
    },
  },
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  setup(props, { emit }) {
    const edit = ref(false);

    const onFocus = () => {
      edit.value = true;
    };
    const onBlur = () => {
      edit.value = false;
    };

    const onDescChange = (e : Event) => {
      emit('update-desc', (e.target as HTMLInputElement).value);
    };

    const formattedTime = computed<string>(() => dayjs(props.created).fromNow(true));

    return {
      edit, onFocus, onBlur, onDescChange, formattedTime,
    };
  },
  emits: ['changed'],
});
</script>

<style scoped lang="scss">
.note {
  height: rem-calc(50);
  background-color: #fff;
  border: 1px solid $color-input-border;
  border-top: none;
  display: flex;
  align-items: center;
  padding: 0 rem-calc(6) 0 rem-calc(16);
  position: relative;

  &:last-child {
    border-radius: 0 0 rem-calc(12) rem-calc(12);
  }

  &__input {
    border: none;
    appearance: none;
    outline: none;
    margin-left: rem-calc(6);
    font-weight: 200;
    color: #000;
    width: 100%
  }

  &.note__done &__desc {
    text-decoration: line-through;
  }

  &__input {
    border: none;
    appearance: none;
    outline: none;
    margin-left: rem-calc(6);
    font-weight: 200;
    color: #000;
    width: 100%;
    opacity: 0;
    position: relative;
    z-index: 10;
  }

  &.note__edit &__input {
    opacity: 1;
  }

  &__checkbox {
    flex-shrink: 0;
  }

  &__time {
    color: $color-gray-9;
    font-size: rem-calc(10);
    margin-left: rem-calc(6);
    text-decoration: none ;
  }

  &__time {
    text-decoration: none;
    display: inline-block;
  }

  &__desc {
    position: absolute;
    left: rem-calc(52);
    font-weight: 200;
  }
}
</style>
