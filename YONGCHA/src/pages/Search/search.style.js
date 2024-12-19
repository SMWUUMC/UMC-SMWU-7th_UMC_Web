import styled from "styled-components";

const SearchContainer = styled.div`
  margin-top: 20px;
  display: flex;
  margin: 15px;
  align-items: center;
  max-width: 100%;

  input {
    flex: 1;
    outline: none;
    height: 40px;
    padding-left: 10px;
    border: none;
    border-radius: 5px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  button {
    height: 42px;
    width: 80px;
    background-color: #f82e62;
    color: white;
    border: none;
    border-radius: 5px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    cursor: pointer;
    white-space: nowrap;

    :hover {
      background-color: #45a049;
    }
  }
`;

const MovieGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 13px;
  width: 100%; /* 부모 컨테이너가 화면에 맞게 크기 조정 */
`;

export { SearchContainer, MovieGridContainer };
