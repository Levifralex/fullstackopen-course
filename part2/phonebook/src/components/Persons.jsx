import PropTypes from 'prop-types';

const Persons = ({ persons, handleRemove }) => {
    return(
        <div>
            {persons.map(person => (
                <p key={person.id}>
                    {person.name} - {person.number}
                    <button onClick={() => handleRemove(person.id, person.name)}>delete</button>
                </p>
            ))}
        </div>
    )
};

Persons.propTypes = {
  persons: PropTypes.array,
  handleRemove: PropTypes.func
};

export default Persons;