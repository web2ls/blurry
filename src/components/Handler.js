import '../style';
import { Component } from 'preact';

export default class Handler extends Component {
  render() {
    return (
      <div class="content">
        <canvas id="canvas" width="800" height="600"></canvas>
      </div>
    )
  }
};
