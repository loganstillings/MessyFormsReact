function traverseArrayForNestedQuestion(layers, question) {
    if (layers.length === 1) {
        return question.SubInputs[layers[0]];
    } else {
        let nestedQuestion = question.SubInputs[layers[0]];
        layers.splice(0, 1);
        return traverseArrayForNestedQuestion(layers, nestedQuestion);
    }
}

export default traverseArrayForNestedQuestion;
