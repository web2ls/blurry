import { Component } from 'preact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faCut, faWindowClose, faSave } from '@fortawesome/free-solid-svg-icons';

export default class Toolbar extends Component {
  render() {
    return (
      <div class="toolbar">
        <input id="file" type="file" accept=".jpg,  .jpeg, .png" onChange={this.props.selectFileHandler} />

        <div class="toolbar-item">
          <label for="file" title="Select image from disk">
            <FontAwesomeIcon icon={faFolderOpen} color='white' size='2x' />
          </label>
        </div>

        <div class={`toolbar-item ${this.props.isToolActive ? 'active-tool' : ''}`}>
          <div class="cut-tool-btn" onClick={this.props.toggleTool} title="Activate tool">
            <FontAwesomeIcon icon={faCut} color='white' size='2x' />
          </div>
        </div>

        <div class="toolbar-item" title="clear image" onClick={this.props.clearImage}>
          <FontAwesomeIcon icon={faWindowClose} color='white' size='2x' />
        </div>

        <div class="toolbar-item" title="save image to disk" onClick={this.props.saveImage}>
          <a id="download-image" download="edited_image.png">
            <FontAwesomeIcon icon={faSave} color='white' size='2x' />
          </a>
        </div>
      </div>
    )
  }
};