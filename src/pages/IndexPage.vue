<template>
  <q-page class="flex flex-center">
    <div>
      GPS position:
      <strong>
        <!-- {{ position?.coords?.latitude }}, {{ position?.coords?.longitude }} -->
        {{ position }}
        Прикол
      </strong>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Geolocation } from "@capacitor/geolocation";

const position = ref("determining...");
let geoId;

function getCurrentPosition() {
  Geolocation.getCurrentPosition().then((newPosition) => {
    console.log("Current", newPosition);
    position.value = newPosition;
  });
}

onMounted(() => {
  getCurrentPosition();

  // we start listening
  geoId = Geolocation.watchPosition({}, (newPosition, err) => {
    console.log("New GPS position");
    position.value = newPosition;
  });
});

onBeforeUnmount(() => {
  // we do cleanup
  Geolocation.clearWatch(geoId);
});
</script>
