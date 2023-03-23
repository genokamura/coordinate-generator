import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import SelectBox from './form/selectBox';

const App: React.FC = () => {
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('10-20');
  const [occasion, setOccasion] = useState('casual');

  const genderOptions = [
    { value: 'male', label: '男性' },
    { value: 'female', label: '女性' },
  ];

  const ageOptions = [
    { value: '10-20', label: '10代' },
    { value: '20-30', label: '20代' },
    { value: '30-40', label: '30代' },
    { value: '40-50', label: '40代' },
    { value: '50-60', label: '50代' },
    { value: '60-70', label: '60代' },
    { value: '70-80', label: '70代' },
    { value: '80-90', label: '80代' },
  ];

  const occationOptions = [
    { value: 'casual', label: 'カジュアルコーディネイト' },
    { value: 'office', label: 'オフィスコーディネイト' },
    { value: 'party', label: 'パーティーコーディネイト' },
    { value: 'sports', label: 'スポーツコーディネイト' },
    { value: 'street', label: 'ストリートコーディネイト' },
  ];

  const handleGenderChange = (value: string) => {
    setGender(value);
  }

  const handleAgeChange = (value: string) => {
    setAge(value);
  }

  const handleOccasionChange = (value: string) => {
    setOccasion(value);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.get<{ imageUrl: string }>('http://localhost:5000/generate-image', {
        params: { 
          age: age,
          gender: gender,
          occasion: occasion,
          description: description,
        },
      });
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <div className="App">
      <h1>Coordinate Image Generator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Gender:
          <SelectBox value={gender} onChange={handleGenderChange} options={genderOptions} />
        </label>
        <label>
          Age:
          <SelectBox value={age} onChange={handleAgeChange} options={ageOptions} />
        </label>
        <label>
          Occasion:
          <SelectBox value={occasion} onChange={handleOccasionChange} options={occationOptions} />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <button type="submit">Generate Image</button>
      </form>
      {imageUrl && (
        <div>
          <h2>Generated Image:</h2>
          <img src={imageUrl} alt="Generated" />
        </div>
      )}
    </div>
  );
};

export default App;
