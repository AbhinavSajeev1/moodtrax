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
                <input type="range" min="1" max="10" className="slider" id="myRange" value={editMood} onChange={(e) => setEditMood(Number((e.target.value)))}/><br/>
                <button onClick={saveEdit}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
            </>
            
        ) : (


            
        <div id="entriesList">
                <p>{moodEmoji[entry.mood]}</p>
                <p>{entry.mood}</p>
                <p>{entry.note === "" ? "N/A" : entry.note}</p>
                <p>{entry.time}</p>
                <button className="delete" onClick={() => onDelete(entry.id)}>Delete</button>
                <button className="edit" onClick={() => onEdit(entry.id)}>Edit</button>
        </div>
        )
    );
}

export default EntryCard; 