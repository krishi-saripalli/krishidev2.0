/**
 * Creates and compiles a shader
 */
export function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) {
    console.error("Failed to create shader object");
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!success) {
    const shaderType = type === gl.VERTEX_SHADER ? "vertex" : "fragment";
    const log = gl.getShaderInfoLog(shader);
    console.error(`${shaderType} shader compilation error:`);
    console.error(log);
    console.error("Shader source:");
    console.error(source);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

/**
 * Creates a program from vertex and fragment shaders
 */
export function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!success) {
    console.error("Program linking error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

/**
 * Creates a texture for storing game state
 */
export function createTexture(
  gl: WebGLRenderingContext,
  width: number,
  height: number,
  data?: Uint8Array
): WebGLTexture | null {
  const texture = gl.createTexture();
  if (!texture) return null;

  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set texture parameters for nearest-neighbor sampling (for crisp cells)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  // Convert single-channel data to RGBA if provided
  let rgbaData: Uint8Array | null = null;
  if (data) {
    rgbaData = new Uint8Array(width * height * 4);
    for (let i = 0; i < data.length; i++) {
      const idx = i * 4;
      rgbaData[idx] = data[i]; // R
      rgbaData[idx + 1] = data[i]; // G
      rgbaData[idx + 2] = data[i]; // B
      rgbaData[idx + 3] = 255; // A
    }
  }

  // Ensure row alignment is valid regardless of width
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

  // Use RGBA format (required for framebuffer attachment in WebGL)
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    width,
    height,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    rgbaData
  );

  return texture;
}

/**
 * Creates a framebuffer attached to a texture
 */
export function createFramebuffer(
  gl: WebGLRenderingContext,
  texture: WebGLTexture
): WebGLFramebuffer | null {
  const framebuffer = gl.createFramebuffer();
  if (!framebuffer) {
    console.error("Failed to create framebuffer object");
    return null;
  }

  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    texture,
    0
  );

  // Check if framebuffer is complete
  const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  if (status !== gl.FRAMEBUFFER_COMPLETE) {
    console.error("Framebuffer is not complete:", status);
    console.error("Status codes:", {
      FRAMEBUFFER_COMPLETE: gl.FRAMEBUFFER_COMPLETE,
      FRAMEBUFFER_INCOMPLETE_ATTACHMENT: gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT,
      FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
        gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT,
      FRAMEBUFFER_INCOMPLETE_DIMENSIONS: gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS,
      FRAMEBUFFER_UNSUPPORTED: gl.FRAMEBUFFER_UNSUPPORTED,
    });
    gl.deleteFramebuffer(framebuffer);
    return null;
  }

  return framebuffer;
}

/**
 * Sets up a full-screen quad for rendering
 */
export function setupQuad(
  gl: WebGLRenderingContext,
  program: WebGLProgram
): void {
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Two triangles forming a quad covering the entire viewport
  const positions = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  const positionLocation = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
}

/**
 * Generates initial state with random blobs
 */
export function generateInitialState(
  width: number,
  height: number,
  numBlobs: number = 3
): Uint8Array {
  const data = new Uint8Array(width * height);

  // Create random blobs
  for (let i = 0; i < numBlobs; i++) {
    const centerX = Math.floor(Math.random() * width);
    const centerY = Math.floor(Math.random() * height);
    const radius = Math.floor(6 + Math.random() * 10);

    // Fill circular blob with live cells
    for (let y = -radius; y <= radius; y++) {
      for (let x = -radius; x <= radius; x++) {
        if (x * x + y * y <= radius * radius) {
          const px = (centerX + x + width) % width;
          const py = (centerY + y + height) % height;
          const index = py * width + px;

          // Random density within blob
          if (Math.random() > 0.3) {
            data[index] = 255;
          }
        }
      }
    }
  }

  return data;
}
