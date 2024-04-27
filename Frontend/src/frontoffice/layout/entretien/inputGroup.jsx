import React from 'react';
import classnames from 'classnames';

function InputGroup({ label, type, name, onChangeHandler, errors, value, min }) {
  return (
    <div>
      <label className="form-label">
        {label}
      </label>
      {type === 'select' && (
        <select
          value={value}
          className={classnames('form-control', {
            'is-invalid': errors && errors[name]
          })}
          name={name}
          onChange={onChangeHandler}
        >
          <option value="">Select a type</option>
          <option value="en ligne">En ligne</option>
          <option value="en présentiel">En présentiel</option>
        </select>
      )}
      {type === 'textarea' && (
        <textarea
          value={value}
          className={classnames('form-control', {
            'is-invalid': errors && errors[name]
          })}
          name={name}
          rows={4}
          cols={6}
          onChange={onChangeHandler}
        />
      )}
      {type !== 'select' && type !== 'textarea' && (
        <input
          type={type}
          value={value}
          className={classnames('form-control', {
            'is-invalid': errors && errors[name]
          })}
          name={name}
          onChange={onChangeHandler}
          min={min} // Inject min attribute here
        />
      )}
      {errors && errors[name] && (
        <div className="invalid-feedback">
          {errors[name]}
        </div>
      )}
    </div>
  );
}

export default InputGroup;
