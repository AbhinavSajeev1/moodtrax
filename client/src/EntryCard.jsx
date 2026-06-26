function EntryCard({key, entry, onEdit, onDelete, editMood, editState, setEditMood, saveEdit, cancelEdit}) {

    const isEditing = editState === entry.id 

    const moodEmoji = {
        1: "😢",
        2: "😞",
        3: "😕",
        4: "😐",
        5: "🙂",
        6: "😊",
        7: "😄",
        8: "😁",
        9: "🤩",
        10: "🔥"
    };


    return (

        isEditing ? (
            <>
                <p className="editMoodNumber"><span>{editMood}</span></p>
                <input type="range" min="1" max="10" className="slider" id="myRange" value={editMood} onChange={(e) => setEditMood(Number((e.target.value)))}/><br/>
                <div className="save-cancel-group">
                    <button className="save" onClick={saveEdit}>Save</button>
                    <button className="cancel" onClick={cancelEdit}>Cancel</button>
                </div>
            </>
            
        ) : (
            
        <div id="entriesList">
                <div className="moodGroup"> 
                    <p>{moodEmoji[entry.mood]} {entry.mood}</p>
                </div>
                <div className="moodDetails">
                    <div className="entryNoteOverflow"> 
                        <p>{entry.note === "" ? "No note added" : `"${entry.note}"`}</p>
                    </div>
                    <p>{entry.time}</p>
                </div>

                <button className="delete" onClick={() => onDelete(entry.id)}>Delete</button>
                <button className="edit" onClick={() => onEdit(entry.id, entry.mood)}>Edit</button>
        </div>
        )
    );
}

export default EntryCard; 