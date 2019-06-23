function getDefaultConditionValue(parentQuestion) {
    let defaltConditionValue = '';
    switch (parentQuestion.QuestionType) {
        case 'YesNo':
            defaltConditionValue = 'Yes';
            break;
        case 'Number':
            defaltConditionValue = 0;
            break;
        default:
            defaltConditionValue = '';
            break;
    }
    return defaltConditionValue;
}

export default getDefaultConditionValue;
