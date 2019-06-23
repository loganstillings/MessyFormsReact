import React from 'react';

function SaveButton(props) {
    return (
        <button className="spaced btn btn-primary" onClick={props.onSave}>
            Save Form
        </button>
    );
}

export default SaveButton;
