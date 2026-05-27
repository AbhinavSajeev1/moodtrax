function EntryCard({key, entry, onEdit, onDelete, editMood, editState, setEditMood, saveEdit, cancelEdit}) {

    const isEditing = editState === entry.id 

    


    return (

        isEditing ? (
            <>
                <input type="range" min="1" max="10" className="slider" id="myRange" value={editMood} onChange={(e) => setEditMood(Number((e.target.value)))}/><br/>
                <button onClick={saveEdit}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
            </>
            
        ) : (


            
        <div id="entriesList">
                <p>Mood: {entry.mood}</p>
                <p>Note: {entry.note}</p>
                <p>Time: {entry.time}</p>
                <button id="delete" onClick={() => onDelete(entry.id)}>Delete</button>
                <button id="edit" onClick={() => onEdit(entry.id)}>Edit</button>
        </div>
        )
    );
}

export default EntryCard; 