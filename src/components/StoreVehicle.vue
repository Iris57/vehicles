<template>
  <div
    class="store-vehicle"
    @click="setSelectedVehicleId(vehicle.id)"
    :style="`left: ${vehicle.position.x}%; top: ${vehicle.position.y}%;`"
    :class="vehicle.hasLoad ? 'store-vehicle__loaded' : ''"
  >
    <img
      alt="battery"
      src="../assets/battery.png"
      class="store-vehicle__battery"
      :class="batteryColor"
    />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "StoreVehicle",
  props: {
    vehicle: {
      type: Object,
      default: null,
    },
  },
  computed: {
    batteryColor() {
      const color =
        this.vehicle.batteryStatus < 0.3
          ? "store-vehicle__battery--red"
          : this.vehicle.batteryStatus < 0.5
          ? "store-vehicle__battery--yellow"
          : "";
      const charging = this.vehicle.charging
        ? "store-vehicle__battery--charging"
        : "";
      return `${color} ${charging}`;
    },
  },
  methods: {
    ...mapMutations(["setSelectedVehicleId"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.store-vehicle {
  position: absolute;
  width: 100px;
  height: 60px;
  background: white;
  border: 1px solid black;
  transition: left 0.2s linear;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.store-vehicle__loaded {
  background: darkgray;
}
.store-vehicle__battery {
  width: 50px;
  height: auto;
  position: relative;
  background: green;
}
.store-vehicle__battery--red {
  background: darkred;
}
.store-vehicle__battery--yellow {
  background: darkorange;
}
.store-vehicle__battery--charging {
  animation: blink-animation 1s infinite;
}

@keyframes blink-animation {
  to {
    opacity: 0.5;
  }
}
@-webkit-keyframes blink-animation {
  to {
    opacity: 0;
  }
}
</style>
