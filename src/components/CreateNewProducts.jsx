import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

import Modal from "./Modal";
import Loader from './Loader';
import Error from './Error';

import createnewProduct from '../services/product/createNewProduct';

export default function CreateNewProducts({ onClose, onSuccess }) {

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorOpen, setIsErrOpen] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(''); 
  const [stock, setStock] = useState('');
  const [rating, setRating] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!name || !description || !price || !stock || !rating || !image) {
      setError('Please fill all the fields!');
      return;
    }
    try {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('stock', stock);
      formData.append('rating', rating);
      formData.append('image', image);

      setLoading(true);
      const newProduct = await createnewProduct(formData);
      console.log(newProduct);
      onSuccess && onSuccess(newProduct);
      onClose && onClose();
    } catch (error) {
      setErrorMessage(error.message);
      setIsErrOpen(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      { loading && <Loader /> }
      { isErrorOpen && <Error error={errorMessage} onClose={() => setIsErrOpen(false)} /> }
      <Modal>
        <p className='border-bottom fw-bold fs-5 m-0 p-3' >Edit Profile</p>

        <form
          onSubmit={handleSubmit}
          className='p-3'
        >
          <input 
            className="form-control mb-4"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea 
            rows={5}
            className='w-full form-control mb-4'
            placeholder='description'
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <input 
            className="form-control mb-4"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input 
            className="form-control mb-4"
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <input 
            className="form-control mb-4"
            type="number"
            placeholder="Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />

          { 
            image ? <img 
              src={URL.createObjectURL(image)}
              alt="UploadedImage" 
              style={{ width: '98%', margin: '1%', maxHeight: '10rem', objectFit: 'contain'}}
              className='mb-3'
            /> : 
            <div className='position-relative mx-3 mb-3' style={{ height: '1.25rem', width: '1.25rem' }}>
              <input 
                type="file" 
                alt='Upload Image'
                style={{ height: '100%', width: '100%', zIndex: 20, opacity: 0}}
                onChange={(e) => {
                  if(e.target.files.length > 0) {
                    setImage(e.target.files[0]);
                  }
                }}
                className='top-0 start-0 position-absolute'
                src='https://w7.pngwing.com/pngs/527/625/png-transparent-scalable-graphics-computer-icons-upload-uploading-cdr-angle-text-thumbnail.png'  
              />

              <FontAwesomeIcon 
                icon={faImage} 
                color='black'
                style={{ height: '100%', width: '100%', zIndex: 10 }}
                className='position-absolute top-0 start-0'
              />
            </div>
          }
          {
            error && <p className='text-danger px-3'>{error}</p>
          }
          <div className='d-flex justify-content-end align-items-center border-top p-2 gap-3'>
            <button type="button" onClick={() => onClose && onClose()} className="btn btn-secondary">Cancel</button>
            <button type='submit' className='btn btn-primary'>Create</button>
          </div>
        </form>
      </Modal>
    </>
  )
}
