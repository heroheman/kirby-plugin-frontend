<template>
<div>
  <slot></slot>
  <ul>
    <li>
      {{url}}
    </li>
  </ul>
</div>
</template>

<script>
export default {
    name: 'pagination',
    props: [
        "url",
        "lastPage"
    ]
}
</script>
