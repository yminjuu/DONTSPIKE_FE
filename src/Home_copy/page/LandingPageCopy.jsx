import React, { useEffect } from 'react';
import styled from 'styled-components';
import Section1 from '../components/Section1';
import Section2 from '../components/Section2';
import Section3 from '../components/Section3';
import Section4 from '../components/Section4';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../../Recoil';

const LandingPageCopy = () => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  return (
    <>
      <FirstPage>
        <Section1></Section1>
      </FirstPage>
      <SecPage>
        <Section2></Section2>
      </SecPage>
      <ThrdPage>
        <Section3></Section3>
      </ThrdPage>
      <FourthPage>
        <Section4></Section4>
      </FourthPage>
    </>
  );
};

const FirstPage = styled.div`
  height: 200vh;
`;

const SecPage = styled.div`
  height: 100vh;
`;

const ThrdPage = styled.div`
  height: 100vh;
`;

const FourthPage = styled.div`
  height: 100vh;
`;

// 200 vh 하나
// 100 vh 3개
export default LandingPageCopy;
