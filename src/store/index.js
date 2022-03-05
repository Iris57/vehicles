import { createStore } from "vuex";

export default createStore({
  state: {
    selectedVehicleId: "v1",
    maxX: 0,
    maxY: 0,
    chargingLevel: 0.1,
    vehicles: [
      {
        id: "v1",
        batteryStatus: 0.2,
        position: {
          x: 20,
          y: 20,
        },
        speed: 0.2,
        direction: {
          x: 1,
          y: 0,
        },
        hasLoad: false, // show if there are items on the vehicle
        charging: false,
      },
      {
        id: "v2",
        batteryStatus: 1,
        position: {
          x: 50,
          y: 80,
        },
        speed: 0.9,
        direction: {
          x: 1,
          y: 0,
        },
        hasLoad: true, // show if there are items on the vehicle
        charging: false,
      },
    ],
    intervalTimer: {},
    chargingInterval: {},
  },
  getters: {
    getVehicleInfo: (state) => (vehicleId) => {
      return state.vehicles.find((vehicle) => vehicle.id === vehicleId);
    },
    getSelectedVehicleId(state) {
      return state.selectedVehicleId;
    },
    getSelectedVehicle(state, getters) {
      return getters.getVehicleInfo(state.selectedVehicleId);
    },
    getVehicles(state) {
      return state.vehicles;
    },
  },
  mutations: {
    setSelectedVehicleId(state, vehicleId) {
      state.selectedVehicleId = vehicleId;
    },
  },
  actions: {
    setVehicleSpeed({ getters }, { vehicleId, speed }) {
      const vehicle = getters.getVehicleInfo(vehicleId);
      if (vehicle && speed >= 0 && speed <= 1) {
        clearInterval(this.chargingInterval);
        vehicle.charging = false;
        vehicle.speed = speed;
      }
    },
    moveVehicles({ state, dispatch }) {
      this.intervalTimer = setInterval(function () {
        // this interval function with speed and direction just simulates an update behaviour, the position would be fetched from backend normally
        state.vehicles.forEach((vehicle) => {
          if (vehicle.position.x > 90) {
            vehicle.direction.x = -1;
          } else if (vehicle.position.x < 10) {
            vehicle.direction.x = 1;
          }
          vehicle.position.x += vehicle.direction.x * vehicle.speed;
          if (vehicle.speed > 0) dispatch("drainBattery", vehicle);
        });
      }, 200);
    },
    drainBattery({ state, dispatch }, vehicle) {
      // this simulates a battery getting drained while the vehicle moves
      vehicle.batteryStatus -= 0.005;
      if (vehicle.batteryStatus < state.chargingLevel) {
        dispatch("chargeVehicle", vehicle);
      }
    },
    // eslint-disable-next-line
    chargeVehicle({ state }, vehicle) {
      vehicle.charging = true;
      vehicle.speed = 0;
      this.chargingInterval = setInterval(
        function () {
          // this interval function just simulates an charging behaviour, the battery status would be fetched from backend normally
          vehicle.batteryStatus = Math.min(vehicle.batteryStatus + 0.1, 1);
          if (vehicle.batteryStatus === 1) {
            clearInterval(this.chargingInterval);
            vehicle.charging = false;
            vehicle.speed = 1;
          }
        }.bind(this),
        1000
      );
    },
  },
  modules: {},
});
