<template>

  <div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.$emit("updateUser");
  },
};
</script>
