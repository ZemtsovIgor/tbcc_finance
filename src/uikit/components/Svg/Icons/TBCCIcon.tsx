import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="32" height="32" viewBox="0 0 32 32" {...props}>
      <circle cx="16" cy="16" r="16" fill="white"/>
      <path d="M3.40932 14.8503V5.24829L4.58519 5.82812V14.8569L3.40932 14.8503ZM7.42347 16.9377V7.41189L8.59933 7.43177V16.9377H7.42347ZM0 13.1207V4.39014L1.18262 3.83682V12.8656L0 13.1207ZM7.78755 8.46221L0.145293 4.87057L1.52051 4.2543L8.29777 7.42183L7.79093 8.46221H7.78755ZM15.4087 5.37751L7.54173 1.05363L8.0114 0L15.984 4.37026L15.4121 5.37751H15.4087ZM8.05195 17.4545L0 13.1406L0.571036 12.1325L8.56386 16.4175L8.05195 17.4545ZM0.915686 5.20853L0 4.39014L8.0114 0.0198799L8.57061 1.05281L0.915686 5.20853ZM14.8233 13.0777V4.77117L15.9992 4.37358V13.081L14.8233 13.0777ZM8.08743 13.1448L7.5468 12.1209L15.1342 8.27086L15.6748 9.29551L8.08743 13.1481V13.1448ZM7.83401 8.6287L7.32717 7.58832L15.0987 3.92628L15.6055 4.96666L7.83401 8.6287ZM8.0528 17.4512L7.53836 16.4133L15.2313 12.1665L16 13.0578L8.0528 17.4479V17.4512Z" fill="url(#paint0_linear_662_21603)"  transform="translate(8, 8)"/>
      <defs>
        <linearGradient id="paint0_linear_662_21603" x1="-3.76703e-08" y1="21.2364" x2="21.3619" y2="17.0368" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0066FF"/>
          <stop offset="1" stopColor="#2CE0C5"/>
        </linearGradient>
      </defs>
    </Svg>
  )
}

export default Icon