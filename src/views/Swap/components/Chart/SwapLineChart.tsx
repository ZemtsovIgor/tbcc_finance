import React, { useEffect, Dispatch, SetStateAction } from 'react'
import { ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts'
import { PairDataTimeWindowEnum } from 'state/swap/types'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { LineChartLoader } from '../ChartLoaders'

export type SwapLineChartProps = {
  data: any[]
  setHoverValue?: Dispatch<SetStateAction<number | undefined>> // used for value on hover
  setHoverDate: Dispatch<SetStateAction<string | undefined>> // used for label of valye
  isChangePositive: boolean
  timeWindow: PairDataTimeWindowEnum
} & React.HTMLAttributes<HTMLDivElement>

// Calls setHoverValue and setHoverDate when part of chart is hovered
// Note: this NEEDs to be wrapped inside component and useEffect, if you plug it as is it will create big render problems (try and see console)
const HoverUpdater = ({ locale, payload, setHoverValue, setHoverDate }) => {
  useEffect(() => {
    setHoverValue(payload.value)
    setHoverDate(
      payload.time.toLocaleString(locale, {
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    )
  }, [locale, payload.value, payload.time, setHoverValue, setHoverDate])



  return null
}

const TooltipWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #4E89E3;
  border-radius: 4px;
  padding: 4px 8px;
  
  p {
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: #FFFFFF;
  }
`

const CustomTooltip = ({ active, payload }: { active?: any, payload?: any }) => {
  if (active && payload && payload.length) {
    return (
      <TooltipWrapper>
        <p>{payload[0].value}</p>
      </TooltipWrapper>
    );
  }

  return null;
};

const getChartColors = ({ isChangePositive }) => {
  return isChangePositive
    ? { gradient1: '#4E89E3', gradient2: '#ffffff', stroke: '#4E89E3' }
    : { gradient1: '#ED4B9E', gradient2: '#ED4B9E', stroke: '#ED4B9E ' }
}

const dateFormattingByTimewindow: Record<PairDataTimeWindowEnum, Intl.DateTimeFormatOptions> = {
  [PairDataTimeWindowEnum.DAY]: {
    hour: '2-digit',
    minute: '2-digit',
  },
  [PairDataTimeWindowEnum.WEEK]: {
    month: '2-digit',
    day: '2-digit',
  },
  [PairDataTimeWindowEnum.MONTH]: {
    month: '2-digit',
    day: '2-digit',
  },
  [PairDataTimeWindowEnum.YEAR]: {
    month: '2-digit',
    day: '2-digit',
  },
}

/**
 * Note: remember that it needs to be mounted inside the container with fixed height
 */
const LineChart = ({ data, setHoverValue, setHoverDate, isChangePositive, timeWindow }: SwapLineChartProps) => {
  const {
    currentLanguage: { locale },
  } = useTranslation()
  const colors = getChartColors({ isChangePositive })
  const dateFormatting = dateFormattingByTimewindow[timeWindow]

  if (!data || data.length === 0) {
    return <LineChartLoader />
  }
  // @ts-ignore
  return (
    <ResponsiveContainer>
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 0,
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
            <stop offset="5%" stopColor={colors.gradient1} stopOpacity={0.34} />
            <stop offset="100%" stopColor={colors.gradient2} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="time"
          axisLine
          tickLine={false}
          stroke="#E5E5E5"
          tickFormatter={(time) => time.toLocaleString(locale, dateFormatting)}
          minTickGap={8}
          tick={{ fill: '#8A8A8A', fontSize: 14 }}
        />
        <YAxis
          dataKey="value"
          axisLine
          tickLine={false}
          stroke="#E5E5E5"
          domain={['auto', 'auto']}
          tick={{ fill: '#8A8A8A', fontSize: 14 }}
        />
        <Tooltip
          cursor={{ stroke: '#E5E5E5' }}
          contentStyle={{ fill: '#4E89E3' }}
          content={<CustomTooltip />}
          formatter={(tooltipValue, name, props) => (
            <HoverUpdater
              locale={locale}
              payload={props.payload}
              setHoverValue={setHoverValue}
              setHoverDate={setHoverDate}
            />
          )}
        />
        <Area dataKey="value" type="linear" stroke={colors.stroke} fill="url(#gradient)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default LineChart
