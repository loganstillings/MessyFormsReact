import React from 'react';

import AddInputButton from './add-input.button';
import SaveButton from './save-button';

interface IFormActionButtonsProps {
    onInputAdded: () => void;
    onSave: () => void;
}

function FormActionButtons(props: IFormActionButtonsProps) {
    return (
        <div className="row padded">
            <AddInputButton onInputAdded={props.onInputAdded} />
            <SaveButton onSave={props.onSave} />
        </div>
    );
}

export default FormActionButtons;
