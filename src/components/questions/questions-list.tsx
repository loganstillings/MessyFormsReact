import React from 'react';

import QuestionBase from './question-base';
import SubInputsList from './sub-inputs/sub-inputs-list';
import { ITopLevelQuestion } from '../../interfaces/top-level-question';

interface IQuestionsListProps {
    questions: ITopLevelQuestion[];
    onQuestionChanged: (
        event:
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLInputElement>,
        layeredIndex: string,
    ) => void;
    onSubInputAdded: (layeredIndex: string) => void;
    onDelete: (layeredIndex: string) => void;
}

function QuestionsList(props: IQuestionsListProps) {
    const questionsList = props.questions.map(
        (question: ITopLevelQuestion, index: number) => {
            return (
                <div key={question.Id}>
                    <div className="question-block padded">
                        <QuestionBase
                            onQuestionChanged={props.onQuestionChanged}
                            question={question}
                            layeredIndex={index.toString()}
                            onSubInputAdded={props.onSubInputAdded}
                            onDelete={props.onDelete}
                        />
                    </div>
                    {question.SubInputs && question.SubInputs.length > 0 && (
                        <SubInputsList
                            onQuestionChanged={props.onQuestionChanged}
                            subInputs={question.SubInputs}
                            layeredIndex={index.toString()}
                            parentQuestionType={question.QuestionType}
                            onSubInputAdded={props.onSubInputAdded}
                            onDelete={props.onDelete}
                        />
                    )}
                </div>
            );
        },
    );
    return <div>{questionsList}</div>;
}

export default QuestionsList;
