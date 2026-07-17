import { Circle, DiagonalLine, Ellipse, Line, Text, ZplLabel } from '@zpl-kit/react-zpl'

/**
 * 그래픽 컴포넌트 쇼케이스 (600 x 500 dots)
 * 구현된 모든 그래픽 컴포넌트를 격자 형태로 배치
 *
 * 사용 컴포넌트:
 * - Text: 각 도형 레이블
 * - Line: 격자 구분선 (수평/수직)
 * - DiagonalLine: 대각선 (좌/우)
 * - Circle: 원 (테두리 / 채움)
 * - Ellipse: 타원 (테두리 / 채움)
 */
const GraphicsShowcaseTemplate = () => (
  <ZplLabel width={600} height={500} defaultFontWidth={22} defaultFontHeight={22}>
    {/* 제목 */}
    <Text
      fieldOriginX={10}
      fieldOriginY={8}
      fontInherit={false}
      fontName="0"
      fontWidth={28}
      fontHeight={28}
    >
      Graphics Showcase
    </Text>
    <Line direction="horizontal" length={580} fieldOriginX={10} fieldOriginY={42} thickness={2} />

    {/* 격자 세로 구분선 */}
    <Line direction="vertical" length={440} fieldOriginX={200} fieldOriginY={50} thickness={1} />
    <Line direction="vertical" length={440} fieldOriginX={400} fieldOriginY={50} thickness={1} />

    {/* 격자 가로 구분선 */}
    <Line direction="horizontal" length={580} fieldOriginX={10} fieldOriginY={160} thickness={1} />
    <Line direction="horizontal" length={580} fieldOriginX={10} fieldOriginY={270} thickness={1} />
    <Line direction="horizontal" length={580} fieldOriginX={10} fieldOriginY={380} thickness={1} />

    {/* Row 1 - Line */}
    <Text
      fieldOriginX={20}
      fieldOriginY={55}
      fontInherit={false}
      fontName="0"
      fontWidth={20}
      fontHeight={20}
    >
      Line (H)
    </Text>
    <Line direction="horizontal" length={140} fieldOriginX={30} fieldOriginY={110} thickness={3} />

    <Text
      fieldOriginX={215}
      fieldOriginY={55}
      fontInherit={false}
      fontName="0"
      fontWidth={20}
      fontHeight={20}
    >
      Line (V)
    </Text>
    <Line direction="vertical" length={80} fieldOriginX={290} fieldOriginY={75} thickness={3} />

    <Text
      fieldOriginX={415}
      fieldOriginY={55}
      fontInherit={false}
      fontName="0"
      fontWidth={20}
      fontHeight={20}
    >
      Line (thick)
    </Text>
    <Line direction="horizontal" length={140} fieldOriginX={420} fieldOriginY={110} thickness={8} />

    {/* Row 2 - DiagonalLine */}
    <Text
      fieldOriginX={20}
      fieldOriginY={170}
      fontInherit={false}
      fontName="0"
      fontWidth={20}
      fontHeight={20}
    >
      Diagonal (R)
    </Text>
    <DiagonalLine
      width={80}
      height={60}
      orientation="R"
      fieldOriginX={55}
      fieldOriginY={195}
      thickness={2}
    />

    <Text
      fieldOriginX={215}
      fieldOriginY={170}
      fontInherit={false}
      fontName="0"
      fontWidth={20}
      fontHeight={20}
    >
      Diagonal (L)
    </Text>
    <DiagonalLine
      width={80}
      height={60}
      orientation="L"
      fieldOriginX={255}
      fieldOriginY={195}
      thickness={2}
    />

    <Text
      fieldOriginX={415}
      fieldOriginY={170}
      fontInherit={false}
      fontName="0"
      fontWidth={20}
      fontHeight={20}
    >
      Diagonal (X)
    </Text>
    <DiagonalLine
      width={80}
      height={60}
      orientation="R"
      fieldOriginX={455}
      fieldOriginY={195}
      thickness={2}
    />
    <DiagonalLine
      width={80}
      height={60}
      orientation="L"
      fieldOriginX={455}
      fieldOriginY={195}
      thickness={2}
    />

    {/* Row 3 - Circle */}
    <Text
      fieldOriginX={20}
      fieldOriginY={280}
      fontInherit={false}
      fontName="0"
      fontWidth={20}
      fontHeight={20}
    >
      Circle
    </Text>
    <Circle diameter={60} fieldOriginX={65} fieldOriginY={300} thickness={2} />

    <Text
      fieldOriginX={215}
      fieldOriginY={280}
      fontInherit={false}
      fontName="0"
      fontWidth={20}
      fontHeight={20}
    >
      Circle (filled)
    </Text>
    <Circle diameter={60} fieldOriginX={265} fieldOriginY={300} thickness={60} />

    <Text
      fieldOriginX={415}
      fieldOriginY={280}
      fontInherit={false}
      fontName="0"
      fontWidth={20}
      fontHeight={20}
    >
      Circle (white)
    </Text>
    <Circle diameter={60} fieldOriginX={465} fieldOriginY={300} thickness={2} lineColor="W" />

    {/* Row 4 - Ellipse */}
    <Text
      fieldOriginX={20}
      fieldOriginY={390}
      fontInherit={false}
      fontName="0"
      fontWidth={20}
      fontHeight={20}
    >
      Ellipse
    </Text>
    <Ellipse width={140} height={60} fieldOriginX={25} fieldOriginY={415} thickness={2} />

    <Text
      fieldOriginX={215}
      fieldOriginY={390}
      fontInherit={false}
      fontName="0"
      fontWidth={20}
      fontHeight={20}
    >
      Ellipse (filled)
    </Text>
    <Ellipse width={140} height={60} fieldOriginX={220} fieldOriginY={415} thickness={60} />

    <Text
      fieldOriginX={415}
      fieldOriginY={390}
      fontInherit={false}
      fontName="0"
      fontWidth={20}
      fontHeight={20}
    >
      Ellipse (white)
    </Text>
    <Ellipse
      width={140}
      height={60}
      fieldOriginX={420}
      fieldOriginY={415}
      thickness={2}
      lineColor="W"
    />
  </ZplLabel>
)

export const graphicsShowcaseZpl = () => ZplLabel.print(GraphicsShowcaseTemplate())
