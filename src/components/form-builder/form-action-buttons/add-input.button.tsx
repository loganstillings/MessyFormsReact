import React from 'react';

interface IAddInputButtonProps {
    onInputAdded: () => void;
}

function AddInputButton(props: IAddInputButtonProps) {
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
