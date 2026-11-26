import React, { useEffect, useReducer, useRef } from 'react'
import PropTypes from 'prop-types'

function FPSStats ({
  top = 0,
  right = 'auto',
  bottom = 'auto',
  left = 0,
  graphHeight = 29,
  graphWidth = 70
}) {
  const padding = 3
  const textLineHeight = 10
  const extraGap = 1
  const numericGraphHeight = Number(graphHeight)
  const totalHeight = Number.isFinite(numericGraphHeight)
    ? numericGraphHeight + padding * 2 + textLineHeight + extraGap
    : 46
  const numericGraphWidth = Number(graphWidth)
  const maxGraphSamples = Number.isFinite(numericGraphWidth)
    ? Math.max(0, Math.floor(numericGraphWidth))
    : 70
  const [state, dispatch] = useReducer(
    state => {
      const currentTime = Date.now()
      if (currentTime < state.prevTime) {
        return { ...state, frames: 1, prevTime: currentTime }
      }
      if (currentTime > state.prevTime + 1000) {
        const missedSeconds = Math.floor(
          (currentTime - state.prevTime - 1000) / 1000
        )
        const zeroCount = Math.min(
          missedSeconds,
          Math.max(0, maxGraphSamples - 1)
        )
        const currentFPS = Math.max(
          1,
          Math.round((state.frames * 1000) / (currentTime - state.prevTime))
        )
        const nextFPS = [...new Array(zeroCount).fill(0), currentFPS]
        const fps =
          maxGraphSamples > 0
            ? [...state.fps, ...nextFPS].slice(-maxGraphSamples)
            : []
        return {
          max: Math.max(state.max, currentFPS),
          len: fps.length,
          fps,
          frames: 1,
          prevTime: currentTime
        }
      } else {
        return { ...state, frames: state.frames + 1 }
      }
    },
    {
      len: 0,
      max: 0,
      frames: 0,
      prevTime: Date.now(),
      fps: []
    }
  )

  const requestRef = useRef()
  const tick = () => {
    dispatch()
    requestRef.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(requestRef.current)
  }, [])

  const { fps, max, len } = state

  return (
    <div
      style={{
        zIndex: 999999,
        position: 'fixed',
        height: totalHeight,
        width: graphWidth + 6,
        padding,
        backgroundColor: '#000',
        color: '#00ffff',
        fontSize: '9px',
        lineHeight: `${textLineHeight}px`,
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        boxSizing: 'border-box',
        pointerEvents: 'none',
        top,
        right,
        bottom,
        left
      }}
    >
      <span>{fps[len - 1]} FPS</span>
      <div
        style={{
          position: 'absolute',
          left: padding,
          right: padding,
          bottom: padding,
          height: graphHeight,
          background: '#282844',
          boxSizing: 'border-box'
        }}
      >
        {fps.map((frame, i) => (
          <div
            key={`fps-${i}`}
            style={{
              position: 'absolute',
              bottom: 0,
              right: `${len - 1 - i}px`,
              height: `${(graphHeight * frame) / max}px`,
              width: 1,
              background: '#00ffff',
              boxSizing: 'border-box'
            }}
          />
        ))}
      </div>
    </div>
  )
}

FPSStats.propTypes = {
  top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  graphHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  graphWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default FPSStats
