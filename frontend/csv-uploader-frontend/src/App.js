import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/records/');
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please select a CSV file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/api/upload-csv/', formData);
      setMessage(response.data.message);
      fetchRecords();
    } catch (error) {
      setMessage('An error occurred while uploading the file');
    }
  };

  return (
    <div>
      <h1>CSV Uploader</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
      <h2>Records</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>School</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.name}</td>
              <td>{record.class_name}</td>
              <td>{record.school}</td>
              <td>{record.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;