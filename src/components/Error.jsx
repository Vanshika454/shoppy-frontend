import React from 'react'
import Modal from './Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function Error({ error, onClose }) {
  return (
    <Modal zIndex={150}>
      <div className='p-3 position-relative'>
        <p className='text-center fw-semibold fs-5 mb-3'> Error </p>
        <p className='text-danger text-center m-0'>{error}</p>

        <FontAwesomeIcon 
          icon={faXmark}
          color='black'
          style={{ top: '1rem', right: '1rem' }}
          className='position-absolute'
          onClick={onClose}
        />
      </div>
    </Modal>
  )
}