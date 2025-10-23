import { Sky } from "three/examples/jsm/objects/Sky.js";
import { Vector3, MathUtils } from "three";

const sky = new Sky();
sky.scale.setScalar(450000); // размер небесного купола — делаем громадным, чтобы окружало всю сцену

// Координаты солнца:
const phi = MathUtils.degToRad(75); // угол от зенита (90 - высота солнца)
const theta = MathUtils.degToRad(0); // азимут (в какую сторону "смотрит" солнце)

const sunPosition = new Vector3().setFromSphericalCoords(1, phi, theta);
sky.material.uniforms.sunPosition.value = sunPosition;

// Настраиваем параметры атмосферы:
sky.material.uniforms.turbidity.value = 10; // "мутность" атмосферы
sky.material.uniforms.rayleigh.value = 3; // рассеяние света
sky.material.uniforms.mieCoefficient.value = 0.005; // рассеяние на частицах
sky.material.uniforms.mieDirectionalG.value = 0.7; // направление рассеяния

export { sky };
