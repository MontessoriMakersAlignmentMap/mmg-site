/**
 * CubeIcon — isometric cube SVG mark
 *
 * Three visible faces in true isometric projection:
 *   Top   → lightest (lit from above)
 *   Right → mid tone (primary face)
 *   Left  → darkest  (shadow)
 *
 * Usage:
 *   <CubeIcon variant="gold"  size={36} />
 *   <CubeIcon variant="white" size={32} />
 *
 * Geometry (viewBox 0 0 36 36):
 *   Top apex   T  = (18, 4)
 *   Top right  R  = (30,11)
 *   Top left   L  = ( 6,11)
 *   Inner ctr  C  = (18,18)   ← where all three faces meet
 *   Bot right  BR = (30,25)
 *   Bot left   BL = ( 6,25)
 *   Bottom     B  = (18,32)
 *
 *   Top   face: T  R  C  L
 *   Right face: R  BR B  C
 *   Left  face: L  C  B  BL
 */

type CubeVariant = 'gold' | 'white'

interface FacePalette {
  top:   string   // lightest — receives direct light
  right: string   // mid — primary visible face
  left:  string   // darkest — in shadow
}

const PALETTES: Record<CubeVariant, FacePalette> = {
  gold: {
    top:   '#F0CC88',   // warm highlight
    right: '#D6A758',   // brand gold
    left:  '#B07828',   // deep shadow
  },
  white: {
    top:   '#FFFFFF',   // pure white highlight
    right: '#D2DCE6',   // cool mid grey
    left:  '#96AABB',   // blue-grey shadow
  },
}

interface CubeIconProps {
  variant?: CubeVariant
  size?: number
  className?: string
}

export function CubeIcon({ variant = 'white', size = 36, className = '' }: CubeIconProps) {
  const { top, right, left } = PALETTES[variant]

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Top face — lightest (light source above-left) */}
      <polygon points="18,4 30,11 18,18 6,11" fill={top} />
      {/* Right face — mid tone */}
      <polygon points="30,11 30,25 18,32 18,18" fill={right} />
      {/* Left face — darkest (shadow) */}
      <polygon points="6,11 18,18 18,32 6,25" fill={left} />
    </svg>
  )
}
