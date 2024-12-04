import styled from "styled-components";

const SearchContainer = styled.div`
  margin-top: 20px;
  display: flex;
  margin-left: 15px;

  text-align: center;
  input {
    outline: none;
    height: 40px;
    width: 750px;
    padding-left: 10px;
    border: none;
    border-radius: 5px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  button {
    height: 40px;
    width: 80px;
    background-color: #f82e62;
    color: white;
    border: none;
    border-radius: 5px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
`;

const MovieGridContainer = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 13px;
  width: 100%;
`;

export { SearchContainer, MovieGridContainer };
