import { auth } from '@clerk/nextjs/server';
import React from 'react'
import NoteForm from '@/components/shared/NoteForm';

const UpdateNote = () => {
    const { sessionClaims } = auth();

    const userId = sessionClaims?.userId as string;
    
  return (
    <>
        <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <h3 className="wrapper h3-bold text-center sm:text-left">Update Notes</h3>
        </section>

        <div className="wrapper my-8">
            <NoteForm userId={userId} type="Update" />
        </div>
    </>
  )
}

export default UpdateNote