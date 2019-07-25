import React from 'react';

interface ISaveButtonProps {
    onSave: () => void;
}

function SaveButton(props: ISaveButtonProps) {
    return (
        <button className="spaced btn btn-primary" onClick={props.onSave}>
            Save Form
        </button>
    );
}

export default SaveButton;
