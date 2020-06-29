import React, { FC, useState, useCallback, useRef } from "react";
import { Button, Image } from "semantic-ui-react";
import ReactCrop, { Crop } from "react-image-crop";

export const ImageEditor: FC<{
  placeholderImage?: string;
  onEdited: React.Dispatch<React.SetStateAction<string>>;
  cropOption?: {
    circularCrop?: boolean;
    aspect?: number;
  };
}> = (props) => {
  const [upImg, setUpImg] = useState<FileReader["result"]>(null);
  // const [upImgAspect, setUpImgAspect] = useState(1);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [crop, setCrop] = useState<Crop>(() => {
    const aspect = props.cropOption?.aspect;

    let width = 100;
    let height: number | undefined = undefined;

    if (aspect) {
      if (aspect === 1) {
        // nothing
      } else if (aspect > 1) {
        width = 100;
        height = 100 / aspect;
      } else {
        height = 100;
        width = 100 / aspect;
      }
    }

    return {
      unit: "%",
      width,
      height,
      x: 0,
      y: 0,
      aspect,
    };
  });
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const [status, setStatus] = useState<"unloaded" | "editing" | "done">(
    "unloaded"
  );

  const onSelectFile = useCallback((e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setUpImg(reader.result);
        setStatus("editing");
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }, []);

  const onLoad = useCallback((img: HTMLImageElement) => {
    imgRef.current = img;

    // TODO: automatically crop sqare after loaded
    // const { naturalWidth, naturalHeight } = img;
    // setUpImgAspect(naturalHeight / naturalWidth);
    // if (aspect >= 1) {
    //   setCrop({
    //     unit: "%",
    //     width: 100,
    //     height: undefined,
    //     x: 0,
    //     y: 0,
    //     aspect: 1,
    //   });
    // } else {
    //   console.log("wide");

    //   setCrop({
    //     unit: "%",
    //     width: undefined,
    //     height: 100,
    //     x: 0,
    //     y: 0,
    //     aspect: 1,
    //   });
    // }
  }, []);

  // refer to: https://codesandbox.io/s/react-image-crop-demo-with-react-hooks-t6kch?file=/src/App.js
  const onSubmit = useCallback(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop as Required<Crop>;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const pixelRatio = 4;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    setStatus("done");
    props.onEdited(imgRef.current.src);
  }, [imgRef, completedCrop, props.onEdited]);

  return (
    <div style={{ maxWidth: 300 }}>
      {status === "unloaded" && props.placeholderImage && (
        <Image size="medium" src={props.placeholderImage} />
      )}

      <input type="file" accept="image/*" onChange={onSelectFile} />

      <canvas
        ref={previewCanvasRef}
        style={{
          width: status === "done" ? 300 : 0,
          height: status === "done" ? 300 : 0,
        }}
      />

      {upImg && status === "editing" && (
        <>
          <div>
            <ReactCrop
              src={upImg as string}
              onImageLoaded={onLoad}
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              circularCrop={props.cropOption?.circularCrop}
              style={{ width: 300 }}
            />
          </div>
          <Button floated="right" onClick={onSubmit}>
            OK
          </Button>
        </>
      )}
    </div>
  );
};
