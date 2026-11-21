'use client';

import React from 'react';

export interface ModularGeometricTilesProps {
  variant?: 'corner' | 'cluster-2x2';
  position?: 'top-left' | 'bottom-right' | 'top-right' | 'bottom-left' | 'both' | 'diagonal-alt';
  scale?: 'normal' | 'large';
  theme?: 'light' | 'dark';
  animated?: boolean;
  className?: string;
  topRightClassName?: string;
}

/**
 * 1. Diagonal-Split Square (Ubin Persegi Belah Diagonal 45°)
 * 100% Solid Color Precision SVG
 */
export function DiagonalSplitTile({
  colorA = '#0066E0',
  colorB = '#E6E9F2',
  size,
  direction = 'tl-br',
  className = '',
}: {
  colorA?: string;
  colorB?: string;
  size?: number;
  direction?: 'tl-br' | 'tr-bl';
  className?: string;
}) {
  return (
    <svg
      {...(size ? { width: size, height: size } : {})}
      viewBox="0 0 40 40"
      className={`flex-shrink-0 ${size ? '' : 'w-full h-full'} ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {direction === 'tl-br' ? (
        <>
          <polygon points="0,0 40,0 0,40" fill={colorA} />
          <polygon points="40,0 40,40 0,40" fill={colorB} />
        </>
      ) : (
        <>
          <polygon points="40,0 40,0 0,40" fill={colorA} />
          <polygon points="0,0 0,40 40,40" fill={colorB} />
        </>
      )}
    </svg>
  );
}

/**
 * 2. Quarter-Circle Tile (Ubin Lengkung Seperempat Lingkaran)
 * 100% Solid Color Precision SVG
 */
export function QuarterCircleTile({
  fillColor = '#E3062E',
  bgFill = 'transparent',
  corner = 'tl',
  size,
  className = '',
}: {
  fillColor?: string;
  bgFill?: string;
  corner?: 'tl' | 'tr' | 'br' | 'bl';
  size?: number;
  className?: string;
}) {
  return (
    <svg
      {...(size ? { width: size, height: size } : {})}
      viewBox="0 0 40 40"
      className={`flex-shrink-0 ${size ? '' : 'w-full h-full'} ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {bgFill !== 'transparent' && <rect width="40" height="40" fill={bgFill} />}
      {corner === 'tl' && <path d="M 0,0 L 40,0 A 40,40 0 0,1 0,40 Z" fill={fillColor} />}
      {corner === 'tr' && <path d="M 40,0 L 40,40 A 40,40 0 0,1 0,0 Z" fill={fillColor} />}
      {corner === 'br' && <path d="M 40,40 L 0,40 A 40,40 0 0,1 40,0 Z" fill={fillColor} />}
      {corner === 'bl' && <path d="M 0,40 L 0,0 A 40,40 0 0,1 40,40 Z" fill={fillColor} />}
    </svg>
  );
}

/**
 * 3. Petal / Opposite-Rounded Tile (Ubin dengan Dua Sudut Berlawanan Melengkung)
 * 100% Solid Color Precision Tile
 */
export function PetalTile({
  fillColor = '#0066E0',
  orientation = 'tl-br',
  size,
  className = '',
  children,
}: {
  fillColor?: string;
  orientation?: 'tl-br' | 'tr-bl';
  size?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  const roundedClass =
    orientation === 'tl-br'
      ? 'rounded-tl-2xl rounded-br-2xl'
      : 'rounded-tr-2xl rounded-bl-2xl';

  return (
    <div
      className={`flex items-center justify-center flex-shrink-0 ${roundedClass} ${size ? '' : 'w-full h-full'} ${className}`}
      style={{
        ...(size ? { width: size, height: size } : {}),
        backgroundColor: fillColor,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Reusable Modular Geometric Tiles Component
 * 100% Solid, Vivid, Bold Colors (Opacity-100)
 * Uses official ITCG palette: #E3062E (Red), #0066E0 (Blue), #0D2B6B (Navy), #E6E9F2 (Gray), #FFFFFF (White)
 */
export default function ModularGeometricTiles({
  variant = 'corner',
  position = 'both',
  scale = 'large',
  theme = 'light',
  animated = true,
  className = '',
  topRightClassName = '',
}: ModularGeometricTilesProps) {
  const isDark = theme === 'dark';
  const showTopLeft = position === 'top-left' || position === 'both';
  const showBottomRight = position === 'bottom-right' || position === 'both';
  const showTopRight = position === 'top-right' || position === 'diagonal-alt';
  const showBottomLeft = position === 'bottom-left' || position === 'diagonal-alt';

  // Tile dimensions per scale (Refined architectural proportions with zero overlap)
  const tileClasses =
    scale === 'large'
      ? 'w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-13 lg:h-13 xl:w-14 xl:h-14'
      : 'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12';

  if (variant === 'cluster-2x2') {
    return (
      <div className={`grid grid-cols-2 gap-1.5 p-1.5 bg-white rounded-2xl border border-[#E6E9F2] shadow-sm select-none ${className}`}>
        {/* Tile 1: Petal Module Red */}
        <div className={tileClasses}>
          <PetalTile
            fillColor="#E3062E"
            orientation="tl-br"
            className={animated ? 'anim-tile-spin' : ''}
          />
        </div>
        {/* Tile 2: Diagonal-Split Tech Blue + Gray */}
        <div className={tileClasses}>
          <DiagonalSplitTile
            colorA="#0066E0"
            colorB="#E6E9F2"
            direction="tl-br"
            className={animated ? 'anim-tile-spin-rev' : ''}
          />
        </div>
        {/* Tile 3: Diagonal-Split Navy + Tech Blue */}
        <div className={tileClasses}>
          <DiagonalSplitTile
            colorA="#0D2B6B"
            colorB="#0066E0"
            direction="tr-bl"
          />
        </div>
        {/* Tile 4: Quarter-Circle Navy */}
        <div className={tileClasses}>
          <QuarterCircleTile
            fillColor="#0D2B6B"
            corner="br"
            className={animated ? 'anim-tile-pulse' : ''}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}>
      {/* Top-Left Corner Modular Tiles (100% Solid) */}
      {showTopLeft && (
        <div className="absolute top-5 left-5 lg:top-6 lg:left-6">
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2 shadow-sm rounded-2xl">
            <div className={tileClasses}>
              <PetalTile
                fillColor="#E3062E"
                orientation="tl-br"
                className={animated ? 'anim-tile-spin' : ''}
              />
            </div>
            <div className={tileClasses}>
              <DiagonalSplitTile
                colorA="#0066E0"
                colorB={isDark ? '#0D2B6B' : '#E6E9F2'}
                direction="tl-br"
              />
            </div>
            <div className={tileClasses}>
              <DiagonalSplitTile
                colorA={isDark ? '#FFFFFF' : '#0D2B6B'}
                colorB="#E3062E"
                direction="tr-bl"
              />
            </div>
            <div className={tileClasses}>
              <QuarterCircleTile
                fillColor="#0066E0"
                corner="tl"
              />
            </div>
          </div>
        </div>
      )}

      {/* Top-Right Corner Modular Tiles (100% Solid Vivid Canvas Accent with Symmetric Inset) */}
      {showTopRight && (
        <div className={`hidden sm:block absolute ${topRightClassName || 'top-22 right-5 lg:top-24 lg:right-6'}`}>
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2 shadow-sm rounded-2xl">
            <div className={tileClasses}>
              <DiagonalSplitTile
                colorA="#0066E0"
                colorB="#E6E9F2"
                direction="tl-br"
              />
            </div>
            <div className={tileClasses}>
              <PetalTile
                fillColor={isDark ? '#0066E0' : '#0D2B6B'}
                orientation="tr-bl"
                className={animated ? 'anim-tile-spin-rev' : ''}
              />
            </div>
            <div className={tileClasses}>
              <QuarterCircleTile
                fillColor="#E3062E"
                corner="bl"
              />
            </div>
            <div className={tileClasses}>
              <DiagonalSplitTile
                colorA="#E6E9F2"
                colorB="#0066E0"
                direction="tr-bl"
              />
            </div>
          </div>
        </div>
      )}

      {/* Bottom-Left Corner Modular Tiles (100% Solid Vivid Accent with Symmetric Inset) */}
      {showBottomLeft && (
        <div className="hidden sm:block absolute bottom-5 left-5 lg:bottom-6 lg:left-6">
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2 shadow-sm rounded-2xl">
            <div className={tileClasses}>
              <QuarterCircleTile
                fillColor="#0066E0"
                corner="tl"
              />
            </div>
            <div className={tileClasses}>
              <PetalTile
                fillColor="#E3062E"
                orientation="tl-br"
                className={animated ? 'anim-tile-spin' : ''}
              />
            </div>
            <div className={tileClasses}>
              <DiagonalSplitTile
                colorA="#0D2B6B"
                colorB="#E6E9F2"
                direction="tr-bl"
              />
            </div>
            <div className={tileClasses}>
              <QuarterCircleTile
                fillColor="#0D2B6B"
                corner="br"
              />
            </div>
          </div>
        </div>
      )}

      {/* Bottom-Right Corner Modular Tiles (100% Solid) */}
      {showBottomRight && (
        <div className="absolute bottom-5 right-5 lg:bottom-6 lg:right-6">
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2 shadow-sm rounded-2xl">
            <div className={tileClasses}>
              <QuarterCircleTile
                fillColor="#0066E0"
                corner="br"
              />
            </div>
            <div className={tileClasses}>
              <PetalTile
                fillColor={isDark ? '#0066E0' : '#0D2B6B'}
                orientation="tr-bl"
                className={animated ? 'anim-tile-spin-rev' : ''}
              />
            </div>
            <div className={tileClasses}>
              <DiagonalSplitTile
                colorA="#E3062E"
                colorB={isDark ? '#0D2B6B' : '#FFFFFF'}
                direction="tl-br"
              />
            </div>
            <div className={tileClasses}>
              <PetalTile
                fillColor="#E3062E"
                orientation="tl-br"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
