export const headerLinks = [
    {
      label: 'Home',
      route: '/',
    },
    {
      label: 'Create Note',
      route: '/notes/create',
    },
    {
        label: 'My Notes',
        route: '/notes',
    },
    {
      label: 'My Profile',
      route: '/profile',
    },
  ]
  
  export const noteDefaultValues = {
    title: '',
    content: '',
    subject: '',
    tags: [],
    createdAt: new Date(),
  }