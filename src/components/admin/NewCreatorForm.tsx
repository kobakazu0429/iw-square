import React, { FC, useState, useCallback, useRef } from "react";
import { Button, Form, Input, Image, Modal } from "semantic-ui-react";
import ReactCrop, { Crop } from "react-image-crop";
import { creatorsClient } from "../../microcms/creators";

const IconEditor: FC = (_props) => {
  const [upImg, setUpImg] = useState<FileReader["result"]>(null);
  // const [upImgAspect, setUpImgAspect] = useState(1);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 100,
    x: 0,
    y: 0,
    aspect: 1,
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
  }, [imgRef, completedCrop]);

  return (
    <div style={{ maxWidth: 300 }}>
      {status === "unloaded" && (
        <Image size="medium" src="/icons/default-creator.jpg" />
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
              circularCrop
              style={{ maxWidth: 300 }}
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

export const NewCreateFormModal: FC = (_props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [twitterId, setTwitterId] = useState("");
  const [facebookId, setFacebookId] = useState("");

  const handleSubmit = useCallback(() => {
    creatorsClient.createCreator({
      name,
      icon: "",
      twitter_id: twitterId,
      facebook_id: facebookId,
    });
  }, [name, twitterId, facebookId]);

  return (
    <Modal
      trigger={
        <Button color="teal" onClick={handleOpen}>
          クリエイターの新規作成
        </Button>
      }
      open={open}
    >
      <Modal.Header>クリエイターの新規作成</Modal.Header>
      <Modal.Content image>
        <IconEditor />

        <Modal.Description style={{ paddingLeft: "2em" }}>
          <Form>
            <Form.Field>
              <label>
                名前
                (半角スペースで氏名を分けるかハンドルネームなどを使ってください)
              </label>
              <input
                placeholder="高専 太郎"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Twitter</label>
              <Input
                label="https://twitter.com/"
                placeholder="your id here"
                value={twitterId}
                onChange={(e) => setTwitterId(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Facebook</label>
              <Input
                label="https://www.facebook.com/"
                placeholder="your id here"
                value={facebookId}
                onChange={(e) => setFacebookId(e.target.value)}
              />
            </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleClose}>キャンセル</Button>
        <Button positive onClick={handleSubmit}>
          登録する
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
