import React, { Component } from 'react';
import './App.css';
import image from './images/1.png';
import {Curtains} from 'curtainsjs';
const planeParams = {
  vertexShaderID: "plane-vs", // our vertex shader ID
  fragmentShaderID: "plane-fs", // our framgent shader ID
  uniforms: {
    time: {
      name: "uTime", // uniform name that will be passed to our shaders
      type: "1f", // this means our uniform is a float
      value: 0,
    },
  }
};
class CurtainsPage extends React.Component {
  constructor( props ) {
    super(props);
    this._planes = null;
  }

  componentDidMount() {
    // if we got our curtains object, create the plane
    this.props.curtains && this.createPlanes(this.props.curtains);
  }

  componentWillUpdate(nextProps, nextState) {
    // if we haven't got our curtains object before but got it now, create the plane
    if(!this.props.curtains && nextProps.curtains) {
      this.createPlanes(nextProps.curtains);
    }
  }

  componentWillUnmount() {
    // remove the plane before unmounting component
    if(this.props.curtains && this._planes) {
      this.props.curtains.removePlane(this._planes);
      this._planes = null;
    }
  }
  createPlanes(curtains) {
    // create our plane
    if(curtains) {
      this._planes = curtains.addPlane(this.planeElement, planeParams);
      this._planes.onRender(function() {
        this.uniforms.time.value++;
      });

    }
  }
// register our plane element ref
  registerPlaneElement(el) {
    this.planeElement = el;
  }

  render() {

    return (
        <div
            className="curtain"
            ref={(el) => this.registerPlaneElement(el)}
        >
          <img src={image} alt={"image"}/>
        </div>
    );
  }
}
class App extends Component {

  constructor( props ) {
    super(props);

    this.state = {
      curtains: null
    };
  }

  componentDidMount() {
    let curtains = new Curtains("canvas");
    this.setState({ curtains: curtains });
  }

  render() {
    let curtains = this.state.curtains;
    console.log("start",curtains)
    return (
              <div className="App">
                    <div id="canvas" />
                    <CurtainsPage curtains={curtains}/>
                    <div className="buttonback">sdfsdf</div>
              </div>
    );
  }
}
export default App;
