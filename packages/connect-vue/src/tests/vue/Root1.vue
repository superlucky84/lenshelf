<script setup lang="ts">
import { useProfileRef } from '../store/store';
import { defineProps } from 'vue';

import Age from './Age.vue';
import AgeWithoutExtractingValue from './AgeWithoutExtractingValue.vue';

const props = defineProps({ mockFn: Function });

const ageRef = useProfileRef<number>(stateRef => stateRef.age);

const incrementFromage = () => {
  ageRef.value += 1;
};
</script>

<template>
  <div>
    <Age />
    <AgeWithoutExtractingValue :mockFn="props.mockFn" />
  </div>
</template>
