import React from 'react';

function AddInputButton(props) {
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
