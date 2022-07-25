/**
 * 카테고리 장르 페이지(코믹)
 */
import React, { memo } from "react";
import CategoryGenresComponent from "../../components/Category/CategoryGenresComponent";

const CategoryComic = memo(() => {
  return <CategoryGenresComponent genre="만화 e북" />;
});

export default CategoryComic;
