import React from 'react';
import classnames from 'classnames';
import "../../../backoffice/pages/new/new.scss";

function InputGroup({ label, type, name, onChangeHandler, errors, value }) {
  return (
    <div>
      <label className="form-label">
        {label}
      </label>
      {type === 'textarea' ? ( // Vérifiez si le type est un textarea
        <textarea
          value={value}
          className={classnames('form-control', {
            'is-invalid': errors && errors[name] // Ajoute la classe 'is-invalid' si des erreurs sont présentes pour ce champ
          })}
          name={name}
          onChange={onChangeHandler}
        />
      ) : (
        <input
          type={type}
          value={value}
          className={classnames('form-control', {
            'is-invalid': errors && errors[name] // Ajoute la classe 'is-invalid' si des erreurs sont présentes pour ce champ
          })}
          name={name}
          onChange={onChangeHandler}
        />
      )}
      {/* Afficher les erreurs si elles sont présentes */}
      {errors && errors[name] && (
        <div className="invalid-feedback">
          {errors[name]} {/* Affiche le message d'erreur spécifique pour ce champ */}
        </div>
      )}
    </div>
  );
}

export default InputGroup;
