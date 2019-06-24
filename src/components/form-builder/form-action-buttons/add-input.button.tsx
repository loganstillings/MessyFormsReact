import React from 'react';

interface AddInputButtonProps {
    onInputAdded: () => void;
}

function AddInputButton(props: AddInputButtonProps) {
    return (
        <button
            className="spaced btn btn-secondary"
            onClick={props.onInputAdded}
        >
            Add Input
        </button>
    );
}

export default AddInputButton;
