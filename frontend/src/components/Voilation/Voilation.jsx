import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';


const Voilation = () => {

  const [file, setFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('selectedOption', selectedOption);

    try {
      await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image uploaded and data saved to MongoDB');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };



  return (
    <div>
     
    
      <h1>Image Upload and MongoDB</h1>
      <Form>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Choose an image</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Select an option</Form.Label>
          <Form.Control as="select" onChange={handleSelectChange}>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={handleUpload}>
          Upload Image
        </Button>
      </Form>


    </div>
  )
}

export default Voilation