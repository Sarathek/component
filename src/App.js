import React, { useState } from 'react';
import './App.css';

const CarOptions = [
  {
    model: "Swift",
    price: "5,00,000",
    maker: "Maruti Suzuki",
    cost: "Economic",
    km: "50,000"
  },
  {
    model: "Baleno",
    price: "7,50,000",
    maker: "Maruti Suzuki",
    cost: "Mid-range",
    km: "35,000"
  },
  {
    model: "Benz GLC",
    price: "65,00,000",
    maker: "Mercedes Benz",
    cost: "Premium",
    km: "15,000"
  },
];


function App() {
const initialFormData = {
    firstname: "",
    lastname: "",
    mobilenumber: "",
    gender: "",
    carbrand: "",
    cartype: "",
    pricerange: "",
    acceptTerms: false,
  };

const [formData, setFormData] = useState(initialFormData);
const [selectedCarIndex, setSelectedCarIndex] = useState(null);
const [savedId, setSavedId] = useState(null);
const [data, setData] = useState({});

 

const handleChange = (event) => {
const { name, value, type, checked } = event.target;
const inputValue = type === 'checkbox' ? checked : value;
setFormData((prevData) => ({
...prevData,
[name]: inputValue,
}));
};

 

const handleSubmit = async (event) => {
event.preventDefault();
try {
  const response = await fetch('http://localhost:5500/submit', {
  method: 'POST',
  headers: {
  'Content-Type': 'application/json',
  },
  body: JSON.stringify({
  ...formData,
  selectedCar: CarOptions[selectedCarIndex],
  }),
});

 
if (!response.ok) {
throw new Error('Error saving form data');
}
const responseData = await response.json();
setSavedId(responseData.id);
console.log('Form data submitted:', responseData);
setFormData(initialFormData);
setSelectedCarIndex(null);
} catch (error) {
console.error('An error occurred:', error);
}
};

 

const handleCarSelection = (index) => {
setSelectedCarIndex(index);
};
const handleViewClick = async () => {
if (savedId) {
try {
const response = await fetch(`http://localhost:5500/data?id=${savedId}`);
const fetchedData = await response.json();
setData(fetchedData);
console.log(Object.entries(fetchedData));
} catch (error) {
console.error('Error fetching data:', error);
}
}
};

  

return (
    <div>
      <h1>Pre Owned Car Enquiry Form</h1>
      <h2>Personal Details</h2>
      <form onSubmit={handleSubmit}>
  
        <div>
          <label>First Name :*</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div> <br/>
  
        <div>
          <label>Last Name :</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
        </div> <br/>
  
        <div>
          <label>Mobile Number :*</label>
          <input
            type="tel"
            name="mobilenumber"
            value={formData.mobilenumber}
            onChange={handleChange}
            required
          />
        </div> <br/>
  
          <div>
           <label>Gender :*</label> 
          </div>
        <div>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={formData.gender === "male"}
            onChange={handleChange}
            required
          />
          Male
          <input
            type="radio"
            name="gender"
            value="female"
            checked={formData.gender === "female"}
            onChange={handleChange}
          />
          Female
          <input
            type="radio"
            name="gender"
            value="others"
            checked={formData.gender === "others"}
            onChange={handleChange}
          />
          Others
        </div> <br/>
  
        <h2>Car Details</h2>
        <div>
          <label>Car Brand :</label>
          <select
            name="carbrand"
            value={formData.carbrand}
            onChange={handleChange}
          >
            <option value="">--Select--</option>
            <option value="maruti">Maruti Suzuki</option>
            <option value="ford">Ford</option>
            <option value="nissan">Nissan</option>
            <option value="nissan">Benz</option>
            <option value="nissan">BMW</option>
            <option value="nissan">Tata</option>
            <option value="nissan">Others</option>
          </select>
        </div> <br/>
  
        <div>
          <label>Car Type :</label>
          <select
            name="cartype"
            value={formData.cartype}
            onChange={handleChange}
          >
            <option value="">--Select--</option>
            <option value="suv">Premium</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="hatchback">Hatchback</option>
          </select>
        </div> <br/>
  
        <div>
          <label>Price Range :</label>
          <select
            name="pricerange"
            value={formData.pricerange}
            onChange={handleChange}
          >
            <option value="">--Select--</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div> <br/>


      <div className="list">
  <h2>Select Available Cars</h2>
{CarOptions.map((car, index) => (
    <label key={index} className="car-card">
      <input
        type="radio"
        name="selectedCarIndex"
        value={index}
        checked={selectedCarIndex === index}
        onChange={() => handleCarSelection(index)}
      />
      <h3>{car.model}</h3>
      <p>Price: {car.price}</p>
      <p>Maker: {car.maker}</p>
      <p>Cost: {car.cost}</p>
      <p>Kilometer: {car.km}</p>
    </label>
  ))}
</div>
  
        <div>
          <label>
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              required
            />
            I accept the terms & conditions
            <br></br><small>The provision of personal information to our website will remain voluntary. Such<br></br> 
            information wiil not be disclosed to third parties without your express consent</small>
          </label>
        </div> <br/>

         <button type="submit">Submit</button>
         {savedId && <p>Form Data: {savedId}</p>}
       </form>
       <button onClick={handleViewClick} disabled={!savedId}>View Data</button>
       {Object.entries(data).length > 0 && (
         <div>
           <h2>Fetched Data:</h2>
           <ul>
             {Object.entries(data).map(item => (
               <li key={item[0]}>{JSON.stringify(item, null, 2)}</li>
             ))}
           </ul>
         </div>
       )}
     </div>
   );
 }

 export default App;