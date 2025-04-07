import { useState, useEffect } from "react";
import db from "../utils/db.js";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { EditForm } from "../components/EditForm.jsx";
import Header from "../components/Header.jsx";

// contact component
// get contact id from url
export const Contact = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [contact, setContact] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // fetch contact data from firestore
  useEffect(() => {
    const fetchContactById = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching contact with ID:", id);

        const docRef = doc(db, "contacts", id);
        const docSnapshot = await getDoc(docRef);
        console.log("Document exists:", docSnapshot.exists());

        if (docSnapshot.exists()) {
          const contactData = { id: docSnapshot.id, ...docSnapshot.data() };
          console.log("Contact data:", contactData);
          setContact(contactData);
          setError(null);
        } else {
          setError("Contact does not exist in the records.");
        }
      } catch (error) {
        console.error("Error fetching contact:", error);
        setError(
          "Failed to load contact. Please check the database connection."
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchContactById();
  }, [id]);

  // update contact in firestore
  const handleUpdate = async (updatedContact) => {
    console.log("Updating contact:", updatedContact);
    const docRef = doc(db, "contacts", id);
    try {
      await updateDoc(docRef, updatedContact);
      console.log("Contact updated successfully");

      setContact({ ...contact, ...updatedContact });
      setIsEditing(false);
      return Promise.resolve();
    } catch (error) {
      console.error("Error updating contact:", error);
      alert("There was an issue updating the contact. Please try again.");
      return Promise.reject(error);
    }
  };

  // delete contact from firestore
  const handleContactDelete = async () => {
    const msg = "Are you sure you want to delete this contact?";
    if (confirm(msg)) {
      try {
        console.log("Deleting contact with ID:", id);
        const docRef = doc(db, "contacts", id);

        await deleteDoc(docRef);
        console.log("Contact deleted successfully");

        // back to home
        setContact(null);
        navigate("/");
      } catch (error) {
        console.error("Error deleting contact:", error);
        alert("There was an issue deleting the contact. Please try again.");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-4">
        {isLoading ? (
          <p className="text-center">Loading contact.....</p>
        ) : error ? (
          <div className="alert alert-danger">
            <p>{error}</p>
            <button
              onClick={() => navigate("/")}
              className="btn btn-secondary mt-2"
            >
              Back to Contact List
            </button>
          </div>
        ) : contact ? (
          isEditing ? (
            // edit form
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h2>Edit Contact</h2>
              </div>
              <div className="card-body">
                <EditForm
                  contact={contact}
                  onUpdate={handleUpdate}
                  onCancel={() => setIsEditing(false)}
                />
              </div>
            </div>
          ) : (
            // view details
            <div className="card">
              <div className="card-header bg-primary text-white pb-0">
                <h2>
                  {contact.firstName} {contact.lastName}
                </h2>
              </div>
              <div className="card-body">
                {/* contact details */}
                <div className="d-flex flex-column gap-3">
                  <div className="contact-detail">
                    <strong>First Name:</strong> {contact.firstName}
                  </div>
                  <div className="contact-detail">
                    <strong>Last Name:</strong> {contact.lastName}
                  </div>
                  <div className="contact-detail">
                    <strong>Email:</strong> {contact.email}
                  </div>
                  <div className="contact-detail">
                    <strong>Phone:</strong> {contact.phone || "Not provided"}
                  </div>
                </div>

                {/* buttons */}
                <div className="mt-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-warning me-2"
                  >
                    Edit Contact
                  </button>
                  <button
                    onClick={handleContactDelete}
                    className="btn btn-danger"
                  >
                    Delete Contact
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="btn btn-secondary ms-md-2 ms-sm-0"
                  >
                    Back to Contacts
                  </button>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="alert alert-warning">
            <p>Contact not found</p>
            <button
              onClick={() => navigate("/")}
              className="btn btn-secondary mt-2"
            >
              Back to Contacts
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Contact;
