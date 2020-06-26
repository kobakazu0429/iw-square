import React, { FC, useState, useCallback, useEffect } from "react";
import { Form, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { tagsClient } from "../../microcms/tags";

const validation = /^((?!([０-９]|[ａ-ｚ]|[Ａ-Ｚ])).)*$/;

export const AddTagForm: FC = (_props) => {
  const [newTag, setNewTag] = useState("");
  const [validationError, setValidationError] = useState<null | string>(null);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  }, []);

  const createNewTag = useCallback(async () => {
    const res = await tagsClient.createTag(newTag);
    if (res.ok) {
      toast(`🚀 ${res.message}`);
      setNewTag("");
    } else {
      toast.error(res.message);
    }
  }, [newTag]);

  useEffect(() => {
    if (validation.test(newTag)) {
      setValidationError(null);
    } else {
      setValidationError("半角英数字で入力してください");
    }
  }, [newTag]);

  return (
    <Form>
      <Form.Input
        placeholder="追加したいタグを入力してください"
        width={4}
        action
        error={validationError}
        label="新規タグ"
      >
        <input value={newTag} onChange={onChange} />
        <Button
          type="submit"
          onClick={createNewTag}
          disabled={!!validationError}
        >
          追加
        </Button>
      </Form.Input>
    </Form>
  );
};
