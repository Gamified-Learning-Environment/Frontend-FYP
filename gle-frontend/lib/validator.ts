import { z } from "zod";

export const noteFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  content: z.string().min(3, 'Content must be at least 3 characters.').max(10000, 'Content must be at most 2000 characters.'), 
  subject: z.string().min(3, 'Subject must be at least 3 characters.'),
  difficulty: z.enum(['beginner', 'intermediate', 'expert']).optional(),
  subjectId: z.string(),
});
