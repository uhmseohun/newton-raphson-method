import React, { useState } from 'react';
import styled from 'styled-components';
import FunctionCanvas from './components/FunctionCanvas';
import ControlBox from './components/ControlBox';
import swal from 'sweetalert';
import * as utils from './App.Utils';
import { compile, rationalize } from 'mathjs';

const App = () => {
  const [funcs, setFuncs] = useState([]);
  const [scale, setScale] = useState(60);

  const process = async (equationString, speed, trials, initPos = 1) => {
    const equation = compile(equationString);
    setFuncs([equation]);
    const { coefficients } = rationalize(equationString, {}, true);
    const derivFunc = utils.getDerivativeFunc(coefficients);

    let currPos = initPos;
    const history = [];

    for (let i = 0; i < trials; i += 1) {
      // eslint-disable-next-line
      history.push({ trial: i, value: currPos });
      const slope = derivFunc.evaluate({ x: currPos });
      const fValue = equation.evaluate({ x: currPos });
      const tangent = compile(`${slope}(x - ${currPos}) + ${fValue}`);
      setFuncs([equation, tangent]);
      await utils.sleep(speed);
      currPos = utils.getNextPosition(equation, derivFunc, currPos);
    }

    if (trials < 15) {
      swal('실패!', '15번 이상 시행된 경우에만 최종 결과를 확인할 수 있어요. 시행 횟수를 늘려 주세요.');
    } else if (utils.isDiverges(history)) {
      swal('실패!', '근을 찾는 도중 근이 수렴하지 않고 발산하는 것 같아요. 시행 횟수를 좀 더 늘리거나 초기값을 다시 설정해 보시는 건 어떨까요?');
    } else {
      const result = currPos;
      swal('근사해를 찾았어요!', `${trials}번 시행했을 때 주어진 방정식 '${equationString} = 0'의 한 해의 근삿값은 '${result}'입니다!`);
    }  
  }

  return (
    <Container>
      <FunctionCanvas
        funcs={funcs}
        scale={scale}
      />
      <ControlBox
        onButtonClick={async ({ equationString, speed, trials, initPos }) => {
          await process(equationString, speed, trials, initPos);
        }}
        onScaleChanged={(_scale) => setScale(_scale)}
      />
    </Container>
  );
}

export default App;

const Container = styled.main`
  position: relative;
`;
