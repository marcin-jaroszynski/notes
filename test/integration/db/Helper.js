import CategorySchema from '../../../server/db/models/category';
import NoteSchema from '../../../server/db/models/note';

export default function clearDb() {
  CategorySchema.remove({}).exec();
  NoteSchema.remove({}).exec();
}