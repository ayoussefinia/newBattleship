import React, { useRef, useEffect } from 'react'

type CanvasProps = React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> & {draw: (context: CanvasRenderingContext2D) => void};

const Canvas: React.FC<CanvasProps> = ({draw, ...props}) => {
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    context && draw(context);
  }, [draw]);
  
  return <canvas width={props.width} height={props.height} ref={canvasRef}/>;
}

export default Canvas;