import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  useVideoConfig,
} from "remotion";
import { useRef, useCallback } from "react";

const TestComponent: React.FC<{
  opacity: number;
}> = ({ opacity }) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const { width, height } = useVideoConfig();

  // Process a frame
  const onVideoFrame = useCallback(
    (frame: CanvasImageSource) => {
      if (!canvas.current) {
        return;
      }
      const context = canvas.current.getContext("2d");

      if (!context) {
        return;
      }

      context.drawImage(frame, 0, 0, width, height);
      const imageFrame = context.getImageData(0, 0, width, height);
      const { length } = imageFrame.data;

      // If the pixel is very green, reduce the alpha channel
      for (let i = 0; i < length; i += 4) {
        const red = imageFrame.data[i + 0];
        const green = imageFrame.data[i + 1];
        const blue = imageFrame.data[i + 2];
        if (green > 100 && red < 100 && blue < 100) {
          imageFrame.data[i + 3] = opacity * 255;
        }
      }
      context.putImageData(imageFrame, 0, 0);
    },
    [height, opacity, width],
  );

  return (
    <Sequence durationInFrames={11 * 30} from={150}>
      <AbsoluteFill>
        <AbsoluteFill>
          <OffthreadVideo
            style={{ opacity: 0 }}
            src="https://remotion-assets.s3.eu-central-1.amazonaws.com/just-do-it-short.mp4"
            onVideoFrame={onVideoFrame}
          />
        </AbsoluteFill>
        <AbsoluteFill>
          <canvas ref={canvas} width={width} height={height} />
        </AbsoluteFill>
        <AbsoluteFill>
          <h1 className="text-[200px] font-bold text-green-500">
            JUST DO IT !!
          </h1>
        </AbsoluteFill>
      </AbsoluteFill>
    </Sequence>
  );
};

export default TestComponent;
