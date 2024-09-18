import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled, { css } from 'styled-components';
import './styles/FoodCarousel.css';
import PrevArrow from './PrevArrow';
import NextArrow from './NextArrow';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { modeState } from '../../../Recoil';

const removeSpaces = str => {
  return str.replace(/\s+/g, '');
};

const FoodSlide = ({ index, foodname }) => {
  const mode = useRecoilValue(modeState);

  const navigate = useNavigate();

  const BUCKET_NAME = import.meta.env.VITE_BUCKET_NAME;
  const BUCKET_REGION = import.meta.env.VITE_BUCKET_REGION;
  const BUCKET_DIRECTORY = import.meta.env.VITE_BUCKET_DIRECTORY;

  return (
    <Wrapper>
      <StyledImg
        src={`https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/${BUCKET_DIRECTORY}/${removeSpaces(
          foodname,
        )}.jpg`}
        onClick={() => {
          navigate(`/foodWiki/search?query=${foodname}`);
        }}
        alt="음식 이미지"
      ></StyledImg>
      <StyledFoodName mode={mode}>{foodname}</StyledFoodName>
    </Wrapper>
  );
};

const FoodCarousel = () => {
  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true, // 자동 슬라이딩
    autoplaySpeed: 3000, // 자동 슬라이딩 시간 간격
    pauseOnHover: true,
    infinite: true,
    cssEase: 'linear',
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <Slider {...settings}>
      <FoodSlide index={38} foodname="포도"></FoodSlide>
      <FoodSlide index={39} foodname="딸기"></FoodSlide>
      <FoodSlide index={40} foodname="바나나"></FoodSlide>
      <FoodSlide index={41} foodname="오렌지"></FoodSlide>
      <FoodSlide index={32} foodname="사과"></FoodSlide>
      <FoodSlide index={33} foodname="수박"></FoodSlide>
      <FoodSlide index={1} foodname="제육볶음"></FoodSlide>
      <FoodSlide index={2} foodname="낙지볶음"></FoodSlide>
      <FoodSlide index={4} foodname="피자"></FoodSlide>
      <FoodSlide index={5} foodname="포케"></FoodSlide>
      <FoodSlide index={6} foodname="닭가슴살 샐러드"></FoodSlide>
      <FoodSlide index={7} foodname="비빔밥"></FoodSlide>
      <FoodSlide index={8} foodname="소고기 스테이크"></FoodSlide>
      <FoodSlide index={9} foodname="잡채"></FoodSlide>
      <FoodSlide index={10} foodname="김치찌개"></FoodSlide>
      <FoodSlide index={11} foodname="된장찌개"></FoodSlide>
      <FoodSlide index={12} foodname="치킨"></FoodSlide>
      <FoodSlide index={13} foodname="라면"></FoodSlide>
      <FoodSlide index={14} foodname="샐러드"></FoodSlide>
      <FoodSlide index={15} foodname="쌀국수"></FoodSlide>
      <FoodSlide index={16} foodname="팟타이"></FoodSlide>
      <FoodSlide index={17} foodname="순두부찌개"></FoodSlide>
      <FoodSlide index={18} foodname="샌드위치"></FoodSlide>
      <FoodSlide index={19} foodname="된장국"></FoodSlide>
      <FoodSlide index={20} foodname="치즈버거"></FoodSlide>
      <FoodSlide index={21} foodname="피쉬앤칩스"></FoodSlide>
      <FoodSlide index={22} foodname="오믈렛"></FoodSlide>
      <FoodSlide index={23} foodname="에그 베네딕트"></FoodSlide>
      <FoodSlide index={24} foodname="떡볶이"></FoodSlide>
      <FoodSlide index={25} foodname="마라탕"></FoodSlide>
      <FoodSlide index={26} foodname="감자튀김"></FoodSlide>
      <FoodSlide index={27} foodname="우동"></FoodSlide>
      <FoodSlide index={28} foodname="잔치국수"></FoodSlide>
      <FoodSlide index={29} foodname="계란 후라이"></FoodSlide>
      <FoodSlide index={30} foodname="그래놀라 시리얼"></FoodSlide>
      <FoodSlide index={31} foodname="콘플레이크 시리얼"></FoodSlide>

      <FoodSlide index={34} foodname="브로콜리"></FoodSlide>
      <FoodSlide index={35} foodname="연어"></FoodSlide>
      <FoodSlide index={36} foodname="현미밥"></FoodSlide>
      <FoodSlide index={37} foodname="두부"></FoodSlide>
    </Slider>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const StyledImg = styled.img`
  height: 10rem;
  width: 10rem;

  border-radius: 0.5rem;

  cursor: pointer;
`;

const StyledFoodName = styled.div`
  color: #000;

  ${props =>
    props.mode === 'senior'
      ? css`
          font-size: 1.5rem;
          font-weight: 500;
        `
      : css`
          font-size: 1rem;
          font-weight: 500;
        `}
`;

export default FoodCarousel;
