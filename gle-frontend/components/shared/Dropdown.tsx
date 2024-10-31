import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { ISubject } from "@/lib/database/models/subject.model"
  import { startTransition, useEffect, useState } from "react"
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Input } from "../ui/input"
import { createSubject, getAllSubjects } from "@/lib/actions/subject.actions"
  
  type DropdownProps = {
    value?: string
    onChangeHandler?: () => void
  }
  
  const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
    const [subjects, setSubjects] = useState<ISubject[]>([])
    const [newSubject, setNewSubject] = useState('');
  
    const handleAddSubject = () => {
      createSubject({
        subjectName: newSubject.trim()
      })
        .then((subject) => {
          setSubjects((prevState) => [...prevState, subject])
        })
    }

    useEffect(() => {
      const getSubjects = async () => {
        const subjectList = await getAllSubjects();
  
        subjectList && setSubjects(subjectList as ISubject[])
      }
  
      getSubjects();
    }, [])  
    return (
      <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="select-field">
          <SelectValue placeholder="Subject" />
        </SelectTrigger>
        <SelectContent>
          {subjects.length > 0 && subjects.map((subject) => (
            <SelectItem key={subject._id} value={subject._id} className="select-item p-regular-14">
              {subject.name}
            </SelectItem>
          ))}
  
          <AlertDialog>
            <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">Add new subject</AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>New Subject</AlertDialogTitle>
                <AlertDialogDescription>
                  <Input type="text" placeholder="Subject name" className="input-field mt-3" onChange={(e) => setNewSubject(e.target.value)} />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => startTransition(handleAddSubject)}>Add</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SelectContent>
      </Select>
    )
  }
  
  export default Dropdown