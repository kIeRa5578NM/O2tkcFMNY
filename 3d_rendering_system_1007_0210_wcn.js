// 代码生成时间: 2025-10-07 02:10:26
import Ember from 'ember';
import { inject as service } from '@ember/service';
import Three from 'three';

// Define a service for 3D rendering, which will handle the Three.js related tasks
export default class ThreeDRenderingService extends Ember.Service {
  constructor() {
    super(...arguments);
    // Initialize Three.js scene, camera, and renderer
    this.scene = new Three.Scene();
    this.camera = new Three.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    this.renderer = new Three.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  // Set up the lighting
  setupLighting() {
    const ambientLight = new Three.AmbientLight(0x404040); // soft white light
    this.scene.add(ambientLight);
    const directionalLight = new Three.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 0);
    this.scene.add(directionalLight);
  }

  // Add an object to the scene
  addObject(object) {
    try {
      this.scene.add(object);
    } catch (error) {
      console.error('Failed to add object to the scene:', error);
      throw error;
    }
  }

  // Render the scene
  render() {
    this.camera.lookAt(this.scene.position);
    this.renderer.render(this.scene, this.camera);
  }

  // Update the renderer size on window resize
  resizeRenderer() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  // Event listener for window resize
  attachResizeListener() {
    window.addEventListener('resize', this.resizeRenderer.bind(this), false);
  }
}

// Usage within a component
import Component from '@glimmer/component';
import { action } from '@ember/object';
import ThreeDRenderingService from './path-to-three-d-rendering-service';

export default class ThreeDRenderingContextComponent extends Component {
  @service threeDRendering;
  
  @action
  init() {
    this.threeDRendering.setupLighting();
    this.threeDRendering.attachResizeListener();
  }

  @action
  addCube() {
    const geometry = new Three.BoxGeometry(1, 1, 1);
    const material = new Three.MeshBasicMaterial({color: 0x00ff00});
    const cube = new Three.Mesh(geometry, material);
    this.threeDRendering.addObject(cube);
  }

  @action
  renderLoop() {
    this.threeDRendering.render();
  }
}

// Documentation
/**
 * 3D Rendering System using Ember and Three.js
 *
 * This service and component setup provides a basic 3D rendering system.
 * It initializes a Three.js scene, camera, and renderer, sets up lighting,
 * and provides methods to add objects to the scene and render it.
 *
 * @module ThreeDRenderingService
 * @author Your Name
 * @version 1.0
 */