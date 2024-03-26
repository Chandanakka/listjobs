import React, { useState } from 'react';
import axios from 'axios';
import './MyForm.css';

const YourComponent = () => {
  // State variables using the useState hook
  const [data, setData] = useState([]);

  // Function to fetch data from the server based on start and end dates
  const fetchData = async () => {
    try {
//      const response = await axios.get(`http://192.168.0.179:8088//api/jobslist?startDate=${startDate}&endDate=${endDate}`);
      const response = await axios.get(`http://192.168.0.179:8088/api/jobslist`);
      let responseData = response.data;

      // Sort the data in descending order based on the date
      responseData = responseData.sort((a, b) => new Date(b.gldate) - new Date(a.gldate));

      // Set state with the sorted and fetched data
      setData(responseData);

      // Calculate the grand total from the fetched data

    } catch (error) {
      // Handle errors during data fetching
      console.error('Error fetching data:', error);
    }
  };

  // Helper function to format date in a readable way
    const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to fetch and display image data based on voucher number

  // Component rendering
  return (
    <div className="accounts-payables">
      {/* Section for date inputs and fetch button */}
      <h2>JOBS LIST</h2>
      <button onClick={fetchData}>Fetch Data</button>

      {/* Table to display fetched data */}
      <table>
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Entry Date</th>
            <th>Job Creator</th>
            <th>Job Type</th>
            <th>Job Role</th>
            <th>Skills</th>
            <th>E-Mail</th>
            <th>Status</th>
            <th>Closure Date</th>
            <th>Reference Result</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through the data to render rows */}
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{formatDate(item.jobentrydate)}</td>
              <td>{item.jobcreator}</td>
              <td>{item.jobtype}</td>
              <td>{item.jobrole}</td>
              <td>{item.jobskillsrequired}</td>
              <td>{item.jobapplyemail}</td>
              <td>{item.jobcurrentstatus}</td>
              <td>{item.jobclosedate}</td>
              <td>{item.jobrefresult}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default YourComponent;
