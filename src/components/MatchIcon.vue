<script setup>
const props = defineProps(['item'])
const classname = "match-icon match-icon-" + props.item[0];
</script>

<template>
    <span :class=classname>{{item[0]}}</span>
</template>