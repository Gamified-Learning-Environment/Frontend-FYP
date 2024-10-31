import  { Document, Schema, model, models} from "mongoose";

export interface ISubject extends Document {
    _id: string;
    name: string;
}

const SubjectSchema = new Schema({
    name: {type: String, required: true, unique: true },
})

const Subject = models.Subject || model('Subject', SubjectSchema);

export default Subject;