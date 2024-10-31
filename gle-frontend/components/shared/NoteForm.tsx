'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { createNote, updateNote } from "@/lib/actions/note.actions";
import { INote } from "@/lib/database/models/note.model";
import { noteFormSchema } from "@/lib/validator";
import * as z from 'zod'
import { noteDefaultValues } from "@/constants";
import Dropdown from "./Dropdown";
import useState from 'react'


type NoteFormProps = {
  userId: string;
  type: "Create" | "Update";
  note?: INote;
  noteId?: string;
};

const NoteForm = ({ userId, type, note, noteId }: NoteFormProps) => {
  const initialValues = note && type === 'Update' 
    ? { 
      ...note,
      subject: note.subject._id, // Transform subject to its _id
    }
    : noteDefaultValues;
  const router = useRouter();

  const form = useForm<z.infer<typeof noteFormSchema>>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: initialValues
  });

  async function onSubmit(values: z.infer<typeof noteFormSchema>) {
    if (type === 'Create') {
      try {
        const newNote = await createNote({
          note: { ...values, difficulty: values.difficulty ?? 'beginner', },
          userId, 
          path: '/profile',
        });

        if (newNote) {
          form.reset();
          router.push(`/notes/${newNote._id}`)
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
          note: { ...values, difficulty: values.difficulty ?? 'beginner', _id: noteId },
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
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Note title" {...field} className="input-field"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subjectId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown onChangeHandler={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-72">
                    <Textarea placeholder="Content" {...field} className="textarea rounded-2xl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Difficulty</FormLabel>
                <FormControl>
                  <Input placeholder="Difficulty" {...field} className="input-field"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        

        <Button 
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? (
            'Submitting...'
          ): `${type} Note `}</Button>
      </form>
    </Form>
  );
};

export default NoteForm;