import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ParticleBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const particlesRef = useRef<THREE.Points>();
  const linesRef = useRef<THREE.LineSegments>();
  const animationId = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Particles setup
    const particleCount = 800;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Create particles with random positions and velocities
    for (let i = 0; i < particleCount * 3; i += 3) {
      // Position
      positions[i] = (Math.random() - 0.5) * 200;
      positions[i + 1] = (Math.random() - 0.5) * 200;
      positions[i + 2] = (Math.random() - 0.5) * 200;

      // Velocity
      velocities[i] = (Math.random() - 0.5) * 0.02;
      velocities[i + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i + 2] = (Math.random() - 0.5) * 0.02;

      // Colors (purple to blue gradient)
      const colorChoice = Math.random();
      if (colorChoice < 0.3) {
        // Purple
        colors[i] = 0.6;     // R
        colors[i + 1] = 0.2; // G
        colors[i + 2] = 1.0; // B
      } else if (colorChoice < 0.6) {
        // Blue
        colors[i] = 0.0;     // R
        colors[i + 1] = 0.8; // G
        colors[i + 2] = 1.0; // B
      } else {
        // Cyan
        colors[i] = 0.0;     // R
        colors[i + 1] = 1.0; // G
        colors[i + 2] = 1.0; // B
      }
    }

    // Particle geometry and material
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 3,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    particlesRef.current = particles;
    scene.add(particles);

    // Connection lines setup
    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x9333EA, // Purple
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    linesRef.current = lines;
    scene.add(lines);

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      animationId.current = requestAnimationFrame(animate);

      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        
        // Update particle positions
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += velocities[i];
          positions[i + 1] += velocities[i + 1];
          positions[i + 2] += velocities[i + 2];

          // Boundary check and bounce
          if (Math.abs(positions[i]) > 100) velocities[i] *= -1;
          if (Math.abs(positions[i + 1]) > 100) velocities[i + 1] *= -1;
          if (Math.abs(positions[i + 2]) > 100) velocities[i + 2] *= -1;

          // Mouse interaction effect
          const mouseInfluence = 0.0001;
          positions[i] += mouseRef.current.x * mouseInfluence;
          positions[i + 1] += mouseRef.current.y * mouseInfluence;
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true;
        
        // Rotate particles slowly
        particlesRef.current.rotation.y += 0.0005;
        particlesRef.current.rotation.x += 0.0002;
      }

      // Update connection lines
      if (linesRef.current && particlesRef.current) {
        const linePositions: number[] = [];
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        const maxConnections = 150;
        let connectionCount = 0;
        
        for (let i = 0; i < positions.length && connectionCount < maxConnections; i += 3) {
          for (let j = i + 3; j < positions.length && connectionCount < maxConnections; j += 3) {
            const dx = positions[i] - positions[j];
            const dy = positions[i + 1] - positions[j + 1];
            const dz = positions[i + 2] - positions[j + 2];
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (distance < 25) {
              linePositions.push(positions[i], positions[i + 1], positions[i + 2]);
              linePositions.push(positions[j], positions[j + 1], positions[j + 2]);
              connectionCount++;
            }
          }
        }

        linesRef.current.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      }

      // Camera movement based on mouse
      camera.position.x += (mouseRef.current.x * 5 - camera.position.x) * 0.01;
      camera.position.y += (-mouseRef.current.y * 5 - camera.position.y) * 0.01;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default ParticleBackground;