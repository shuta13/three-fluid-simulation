import React from 'react'
import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from 'gl-react-dom';

import './Canvas.scss'

const fragment = require('../shaders/frag.glsl')

const shaders = Shaders.create({
  helloGLSL: {
    frag: GLSL`${fragment.default}`
  }
});

const Canvas: React.FC = () => {
  console.log(fragment.default)
  return (
    <div className="CanvasWrap">
      <Surface width={400} height={400} >
        <Node shader={shaders.helloGLSL} />
      </Surface>
    </div>
  )
}

export default Canvas