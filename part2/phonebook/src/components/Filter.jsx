import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) => {
    return(
        <div>
            filter shown with: 
            <input value={value} 
            onChange={onChange} />
        </div>
    )
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default Filter;