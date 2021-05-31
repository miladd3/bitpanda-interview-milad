<template lang="pug">
.note(:class="{'note__done': localDone, 'note__edit': edit}")
  CheckBox.note__checkbox(v-model="localDone")
  .note__desc {{ description }}
    span.note__time(v-if="created") {{formattedTime}}
  IconButton.note__remove(icon="remove" :size="11" @click="$emit('delete')")
</template>

<script lang="ts">
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  computed, defineComponent, ref,
} from 'vue';

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
  setup(props, { emit }) {
    const edit = ref(false);
    const localDone = computed<boolean>({
      get: () => props.done,
      set: (val:boolean) => {
        emit('done', val);
      },
    });

    const onFocus = () => {
      edit.value = true;
    };
    const onBlur = () => {
      edit.value = false;
    };

    const formattedTime = computed<string>(() => dayjs(props.created).fromNow(true));

    return {
      edit, onFocus, onBlur, formattedTime, localDone,
    };
  },
  emits: ['delete', 'done'],
});
</script>

<style scoped lang="scss">
.note {
  min-height: rem-calc(50);
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
    text-decoration: none;
  }

  &__time {
    text-decoration: none;
    display: inline-block;
  }

  &__desc {
    position: relative;
    font-weight: 200;
    text-align: left;
    margin-left: rem-calc(6);
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
