import { useState } from 'react'

import { Circle, DiagonalLine, Ellipse, Line, Text, ZplLabel } from '@zpl-kit/react-zpl'

const TestLabel = ({ text }: { text: string }) => {
  return (
    <ZplLabel
      width={100}
      height={100}
      labelOrientation="R"
      defaultFontName="J"
      defaultFontWidth={30}
      defaultFontHeight={30}
    >
      <Text fieldOrientation="N" fontInherit={false} fontName="0" fontWidth={20} fontHeight={20}>
        {text}
      </Text>
      <Text fieldOriginX={50}>텍스트 확인</Text>
      <Line
        length={100}
        direction="horizontal"
        fieldOriginX={10}
        fieldOriginY={20}
        thickness={1}
        lineColor="B"
      />
      <Line length={100} direction="vertical" fieldOriginX={10} fieldOriginY={20} lineColor="B" />
      <DiagonalLine
        width={100}
        height={100}
        orientation="R"
        fieldOriginX={10}
        fieldOriginY={20}
        thickness={1}
      />
      <DiagonalLine
        width={100}
        height={100}
        orientation="L"
        fieldOriginX={10}
        fieldOriginY={20}
        thickness={2}
      />
      <Circle diameter={100} fieldOriginX={10} fieldOriginY={20} thickness={1} />
      <Ellipse width={100} height={50} fieldOriginX={10} fieldOriginY={20} thickness={2} />
    </ZplLabel>
  )
}

function App(): React.JSX.Element {
  const [zplOutput, setZplOutput] = useState<string>('')

  const handlePrint = () => {
    setZplOutput(ZplLabel.print(TestLabel({ text: 'Test' })))
  }

  return (
    <div>
      <button type="button" onClick={handlePrint}>
        Generate ZPL
      </button>
      {zplOutput && <pre>{zplOutput}</pre>}
    </div>
  )
}

export default App
