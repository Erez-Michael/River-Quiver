import { useState, useEffect } from "react";
import axios from "axios";

import data from "./mock-data.json";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

const useHandlers = () => {
  const { user } = useAuth0();
  const { spot_id } = useParams();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (!spot_id) return;

    axios
      .get("/getAllComments", { params: { spotId: spot_id } })
      .then((data) => {
        const sortedContacts = data.data.data.sort((a, b) => {
          return b.createdAt - a.createdAt;
        });

        setContacts(sortedContacts);
      });
  }, [spot_id]);

  const [addFormData, setAddFormData] = useState({
    level: "",
    flow: "",
    rating: "",
    equipment: "",
  });

  const [editFormData, setEditFormData] = useState({
    level: "",
    flow: "",
    rating: "",
    equipment: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      email: user.email,
      level: addFormData.level,
      spotId: spot_id,
      flow: addFormData.flow,
      rating: addFormData.rating,
      equipment: addFormData.equipment,
    };

    axios
      .post("/createComments", newContact)
      .then((data) => {
        console.log("data", data);
        // setComments([data.data, ...comments]) // scope
        // reducer pattern
        setContacts((state) => {
          return [...state, data.data.data];
        });
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      level: editFormData.level,
      flow: editFormData.flow,
      rating: editFormData.rating,
      equipment: editFormData.equipment,
    };

    const newContacts = [contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      level: contact.level,
      flow: contact.flow,
      rating: contact.rating,
      equipment: contact.equipment,
    };

    setEditFormData(formValues);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact._id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  return {
    contacts,
    handleAddFormSubmit,
    handleAddFormChange,
    handleEditClick,
    handleEditFormSubmit,
    handleDeleteClick,
  };
};

export default useHandlers;
