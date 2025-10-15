// Vertex shader for rendering a full-screen quad
export const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 v_texCoord;
  
  void main() {
    v_texCoord = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// Fragment shader for displaying the game state
export const displayFragmentShaderSource = `
  precision mediump float;
  
  uniform sampler2D u_state;
  uniform vec2 u_resolution; // grid resolution in cells
  uniform vec2 u_canvasSize; // canvas size in pixels
  varying vec2 v_texCoord;
  
  void main() {
    // Keep cells square and cover the whole canvas (object-fit: cover)
    // Calculate the cell size in each dimension
    float cellSizeX = u_canvasSize.x / u_resolution.x;
    float cellSizeY = u_canvasSize.y / u_resolution.y;
    
    vec2 uv = v_texCoord;
    if (cellSizeX > cellSizeY) {
      // Width-constrained: cells fit exactly horizontally, crop vertically
      // Show less of the grid vertically (zoom in on Y)
      float ratio = cellSizeY / cellSizeX;
      uv.y = (uv.y - 0.5) * ratio + 0.5;
    } else if (cellSizeY > cellSizeX) {
      // Height-constrained: cells fit exactly vertically, crop horizontally
      // Show less of the grid horizontally (zoom in on X)
      float ratio = cellSizeX / cellSizeY;
      uv.x = (uv.x - 0.5) * ratio + 0.5;
    }

    // Wrap so we don't get edge smearing when cropping
    uv = fract(uv);

    // Snap sampling to the center of the nearest cell to avoid interpolation issues
    vec2 cell = floor(uv * u_resolution);
    vec2 snapUV = (cell + 0.5) / u_resolution;
    float state = texture2D(u_state, snapUV).r;
    
    // Live cells: blue (#0b47c8), dead cells: white
    vec3 blueColor = vec3(0.043, 0.278, 0.784); // #0b47c8
    vec3 whiteColor = vec3(1.0, 1.0, 1.0);
    
    vec3 color = mix(whiteColor, blueColor, state);
    gl_FragColor = vec4(color, 1.0);
  }
`;

// Fragment shader for computing the next generation
export const computeFragmentShaderSource = `
  precision mediump float;
  
  uniform sampler2D u_state;
  uniform vec2 u_resolution;
  varying vec2 v_texCoord;
  
  // Sample using toroidal wrapping at cell granularity
  float getCell(vec2 offset) {
    vec2 cell = floor(v_texCoord * u_resolution);
    vec2 neighbor = mod(cell + offset + u_resolution, u_resolution);
    vec2 uv = (neighbor + 0.5) / u_resolution;
    return texture2D(u_state, uv).r;
  }
  
  void main() {
    // Count live neighbors
    float sum = 
      getCell(vec2(-1.0, -1.0)) +
      getCell(vec2( 0.0, -1.0)) +
      getCell(vec2( 1.0, -1.0)) +
      getCell(vec2(-1.0,  0.0)) +
      getCell(vec2( 1.0,  0.0)) +
      getCell(vec2(-1.0,  1.0)) +
      getCell(vec2( 0.0,  1.0)) +
      getCell(vec2( 1.0,  1.0));
    
    float current = getCell(vec2(0.0, 0.0));
    
    // Conway's Game of Life rules:
    // 1. Any live cell with 2-3 live neighbors survives
    // 2. Any dead cell with exactly 3 live neighbors becomes alive
    // 3. All other cells die or stay dead
    float nextState = 0.0;
    
    if (current > 0.5) {
      // Cell is alive
      if (sum >= 2.0 && sum <= 3.0) {
        nextState = 1.0;
      }
    } else {
      // Cell is dead
      if (sum > 2.9 && sum < 3.1) {
        nextState = 1.0;
      }
    }
    
    gl_FragColor = vec4(nextState, nextState, nextState, 1.0);
  }
`;
