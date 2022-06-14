/**
 * 리스트 아이템을 감싸는 컴포넌트
 */

import React from "react";
import styled from "styled-components";

const ItemListContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const ItemList = ({ children }) => {
  return <ItemListContainer>{children}</ItemListContainer>;
};

export default ItemList;
