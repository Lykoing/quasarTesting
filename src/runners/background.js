import {
  CapacitorNotifications,
  CapacitorGeolocation,
} from "@capacitor/background-runner";

addEventListener("showGeo", async (resolve, reject, args) => {
  console.log("Из евента");
  const location = await CapacitorGeolocation.getCurrentPosition();
  const options = {
    notifications: [
      {
        id: 1,
        title: "Your geo",
        body: location.coords,
        largeBody: location.coords,
        summaryText: "Your geo",
      },
    ],
  };
  await CapacitorNotifications.schedule(options);
  resolve();
});
