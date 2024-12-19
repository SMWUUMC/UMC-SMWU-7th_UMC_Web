import styled from "styled-components";

const PaginationButtonBox = styled.div`
  margin: 50px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PaginationButton = styled.button`
  color: white;
  background-color: ${(props) => (props.disabled ? "gray" : "#f82e62")};
  cursor: pointer;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  margin: 0 12px;
  font-family: "Freesentation-9Black";
`;

export { PaginationButtonBox, PaginationButton };
