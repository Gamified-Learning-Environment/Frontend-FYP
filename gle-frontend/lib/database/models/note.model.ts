import { Document, Schema, model, models } from 'mongoose';

export interface INote extends Document {
  _id: string;
  title: string;
  content: string;
  subject: string;
  tags: string[];
  createdAt: Date;
  dificulty?: 'beginner' | 'intermediate' | 'expert';
  user: { _id: string; firstName: string; lastName: string };
}

const NoteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  subject: { type: String, required: true },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'expert'] },
  user: {
    _id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
});

const Note = models.Note || model('Note', NoteSchema);

export default Note;