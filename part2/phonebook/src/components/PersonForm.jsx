import PropTypes from "prop-types";

const PersonForm = ({
  onSubmit,
  name,
  number,
  onChangeName,
  onChangeNumber,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name:
        <input value={name} onChange={onChangeName} />
      </div>
      <div>
        number:
        <input value={number} onChange={onChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

PersonForm.propTypes = {
  onSubmit: PropTypes.func,
  name: PropTypes.string,
  number: PropTypes.string,
  onChangeName: PropTypes.func,
  onChangeNumber: PropTypes.func
};

export default PersonForm;
