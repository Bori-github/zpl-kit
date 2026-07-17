import { Circle, DiagonalLine, Ellipse, Line, Text, ZplLabel } from '@zpl-kit/react-zpl';

/**
 * 배송 라벨 (600 x 400 dots)
 *
 * 사용 컴포넌트:
 * - Text: 수신자, 주소, 운송장 번호
 * - Line: 구역 구분선 (수평/수직)
 * - DiagonalLine: 취급 주의 X 마크
 * - Circle: 배송 상태 인디케이터 점
 * - Ellipse: FRAGILE 강조 타원
 */
const ShippingLabelTemplate = ({
  recipient,
  address,
  city,
  trackingNumber,
  fragile = false,
}: {
  recipient: string;
  address: string;
  city: string;
  trackingNumber: string;
  fragile?: boolean;
}) => (
  <ZplLabel width={600} height={400} defaultFontWidth={28} defaultFontHeight={28}>
    {/* 상단 구분선 */}
    <Line direction="horizontal" length={580} fieldOriginX={10} fieldOriginY={10} thickness={3} />

    {/* 배송 상태 인디케이터 (채워진 원) */}
    <Circle diameter={20} fieldOriginX={15} fieldOriginY={20} thickness={20} />

    {/* 수신자 */}
    <Text
      fieldOriginX={45}
      fieldOriginY={20}
      fontInherit={false}
      fontName="0"
      fontWidth={35}
      fontHeight={35}
    >
      {recipient}
    </Text>

    {/* 주소 */}
    <Text fieldOriginX={45} fieldOriginY={62}>
      {address}
    </Text>
    <Text fieldOriginX={45} fieldOriginY={95}>
      {city}
    </Text>

    {/* 우측 세로 구분선 */}
    <Line direction="vertical" length={115} fieldOriginX={440} fieldOriginY={15} thickness={1} />

    {/* FRAGILE 타원 강조 */}
    {fragile && (
      <>
        <Ellipse width={130} height={50} fieldOriginX={450} fieldOriginY={30} thickness={3} />
        <Text
          fieldOriginX={463}
          fieldOriginY={46}
          fontInherit={false}
          fontName="0"
          fontWidth={22}
          fontHeight={22}
        >
          FRAGILE
        </Text>
      </>
    )}

    {/* 취급 주의 X 마크 (fragile 아닐 때) */}
    {!fragile && (
      <>
        <DiagonalLine
          width={50}
          height={50}
          orientation="R"
          fieldOriginX={465}
          fieldOriginY={30}
          thickness={2}
        />
        <DiagonalLine
          width={50}
          height={50}
          orientation="L"
          fieldOriginX={465}
          fieldOriginY={30}
          thickness={2}
        />
      </>
    )}

    {/* 중간 구분선 */}
    <Line direction="horizontal" length={580} fieldOriginX={10} fieldOriginY={140} thickness={1} />

    {/* 운송장 번호 */}
    <Text
      fieldOriginX={10}
      fieldOriginY={155}
      fontInherit={false}
      fontName="0"
      fontWidth={20}
      fontHeight={20}
    >
      TRACKING NO.
    </Text>
    <Text
      fieldOriginX={10}
      fieldOriginY={180}
      fontInherit={false}
      fontName="0"
      fontWidth={38}
      fontHeight={38}
    >
      {trackingNumber}
    </Text>

    {/* 하단 구분선 */}
    <Line direction="horizontal" length={580} fieldOriginX={10} fieldOriginY={240} thickness={3} />
  </ZplLabel>
);

export const shippingLabelZpl = () =>
  ZplLabel.print(
    ShippingLabelTemplate({
      recipient: '홍길동',
      address: '서울특별시 강남구 테헤란로 123',
      city: '서울 06234',
      trackingNumber: '1234-5678-9012',
      fragile: true,
    })
  );
