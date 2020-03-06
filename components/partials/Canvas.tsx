import React, { useRef, useCallback, useEffect, useState } from 'react'
import {
  WebGLRenderer,
  Scene, 
  PerspectiveCamera,
  PlaneGeometry,
  TextureLoader,
  ShaderMaterial,
  Mesh,
  Vector2,
  AmbientLight,
  MeshPhongMaterial
} from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'

import './Canvas.scss'

const fragment = require('../shaders/frag.glsl')
const vertex = require('../shaders/vert.glsl')

const lena = require('../../public/static/lena_color.png')

// ----------
// types
type RenderParams = {
  scene: Scene
  camera?: PerspectiveCamera
  renderer?: WebGLRenderer
  composer: EffectComposer
  customPass?: ShaderPass
}
type AnimateParams = {
  scene: Scene
  camera?: PerspectiveCamera
  renderer?: WebGLRenderer
  composer: EffectComposer
  customPass?: ShaderPass
}
// ----------

let time = 0.0
let shakeWidth = 0.02

const Canvas: React.FC = () => {
  // set canvas
  const onCanvasLoaded = (canvas: HTMLCanvasElement) => {
    if (!canvas) {
      return
    }

    // init scene
    const scene = new Scene()
    const camera = new PerspectiveCamera(60, 400 / 400, 1, 1000)
    camera.position.z = 1

    // render init
    const renderer = new WebGLRenderer({ canvas: canvas, antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor('#1d1d1d')
    renderer.setSize(400, 400)

    // light 
    const light = new AmbientLight(0xffffff, 1.0)
    scene.add(light)

    // object
    const loader = new TextureLoader()
    const material = new MeshPhongMaterial({
      map: loader.load(`${lena}`)
    })
    const geometry = new PlaneGeometry(1, 1, 1, 1)
    const mesh = new Mesh(geometry, material)
    scene.add(mesh)

    renderer.render(scene, camera)

    const composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    const shaders = {
      uniforms: {
        'tDiffuse': {
          value: null
        },
        'time': {
          type: 'f',
          value: time
        },
        'resolution': {
          type: 'v2',
          value: new Vector2(window.innerWidth, window.innerHeight)
        },
        'shakeWidth': {
          type: 'f',
          value: shakeWidth
        }
      },
      vertexShader: vertex.default,
      fragmentShader: fragment.default
    }

    const customPass = new ShaderPass(shaders)
    customPass.renderToScreen = true
    composer.addPass(customPass)

    // start animation
    composer.render()
    requestRef.current = window.requestAnimationFrame(() => animate({ scene, composer, customPass }))
  }

  // animate
  const requestRef = useRef(0)
  const animate = useCallback(({ scene, composer, customPass }: AnimateParams) => {
    render({ scene, composer, customPass })
    requestRef.current = window.requestAnimationFrame(() => animate({ scene, composer, customPass }))
  }, [])
  useEffect(() => {
    return () => window.cancelAnimationFrame(requestRef.current)
  }, [animate])

  // render
  const render = ({ scene, composer, customPass }: RenderParams) => {
    // access object of scene
    const object = scene.children[0] as any
    const sec = performance.now() / 1000
    const pass = customPass as any
    pass.uniforms.time.value = sec

		composer.render()
  }

  // handle mouse hover event
  const [isHovered, setIsHovered] = useState(false)
  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div className="CanvasWrap">
      <button className="CanvasClipImg">
        <canvas className={ isHovered ? "CanvasCanvasHovered" : "CanvasCanvas" }
          ref={onCanvasLoaded}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <img className="CanvasImg" src={lena} />
      </button>
    </div>
  )
}

export default Canvas