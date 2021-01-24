export const getWindowSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

export const funcToPoints = (func, { canvas: { width } }) => {
  const endpoint = width / 2;
  const points = [];
  for (let i = -endpoint; i <= endpoint; i += 0.1) {
    points.push({ x: i, y: func.evaluate({ x: i }) });
  }
  return points;
};

export const setBackgroundColor = (context, color) => {
  const { width, height } = context.canvas;
  context.fillStyle = color;
  context.fillRect(0, 0, width, height);
};

export const drawAxis = (context) => {
  const { width, height } = context.canvas;
  context.lineWidth = 1;
  context.strokeStyle = '#adb5bd';
  
  const midWidth = width / 2;
  context.moveTo(midWidth, 0);
  context.lineTo(midWidth, height);
  context.stroke();
  
  const midHeight = height / 2;
  context.moveTo(0, midHeight);
  context.lineTo(width, midHeight);
  context.stroke();
};

export const shiftPoint = (point, scale, context) => ({
  x: point.x * scale + (context.canvas.width / 2),
  y: -point.y * scale + (context.canvas.height / 2),
});
