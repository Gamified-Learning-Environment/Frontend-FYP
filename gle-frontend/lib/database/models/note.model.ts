import { Document, Schema, model, models } from 'mongoose';

export interface INote extends Document {
  _id: string;
  title: string;
  content: string;
  dificulty?: 'beginner' | 'intermediate' | 'expert';
  subject: { _id: string, name: string };
  noteOwner: { _id: string; firstName: string; lastName: string, photo: string };
}

const NoteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'expert'] },
  subject: { type: Schema.Types.ObjectId, ref: 'Subject' },
  noteOwner: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Note = models.Note || model('Note', NoteSchema);

export default Note;