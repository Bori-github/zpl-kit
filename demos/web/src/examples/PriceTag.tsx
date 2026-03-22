import {
  Circle,
  DiagonalLine,
  Ellipse,
  Line,
  Text,
  ZplLabel,
} from '@zpl-kit/react-zpl';

/**
 * 가격표 (400 x 300 dots)
 *
 * 사용 컴포넌트:
 * - Text: 상품명, 가격, SKU
 * - Line: 테두리, 구분선
 * - Circle: 할인 뱃지 배경
 * - Ellipse: 가격 강조 타원
 * - DiagonalLine: 모서리 장식
 */
const PriceTagTemplate = ({
  productName,
  price,
  originalPrice,
  sku,
  discountPercent,
}: {
  productName: string;
  price: string;
  originalPrice: string;
  sku: string;
  discountPercent: number;
}) => (
  <ZplLabel
    width={400}
    height={300}
    defaultFontWidth={28}
    defaultFontHeight={28}
  >
    {/* 테두리 (4변) */}
    <Line
      direction="horizontal"
      length={380}
      fieldOriginX={10}
      fieldOriginY={10}
      thickness={2}
    />
    <Line
      direction="horizontal"
      length={380}
      fieldOriginX={10}
      fieldOriginY={288}
      thickness={2}
    />
    <Line
      direction="vertical"
      length={280}
      fieldOriginX={10}
      fieldOriginY={10}
      thickness={2}
    />
    <Line
      direction="vertical"
      length={280}
      fieldOriginX={388}
      fieldOriginY={10}
      thickness={2}
    />

    {/* 모서리 대각선 장식 */}
    <DiagonalLine
      width={20}
      height={20}
      orientation="R"
      fieldOriginX={10}
      fieldOriginY={10}
      thickness={1}
    />
    <DiagonalLine
      width={20}
      height={20}
      orientation="L"
      fieldOriginX={368}
      fieldOriginY={10}
      thickness={1}
    />

    {/* 상품명 */}
    <Text
      fieldOriginX={25}
      fieldOriginY={25}
      fontInherit={false}
      fontName="0"
      fontWidth={32}
      fontHeight={32}
    >
      {productName}
    </Text>

    {/* 상품명 하단 구분선 */}
    <Line
      direction="horizontal"
      length={350}
      fieldOriginX={25}
      fieldOriginY={68}
      thickness={1}
    />

    {/* 정가 (취소선 효과: 위아래 얇은 선) */}
    <Text
      fieldOriginX={25}
      fieldOriginY={80}
      fontInherit={false}
      fontName="0"
      fontWidth={22}
      fontHeight={22}
    >
      {originalPrice}
    </Text>
    <Line
      direction="horizontal"
      length={80}
      fieldOriginX={25}
      fieldOriginY={97}
      thickness={1}
    />

    {/* 가격 강조 타원 */}
    <Ellipse
      width={200}
      height={60}
      fieldOriginX={80}
      fieldOriginY={115}
      thickness={3}
    />

    {/* 판매가 */}
    <Text
      fieldOriginX={95}
      fieldOriginY={130}
      fontInherit={false}
      fontName="0"
      fontWidth={42}
      fontHeight={42}
    >
      {price}
    </Text>

    {/* SKU 구분선 */}
    <Line
      direction="horizontal"
      length={350}
      fieldOriginX={25}
      fieldOriginY={200}
      thickness={1}
    />

    {/* SKU */}
    <Text
      fieldOriginX={25}
      fieldOriginY={210}
      fontInherit={false}
      fontName="0"
      fontWidth={20}
      fontHeight={20}
    >
      {`SKU: ${sku}`}
    </Text>

    {/* 할인 뱃지 (채워진 원 + 텍스트) */}
    <Circle
      diameter={70}
      fieldOriginX={305}
      fieldOriginY={195}
      thickness={70}
    />
    <Text
      fieldOriginX={308}
      fieldOriginY={215}
      fontInherit={false}
      fontName="0"
      fontWidth={20}
      fontHeight={20}
    >
      {`-${discountPercent}%`}
    </Text>
  </ZplLabel>
);

export const priceTagZpl = () =>
  ZplLabel.print(
    PriceTagTemplate({
      productName: '무선 이어폰',
      price: '39,900',
      originalPrice: '59,000',
      sku: 'EP-WL-2024-BLK',
      discountPercent: 32,
    })
  );
