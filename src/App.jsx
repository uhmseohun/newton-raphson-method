import React, { useState } from 'react';
import styled from 'styled-components';
import FunctionCanvas from './components/FunctionCanvas';
import ControlBox from './components/ControlBox';
import * as utils from './App.Utils';
import { compile, rationalize } from 'mathjs';

const App = () => {
  const [funcs, setFuncs] = useState([]);
  const [scale, setScale] = useState(5);
  const [history, setHistory] = useState([]);
  const [currPos, setCurrPos] = useState(null);

  const process = async (equationString, speed, trials, initValue = 1) => {
    const equation = compile(equationString);
    setFuncs([equation]);
    const { coefficients } = rationalize(equationString, {}, true);
    const derivFunc = utils.getDerivativeFunc(coefficients);

    setCurrPos(initValue);

    for (let i = 0; i < trials; i += 1) {
      setHistory((_history) => [..._history, { trial: i, value: currPos }]);
      setCurrPos(utils.getNextPosition(equation, derivFunc, currPos));
      const slope = derivFunc.evaluate({ x: currPos });
      const fValue = equation.evaluate({ x: currPos });
      const tangent = compile(`${slope}(x - ${currPos}) + ${fValue}`);
      setFuncs([equation, tangent]);
      await utils.sleep(speed);
    }
  }

  return (
    <Container>
      <FunctionCanvas
        funcs={funcs}
        scale={scale}
        currPos={currPos}
      />
      <ControlBox
        history={history}
        onButtonClick={async ({ equationString, speed, trials }) => {
          await process(equationString, speed, trials);
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
