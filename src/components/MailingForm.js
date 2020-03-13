import React, { useState } from "react";
import styled from "styled-components";
import { Button, InputText, media } from "@sencrop/ui-components";

const MailingForm = () => {
  const [email, setEmail] = useState("");
  return (
    <Form
      method="post"
      action="https://evomedia.us3.list-manage.com/subscribe/post?u=c993ab1c009fbcbc61dea24cd&amp;id=b7ef162deb"
    >
      <InputText
        name="EMAIL"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="dennis.richie@heaven.org"
        endButton={<Button type="submit">Subscribe</Button>}
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
