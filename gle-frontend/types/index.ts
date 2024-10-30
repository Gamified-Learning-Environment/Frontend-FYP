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
      subject: string;
      tags: string[];
      difficulty: 'beginner' | 'intermediate' | 'expert';
    };
  };
  
  export type UpdateNoteParams = {
    note: {
      _id: string;
      title: string;
      content: string;
      subject: string;
      tags: string[];
      difficulty: 'beginner' | 'intermediate' | 'expert';
    };
  };
  
  export type DeleteNoteParams = {
    noteId: string;
    path: string;
  };
  
  export type GetAllNotesParams = {
    userId: string;
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
  
  export type Note = {
    _id: string;
    title: string;
    content: string;
    subject: string;
    tags: string[];
    createdAt: Date;
    difficulty: 'beginner' | 'intermediate' | 'expert';
    user: {
      _id: string;
      firstName: string;
      lastName: string;
    };
  };
  
  // ====== CATEGORY PARAMS
  export type CreateCategoryParams = {
    categoryName: string
  }
  
  export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }