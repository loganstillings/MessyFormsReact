import React from 'react';

import AddInputButton from './add-input.button';
import SaveButton from './save-button';

interface FormActionButtonsProps {
    onInputAdded: () => void;
    onSave: () => void;
}

function FormActionButtons(props: FormActionButtonsProps) {
    return (
        <div className="row padded">
            <AddInputButton onInputAdded={props.onInputAdded} />
            <SaveButton onSave={props.onSave} />
        </div>
    );
}

export default FormActionButtons;
