import React, { useEffect, useRef, useState } from 'react';
import * as utils from './FunctionCanvas.Utils';

const FunctionCanvas = ({ funcs, currPos, scale }) => {
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
      const points = utils.funcToPoints(func, context);
      context.strokeStyle = '#495057';
      context.beginPath();
      points.forEach((point) => {
        point = utils.shiftPoint(point, scale, context);
        context.lineTo(point.x, point.y);
      });
      context.lineWidth = 2;
      context.stroke();
    })

    if (currPos) {
      console.log(currPos);
      const shifted = utils.shiftPoint(
        { x: currPos, y: 0 },
        scale,
        context
      );
      context.beginPath();
      context.fillStyle = '#000000';
      context.arc(shifted.x, shifted.y, 3, 0, 360);
      context.fill();
      context.stroke();
    }
  }, [funcs, scale, currPos, canvasSize]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
    />
  )
};

export default FunctionCanvas;
