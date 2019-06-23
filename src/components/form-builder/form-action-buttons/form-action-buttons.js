import React from 'react';

import AddInputButton from './add-input.button';
import SaveButton from './save-button';

function FormActionButtons(props) {
    return (
        <div className="row padded">
            <AddInputButton onInputAdded={props.onInputAdded} />
            <SaveButton onSave={props.onSave} />
        </div>
    );
}

export default FormActionButtons;
