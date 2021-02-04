import React from 'react';
import ImageIcon from '@material-ui/icons/Image';
import { Button } from '@material-ui/core';
interface Props {
  inputImage: React.RefObject<HTMLInputElement>;
  handleChange: () => void;
  currentPhoto: string;
}

const ImageUploadButton: React.FC<Props> = (props) => {
  return (
    <div className='image-container'>
      <img src={props.currentPhoto} className='image-preview' />
      <Button variant='outlined' component='label' color='secondary' endIcon={<ImageIcon />}>
        Nowe zdjęcie
        <input type='file' style={{ display: 'none' }} accept='image/png' ref={props.inputImage} onChange={props.handleChange} />
      </Button>
    </div>
  );
};

export default ImageUploadButton;
