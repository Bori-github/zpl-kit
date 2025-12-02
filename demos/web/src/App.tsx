import { useState } from "react";

import { Text, ZplLabel } from "@zpl-kit/react-zpl";

import "./App.css";

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
      <Text
        fieldOrientation="N"
        fontInherit={false}
        fontName="0"
        fontWidth={20}
        fontHeight={20}
      >
        {text}
      </Text>
      <Text fieldOriginX={50}>텍스트 확인</Text>
    </ZplLabel>
  );
};

function App() {
  const [zplOutput, setZplOutput] = useState<string>("");

  const handlePrint = () => {
    setZplOutput(ZplLabel.print(TestLabel({ text: "Test" })));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>ZPL Kit - Web Demo</h1>
        <p>React ZPL 라이브러리 웹 데모</p>
      </header>
      <main className="app-main">
        <div className="demo-content">
          <h2>ZPL Kit 컴포넌트</h2>
          <p>여기서 ZPL Kit 기능을 테스트할 수 있습니다.</p>
          <div className="demo-box">
            <p>ZPL Kit 컴포넌트가 정상적으로 로드되었습니다.</p>
            <p>
              이 컴포넌트는 <code>@zpl-kit/react-zpl</code>에서 가져왔습니다.
            </p>
          </div>
          <button type="button" onClick={handlePrint}>
            Print
          </button>
          {zplOutput && <pre>{zplOutput}</pre>}
        </div>
      </main>
    </div>
  );
}

export default App;
