import { QrCode, Text, ZplLabel } from '@zpl-kit/react-zpl'

const QrDemoTemplate = () => (
  <ZplLabel width={400} height={400} defaultFontWidth={24} defaultFontHeight={24}>
    <QrCode fieldOriginX={72} fieldOriginY={72} magnification={6}>
      https://example.com
    </QrCode>
    <Text
      fieldOriginX={72}
      fieldOriginY={250}
      fontInherit={false}
      fontName="0"
      fontWidth={22}
      fontHeight={22}
    >
      Scan (QR)
    </Text>
  </ZplLabel>
)

export const qrDemoZpl = () => ZplLabel.print(QrDemoTemplate())
