import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { modeState } from '../../../Recoil';

const FoodWikiItem = props => {
  const navigate = useNavigate();
  const mode = useRecoilValue(modeState);

  const onItemClick = () => {
    navigate(`/foodWiki/search?query=${props.foodname}`);
  };

  return (
    <>
      <InfoWrapper onClick={onItemClick}>
        <FoodImg src={props.url} alt="음식 이미지"></FoodImg>
        <FoodTitle mode={mode}>{props.foodname}</FoodTitle>
      </InfoWrapper>
    </>
  );
};

const InfoWrapper = styled.div`
  cursor: pointer;
  width: 90%;
  margin: 0.8rem;
  padding: 0.2rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;

  &:hover {
    background-color: #fafff2;
  }
`;

const FoodImg = styled.img`
  width: 4.375rem;
  height: 4.375rem;
  flex-shrink: 0;
  object-fit: cover;

  ${props =>
    props.url != ''
      ? css`
          src: url(props.url);
        `
      : css``}
`;
const FoodTitle = styled.div`
  color: #111111;

  ${props =>
    props.mode === 'senior'
      ? css`
          font-size: 1.5rem;
          font-weight: 700;
        `
      : css`
          font-size: 1rem;
          font-weight: 500;
        `}
`;

export default FoodWikiItem;
