import React from 'react'
import { ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts'
import { LineChartLoader } from 'views/Swap/components/ChartLoaders'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'

export type SwapLineChartProps = {
  data: any[]
} & React.HTMLAttributes<HTMLDivElement>

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

const getChartColors = () => {
  return { gradient1: '#4E89E3', gradient2: '#ffffff', stroke: '#4E89E3' }
}

const dateFormattingByTimewindow: Intl.DateTimeFormatOptions = {
  month: '2-digit',
  day: '2-digit',
}

/**
 * Note: remember that it needs to be mounted inside the container with fixed height
 */
const LineChart = ({ data }: SwapLineChartProps) => {
  const {
    currentLanguage: { locale },
  } = useTranslation()
  const colors = getChartColors()
  const dateFormatting = dateFormattingByTimewindow

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
          tickFormatter={(time) => time.toLocaleString(locale, dateFormatting)}
          minTickGap={8}
          tick={{ fill: '#8A8A8A', fontSize: 14 }}
        />
        <YAxis
          dataKey="value"
          axisLine
          tickLine={false}
          domain={['auto', 'auto']}
          tick={{ fill: '#8A8A8A', fontSize: 14 }}
        />
        <Tooltip
          cursor={{ stroke: '#E5E5E5' }}
          contentStyle={{ fill: '#4E89E3' }}
          content={<CustomTooltip />}
        />
        <Area dataKey="value" type="linear" stroke={colors.stroke} fill="url(#gradient)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default LineChart
