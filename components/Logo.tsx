import Image from 'next/image'

export type LogoName =
  | 'mmg'
  | 'advisory'
  | 'institute'
  | 'residency'
  | 'mmap'
  | 'mmas'
  | 'matchhub'
  | 'toolbox'
  | 'learning'
  | 'studio'

export type LogoVariant = 'full' | 'icon'

const logoMap: Record<LogoName, string> = {
  mmg:       '/logos/mmg.png',
  advisory:  '/logos/advisory.png',
  institute: '/logos/institute.png',
  residency: '/logos/residency.png',
  mmap:      '/logos/mmap.png',
  mmas:      '/logos/mmas.png',
  matchhub:  '/logos/matchhub.png',
  toolbox:   '/logos/toolbox.png',
  learning:  '/logos/learning.png',
  studio:    '/logos/studio.png',
}

// Icon-only cube marks — add files to /public/logos/icons/ to activate
const iconMap: Record<LogoName, string> = {
  mmg:       '/logos/icons/mmg-icon.png',
  advisory:  '/logos/icons/advisory-icon.png',
  institute: '/logos/icons/institute-icon.png',
  residency: '/logos/icons/mmg-icon.png',
  mmap:      '/logos/icons/mmap-icon.png',
  mmas:      '/logos/icons/mmas-icon.png',
  matchhub:  '/logos/icons/matchhub-icon.png',
  toolbox:   '/logos/icons/toolbox-icon.png',
  learning:  '/logos/icons/learning-icon.png',
  studio:    '/logos/icons/studio-icon.png',
}

const namedSizes = { sm: 24, md: 48, lg: 80 }

interface LogoProps {
  name: LogoName
  /** Named size (sm=24, md=48, lg=80) or explicit pixel number. Ignored when heroWidth+heroHeight are set. */
  size?: 'sm' | 'md' | 'lg' | number
  /** 'full' uses the complete logo; 'icon' uses the cube-only mark */
  variant?: LogoVariant
  className?: string
  /**
   * Hero placement overrides — set both to render at a specific non-square size.
   * Use these when placing the logo as a large right-column visual in a hero section.
   */
  heroWidth?: number
  heroHeight?: number
}

export function Logo({
  name,
  size = 'md',
  variant = 'full',
  className = '',
  heroWidth,
  heroHeight,
}: LogoProps) {
  const px = typeof size === 'number' ? size : namedSizes[size]
  const src = variant === 'icon' ? iconMap[name] : logoMap[name]
  const w = heroWidth ?? px
  const h = heroHeight ?? px
  return (
    <Image
      src={src}
      alt={`${name} logo`}
      width={w}
      height={h}
      className={`object-contain flex-shrink-0 ${className}`}
      style={{ width: w, height: h }}
    />
  )
}
