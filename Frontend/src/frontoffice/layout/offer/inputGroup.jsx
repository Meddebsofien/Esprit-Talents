import React from "react";
import classnames from "classnames";
import "../../../backoffice/pages/new/new.scss";

function InputGroup({ label, type, name, onChangeHandler, errors, value }) {
  return (
    <div>
      <label className="form-label">{label}</label>
      {type === "select" && ( // Si le type est un select, afficher le select
        <select
          value={value}
          className={classnames("form-control", { "is-invalid": errors })}
          name={name}
          onChange={onChangeHandler}
        >
          <option value="">Sélectionnez un type</option>
          <option value="Stage">Stage</option>
          <option value="Emploi">Emploi</option>
        </select>
      )}
      {type === "textarea" && ( // Si le type est un textarea, afficher le textarea
        <textarea
          value={value}
          className={classnames("form-control", { "is-invalid": errors })}
          name={name}
          rows={4}
          cols={6}
          onChange={onChangeHandler}
        />
      )}

      {type !== "select" &&
        type !== "textarea" && ( // Si le type n'est ni select ni textarea, afficher un input
          <input
            type={type}
            value={value}
            className={classnames("form-control", { "is-invalid": errors })}
            name={name}
            onChange={onChangeHandler}
          />
        )}

      {errors && <div className="invalid-feedback">{errors}</div>}
    </div>
  );
}

export default InputGroup;
