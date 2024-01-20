// MyNotes.jsx
import React, { useEffect, useState } from "react";
import { List, Button, Modal, Form, Input, Select, message, Flex } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotes,
  deleteNote,
  archiveNote,
  unarchiveNote,
  updateNote,
} from "../../features/note/noteSlice";
import { getCategories } from "../../features/category/categorySlice";
import { showSuccessNotification } from "../../features/layout/layoutSlice";

const MyNotes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const isLoading = useSelector((state) => state.notes.isLoading);
  const user = useSelector((state) => state.users.user);
  const message = useSelector((state) => state.notes.message);

  const categories = useSelector((state) => state.categories?.categories);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFilterCategories, setSelectedFilterCategories] = useState([]);

  useEffect(() => {
    if (user && user.userId) {
      dispatch(getNotes(user.userId)).catch((error) => {
        message.error(error.message);
      });
      dispatch(getCategories()).catch((error) => {
        message.error(error.message);
      });
    }
  }, [dispatch, user]);

  const handleEditNote = (note) => {
    setEditingNote(note);
    setEditedTitle(note.title);
    setEditedContent(note.content);
    setSelectedCategories(note.Categories?.map((category) => category.id));
    setIsModalVisible(true);
  };

  const handleSaveNote = () => {
    const data = {
      title: editedTitle,
      content: editedContent,
      categories: selectedCategories,
    };

    dispatch(
      updateNote({
        noteId: editingNote.id,
        data,
      })
    )
      .then(() => {
        dispatch(showSuccessNotification("Note updated successfully"));
      })
      .catch((error) => {
        message.error(error.message);
      });

    setTimeout(() => {
      dispatch(getNotes(user.userId));
    }, 1000);

    setIsModalVisible(false);
  };

  const handleDeleteNote = (noteId) => {
    dispatch(deleteNote(noteId))
      .unwrap()
      .then(() => {
        message.success("Note deleted successfully");
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const handleArchiveNote = (note) => {
    const action = note.archived ? unarchiveNote : archiveNote;

    dispatch(action(note.id))
      .unwrap()
      .then(() => {
        const successMessage = note.archived
          ? "Note unarchived successfully"
          : "Note archived successfully";
        message.success(successMessage);
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  if (!notes || notes.length === 0) {
    return <div>No notes found</div>;
  }

  const filteredNotes =
    selectedFilterCategories.length > 0
      ? notes.filter((note) =>
          selectedFilterCategories.every((selectedCategoryId) =>
            note.Categories.some(
              (category) => selectedCategoryId === category.id
            )
          )
        )
      : notes;

  return (
    <div>
      <h2>MY NOTES</h2>
      <Form.Item
        style={{
          width: "90%",
          margin: "0 auto",
        }}
        label="Filter by Categories"
      >
        <Select
          mode="multiple"
          placeholder="Select categories"
          value={selectedFilterCategories}
          onChange={(values) => setSelectedFilterCategories(values)}
        >
          {categories?.map((category) => (
            <Select.Option key={category.id} value={category.id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      {isLoading ? (
        <p>Loading notes...</p>
      ) : message === "User id is required" ? (
        <p style={{ color: "red" }}>{message}</p>
      ) : (
        <List
          dataSource={filteredNotes}
          renderItem={(note, index) => (
            <List.Item
              style={{
                backgroundColor: "black",
                border: "1px solid white",
                marginTop: "1vh",
              }}
              key={`note-${index}`}
              actions={[
                <Button
                  key={`delete-${index}`}
                  type="link"
                  onClick={() => handleDeleteNote(note.id)}
                >
                  Delete
                </Button>,
                <Button
                  key={`archive-${index}`}
                  type="link"
                  onClick={() => handleArchiveNote(note)}
                >
                  {note.archived ? "Unarchive" : "Archive"}
                </Button>,
                <Button
                  key={`edit-${index}`}
                  type="link"
                  onClick={() => handleEditNote(note)}
                >
                  Edit
                </Button>,
              ]}
            >
              <List.Item.Meta title={note?.title} description={note?.content} />
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
      {/* Modal para la edición */}
      <Modal
        title="EDIT NOTE"
        visible={isModalVisible}
        onOk={handleSaveNote}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form>
          <Form.Item label="Title">
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Content">
            <Input.TextArea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Categories">
            <Select
              mode="multiple"
              placeholder="Select categories"
              value={selectedCategories}
              onChange={(values) => setSelectedCategories(values)}
            >
              {categories?.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MyNotes;
