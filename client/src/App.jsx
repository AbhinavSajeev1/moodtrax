import {useState} from "react"; 
import {useEffect} from "react"; 
import EntryCard from "./EntryCard"
import Form from "./form"
import Graph from "./Graph"
import "./App.css"

function App() {
  

  const [mood, setMood] = useState(5);
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState(() => {
      const saved = localStorage.getItem("entries")
      return saved ? JSON.parse(saved) : [];
  });
  const [showContent, setShowContent] = useState(false)

  const[editState, setEditState] = useState(null);
  const[editMood, setEditMood] = useState(0);

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries))}, [entries])

  const handleSubmit = (e) => {
    e.preventDefault()

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

  const deleteEntry = (id) => {
    setEntries(
      entries.filter((entry)=> entry.id !== id)
    );
  }

  const editEntry = (id) => {

    const entry = entries.find((e) => e.id === id);
    setEditState(id);
    setEditMood(entry.mood);



  }

  const saveEdit = () => {
    setEntries((prev) =>
      prev.map((entry) => entry.id === editState
      ? {
        ...entry, mood: editMood
      }
  : entry
)
);
  setEditState(null)
}

  const cancelEdit = () => {
    setEditState(null)
  }

  return (
    <div>
      <header>
        <h1>Mood Tracker</h1>
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
export default App; 