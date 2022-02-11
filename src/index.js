import { useEffect, useState, useRef } from 'react'

function FPSStats ({
  top = 0,
  right = 'auto',
  bottom = 'auto',
  left = 0,
  graphHeight = 29,
  graphWidth = 70
}) {
  const [state, setState] = useState({
    frames: 0,
    prevTime: Date.now(),
    fps: []
  })

  const requestRef = useRef()
  const calcFPS = () => {
    setState(({ frames, fps, prevTime }) => {
      const currentTime = Date.now()
      if (currentTime > prevTime + 1000) {
        const lastFPS = Math.round((frames * 1000) / (currentTime - prevTime))
        return {
          fps: [...fps, lastFPS].slice(-graphWidth),
          frames: 0,
          prevTime: currentTime
        }
      } else {
        return {
          prevTime,
          fps,
          frames: frames + 1
        }
      }
    })
    requestRef.current = requestAnimationFrame(calcFPS)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(calcFPS)
    return () => cancelAnimationFrame(requestRef.current)
  }, [])

  const { fps } = state
  const MaxFPS = Math.max(...fps)
  const FPSlen = fps.length
  return (
    <div
      style={{
        zIndex: 999999,
        position: 'fixed',
        height: '46px',
        width: `${graphWidth + 6}px`,
        padding: '3px',
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
      <span>{fps[FPSlen - 1]} FPS</span>
      <div
        style={{
          position: 'absolute',
          left: '3px',
          right: '3px',
          bottom: '3px',
          height: `${graphHeight}px`,
          background: '#282844',
          boxSizing: 'border-box'
        }}
      >
        {fps.map((frame, i) => (
          <div
            key={`fps-${i}`}
            style={{
              position: 'absolute',
              bottom: '0',
              right: `${FPSlen - 1 - i}px`,
              height: `${(graphHeight * frame) / MaxFPS}px`,
              width: '1px',
              background: '#00ffff',
              boxSizing: 'border-box'
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default FPSStats
