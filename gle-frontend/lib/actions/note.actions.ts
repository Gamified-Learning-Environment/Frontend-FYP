'use server'

import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/database'
import Note from '@/lib/database/models/note.model'
import User from '@/lib/database/models/user.model'
import Subject from '@/lib/database/models/subject.model'
import { handleError } from '@/lib/utils'

import {
  CreateNoteParams,
  UpdateNoteParams,
  DeleteNoteParams,
  GetAllNotesParams,
  GetNotesByUserParams,
  GetRelatedNotesBySubjectParams
} from '@/types'

const getSubjectByName = async (name: string) => {
  return Subject.findOne({ name: { $regex: name, $options: 'i' } })
}

const populateNote = (query: any) => {
  return query
    .populate({ path: 'noteOwner', model: User, select: '_id firstName lastName' })
    .populate({ path: 'subject', model: Subject, select: '_id name' })
}

// CREATE
export async function createNote({ userId, note, path }: CreateNoteParams) {
  try {
    await connectToDatabase()

    const noteOwner = await User.findById(userId)
    if (!noteOwner) throw new Error('NoteOwner not found')

    const newNote = await Note.create({ ...note, subject: note.subjectId, noteOwner: userId })    
    revalidatePath(path)

    return JSON.parse(JSON.stringify(newNote))
  } catch (error) {
    console.log(error)
    handleError(error)
  }
}

// UPDATE
export async function updateNote({ userId, note, path }: UpdateNoteParams) {
  try {
    await connectToDatabase()

    const noteToUpdate = await Note.findById(note._id)
    if (!noteToUpdate || noteToUpdate.user.toHexString() !== userId) {
      throw new Error('Unauthorized or note not found')
    }

    const updatedNote = await Note.findByIdAndUpdate(
      note._id,
      { ...note, subject: note.subjectId },
      { new: true }
    )
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedNote))
  } catch (error) {
    handleError(error)
  }
}

// DELETE
export async function deleteNote({ noteId, path }: DeleteNoteParams) {
  try {
    await connectToDatabase()

    const deletedNote = await Note.findByIdAndDelete(noteId)
    if (deletedNote) revalidatePath(path)
  } catch (error) {
    handleError(error)
  }
}

// GET ONE NOTE BY ID
export async function getNoteById(noteId: string) {
  try {
    await connectToDatabase()

    const note = await populateNote(Note.findById(noteId))

    if (!note) throw new Error('Note not found')

    return JSON.parse(JSON.stringify(note))
  } catch (error) {
    handleError(error)
  }
}

// GET ALL NOTES
export async function getAllNotes({ query, limit = 10, page, subject}: GetAllNotesParams) {
  try {
    await connectToDatabase()

    const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
    const subjectCondition = subject ? await getSubjectByName(subject) : null
    const conditions = {
      $and: [titleCondition, subjectCondition ? { subject: subjectCondition._id } : {}],
    }

    const skipAmount = (Number(page) - 1) * limit
    const notesQuery = Note.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const notes = await populateNote(notesQuery)
    const notesCount = await Note.countDocuments(conditions)

    return {
      data: JSON.parse(JSON.stringify(notes)),
      totalPages: Math.ceil(notesCount / limit),
    }
  } catch (error) {
    handleError(error)
  }
}

// GET NOTES BY NOTE OWNER
export async function getNotesByUser({ userId, limit = 10, page }: GetNotesByUserParams) {
  try {
    await connectToDatabase()

    const conditions = { noteOwner: userId }
    const skipAmount = (page - 1) * limit

    const notesQuery = Note.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const notes = await populateNote(notesQuery)
    const notesCount = await Note.countDocuments(conditions)

    return { 
      data: JSON.parse(JSON.stringify(notes)), 
      totalPages: Math.ceil(notesCount / limit) 
    }
  } catch (error) {
    handleError(error)
  }
}

// GET RELATED NOTES: NOTES WITH SAME SUBJECT
export async function getRelatedNotesBySubject({
  subjectId,
  noteId,
  limit = 3,
  page = 1,
}: GetRelatedNotesBySubjectParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { $and: [{ subject: subjectId }, { _id: { $ne: noteId } }] }

    const notesQuery = Note.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const notes = await populateNote(notesQuery)
    const notesCount = await Note.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(notes)), totalPages: Math.ceil(notesCount / limit) }
  } catch (error) {
    handleError(error)
  }
}