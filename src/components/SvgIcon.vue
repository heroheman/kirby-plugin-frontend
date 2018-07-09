<template>
    <svg :class="['icon', 'icon-' + icon]">
        <use :xlink:href="'#icon-' + icon"></use>
    </svg>
</template>

<script>
export default {
    name: 'SvgIcon',
    props: {
        icon: String
    }
}
</script>

<style scoped>
.icon {
    height: 1.7rem;
    width: 1.7rem;
    /* fill: red; */
}
</style>


