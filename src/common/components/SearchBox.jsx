import styled from 'styled-components';
import Salad from '../../AddMeal/components/SearchSec/assets/salad.jpg';
import SearchButton from '../assets/SearchButton.svg?react';
import SearchReset from '../assets/SearchReset.svg?react';
import { useState, useRef, useEffect } from 'react';
import { css } from 'styled-components';
import SearchItem from '../../AddMeal/components/SearchSec/components/SearchItem';
import FoodWikiItem from '../../FoodWiki/components/FoodWiki/FoodWikiItem';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { modeState } from '../../Recoil';

// 음식 이름에 공백이 있으면 없애줌
const removeSpaces = str => {
  return str.replace(/\s+/g, '');
};

const SearchBox = ({ type, fetchMeal }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const BUCKET_NAME = import.meta.env.VITE_BUCKET_NAME;
  const BUCKET_REGION = import.meta.env.VITE_BUCKET_REGION;
  const BUCKET_DIRECTORY = import.meta.env.VITE_BUCKET_DIRECTORY;

  const mode = useRecoilValue(modeState);

  // 검색 상태 관리 : 검색 가능(false) / 검색 이미 완료 상태(true)
  const [searchstate, toggleSearchState] = useState(false); //초기 상태: false

  // 검색어 관리
  const [searchText, setSearchText] = useState('');
  const searchInput = useRef(null);
  useEffect(() => {
    if (searchText == '' && searchstate === true) {
      onSearchFalse();
    }
  }, [searchText]);

  // 검색 성공 여부 관리: 성공 true (FoodWikiInfo로 갈 수 있는 창) / 실패 (검색 결과가 없다는 창) false
  const [searchSuccess, setSuccess] = useState(false);

  // 검색 결과 데이터 관리: 성공시 이름과 함께 사진을 띄울 수 있어야 함
  const [searchResult, setResult] = useState({});
  // searchResult가 들어오면 리렌더링, searchSuccess , searchstate 여부 바뀌면 리렌더링
  useEffect(() => {}, [searchResult, searchSuccess, searchstate]);

  const [loading, setLoading] = useState(false);

  // 푸드위키: 검색 관리
  // food_id="1" food_name="사과"
  const fetchFoodWikiSearchResult = async () => {
    try {
      console.log('검색 : ', searchText);
      setLoading(true);
      setSuccess(false);
      const res = await axios.get(`${BASE_URL}/api/foodwiki?search_food=${searchText}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        withCredentials: true, // 쿠키 포함?..
      });

      setLoading(false); //res를 받아오고 나서 loading을 false로 바꿔줌
      setSuccess(true); //res를 받아오고 나서 success를 true로 바꿔줌
      if (res.status === 200) {
        setResult(res.data); // state 변경 => 리렌더링
        setSuccess(true); // 검색 성공
      } else {
        console.log('검색 실패', res);
        setSuccess(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // 검색 결과 없을 때 처리
        console.log(res);
        setSuccess(false);
      }
    }
  };

  // 식단 추가 : 검색 관리
  // food_id="1" food_name="흰쌀밥" food_info="한 공기" addedState={false}
  // 바로 추가하려면 food_id 필요!!
  const fetchMealSearchResult = async () => {
    try {
      console.log(searchText);
      const res = await axios.get(`${BASE_URL}/api/food?search_food=${searchText}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        withCredentials: true, // 쿠키 포함?..
      });

      if (res.status === 200 && res.data.length > 0) {
        setSuccess(true); // 검색 성공
        console.log('addmeal api 검색 결과', res.data[0]);
        const rawData = res.data[0];

        const updatedData = {
          ...rawData,
          addedState: false,
        };

        setResult(updatedData); // state 변경 => 리렌더링
      } else {
        console.log('검색 실패', res);
        setSuccess(false);
      }
      // 식단에 이미 추가되어있는지 여부: 내가 default로 false로 설정?
    } catch (error) {
      console.log('에러 발생: searchbox', error);
      setSuccess(false);
    }
  };

  // 검색 버튼 클릭 => Wrapper이 알맞게 바뀜
  const onSearchBtnClick = () => {
    if (searchText != '') {
      if (!searchstate) onSearchTrue(); // API 데이터 받으러
      else onSearchFalse(); //이미 받아온 상태였음 (x버튼 클릭함)
    } else {
      searchInput.current.focus();
    }
  };

  // 검색 => 데이터 받아오기
  const onSearchTrue = () => {
    toggleSearchState(true);
    if (type === 'FoodWiki') {
      fetchFoodWikiSearchResult(); // 이게 맞음
    } else if (type === 'SearchSection') {
      fetchMealSearchResult();
    }
  };

  // X 버튼 누름 => 초기 검색 box로 돌아감
  const onSearchFalse = () => {
    setSearchText('');
    toggleSearchState(false); // 돋보기 아이콘으로 바뀜
  };

  return (
    <Container>
      <Wrapper $searchstate={searchstate} $type={type} mode={mode}>
        <InputBoxWrapper $searchstate={searchstate}>
          <StyledInput
            // 키보드 Enter 클릭시 검색 가능
            onKeyDown={e => {
              if (e.key === 'Enter' && searchstate === false) onSearchBtnClick();
              if (e.key === 'Backspace' && searchstate === true) onSearchFalse();
            }}
            onChange={e => {
              setSearchText(e.target.value);
            }}
            ref={searchInput} /* focus effect를 사용하기 위해서 useRef 사용 */
            value={searchText}
            placeholder="예) 포케, 사과"
            $searchstate={searchstate} /* props 전달 */
            mode={mode}
          ></StyledInput>
          <BtnWrapper onClick={onSearchBtnClick}>
            {searchstate === true ? <SearchReset></SearchReset> : <SearchButton></SearchButton>}
          </BtnWrapper>
        </InputBoxWrapper>

        {/* 검색 결과 처리 */}
        {searchstate === true ? (
          searchSuccess === false ? (
            // loading이 true인지 false인지에 따라 알맞게 처리
            loading === true ? (
              <StyledNoResult mode={mode}>로딩 중입니다.</StyledNoResult>
            ) : (
              <StyledNoResult mode={mode}>일치하는 결과가 없습니다.</StyledNoResult>
            )
          ) : type === 'SearchSection' ? (
            <SearchItem
              foodId={searchResult.foodId}
              foodName={searchResult.foodname}
              addedState={false}
              fetchMeal={fetchMeal} // 음식 추가시
            ></SearchItem>
          ) : (
            <FoodWikiItem
              url={`https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/${BUCKET_DIRECTORY}/${removeSpaces(
                searchResult.foodname,
              )}.jpg`}
              {...searchResult}
            ></FoodWikiItem>
          )
        ) : (
          <></>
        )}
      </Wrapper>

      {/* 위치가 SearchSection 일 때에만 디자인 추가*/}
      {type === 'SearchSection' && mode === 'normal' ? (
        <TransparentWrapper>
          <StyledSalad src={Salad} />
        </TransparentWrapper>
      ) : (
        <></>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 33.75rem;
  height: 3.375rem;

  display: flex;
  justify-content: space-between;

  z-index: 1;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 33.75rem;
  height: 3.375rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  position: relative;

  /* drop-shadow */
  box-shadow: 2px 4px 10px 2px #e8e8e8;
  border-radius: 0.625rem;
  background-color: white;

  z-index: 5;

  ${props =>
    props.$searchstate === true
      ? // 다중 속성을 사용
        css`
          height: 10rem;
        `
      : css``};

  ${props =>
    props.$type === 'SearchSection'
      ? props.mode === 'senior'
        ? css`
            &:focus-within {
              box-shadow: none;
              box-shadow: 2px 2px 4px 2px #ecf1e7;
            }
          `
        : css`
            &:focus-within {
              box-shadow: none;
              box-shadow: 2px 2px 4px 2px #c1ccfe;
            }
          `
      : css``} // input 창이 focus 받으면

    ${props => (props.mode === 'senior' ? css`` : css``)}
`;

const InputBoxWrapper = styled.div`
  width: 30rem;
  height: 3.375rem;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  border: none;
  outline: none;

  ${props =>
    props.$searchstate === true
      ? // 다중 속성을 사용
        css`
          border-bottom: 1px solid #a0a0a0;
        `
      : css``};
`;

const StyledInput = styled.input`
  width: 80%;
  height: 3rem;
  color: #111111;

  /* Pretendard/Reg/20 */

  border: none;
  outline: none;

  ${props =>
    props.mode === 'senior'
      ? css`
          &::placeholder {
            font-size: 1.5rem;
            font-weight: 500;
            color: #a0a0a0;
          }
          font-size: 1.5rem;
          font-weight: 700;
        `
      : css`
          &::placeholder {
            font-size: 1rem;
            font-weight: 400;
            color: #a0a0a0;
          }
          font-size: 1rem;
          font-weight: 500;
        `}
`;

const BtnWrapper = styled.div`
  cursor: pointer;
`;

// 햄버거, 감튀 요소의 position: absolute을 위해 존재하는 투명한 컨테이너 (position: absolute 사용을 위해서)
const TransparentWrapper = styled.div`
  width: 33.75rem;
  height: 3.375rem;
  position: absolute;
  top: 0;
  left: 0;
  background-color: transparent;
`;

const StyledSalad = styled.img`
  width: 6rem;
  height: 7rem;

  position: absolute;
  top: -170%;
  left: 83%; /* Adjust based on the position of the icon */
  z-index: 4;
`;

const StyledNoResult = styled.div`
  height: 6.66rem;
  width: 100%;

  text-align: center;

  color: #414141;

  /* Pretendard/Reg/16 */

  line-height: 6.66rem;

  ${props =>
    props.mode === 'senior'
      ? css`
          font-size: 1.5rem;
          font-weight: 700;
        `
      : css`
          font-size: 0.9rem;
          font-weight: 500;
        `}
`;

export default SearchBox;
