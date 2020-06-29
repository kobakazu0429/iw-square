import React, { FC, useState, useCallback, useEffect, useMemo } from "react";
import { Button, Form, Select, Modal } from "semantic-ui-react";
import { toast } from "react-toastify";
import { cloudinaryRestClient } from "../../cloudinary/RestClient";
import { ImageEditor } from "./ImageEditor";
import { Creator, Tag } from "../../microcms/type";
import { worksClient } from "../../microcms/works";

interface Props {
  creators: Creator[];
  tags: Tag[];
}

export const NewWorkFormModal: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const creatorsOption = useMemo(
    () => props.creators.map((v) => ({ text: v.name, value: v.id })),
    [props.creators]
  );

  const tagsOption = useMemo(
    () => props.tags.map((v) => ({ text: v.tag, value: v.id })),
    [props.tags]
  );

  const tagMapId = useMemo(
    () => new Map(props.tags.map((v) => [v.id, v.tag])),
    [props.tags]
  );

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const [title, setTitle] = useState("");
  const [imageData, setImageData] = useState("");
  const [imagePublicId, setImagePublicId] = useState("");
  const [tags, setTags] = useState<Map<string, string>>(new Map());
  const [creatorId, setCreatorId] = useState("");
  const [selectingTagId, setSelectingTagId] = useState("");
  const [, setForceRerender] = useState(false);
  const forceRerender = useCallback(() => setForceRerender((p) => !p), []);

  useEffect(() => {
    (async () => {
      if (imageData) {
        toast("画像のアップロードを開始しました。");
        const res = await cloudinaryRestClient.uploadImage({ data: imageData });
        if (res.ok) {
          setImagePublicId(res.publicId);
        }

        toast(res.message);
      }
    })();
  }, [imageData]);

  const addTag = useCallback(() => {
    if (!tags.has(selectingTagId) && selectingTagId !== "") {
      setTags(tags.set(selectingTagId, tagMapId.get(selectingTagId) as string));
      forceRerender();
    }
  }, [selectingTagId, tags, tagMapId]);

  const removeTag = useCallback(
    (id: string) => {
      if (tags.delete(id)) {
        setTags(tags);
        forceRerender();
      }
    },
    [selectingTagId, tags]
  );

  const handleSubmit = useCallback(async () => {
    const res = await worksClient.createWork({
      title,
      image_url: imagePublicId,
      tags: [...tags.keys()],
      creator: creatorId,
      status: "pending",
    });
    toast(res.message);
  }, [title, imagePublicId, creatorId, tags]);

  useEffect(() => {
    console.log(title, imagePublicId, creatorId, [...tags.keys()]);

    if (title && imagePublicId && creatorId) {
      setSubmitable(true);
    } else {
      setSubmitable(false);
    }
  }, [title, imagePublicId, creatorId]);

  const [submitable, setSubmitable] = useState(false);

  return (
    <Modal
      trigger={
        <Button color="teal" onClick={handleOpen}>
          作品の新規作成
        </Button>
      }
      open={open}
    >
      <Modal.Header>作品の新規作成</Modal.Header>
      <Modal.Content image>
        <ImageEditor
          onEdited={setImageData}
          placeholderImage="/images/default-work.jpg"
        />

        <Modal.Description style={{ paddingLeft: "2em" }}>
          <Form>
            <Form.Field>
              <label>タイトル</label>
              <input
                placeholder="めっちゃ便利な機械"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Field>
            <Form.Group inline>
              <Form.Field
                control={Select}
                options={tagsOption}
                placeholder="タグの追加"
                onChange={(_e: any, { value }: { value: string }) =>
                  setSelectingTagId(value)
                }
              />
              <Form.Button content="追加" onClick={addTag} />
            </Form.Group>
            <div
              style={{
                width: 550,
              }}
            >
              {Array.from(tags).map(([id, tag]) => (
                <Button
                  key={id}
                  content={tag}
                  size="mini"
                  icon="delete"
                  labelPosition="right"
                  onClick={() => removeTag(id)}
                  style={{ margin: "3px" }}
                />
              ))}
            </div>

            <Form.Field
              control={Select}
              label="クリエイター"
              options={creatorsOption}
              placeholder="クリエイターの選択"
              onChange={(_e: any, { value }: { value: string }) =>
                setCreatorId(value)
              }
            />
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
