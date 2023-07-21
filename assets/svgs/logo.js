import * as React from 'react'
import Svg, { G, Path } from 'react-native-svg'
const SvgComponent = (props) => (
  <Svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none">
    <G
      style={{
        mixBlendMode: 'multiply'
      }}
    >
      <Path
        fill="#2E2C2F"
        fillOpacity={0.8}
        d="M12.05 13.203c.865-1.298 2.501-1.803 3.368-1.803h6.067c1.386 0 1.565.902.964 1.803l-5.769 8.653h7.8c1.387 0 1.566.902 1.085 1.623l-3.004 4.507c-.866 1.298-2.285 1.802-3.369 1.802H3.16c-1.213 0-1.686-.72-1.205-1.442l10.095-15.143Z"
      />
      <Path
        stroke="#2E2C2F"
        strokeWidth={0.433}
        d="M12.05 13.203c.865-1.298 2.501-1.803 3.368-1.803h6.067c1.386 0 1.565.902.964 1.803l-5.769 8.653h7.8c1.387 0 1.566.902 1.085 1.623l-3.004 4.507c-.866 1.298-2.285 1.802-3.369 1.802H3.16c-1.213 0-1.686-.72-1.205-1.442l10.095-15.143Z"
      />
    </G>
    <G
      style={{
        mixBlendMode: 'multiply'
      }}
    >
      <Path
        fill="#2E2C2F"
        fillOpacity={0.8}
        d="M11.057 2.803C11.922 1.505 13.56 1 14.426 1h6.066c1.387 0 1.566.902.965 1.803l-5.769 8.653h7.8c1.387 0 1.566.902 1.085 1.623l-3.004 4.507c-.866 1.298-2.286 1.803-3.369 1.803H2.167c-1.214 0-1.686-.721-1.205-1.443L11.057 2.803Z"
      />
      <Path
        stroke="#2E2C2F"
        strokeWidth={0.433}
        d="M11.057 2.803C11.922 1.505 13.56 1 14.426 1h6.066c1.387 0 1.566.902.965 1.803l-5.769 8.653h7.8c1.387 0 1.566.902 1.085 1.623l-3.004 4.507c-.866 1.298-2.286 1.803-3.369 1.803H2.167c-1.214 0-1.686-.721-1.205-1.443L11.057 2.803Z"
      />
    </G>
  </Svg>
)
export default SvgComponent
