function Form({handleSubmit, mood, note, setMood, setNote}) {
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="mood">Mood (1-10): </label><br/>
            <p><span id="value">{mood}</span></p>
            <input type="range" min="1" max="10" className="slider" id="myRange" value={mood} onChange={(e) => setMood(Number((e.target.value)))}/><br/>
            <label htmlFor="note">Note (Optional): </label><br/>
            <input type="text" id="note" value={note} onChange = {(e) => {setNote(e.target.value)}} maxlength="75"/><br/>
            <input type="hidden" name="submissiontime"id="submissiontime"/>
            <input type="submit" value="Submit"/> 
        </form>
    );
}

export default Form;