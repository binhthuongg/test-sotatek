import styled from "styled-components";

export const StyledComponent = styled.div`
  display: block;
  .mainContainer {
    padding-top: 100px;
  }
  .postListWrapper {
    position: relative;
    padding-left: 100px;
  }
  .postShareWrapper {
    position: fixed;
    z-index: 1;
    top: 200px;
  }
`;
