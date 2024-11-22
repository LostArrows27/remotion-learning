import "./tailwind.css";
import { CalculateMetadataFunction, Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { z } from "zod";

// Each <Composition> is an entry in the sidebar!

const calculateMetaData: CalculateMetadataFunction<
  z.infer<typeof myCompSchema>
> = ({ props }) => {
  return {
    durationInFrames: 16 * 30,
    props: {
      ...props,
      titleText: "Welcome to Remotion 2",
    },
  };
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        // You can take the "id" to render a video:
        // npx remotion render src/index.ts <id> out/video.mp4
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={16 * 30}
        fps={60}
        width={1920}
        calculateMetadata={calculateMetaData}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />
    </>
  );
};
