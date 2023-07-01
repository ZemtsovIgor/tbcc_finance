import React from 'react'
import { SvgProps } from '../types'

interface LogoProps extends SvgProps {
  onlyIcon: boolean
}

const Logo: React.FC<LogoProps> = ({ className, onlyIcon }) => {
  return (
    <div className={className}>
      <svg
        width="29"
        height="32"
        viewBox="0 0 29 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M13.12 26.4119L9.52641 24.3584L4.88186 21.6991V19.5447V16.3467V11.0279V5.43991L0 8.23393V16.3467V24.4931L7.08548 28.5663L13.12 31.9999V26.4119Z"
          fill="#4E89E3"
        />
        <path
          d="M27.84 7.47144L21.6175 4.03587L14.2763 -9.15527e-05L7.03998 4.16929V9.70623L14.2763 5.53685L19.1005 8.1719L22.806 10.2399L27.84 7.47144Z"
          fill="#2DC96C"
        />
        <path
          d="M15.6799 31.9999L21.7327 28.5462L28.7999 24.4491V16.255V9.27991L23.9307 12.0903V16.255V21.6388L19.2981 24.3137L15.6799 26.3792V31.9999Z"
          fill="#FF822E"
        />
      </svg>
      {onlyIcon ? null : (
        <p>
          <span>B8</span>DEX
        </p>
      )}
    </div>
  )
}

export default React.memo(Logo, (prev, next) => prev.onlyIcon === next.onlyIcon)
