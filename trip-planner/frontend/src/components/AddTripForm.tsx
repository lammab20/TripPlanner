import React, {useState, useEffect} from "react";
import { useCollection } from "@squidcloud/react";
import "./AddTripForm.css"
import {Trip} from "../types"


function AddTrip() {
    const [country, setCountry] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [countries, setCountries] = useState([]);
    const tripsCollection = useCollection<Trip>("trips")//name in database is trips and a trip looks like the type trip

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all").then((response) => {
            if(response.ok) return response.json();
        }).then((data) => {
            const countryNames = data.map((country: any) => country.name.common)
            setCountries(countryNames);
        }).catch((err) => console.log(err));
    }, []);

    const addTrip = () => {
        const tripId = crypto.randomUUID();
        tripsCollection.doc().insert({
            country,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            notes: [],
            id: tripId,
        })
    }

    return <div className="trip-container">
        <h3>Add Trip</h3>
        <div className="trip-form">
            <select value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="" disabled></option>
                {countries.sort().map((country) => 
                <option key={country} value={country}>
                    {country}
                </option>)}
            </select>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>

            <button onClick={addTrip}>Add Trip</button>
        </div>
    </div>
}

export default AddTrip;