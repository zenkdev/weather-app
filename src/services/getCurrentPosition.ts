export const getCurrentPosition = async () =>
  new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
