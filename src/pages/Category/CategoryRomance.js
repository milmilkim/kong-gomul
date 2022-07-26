/**
 * 카테고리 장르 페이지(로맨스)
 */
import React, { memo } from "react";
import CategoryGenresComponent from "../../components/Category/CategoryGenresComponent";

const CategoryRomance = memo(() => {
  return <CategoryGenresComponent genre="로판 e북" />;
});

export default CategoryRomance;
