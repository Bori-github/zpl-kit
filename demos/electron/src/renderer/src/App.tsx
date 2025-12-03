import { useState } from 'react'

import { Text, ZplLabel } from '@zpl-kit/react-zpl'

const TestLabel = ({ text }: { text: string }): React.JSX.Element => {
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
    </ZplLabel>
  )
}

function App(): React.JSX.Element {
  const [zplOutput, setZplOutput] = useState<string>('')

  const handlePrint = (): void => {
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
