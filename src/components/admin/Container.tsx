import React, { FC } from "react";
import { Container, List, Segment } from "semantic-ui-react";
import { AdminHeader } from "./Header";

export const AdminContainer: FC = (props) => {
  return (
    <div>
      <AdminHeader />
      <Container fluid style={{ marginTop: "7em", padding: "0 7em" }}>
        {props.children}
      </Container>
      <Segment
        inverted
        vertical
        style={{ marginTop: "5em", padding: "3em 0em" }}
      >
        <Container textAlign="center">
          <List horizontal inverted divided link size="small">
            <List.Item>&copy; kobakazu0429</List.Item>
          </List>
        </Container>
      </Segment>
    </div>
  );
};
