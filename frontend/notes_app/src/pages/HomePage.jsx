import React from 'react'
import { useState } from 'react'
import Navbar from '../components/navbar.jsx'
import RateLimitedUI from '../components/RateLimitedUI.jsx'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard.jsx'
import NotesNotFound from '../components/notesnotfound.jsx'
import api from '../lib/utils/axios.js'


const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    const fetchNotes = async()=>{
      try {
        const response = await api.get('/notes')
        setNotes(response.data)
        setIsRateLimited(false)

      } catch (error) {
        console.log(error)
        if(error.response?.status === 429){
          setIsRateLimited(true)
        }else{
          toast.error("An error occurred while fetching notes")
        }
      }finally{
        setLoading(false)
      }
    }
    fetchNotes();
  },[])  

  
  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
        <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">
              Your notes
            </p>
            <h2 className="text-3xl font-bold text-base-content sm:text-4xl">
              Capture what matters
            </h2>
            <p className="mt-3 max-w-xl text-base-content/65">
              Keep ideas, reminders, and drafts in one calm place.
            </p>
          </div>
          <div className="rounded-lg border border-primary/20 bg-base-100/70 px-4 py-3 text-sm text-base-content/70">
            <span className="font-semibold text-primary">{notes.length}</span>{" "}
            {notes.length === 1 ? "note" : "notes"} saved
          </div>
        </section>

        {loading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-56 animate-pulse rounded-lg border border-primary/10 bg-base-100/70" />
            ))}
          </div>
        )}

        {!loading && notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {!loading && notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
export default HomePage
