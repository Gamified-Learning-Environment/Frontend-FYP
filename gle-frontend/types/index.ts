// ====== USER PARAMS
export type CreateUserParams = {
    clerkId: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    photo: string;
  };
  
  export type UpdateUserParams = {
    firstName: string;
    lastName: string;
    username: string;
    photo: string;
  };
  
  // ====== NOTE PARAMS
  export type CreateNoteParams = {
    userId: string;
    note: {
      title: string;
      content: string;
      subjectId: string;
      difficulty: 'beginner' | 'intermediate' | 'expert';
    };
    path: string;
  };
  
  export type UpdateNoteParams = {
    userId: string;
    note: {
      _id: string;
      title: string;
      content: string;
      subjectId: string;
      difficulty: 'beginner' | 'intermediate' | 'expert';
    };
    path: string;
  };
  
  export type DeleteNoteParams = {
    noteId: string;
    path: string;
  };
  
  export type GetAllNotesParams = {
    query: string;
    subject: string;
    limit: number;
    page: number;
  };
  
  export type GetNotesByUserParams = {
    userId: string;
    limit?: number;
    page: number;
  };

  export type GetRelatedNotesBySubjectParams = {
    subjectId: string
    noteId: string
    limit?: number
    page: number | string
  }
  
  export type Note = {
    _id: string;
    title: string;
    content: string;
    difficulty: 'beginner' | 'intermediate' | 'expert';
    noteOwner: {
      _id: string;
      firstName: string;
      lastName: string;
    };
    subject: {
      _id: string;
      name: string;
    };
  };
  
  // ====== SUBJECT PARAMS
  export type CreateSubjectParams = {
    subjectName: string
  }
  
  export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }