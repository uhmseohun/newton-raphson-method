import React, { useEffect, useRef, useState } from 'react';
import * as utils from './FunctionCanvas.Utils';

const FunctionCanvas = ({ funcs, scale }) => {
  const canvasRef = useRef();
  const [canvasSize, setCanvasSize] = useState(utils.getWindowSize());

  useEffect(() => {
    window.addEventListener('resize', () => {
      setCanvasSize(utils.getWindowSize());
    });
  }, []);

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');

    utils.setBackgroundColor(context, '#F1F3F4');
    utils.drawAxis(context);

    funcs.forEach((func) => {
      const points = utils.funcToPoints(func, context, scale);
      context.strokeStyle = '#495057';
      context.beginPath();
      points.forEach((point) => {
        point = utils.shiftPoint(point, scale, context);
        context.lineTo(point.x, point.y);
      });
      context.lineWidth = 2;
      context.stroke();
    })

  }, [funcs, scale, canvasSize]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
    />
  )
};

export default FunctionCanvas;
