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
  const [state, dispatch] = useReducer(
    state => {
      const currentTime = Date.now()
      if (currentTime > state.prevTime + 1000) {
        const nextFPS = [
          ...new Array(
            Math.floor((currentTime - state.prevTime - 1000) / 1000)
          ).fill(0),
          Math.max(
            1,
            Math.round((state.frames * 1000) / (currentTime - state.prevTime))
          )
        ]
        return {
          max: Math.max(state.max, ...nextFPS),
          len: Math.min(state.len + nextFPS.length, graphWidth),
          fps: [...state.fps, ...nextFPS].slice(-graphWidth),
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
        height: 46,
        width: graphWidth + 6,
        padding: 3,
        backgroundColor: '#000',
        color: '#00ffff',
        fontSize: '9px',
        lineHeight: '10px',
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
          left: 3,
          right: 3,
          bottom: 3,
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
