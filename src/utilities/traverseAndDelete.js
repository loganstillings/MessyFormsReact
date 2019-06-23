function traverseAndDelete(layers, question) {
    if (layers.length === 1) {
        question.SubInputs.splice(layers[0], 1);
    } else {
        let nestedQuestion = question.SubInputs[layers[0]];
        layers.splice(0, 1);
        traverseAndDelete(layers, nestedQuestion);
    }
}

export default traverseAndDelete;
