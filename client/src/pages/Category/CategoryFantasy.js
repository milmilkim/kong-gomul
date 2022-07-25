/**
 * 카테고리 장르 페이지(판타지)
 */
import React, { memo } from "react";
import CategoryGenresComponent from "../../components/Category/CategoryGenresComponent";

const CategoryFantasy = memo(() => {
  return <CategoryGenresComponent genre="판타지 웹소설" />;
});

export default CategoryFantasy;
