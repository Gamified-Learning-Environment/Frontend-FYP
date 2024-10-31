"use server"

import { CreateSubjectParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import Subject from "../database/models/subject.model"

export const createSubject = async ({ subjectName }: CreateSubjectParams) => {
  try {
    await connectToDatabase();

    const newSubject = await Subject.create({ name: subjectName });

    return JSON.parse(JSON.stringify(newSubject));
  } catch (error) {
    handleError(error)
  }
}

export const getAllSubjects = async () => {
  try {
    await connectToDatabase();

    const subjects = await Subject.find();

    return JSON.parse(JSON.stringify(subjects));
  } catch (error) {
    handleError(error)
  }
}