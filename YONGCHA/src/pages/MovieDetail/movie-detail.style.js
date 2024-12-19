import styled from "styled-components";

const CreditGridContainer = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 3px;
  width: 100%;
  padding-inline-start: 0px;
`;

export { CreditGridContainer };
