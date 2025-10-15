"use client";

import { useEffect, useRef } from "react";
import {
  createShader,
  createProgram,
  createTexture,
  createFramebuffer,
  generateInitialState,
} from "./webgl-utils";
import {
  vertexShaderSource,
  displayFragmentShaderSource,
  computeFragmentShaderSource,
} from "./shaders";

interface ConwayGameOfLifeProps {
  gridWidth?: number;
  gridHeight?: number;
  updateInterval?: number;
}

export default function ConwayGameOfLife({
  gridWidth = 80,
  gridHeight = 60,
  updateInterval = 150,
}: ConwayGameOfLifeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const lastUpdateTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
    if (!gl) {
      console.error("❌ WebGL not supported");
      return;
    }

    // Create shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const displayFragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      displayFragmentShaderSource
    );
    const computeFragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      computeFragmentShaderSource
    );

    if (!vertexShader || !displayFragmentShader || !computeFragmentShader) {
      console.error("❌ Failed to create shaders");
      return;
    }

    // Create programs
    const displayProgram = createProgram(
      gl,
      vertexShader,
      displayFragmentShader
    );
    const computeProgram = createProgram(
      gl,
      vertexShader,
      computeFragmentShader
    );

    if (!displayProgram || !computeProgram) {
      console.error("❌ Failed to create programs");
      return;
    }

    // Generate initial state
    const initialState = generateInitialState(gridWidth, gridHeight, 4);

    // Create textures for ping-pong rendering
    const texture1 = createTexture(gl, gridWidth, gridHeight, initialState);
    const texture2 = createTexture(gl, gridWidth, gridHeight);

    if (!texture1 || !texture2) {
      console.error("❌ Failed to create textures");
      return;
    }

    // Create framebuffers
    const framebuffer1 = createFramebuffer(gl, texture1);
    const framebuffer2 = createFramebuffer(gl, texture2);

    if (!framebuffer1 || !framebuffer2) {
      console.error("❌ Failed to create framebuffers");
      return;
    }

    let currentFB = 0; // 0 or 1
    const framebuffers = [framebuffer1, framebuffer2];
    const textures = [texture1, texture2];

    // Get uniform locations
    const computeStateLocation = gl.getUniformLocation(
      computeProgram,
      "u_state"
    );
    const computeResolutionLocation = gl.getUniformLocation(
      computeProgram,
      "u_resolution"
    );
    const displayStateLocation = gl.getUniformLocation(
      displayProgram,
      "u_state"
    );
    const displayResolutionLocation = gl.getUniformLocation(
      displayProgram,
      "u_resolution"
    );
    const displayCanvasSizeLocation = gl.getUniformLocation(
      displayProgram,
      "u_canvasSize"
    );

    // Setup geometry once
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Handle window resize
    let lastWidth = 0;
    let lastHeight = 0;
    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const newWidth = Math.floor(rect.width);
      const newHeight = Math.floor(rect.height);

      // Only update if size actually changed (avoid spam)
      if (newWidth === lastWidth && newHeight === lastHeight) return;

      canvas.width = newWidth;
      canvas.height = newHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);

      lastWidth = newWidth;
      lastHeight = newHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    // Animation loop
    const render = (timestamp: number) => {
      if (!lastUpdateTimeRef.current) {
        lastUpdateTimeRef.current = timestamp;
      }

      const elapsed = timestamp - lastUpdateTimeRef.current;

      // Update game state at specified interval
      if (elapsed >= updateInterval) {
        // Compute next generation
        gl.useProgram(computeProgram);

        // Setup attributes for compute program
        const computePosLocation = gl.getAttribLocation(
          computeProgram,
          "a_position"
        );
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.enableVertexAttribArray(computePosLocation);
        gl.vertexAttribPointer(computePosLocation, 2, gl.FLOAT, false, 0, 0);

        gl.uniform1i(computeStateLocation, 0);
        gl.uniform2f(computeResolutionLocation, gridWidth, gridHeight);

        // Bind input texture (read from current)
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, textures[currentFB]);

        // Render to other framebuffer (write to next)
        const nextFB = 1 - currentFB;
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffers[nextFB]);
        gl.viewport(0, 0, gridWidth, gridHeight);
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        // Swap buffers
        currentFB = nextFB;

        lastUpdateTimeRef.current = timestamp;
      }

      // Display current state to screen
      gl.useProgram(displayProgram);

      // Setup attributes for display program
      const displayPosLocation = gl.getAttribLocation(
        displayProgram,
        "a_position"
      );
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(displayPosLocation);
      gl.vertexAttribPointer(displayPosLocation, 2, gl.FLOAT, false, 0, 0);

      gl.uniform1i(displayStateLocation, 0);
      if (displayResolutionLocation) {
        gl.uniform2f(displayResolutionLocation, gridWidth, gridHeight);
      }
      if (displayCanvasSizeLocation) {
        gl.uniform2f(displayCanvasSizeLocation, canvas.width, canvas.height);
      }

      // Bind current state texture
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textures[currentFB]);

      // Render to canvas
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(displayProgram);
      gl.deleteProgram(computeProgram);
      gl.deleteShader(vertexShader);
      gl.deleteShader(displayFragmentShader);
      gl.deleteShader(computeFragmentShader);
      gl.deleteTexture(texture1);
      gl.deleteTexture(texture2);
      gl.deleteFramebuffer(framebuffer1);
      gl.deleteFramebuffer(framebuffer2);
    };
  }, [gridWidth, gridHeight, updateInterval]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
}
