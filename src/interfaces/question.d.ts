import { ISubInput } from './sub-input';

export interface IQuestion {
    Id: number;
    Question: string;
    QuestionType: string;
    SubInputs: ISubInput[];
}
