import { Component } from 'preact';

export default class Toolbar extends Component {
  render() {
    return (
      <div class="toolbar">
        <input type="file" accept=".jpg,  .jpeg, .png" onChange={this.props.selectFileHandler} />
        <div>Tool selector</div>
      </div>
    )
  }
};