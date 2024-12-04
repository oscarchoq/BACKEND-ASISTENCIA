function haversine(lat1, lon1, lat2, lon2) {
  // Radio de la Tierra en kilómetros
  const R = 6371;

  // Convertir grados a radianes
  const toRadians = (degrees) => degrees * (Math.PI / 180);

  lat1 = toRadians(lat1);
  lon1 = toRadians(lon1);
  lat2 = toRadians(lat2);
  lon2 = toRadians(lon2);

  // Diferencias
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  // Fórmula de Haversine
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distancia en kilómetros
  return R * c;
}

export function verificarUbicacion(latActual, lonActual) {
  // -18.024778620385778, -70.25095834233083
  // const latBase = -17.972765200316353;
  // const lonBase = -70.22736907381774;
  const latBase = -18.024778620385778;
  const lonBase = -70.25095834233083;
  const radio = 2; // Radio en kilómetros
  const distancia = haversine(latBase, lonBase, latActual, lonActual);
  return distancia <= radio;
}

// Ejemplo de uso -17.972765200316353, -70.22736907381774
// const latBase = -17.972765200316353; // Ubicación base
// const lonBase = -70.22736907381774;
// const latActual = -17.971697; // Ubicación actual
// const lonActual = -70.226814;

// if (verificarUbicacion(latBase, lonBase, latActual, lonActual, radio)) {
//   console.log("Estás dentro del rango permitido.");
// } else {
//   console.log("Estás fuera del rango permitido.");
// }
