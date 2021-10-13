import React, { useState } from "react";
import styled from "styled-components";
import { InputButtonAddon, InputText, media } from "@sencrop/ui-components";

const MailingForm = () => {
  const [email, setEmail] = useState("");
  return (
    <Form
      method="post"
      action="https://sencrop.us3.list-manage.com/subscribe/post?u=c993ab1c009fbcbc61dea24cd&amp;id=9080d7139a"
    >
      <InputText
        name="EMAIL"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="dennis.richie@heaven.org"
        end={<InputButtonAddon type="submit">Subscribe</InputButtonAddon>}
      />
    </Form>
  );
};

export default MailingForm;

const Form = styled.form`
  width: 100%;
  ${media.greaterThan("tablet")`
    max-width: 300px;
  `};
`;
