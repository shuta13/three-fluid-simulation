import React from 'react'
import {
  WebGLRenderer,
  Scene, 
  PerspectiveCamera,
} from 'three'
import useGetWindowSize from '../hooks/useGetWindowSize'

import './Canvas.scss'

const Canvas: React.FC = () => {
  const { width, height } = useGetWindowSize()
  const onCanvasLoaded = (canvas: HTMLCanvasElement) => {
    if (!canvas) {
      return
    }

    // init scene
    const scene = new Scene()
    const camera = new PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
    const renderer = new WebGLRenderer({ canvas: canvas, antialias: true })
    renderer.setClearColor('#1d1d1d')
    renderer.setSize(width, height)

    // render scene
    renderer.render(scene, camera)
  }
  return (
    <div className="CanvasWrap">
      <canvas ref={onCanvasLoaded} />
    </div>
  )
}

export default Canvas