import React, { FC, useState, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal,
  Form,
  Input,
  Grid,
  Icon,
} from "semantic-ui-react";

import { Tag } from "../../microcms/type";
import { toJST } from "../../utils/toJST";

const EditModal: FC<{ trigger: React.ReactNode; tag: Tag }> = (props) => {
  const [open, setOpen] = useState(false);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Modal
      trigger={
        <Button
          icon="edit"
          content="編集する"
          labelPosition="left"
          onClick={onOpen}
        />
      }
      size="tiny"
      open={open}
    >
      <Modal.Header>タグを編集 (コンテンツID: {props.tag.id})</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Grid columns="two">
              <Grid.Row>
                <Grid.Column>
                  <label>コンテンツID</label>
                </Grid.Column>

                <Grid.Column>
                  <Form.Field>
                    <Input readOnly placeholder={props.tag.id} />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column>
                  <label>タグ</label>
                </Grid.Column>

                <Grid.Column>
                  <Form.Field>
                    <Input focus placeholder={props.tag.tag} />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column>
                  <label>作成日</label>
                </Grid.Column>

                <Grid.Column>
                  <Form.Field>
                    <Input readOnly placeholder={props.tag.updatedAt} />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column>
                  <label>更新日</label>
                </Grid.Column>

                <Grid.Column>
                  <Form.Field>
                    <Input readOnly placeholder={props.tag.updatedAt} />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" onClick={onClose}>
          <Icon name="remove" /> キャンセル
        </Button>
        <Button color="green" onClick={onClose}>
          <Icon name="checkmark" /> 保存
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

// TODO: eslint@7.3でtagのエラーが治るはず
const TagTableRow: FC<{ tag: Tag }> = (props) => {
  return (
    <TableRow>
      <TableCell>{props.tag.id}</TableCell>
      <TableCell>{props.tag.tag}</TableCell>
      <TableCell>{toJST(props.tag.createdAt)}</TableCell>
      <TableCell>{toJST(props.tag.updatedAt)}</TableCell>
      <TableCell>
        <EditModal tag={props.tag}></EditModal>
      </TableCell>
    </TableRow>
  );
};

export const TagsTable: FC<{ tags: Tag[] }> = (props) => {
  return (
    <Table striped>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>コンテンツID</TableHeaderCell>
          <TableHeaderCell>タグ</TableHeaderCell>
          <TableHeaderCell>作成日</TableHeaderCell>
          <TableHeaderCell>更新日</TableHeaderCell>
          <TableHeaderCell></TableHeaderCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        {props.tags.map((tag) => (
          <TagTableRow key={tag.id} tag={tag} />
        ))}
      </TableBody>
    </Table>
  );
};
