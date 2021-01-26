import React, { useState } from 'react';
import styled from 'styled-components';

const absoluteStyle = {
  position: 'absolute',
  top: 25,
  left: 25,
};

const ControlBox = ({ onButtonClick: handleButtonClick, onScaleChanged }) => {
  const [equation, setEquation] = useState('(x-3)(x+1)');
  const [trials, setTrials] = useState(null);
  const [initPos, setInitPos] = useState(null);
  const [speed, setSpeed] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [hided, setHided] = useState(false);

  return !hided ? (
    <Container style={absoluteStyle}>
      <Header>
        <Title>뉴턴-랩슨법 Demo</Title>
        <TextButton onClick={() => setHided(true)}>잠시 숨기기</TextButton>
      </Header>
      <Description>뉴턴-랩슨법을 사용해 고차방정식의 여러 해 중 한 해의 근사값을 구해 줍니다.</Description>
      <Link href='https://github.com/uhmseohun/newton-raphson-method'>소스코드 확인하기 →</Link>
        <ScaleField>
          <ScaleText>배율 설정</ScaleText>
          <Slider
            type='range'
            min={1}
            max={2500}
            defaultValue={60}
            onChange={(e) => onScaleChanged(e.target.value)}
          />
        </ScaleField>
        <EquationField>
          <TextField
            defaultValue={equation}
            placeholder='수식을 입력해 주세요'
            onChange={(e) => setEquation(e.target.value)}
            disabled={clicked}
            />
          <EquationTrailing>&nbsp;&nbsp;=&nbsp;&nbsp;0</EquationTrailing>
        </EquationField>
        <TextField
          type='number'
          placeholder='초기 X 좌표를 지정해 주세요 (기본값 1)'
          onChange={(e) => setInitPos(e.target.value)}
          disabled={clicked}
        />
        <TextField
          type='number'
          placeholder='진행 속도를 입력해 주세요 (초 단위)'
          onChange={(e) => setSpeed(e.target.value)}
          disabled={clicked}
        />
        <TextField
          type='number'
          placeholder='시행 횟수를 입력해 주세요'
          onChange={(e) => setTrials(e.target.value)}
          disabled={clicked}
        />
        { !clicked ? (
          <Button onClick={() => {
            if (!speed || !trials) {
              return swal('이런!', '모든 입력칸을 채워 주세요.', 'error');
            }
            handleButtonClick({
              equationString: equation,
              speed,
              trials,
              initPos,
            });
            setClicked(true);
          }}>
            계산하기
          </Button>
        ) : null }
    </Container>
  ) : (
    <TextButton
      onClick={() => setHided(false)}
      style={absoluteStyle}
    >
      다시 보기
    </TextButton>
  )
}

export default ControlBox;

const Container = styled.div`
  width: 350px;
  height: 450px;
  padding: 10px 13px;

  border: 2px solid #000000;
  border-radius: 10px;
  background-color: #FFFFFF;

  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
  display: inline;
`;

const Description = styled.p`
  word-break: keep-all;
  font-size: 1.1rem;
  margin-bottom: 0;
`;

const Link = styled.a`
  margin-top: 7px;
  color: #000000;
  text-decoration: none;
  font-weight: 200;
`;

const TextButton = styled.span`
  font-weight: 700;
  margin-left: auto;
  cursor: pointer;
`;

const TextField = styled.input`
  outline: none;
  border: 2px solid #adb5bd;
  border-radius: 10px;
  padding: 0.5rem;
  font-size: 1.1rem;
  margin-top: 5px;
  width: 100%;
`;

const ScaleField = styled.div`
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
`;

const ScaleText = styled.span`
  min-width: fit-content;
`;

const Slider = styled.input`
  cursor: ew-resize;
  margin-left: 5px;
  width: 100%;
`;

const EquationField = styled.div`
  display: flex;
  align-items: center;
`;

const EquationTrailing = styled.span`
  font-size: 1.1rem;
`;

const Button = styled.button`
  margin-top: 5px;
  border: 0;
  outline: none;
  background-color: #adb5bd;
  padding: 0.5rem;
  border-radius: 10px;
  font-size: 1.1rem;
  cursor: pointer;
`;
