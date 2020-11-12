import '../style';
import { Component } from 'preact';

export default class Handler extends Component {
  fileHandler(event) {
    const file = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = () => {
      console.log('file has been loaded');
      const result = fileReader.result;
      console.log(result);
      const image = new Image(result);
      const url = URL.createObjectURL(file);

      image.onload = () => {
        console.log('image has beel readed');
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        canvas.setAttribute('width', image.naturalWidth);
        canvas.setAttribute('height', image.naturalHeight);

        ctx.drawImage(image, 0, 0);
        const imageData = ctx.getImageData(0, 0, image.naturalWidth, image.naturalHeight);

        const pixels = imageData.data;

        for (let i = 0; i < pixels.length; i += 4) {
          if (i > 2550 && i < 12200) {
            pixels[i] = 0;
            pixels[i + 1] = 255;
            pixels[i + 2] = 255;
          }
        }

        ctx.putImageData(imageData, 0, 0);
      }

      image.src = url;


    };

    fileReader.readAsArrayBuffer(file);
  };

  render() {
    return (
      <div>
        <input type="file" accept=".jpg,  .jpeg, .png" onChange={this.fileHandler} />
        <canvas id="canvas" width="800" height="600"></canvas>
      </div>
    )
  }
};
