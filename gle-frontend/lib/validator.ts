import { z } from "zod";

export const noteFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  content: z.string().min(3, 'Content must be at least 3 characters.').max(2000, 'Content must be at most 2000 characters.'), // Adjusted for possible note length
  subject: z.string().min(3, 'Subject must be at least 3 characters.'),
  tags: z.array(z.string()).optional(),
  createdAt: z.date().default(new Date()),
  difficulty: z.enum(['beginner', 'intermediate', 'expert']).optional(),
  user: z.object({
    _id: z.string(),
    firstName: z.string().min(1, 'First name is required.'),
    lastName: z.string().min(1, 'Last name is required.')
  })
});
