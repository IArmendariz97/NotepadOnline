// ArchivedNotes.jsx

import { List, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { unarchiveNote } from "../../features/note/noteSlice";

const ArchivedNotes = () => {
  const dispatch = useDispatch();
  const archivedNotes = useSelector((state) =>
    state.notes.notes.filter((note) => note.archived)
  );
  const isLoading = useSelector((state) => state.notes.isLoading);

  const handleUnarchiveNote = (noteId) => {
    dispatch(unarchiveNote(noteId))
      .unwrap()
      .then(() => {
        message.success("Note unarchived successfully");
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  return (
    <div>
      <h2>Archived Notes</h2>
      {isLoading ? (
        <p>Loading archived notes...</p>
      ) : (
        <List
          dataSource={archivedNotes}
          renderItem={(note) => (
            <List.Item
              actions={[
                <Button
                  key={note.id}
                  type="link"
                  onClick={() => handleUnarchiveNote(note.id)}
                >
                  Unarchive
                </Button>,
              ]}
            >
              <List.Item.Meta title={note.title} description={note.content} />
              <div>
                Categories:{" "}
                {note.Categories && note.Categories.length > 0
                  ? note.Categories.map((category) => category.name).join(", ")
                  : "No categories"}
              </div>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default ArchivedNotes;
