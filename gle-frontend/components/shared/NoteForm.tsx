'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { useRouter } from "next/navigation";
import { createNote, updateNote } from "@/lib/actions/note.actions";
import { INote as INoteData } from "@/lib/database/models/note.model";
import { noteFormSchema } from "@/lib/validator";
import * as z from 'zod'

type NoteFormProps = {
  userId: string;
  type: "Create" | "Update";
  note?: INoteData;
  noteId?: string;
};

const NoteForm = ({ userId, type, note, noteId }: NoteFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof noteFormSchema>>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: note && type === 'Update' ? note : { title: '', content: '', tags: [], generateQuiz: false },
  });

  async function onSubmit(values: z.infer<typeof noteFormSchema>) {
    if (type === 'Create') {
      try {
        const newNote = await createNote({
          note: values,
          userId,
          path: '/notes',
        });

        if (newNote) {
          form.reset();
          router.push(`/notes/${newNote._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === 'Update') {
      if (!noteId) {
        router.back();
        return;
      }

      try {
        const updatedNote = await updateNote({
          userId,
          note: { ...values, _id: noteId },
          path: `/notes/${noteId}`,
        });

        if (updatedNote) {
          form.reset();
          router.push(`/notes/${updatedNote._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Note title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Note content" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="Comma-separated tags" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Subject" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className="button col-span-2 w-full">
          {form.formState.isSubmitting ? 'Submitting...' : `${type} Note`}
        </Button>
      </form>
    </Form>
  );
};

export default NoteForm;