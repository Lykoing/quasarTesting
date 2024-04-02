<template>
  <q-page class="flex flex-center">
    <div>
      GPS position:
      <strong>
        <!-- {{ position?.coords?.latitude }}, {{ position?.coords?.longitude }} -->
        {{ position }}
      </strong>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Geolocation } from "@capacitor/geolocation";

import { BackgroundRunner } from "@capacitor/background-runner";

const position = ref("determining...");
let geoId;

function getCurrentPosition() {
  Geolocation.getCurrentPosition().then((newPosition) => {
    console.log("Current", newPosition);
    position.value = newPosition;
  });
}

onMounted(async () => {
  const permissions = await BackgroundRunner.requestPermissions({
    apis: ["geolocation", "notifications"],
  });

  getCurrentPosition();
  // we start listening
  geoId = Geolocation.watchPosition({}, async (newPosition, err) => {
    console.log("New GPS position");
    position.value = newPosition;

    const result = await BackgroundRunner.dispatchEvent({
      label: "org.capacitor.quasar.app",
      event: "showGeo",
      details: { position: newPosition.coords.latitude },
    });
  });
});

onBeforeUnmount(() => {
  // we do cleanup
  Geolocation.clearWatch(geoId);
});
</script>
