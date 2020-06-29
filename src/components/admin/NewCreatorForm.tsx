import React, { FC, useState, useCallback, useEffect } from "react";
import { Button, Form, Input, Modal } from "semantic-ui-react";
import { toast } from "react-toastify";
import { creatorsClient } from "../../microcms/creators";
import { cloudinaryRestClient } from "../../cloudinary/RestClient";
import { ImageEditor } from "./ImageEditor";

export const NewCreateFormModal: FC = (_props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const [name, setName] = useState("");
  const [iconData, setIconData] = useState("");
  const [iconPublicId, setIconPublicId] = useState("");
  const [twitterId, setTwitterId] = useState("");
  const [facebookId, setFacebookId] = useState("");

  useEffect(() => {
    (async () => {
      if (iconData) {
        toast("画像のアップロードを開始しました。");
        const res = await cloudinaryRestClient.uploadImage({ data: iconData });
        if (res.ok) {
          setIconPublicId(res.publicId);
        }

        toast(res.message);
      }
    })();
  }, [iconData]);

  const handleSubmit = useCallback(async () => {
    const res = await creatorsClient.createCreator({
      name,
      icon: iconPublicId,
      twitter_id: twitterId,
      facebook_id: facebookId,
    });

    toast(res.message);
  }, [name, iconPublicId, twitterId, facebookId]);

  useEffect(() => {
    if (name && iconPublicId) {
      setSubmitable(true);
    } else {
      setSubmitable(false);
    }
  }, [name, iconPublicId]);

  const [submitable, setSubmitable] = useState(false);

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
        <ImageEditor
          onEdited={setIconData}
          placeholderImage="/images/default-creator.jpg"
          cropOption={{
            circularCrop: true,
            aspect: 1,
          }}
        />

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
        <Button positive onClick={handleSubmit} disabled={!submitable}>
          登録する
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
