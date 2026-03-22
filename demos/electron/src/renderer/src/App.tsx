import { useState } from 'react'

import {
  graphicsShowcaseZpl,
  priceTagZpl,
  qrDemoZpl,
  shippingLabelZpl,
} from './examples'

import './App.css'

const mmToInch = (mm: number) => mm / 25.4

const DPMM_OPTIONS = [6, 8, 12, 24] as const

async function zplToPng(
  zpl: string,
  options: { widthMm: number; heightMm: number; dpmm?: 6 | 8 | 12 | 24 }
): Promise<Blob> {
  const { widthMm, heightMm, dpmm = 8 } = options
  const width = mmToInch(widthMm)
  const height = mmToInch(heightMm)

  const res = await fetch(
    `https://api.labelary.com/v1/printers/${dpmm}dpmm/labels/${width}x${height}/0/`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: zpl,
    }
  )

  if (!res.ok) {
    const body = await res.text()
    const message = body?.trim() || `HTTP ${res.status}`
    throw new Error(message)
  }
  return res.blob()
}

const EXAMPLES = [
  { label: '배송 라벨', generate: shippingLabelZpl, widthMm: 75, heightMm: 50 },
  { label: '가격표', generate: priceTagZpl, widthMm: 50, heightMm: 37.5 },
  {
    label: '그래픽 쇼케이스',
    generate: graphicsShowcaseZpl,
    widthMm: 75,
    heightMm: 62.5,
  },
  { label: 'QR 코드', generate: qrDemoZpl, widthMm: 50, heightMm: 50 },
] as const

const PLACEHOLDER_ZPL = `^XA
^FO50,50^A0N,50,50^FDHello World^FS
^XZ`

function App(): React.JSX.Element {
  const [zplInput, setZplInput] = useState<string>('')
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [widthMm, setWidthMm] = useState(75)
  const [heightMm, setHeightMm] = useState(50)
  const [dpmm, setDpmm] = useState<6 | 8 | 12 | 24>(8)

  const handleLoadExample = (index: number) => {
    const zpl = EXAMPLES[index].generate()
    setZplInput(zpl)
    setWidthMm(EXAMPLES[index].widthMm)
    setHeightMm(EXAMPLES[index].heightMm)
    setError(null)
    setActiveIndex(index)
  }

  const handlePreview = async () => {
    const zpl = zplInput.trim()
    if (!zpl) {
      setError('ZPL을 입력해 주세요.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const blob = await zplToPng(zpl, { widthMm, heightMm, dpmm })
      const url = URL.createObjectURL(blob)
      setImageUrl((prev: string | null) => {
        if (prev) URL.revokeObjectURL(prev)
        return url
      })
    } catch (err) {
      const msg = err instanceof Error ? err.message : '미리보기 실패'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>ZPL Kit - Electron Demo</h1>
        <p>React ZPL 라이브러리 Electron 데모</p>
      </header>
      <main className="app-main">
        <div className="demo-content">
          <h2>예제</h2>
          <div style={{ marginBottom: 12 }}>
            {EXAMPLES.map((example, index) => (
              <button
                key={example.label}
                type="button"
                onClick={() => handleLoadExample(index)}
                style={{
                  fontWeight: activeIndex === index ? 'bold' : 'normal',
                  marginRight: 8,
                }}
              >
                {example.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => handleLoadExample(activeIndex)}
            style={{ marginBottom: 16 }}
          >
            Generate ZPL
          </button>

          <h2>ZPL 직접 입력</h2>
          <p className="privacy-notice">
            ⚠️ 미리보기는 Labelary API(외부 서버)를 사용합니다. ZPL 내용이
            api.labelary.com으로 전송됩니다.
          </p>
          <div
            style={{
              marginBottom: 12,
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            <label>
              너비 (mm):{' '}
              <input
                type="number"
                value={widthMm}
                onChange={(e) => setWidthMm(Number(e.target.value))}
                min={1}
                max={381}
                style={{ width: 60 }}
              />
            </label>
            <label>
              높이 (mm):{' '}
              <input
                type="number"
                value={heightMm}
                onChange={(e) => setHeightMm(Number(e.target.value))}
                min={1}
                max={381}
                style={{ width: 60 }}
              />
            </label>
            <label>
              dpmm:{' '}
              <select
                value={dpmm}
                onChange={(e) =>
                  setDpmm(Number(e.target.value) as 6 | 8 | 12 | 24)
                }
              >
                {DPMM_OPTIONS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <textarea
            value={zplInput}
            onChange={(e) => setZplInput(e.target.value)}
            placeholder={PLACEHOLDER_ZPL}
            rows={8}
            style={{
              width: '100%',
              fontFamily: 'monospace',
              fontSize: 12,
              padding: 8,
              marginBottom: 12,
              resize: 'vertical',
            }}
          />
          <button
            type="button"
            onClick={handlePreview}
            disabled={loading || !zplInput.trim()}
            style={{ marginBottom: 12 }}
          >
            {loading ? '변환 중...' : 'Preview'}
          </button>

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}
          {imageUrl && !loading && (
            <div style={{ marginTop: 16 }}>
              <img
                src={imageUrl}
                alt="ZPL 미리보기"
                style={{ maxWidth: '100%' }}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
