import {useState} from "react"; 
import {useEffect} from "react"; 
import EntryCard from "./EntryCard"
import Form from "./form"
import Graph from "./Graph"
import AuthForm from "./AuthForm"
import "./App.css"

import {createClient} from "@supabase/supabase-js";
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

function App() {
  

  const [mood, setMood] = useState(5);
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState([]);
  const [showContent, setShowContent] = useState(false)

  const[editState, setEditState] = useState(null);
  const[editMood, setEditMood] = useState(0);
  const[loginState, setLoginState] = useState("")

  useEffect(() => {


  const getEntries = async () => {
      const res = await fetch("http://localhost:3001/entries")
      const data = await res.json();
      setEntries(data);
  };

    getEntries();

    }, [])
    
    const handleSubmit = (e) => {
    e.preventDefault()

    fetch("http://localhost:3001/entries", {
      method: "POST", 
      body: JSON.stringify({
        id: crypto.randomUUID(),
        mood: mood, 
        note: note, 
        time: new Date().toLocaleString()
      }),
      headers: {
        "Content-type" : "application/json; charset=UTF-8"
      }
    })
    .then(res=> res.json())
    .then(data => {
      console.log("Server response:", data)
    })


    const newEntry = {
      id: crypto.randomUUID(),
      mood: mood,
      note: note,
      time: new Date().toLocaleString()
    };

    setEntries([...entries, newEntry]);
    setNote("");
    setMood(5);
  }

  const deleteEntry = async (id) => {
    await fetch(`http://localhost:3001/entries/${id}`, {method: 'DELETE'})

    setEntries(prev => prev.filter(entry => entry.id !== id))
  }

  const editEntry = (id, currentMood) => {
    setEditState(id)
    setEditMood(currentMood)
  }

  const saveEdit = async () => {
    await fetch(`http://localhost:3001/entries/${editState}`, {method: 'PUT', headers: { "Content-Type": "application/json" }, body: JSON.stringify({mood: editMood} )})
    setEntries(prev => prev.map(entry => entry.id === editState 
      ? {...entry, mood: editMood}
      : entry
    ))
    setEditState(null);
}

  const cancelEdit = () => {
    setEditState(null)
  }

  const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        setLoginState("")
}


  if (loginState === "loggedin") {
    return (
      <div>
        <header>
          <div></div>
          <h1>Mood Tracker</h1>
          <p><span id="signoutlink" onClick={signOut}>Sign Out</span></p>
        </header>
        <main>
        <div id="bodyList">
          <div className="form-section">
                    <button type="button" className="collapsible" id="collapsible" onClick={() => {
                      if (showContent) {
                        setShowContent(false) }
                      else {
                        setShowContent(true)}}}>Form</button>
                    {showContent && (
                    <div className="content">
                        <div className="form">
                            <Form
                              handleSubmit = {handleSubmit}
                              mood = {mood}
                              note = {note}
                              setMood = {setMood}
                              setNote= {setNote}
                            />
                        </div>
                    </div>
                    )}
                </div>


                <div id="entryCard">
                  <h2>Entries</h2>
                {entries.map((entry) => {

                  return (
                    <EntryCard 
                      key = {entry.id}
                      entry = {entry}
                      onEdit= {editEntry}
                      onDelete = {deleteEntry}
                      editMood = {editMood}
                      editState = {editState}
                      setEditMood = {setEditMood}
                      saveEdit = {saveEdit}
                      cancelEdit = {cancelEdit}
                    />
                )
                
                })}
                <hr id="line-break"/>
                <h2>Graph</h2>
                <div id="moodChart">
                  <Graph
                    entries = {entries}
                  />
                </div>

                </div>
              </div>
            </main>
      </div>

    )
  }
  else {
    return(
      <AuthForm setLoginState={setLoginState}/>
    )
  }
}
export default App; 