import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import { modeState } from '../../../Recoil';

const BUCKET_NAME = import.meta.env.VITE_BUCKET_NAME;
const BUCKET_REGION = import.meta.env.VITE_BUCKET_REGION;
const BUCKET_DIRECTORY = import.meta.env.VITE_BUCKET_DIRECTORY;

const Nutrient = ({ foodname, amount, calorie, carbohydrate, protein, fat, sodium, cholesterol }) => {
  const mode = useRecoilValue(modeState);

  const removeSpaces = str => {
    return str.replace(/\s+/g, '');
  };

  if (foodname != null)
    return (
      <Wrapper>
        <BasicWrapper>
          <ImgWrapper
            src={`https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/${BUCKET_DIRECTORY}/${removeSpaces(
              foodname,
            )}.jpg`}
          ></ImgWrapper>
          <FoodWrapper>
            <FoodTitle>{foodname}</FoodTitle>
            <FoodAmount>{amount}g</FoodAmount>
          </FoodWrapper>
        </BasicWrapper>
        <NutrientWrapper>
          <NutrientItem>
            <Index mode={mode}>열량</Index>
            <ValueWrapper>
              <Number mode={mode}>{calorie}</Number>
              <Unit>kcal</Unit>
            </ValueWrapper>
          </NutrientItem>
          <svg xmlns="http://www.w3.org/2000/svg" width="350" height="2" viewBox="0 0 350 2" fill="none">
            <path d="M1 1L426 0.999967" stroke="#E8E8E8" strokeLinecap="round" />
          </svg>
          <NutrientItem>
            <Index mode={mode}>탄수화물</Index>
            <ValueWrapper>
              <Number mode={mode}>{carbohydrate}</Number>
              <Unit>g</Unit>
            </ValueWrapper>
          </NutrientItem>
          <svg xmlns="http://www.w3.org/2000/svg" width="350" height="2" viewBox="0 0 350 2" fill="none">
            <path d="M1 1L426 0.999967" stroke="#E8E8E8" strokeLinecap="round" />
          </svg>
          <NutrientItem>
            <Index mode={mode}>단백질</Index>
            <ValueWrapper>
              <Number mode={mode}>{protein}</Number>
              <Unit>g</Unit>
            </ValueWrapper>
          </NutrientItem>
          <svg xmlns="http://www.w3.org/2000/svg" width="350" height="2" viewBox="0 0 350 2" fill="none">
            <path d="M1 1L426 0.999967" stroke="#E8E8E8" strokeLinecap="round" />
          </svg>
          <NutrientItem>
            <Index mode={mode}>지방</Index>
            <ValueWrapper>
              <Number mode={mode}>{fat}</Number>
              <Unit>g</Unit>
            </ValueWrapper>
          </NutrientItem>
          <NutrientItem>
            <Index mode={mode}>나트륨</Index>
            <ValueWrapper>
              <Number mode={mode}>{sodium}</Number>
              <Unit>mg</Unit>
            </ValueWrapper>
          </NutrientItem>
          <svg xmlns="http://www.w3.org/2000/svg" width="350" height="2" viewBox="0 0 350 2" fill="none">
            <path d="M1 1L426 0.999967" stroke="#E8E8E8" strokeLinecap="round" />
          </svg>
          <NutrientItem>
            <Index mode={mode}>콜레스테롤</Index>
            <ValueWrapper>
              <Number mode={mode}>{cholesterol}</Number>
              <Unit>mg</Unit>
            </ValueWrapper>
          </NutrientItem>
        </NutrientWrapper>
      </Wrapper>
    );
  else return null;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const BasicWrapper = styled.div`
  height: 20vh;
  flex-shrink: 0;
  margin-top: 1vh;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1vw;
`;

const ImgWrapper = styled.img`
  width: 8.75rem;
  height: 8.75rem;
  flex-shrink: 0;

  border-radius: 0.375rem;
`;

const NutrientWrapper = styled.div`
  width: 35vw;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #fff;
  border-radius: 1rem;
`;

const FoodWrapper = styled.div`
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;

  margin-left: 1rem;
`;

const FoodTitle = styled.div`
  color: #414141;

  font-size: 1.875rem;
  font-weight: 700;
`;

const FoodAmount = styled.div`
  color: #707070;

  font-size: 0.875rem;
  font-weight: 500;
`;

const NutrientItem = styled.div`
  margin: 1.3rem;
  width: 17rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Index = styled.div`
  color: #414141;
  font-size: 1.125rem;
  font-weight: 600;

  ${props =>
    props.mode === 'senior'
      ? css`
          font-size: 1.5rem;
          font-weight: 750;
        `
      : css`
          font-size: 1.125rem;
          font-weight: 600;
        `}
`;

const ValueWrapper = styled.div`
  display: flex;
  gap: 0.3rem;
`;

const Number = styled.span`
  width: 5vw;
  height: 1.875rem;
  flex-shrink: 0;

  border-radius: 1.25rem;
  background: #f0f1f5;

  color: #111111;
  font-size: 1.125rem;
  font-weight: 600;

  text-align: center;
  line-height: 1.875rem;

  ${props =>
    props.mode === 'senior'
      ? css`
          font-size: 1.5rem;
          font-weight: 750;
        `
      : css`
          font-size: 1.125rem;
          font-weight: 600;
        `}
`;

const Unit = styled.span`
  width: 2rem;
  color: #707070;

  font-size: 1rem;
  font-weight: 500;

  text-align: center;
  display: flex;
  align-items: center;
`;

export default Nutrient;
