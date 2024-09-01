<script setup>
    const props = defineProps(['tours', 'currentTour'])
</script>

<template>
    <select @change="$emit('tourChanged', $event)">
        <option :selected="currentTour == item" v-for="(item) in tours" :value="item">{{ item }}</option>
    </select>

</template>