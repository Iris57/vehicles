<template>
  <div class="store-area">
    <StoreVehicle
      v-for="vehicle in getVehicles"
      :key="vehicle.id"
      :vehicle="vehicle"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import StoreVehicle from "./StoreVehicle.vue";
export default {
  name: "StoreArea",
  components: { StoreVehicle },
  computed: {
    ...mapGetters(["getVehicles"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.store-area {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: lightblue;
}
</style>
