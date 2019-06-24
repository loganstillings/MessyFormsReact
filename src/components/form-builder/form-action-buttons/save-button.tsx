import React from 'react';

interface SaveButtonProps {
    onSave: () => void;
}

function SaveButton(props: SaveButtonProps) {
    return (
        <button className="spaced btn btn-primary" onClick={props.onSave}>
            Save Form
        </button>
    );
}

export default SaveButton;
