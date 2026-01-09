import * as THREE from "three";
import MeshAssembler from "@world/MeshAssembler";

class Gable extends MeshAssembler {
  constructor(texture, options) {
    super(texture);
    this.texture = texture;
    this.options = options;
    this.createShape(options);
    this.createGeometry();
    this.setTexture();
    this.createMaterial();
    this.createMesh();
  }

  createShape({ widthHalf, height, window }) {
    const shape = new THREE.Shape();

    shape.moveTo(-widthHalf, 0);
    shape.lineTo(0, height);
    shape.lineTo(widthHalf, 0);
    shape.lineTo(-widthHalf, 0);

    if (window) {
      const hole = new THREE.Path();
      hole.absarc(window.x ?? 0, window.y, window.radius, 0, Math.PI * 2);
      shape.holes.push(hole);
    }

    this.shape = shape;
  }

  createGeometry() {
    this.geometry = this.normalizeShapeUV(new THREE.ShapeGeometry(this.shape));
  }

  setTexture() {
    const texture = this.texture;
    for (const key in texture) {
      texture[key].repeat.x = 2.5;
      texture[key].wrapS = THREE.RepeatWrapping;
      texture[key].wrapT = THREE.ClampToEdgeWrapping;
      texture[key].offset.x = 0.32;
    }
    texture.color.colorSpace = THREE.SRGBColorSpace;
  }

  createMaterial() {
    const texture = this.texture;
    this.material = new THREE.MeshStandardMaterial({
      map: texture.color,
      aoMap: texture.ambientOcclusion,
      aoMapIntensity: 1.0,
      normalMap: texture.normal,
      roughness: 0.7,
      metalness: 0.2,
      displacementMap: texture.displacement,
      displacementScale: 0.002,
      side: THREE.DoubleSide,
    });
  }

  createMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
  }

  normalizeShapeUV(geometry) {
    geometry.computeBoundingBox();

    const box = geometry.boundingBox;
    const size = new THREE.Vector2(box.max.x - box.min.x, box.max.y - box.min.y);

    const uv = geometry.attributes.uv;
    for (let i = 0; i < uv.count; i++) {
      uv.setXY(i, (uv.getX(i) - box.min.x) / size.x, (uv.getY(i) - box.min.y) / size.y);
    }

    uv.needsUpdate = true;
    return geometry;
  }
}

export default Gable;
