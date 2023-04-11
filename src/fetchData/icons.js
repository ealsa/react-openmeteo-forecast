import cloud from "../assets-icons/cloud.png";
import cloudBolt from "../assets-icons/cloudBolt.png";
import cloudRain from "../assets-icons/cloudRain.png";
import cloudSun from "../assets-icons/cloudSun.png";
import cloudSnow from "../assets-icons/snow.png";
import sun from "../assets-icons/sun.png";
import fog from "../assets-icons/fog.png";

const icons = (weatherCode) => {
  if (weatherCode === 0) {
    return sun;
  } else if (weatherCode === 1 || weatherCode === 2) {
    return cloudSun;
  } else if (weatherCode === 3) {
    return cloud;
  } else if (weatherCode >= 45 && weatherCode <= 48) {
    return fog;
  } else if (
    (weatherCode >= 51 && weatherCode <= 67) ||
    (weatherCode >= 80 && weatherCode <= 82)
  ) {
    return cloudRain;
  } else if (
    (weatherCode >= 71 && weatherCode <= 77) ||
    (weatherCode >= 85 && weatherCode <= 86)
  ) {
    return cloudSnow;
  } else if (weatherCode >= 95 && weatherCode <= 99) {
    return cloudBolt;
  } else {
    return "NO ICON";
  }
};

export default icons;
