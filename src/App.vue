<template>
  <StoreArea />
  <VehicleInfo v-if="getSelectedVehicleId" />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import StoreArea from "./components/StoreArea.vue";
import VehicleInfo from "./components/VehicleInfo.vue";

export default {
  name: "App",
  components: {
    StoreArea,
    VehicleInfo,
  },
  computed: {
    ...mapGetters(["getSelectedVehicleId"]),
  },
  methods: {
    ...mapActions(["moveVehicles"]),
  },
  mounted() {
    this.moveVehicles();
  },
};
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.text-warning {
  color: darkorange;
}
.text-error {
  color: darkred;
}
.text-ok {
  color: darkgreen;
}
</style>
