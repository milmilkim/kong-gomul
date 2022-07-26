import styled from "styled-components";

/* Styled Components */
const CategoryGenreContainer = styled.div`
  width: ${(props) => props.width};
  margin: 0 auto;

  .categoryGenreTitle {
    font-size: 1.625rem;
    font-weight: 700;
    line-height: 2rem;
    margin-bottom: 1rem;
  }

  .swiperContainer {
    position: relative;

    h2 {
      font-size: 1.2rem;
      font-weight: bolder;
    }
    p {
      line-height: 1.5;
      svg {
        vertical-align: top;
        color: ${(props) => props.theme.color.primaryColor};
      }
    }

    .swiper-button-prev,
    .swiper-button-next {
      position: absolute;
      top: 45%;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100px;
      height: 50px;
      background-color: ${(props) => props.theme.color.primaryColor};
      color: #fff;
      border-radius: 100px;
      z-index: 9999;
    }

    .swiper-button-next {
      right: -50px;
    }
    .swiper-button-prev {
      left: -50px;
    }

    .swiper-button-next::after,
    .swiper-button-prev::after {
      display: none;
    }
  }
`;

CategoryGenreContainer.defaultProps = {
  width: "1200px",
};

export default CategoryGenreContainer;
