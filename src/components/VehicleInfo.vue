<template>
  <div class="vehicle-info">
    <div class="vehicle-info__close" @click="setSelectedVehicleId(null)">X</div>
    <div class="vehicle-info__headline">Vehicle {{ vehicle.id }}</div>
    <div class="vehicle-info__grid">
      <div class="vehicle-info__title" :class="batteryTextColor">Battery</div>
      <div :class="batteryTextColor">
        {{ Math.round(vehicle.batteryStatus * 100) }} %
      </div>
      <div class="vehicle-info__title">Charging</div>
      <div>{{ vehicle.charging }}</div>
      <div class="vehicle-info__title">Has load</div>
      <div>{{ vehicle.hasLoad }}</div>
      <div class="vehicle-info__title">Position</div>
      <div>
        {{ Math.round(vehicle.position.x) }} /
        {{ Math.round(vehicle.position.y) }}
      </div>
      <div class="vehicle-info__title">Speed</div>
      <div>
        <input
          v-model="vehicleSpeed"
          type="number"
          min="0"
          max="1"
          step="0.1"
        />
      </div>
    </div>
    <div
      class="vehicle-info__button vehicle-info__stop text-error"
      v-if="vehicle.speed > 0"
      @click="setVehicleSpeed({ vehicleId: vehicle.id, speed: 0 })"
    >
      STOP
    </div>
    <div
      v-else
      class="vehicle-info__button vehicle-info__start text-ok"
      @click="setVehicleSpeed({ vehicleId: vehicle.id, speed: 1 })"
    >
      START
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "VehicleInfo",
  computed: {
    ...mapGetters(["getSelectedVehicle"]),
    vehicle() {
      return this.getSelectedVehicle;
    },
    vehicleSpeed: {
      get: function () {
        return this.getSelectedVehicle.speed;
      },
      // we need a setter here to directly update the state
      set: function (newSpeed) {
        this.setVehicleSpeed({
          vehicleId: this.getSelectedVehicle.id,
          speed: newSpeed,
        });
      },
    },
    batteryTextColor() {
      return this.vehicle.batteryStatus < 0.3
        ? "text-error"
        : this.vehicle.batteryStatus < 0.5
        ? "text-warning"
        : "text-ok";
    },
  },
  methods: {
    ...mapMutations(["setSelectedVehicleId"]),
    ...mapActions(["setVehicleSpeed"]),
  },
};
</script>
<style lang="css" scoped>
.vehicle-info {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 40px;
  border: 1px solid black;
  border-radius: 5px;
  box-shadow: 5px 5px 5px black;
  background: rgba(256, 256, 256, 0.9);
}
.vehicle-info__close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  padding: 10px;
}
.vehicle-info__headline {
  font-size: 120%;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}
.vehicle-info__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}
.vehicle-info__title {
  font-weight: bold;
}
.vehicle-info__button {
  margin-top: 20px;
  width: max-content;
  padding: 20px;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 5px;
  box-shadow: 2px 1px 1px black;
  margin-left: auto;
  margin-right: auto;
  font-weight: bold;
  font-size: 120%;
}
input {
  padding: 5px;
}
</style>
