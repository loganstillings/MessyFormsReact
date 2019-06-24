import { ISubInput } from './sub-input';

export interface IQuestionBase {
    Question: string;
    QuestionType: string;
    SubInputs: ISubInput[];
}
