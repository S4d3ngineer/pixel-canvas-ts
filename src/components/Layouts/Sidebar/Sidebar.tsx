import { downloadAsPNG } from '@/services/Download.service';
import { useState } from 'react';
import s from './Sidebar.module.scss';

interface Props {
  handleSizeChange: any; // TODO
  handleClear: any;
  pixelBlocks: string[][];
  width: number;
  height: number;
  blockSize: number;
}

function Sidebar(props: Props) {
  const [downloadPngDisabled, setDownloadPngDisabled] = useState(false);

  function handleDownloadClick() {
    setDownloadPngDisabled(true);
    const { pixelBlocks, width, height, blockSize } = props;
    const pixelData = {
      pixelBlocks,
      width,
      height,
      blockSize,
    };
    setTimeout(downloadAsPNG.bind(null, pixelData), 0);
    setTimeout(setDownloadPngDisabled.bind(null, false), 0);
  }

  return (
    <div className={s.container}>
      <form className={s.sizeForm} onSubmit={props.handleSizeChange}>
        <label htmlFor='width-input'>Width: </label>
        <input type='number' name='width' id='width-input' min='1' max='4000' />
        <label htmlFor='height-input'>Height: </label>
        <input
          type='number'
          name='height'
          id='height-input'
          min='1'
          max='4000'
        />
        <input className='btn--primary' type='submit' value='Set size' />
      </form>
      <button className='btn--primary' onClick={props.handleClear}>
        Clear
      </button>
      <button
        className='btn--primary'
        id={s.saveImg}
        onClick={handleDownloadClick}
        disabled={downloadPngDisabled}
      >
        {downloadPngDisabled ? 'Saving file' : 'Save as .png'}
      </button>
    </div>
  );
}

export default Sidebar;
