const Notes = ({ notes, handleDelete, handleShowUpdateForm }) => {
    if (notes === []) {
        return <div>loading...</div>;
    }

    return (
        <ol>
            {notes.map((note) => {
                return (
                    <li key={note.id}>
                        {note.firstname} {note.lastname} | {note.phone} |{" "}
                        {note.role} | {note.message}
                        <button
                            type="button"
                            onClick={() => handleDelete(note.id)}
                        >
                            delete
                        </button>
                        <button
                            type="button"
                            onClick={() => handleShowUpdateForm(note)}
                        >
                            edit
                        </button>
                    </li>
                );
            })}
        </ol>
    );
};

export default Notes;
