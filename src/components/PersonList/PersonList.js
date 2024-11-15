import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './PersonList.css';

const PersonCard = memo(({ person }) => (
  <div className="card mb-4">
    <div className="row g-0 align-items-center">
      <div className="col-md-3 text-center">
        <img src={person.picture.large} alt={`${person.name.first} ${person.name.last}`} className="img-fluid rounded-circle" />
        <button className="btn btn-primary-custom btn-sm mt-3">Details</button>
      </div>
      <div className="col-md-9">
        <div className="card-body">
          <h5 className="card-title text-primary">{person.name.first} {person.name.last}</h5>
          <p className="card-text text-secondary">
            <strong>Gender:</strong> {person.gender}<br />
            <strong>Timezone:</strong> {person.location.timezone.description}<br />
            <strong>Address:</strong> {person.location.street.number} {person.location.street.name}, {person.location.city}, {person.location.state}, {person.location.country} {person.location.postcode}<br />
            <strong>Email:</strong> {person.email}<br />
            <strong>Birthdate:</strong> {new Date(person.dob.date).toLocaleDateString()}, {person.dob.age} years old<br />
            <strong>Registered:</strong> {new Date(person.registered.date).toLocaleDateString()}<br />
            <strong>Phone:</strong> {person.phone}<br />
            <strong>Cell:</strong> {person.cell}
          </p>
        </div>
      </div>
    </div>
  </div>
));

PersonCard.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.shape({
      first: PropTypes.string.isRequired,
      last: PropTypes.string.isRequired
    }).isRequired,
    picture: PropTypes.shape({
      large: PropTypes.string.isRequired
    }).isRequired,
    gender: PropTypes.string.isRequired,
    location: PropTypes.shape({
      timezone: PropTypes.shape({
        description: PropTypes.string.isRequired
      }).isRequired,
      street: PropTypes.shape({
        number: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      }).isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      postcode: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired
    }).isRequired,
    email: PropTypes.string.isRequired,
    dob: PropTypes.shape({
      date: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired
    }).isRequired,
    registered: PropTypes.shape({
      date: PropTypes.string.isRequired
    }).isRequired,
    phone: PropTypes.string.isRequired,
    cell: PropTypes.string.isRequired
  }).isRequired
};

const PersonList = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const { data } = await axios.get('https://randomuser.me/api/?results=10');
        setPersons(data.results);
      } catch (error) {
        console.error('Error fetching persons:', error);
      }
    };
    fetchPersons();
  }, []);

  return (
    <div className="container my-5 p-4 border rounded bg-light-blue">
      <h1 className="text-center mb-5 bg-primary text-light p-3">User Lists</h1>
      {persons.map(person => (
        <PersonCard key={person.login.uuid} person={person} />
      ))}
    </div>
  );
};

export default PersonList;