import React, { useEffect, Dispatch, SetStateAction } from 'react'
import { ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts'
import useTheme from 'hooks/useTheme'
import { formatAmount } from 'views/Swap/utils/formatInfoNumbers'
import { LineChartLoader } from 'views/Swap/components/ChartLoaders'
import { useTranslation } from 'contexts/Localization'

export type LineChartProps = {
  data: any[]
  setHoverValue?: Dispatch<SetStateAction<number | undefined>> // used for value on hover
  setHoverDate?: Dispatch<SetStateAction<string | undefined>> // used for label of value
} & React.HTMLAttributes<HTMLDivElement>

// Calls setHoverValue and setHoverDate when part of chart is hovered
// Note: this NEEDs to be wrapped inside component and useEffect, if you plug it as is it will create big render problems (try and see console)
const HoverUpdater = ({ locale, payload, setHoverValue, setHoverDate }) => {
  useEffect(() => {
    setHoverValue(payload.value)
    setHoverDate(payload.time.toLocaleString(locale, { year: 'numeric', day: 'numeric', month: 'short' }))
  }, [locale, payload.value, payload.time, setHoverValue, setHoverDate])

  return null
}

/**
 * Note: remember that it needs to be mounted inside the container with fixed height
 */
const LineChart = ({ data, setHoverValue, setHoverDate }: LineChartProps) => {
  const {
    currentLanguage: { locale },
  } = useTranslation()
  const { theme } = useTheme()
  if (!data || data.length === 0) {
    return <LineChartLoader />
  }
  return (
    <ResponsiveContainer>
      <AreaChart
        data={data}
        width={300}
        height={308}
        margin={{
          top: 5,
          right: 15,
          left: 0,
          bottom: 5,
        }}
        onMouseLeave={() => {
          if (setHoverDate) setHoverDate(undefined)
          if (setHoverValue) setHoverValue(undefined)
        }}
      >
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="8.78%" stopColor='rgb(44, 94, 224)' stopOpacity={1} />
            <stop offset="87.95%" stopColor='rgb(219, 0, 255)' stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="time"
          axisLine={false}
          tickLine={false}
          tickFormatter={(time) => time.toLocaleDateString(undefined, { day: '2-digit' })}
          minTickGap={10}
        />
        <YAxis
          dataKey="value"
          tickCount={6}
          scale="linear"
          axisLine={false}
          tickLine={false}
          fontSize="12px"
          tickFormatter={(val) => `$${formatAmount(val)}`}
          orientation="right"
          tick={{ dx: 10, fill: 'rgba(255, 255, 255, 0.4)' }}
        />
        <Tooltip
          cursor={{ stroke: theme.colors.secondary }}
          contentStyle={{ display: 'none' }}
          formatter={(tooltipValue, name, props) => (
            <HoverUpdater
              locale={locale}
              payload={props.payload}
              setHoverValue={setHoverValue}
              setHoverDate={setHoverDate}
            />
          )}
        />
        <Area dataKey="value" type="monotone" stroke='rgb(219, 0, 255)' fill="url(#gradient)" fillOpacity="0.25" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default LineChart
