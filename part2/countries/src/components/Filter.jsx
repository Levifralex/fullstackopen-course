import PropTypes from "prop-types";

const Filter = ({ value, onChange }) => {
	return (
		<div className="searchContainer">
			<span className="searchInputText">Find countries:</span>
			<input className="searchInput" value={value} onChange={onChange} />
		</div>
	);
};

Filter.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func,
};

export default Filter;
