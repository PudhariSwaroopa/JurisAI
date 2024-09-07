import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';

const Hero = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    gsap.to('#hero', { opacity: 1, delay: 1.0 });
  }, []);

  useEffect(() => {
    let scene, camera, renderer, particles, particleGeometry, particleMaterial, animationFrameId;
    const particlePositions = [];
    const interactionRadius = 0.5; // Interaction range for cursor
    const baseRadius = 3; // Radius of the circular shape
    const particleCount = 1000;
    const speeds = new Float32Array(particleCount); // Array to hold individual rotation speeds

    // Mouse position in normalized device coordinates
    const mouse = new THREE.Vector2();

    const initParticles = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Create Scene and Camera
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 5;

      // Create Renderer
      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      mountRef.current.appendChild(renderer.domElement);

      // Load texture for particles
      const textureLoader = new THREE.TextureLoader();
      const particleTexture = textureLoader.load('https://threejs.org/examples/textures/sprites/disc.png'); // Replace with a glittery texture

      // Create Particles
      particleGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const radiusOffset = (Math.random() - 0.5) * 0.5; // Random offset for roughness
        const x = (baseRadius + radiusOffset) * Math.cos(angle);
        const y = (baseRadius + radiusOffset) * Math.sin(angle);
        const z = (Math.random() - 0.5) * 0.5; // Random Z value

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        // Store initial positions
        particlePositions.push({ x, y, z });

        // Assign individual rotation speeds
        speeds[i] = 0.01 + Math.random() * 0.03; // Random speed between 0.01 and 0.04
      }

      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeometry.setAttribute('speed', new THREE.BufferAttribute(speeds, 1));

      // Dust-like material with glitter texture and glow effect
      particleMaterial = new THREE.PointsMaterial({
        map: particleTexture,
        size: 0.1, // Smaller size for dust
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        color: 0xffd700, // Gold color
      });

      particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      // Render loop
      const animate = () => {
        const positionsArray = particleGeometry.attributes.position.array;
        const speedsArray = particleGeometry.attributes.speed.array;

        // Update particle rotation continuously with a flowing effect
        const time = Date.now() * 0.001;
        for (let i = 0; i < particleCount; i++) {
          const angle = Math.atan2(positionsArray[i * 3 + 1], positionsArray[i * 3]);
          const radius = Math.sqrt(positionsArray[i * 3] ** 2 + positionsArray[i * 3 + 1] ** 2);
          const newAngle = angle + speedsArray[i] * (Math.cos(time * 1.5) + 1); // Continuous rotation with flowing effect
          positionsArray[i * 3] = radius * Math.cos(newAngle);
          positionsArray[i * 3 + 1] = radius * Math.sin(newAngle);
        }

        // Interaction effect
        const mousePos = new THREE.Vector2(
          (mouse.x * 0.5 + 0.5) * 2 - 1, // Transform from [-1, 1] range
          -(mouse.y * 0.5 + 0.5) * 2 + 1 // Transform from [-1, 1] range
        );

        for (let i = 0; i < particleCount; i++) {
          const px = positionsArray[i * 3];
          const py = positionsArray[i * 3 + 1];
          const dist = new THREE.Vector2(px, py).distanceTo(mousePos);

          // Apply dispersion effect to move particles away from the cursor
          const direction = new THREE.Vector2(px, py).sub(mousePos).normalize();
          const dispersion = direction.multiplyScalar(0.1 * Math.max(0, (interactionRadius - dist) / interactionRadius));
          positionsArray[i * 3] += dispersion.x;
          positionsArray[i * 3 + 1] += dispersion.y;

          // Smooth return to original positions
          if (dist >= interactionRadius) {
            positionsArray[i * 3] += (particlePositions[i].x - px) * 0.1;
            positionsArray[i * 3 + 1] += (particlePositions[i].y - py) * 0.1;
          }
        }

        particleGeometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      const handleMouseMove = (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      };

      window.addEventListener('resize', handleResize);
      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animationFrameId);
        renderer.dispose();
      };
    };

    initParticles();

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="w-full nav-height bg-black relative">
      {/* Title */}
      <div className="h-5/6 w-full flex-center flex-col relative z-10">
        <p id="hero" className="hero-title text-white z-20">JurisAI</p>
        <p id="hero" className="hero-title text-white z-20">Your Legal Guide</p>
        
        {/* Input Field for User Prompt */}
        <input
          type="text"
          placeholder="Enter your legal query..."
          className="mt-6 p-3 w-3/4 md:w-1/2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 z-20"
        />
      </div>

      {/* Three.js Particles Canvas */}
      <div ref={mountRef} className="absolute top-0 left-0 w-full h-full z-0"></div>
    </section>
  );
};

export default Hero;
