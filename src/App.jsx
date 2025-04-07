import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import db from "./utils/db.js";
import Header from "./components/Header.jsx";
import "./App.css";

// fetching contacts

const App = () => {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch contacts from firestore
  const fetchContactList = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // query to get contacts order by last name
      const q = query(collection(db, "contacts"), orderBy("lastName", "asc"));
      const docSnapshot = await getDocs(q);

      const data = docSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Contacts from Firestore:", data);
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setError("Failed to load contacts: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // filter contact base on the search words

  const filteredContacts = contacts.filter((contact) =>
    `${contact.firstName} ${contact.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const goToAdd = () => {
    navigate("/add");
  };

  useEffect(() => {
    fetchContactList();
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2 className="mb-4">All Contacts</h2>

        {/* search bar and add button */}
        <div className="row mb-4">
          {/* search bar */}
          <div className="col-md-8 mb-2">
            <input
              type="text"
              placeholder="Search contacts"
              value={searchTerm}
              onChange={handleSearchChange}
              className="form-control"
            />
          </div>

          {/* add button */}
          <div className="col-md-4 text-end">
            <button onClick={goToAdd} className="btn btn-primary me-0">
              Add New Contact
            </button>
          </div>
        </div>

        {isLoading ? (
          // loading message while fetching data
          <p className="text-center text-muted">Loading contacts....</p>
        ) : error ? (
          // error message
          <div className="alert alert-danger">
            <p>{error}</p>
            <button onClick={fetchContactList} className="btn btn-danger mt-2">
              Retry
            </button>
          </div>
        ) : (
          <>
            {/* contact list */}
            <ul className="list-group">
              {filteredContacts.map((contact) => (
                <li
                  key={contact.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <Link
                      to={`/contact/${contact.id}`}
                      className="text-decoration-none fw-bold"
                    >
                      {`${contact.firstName} ${contact.lastName}`}
                    </Link>
                    <div className="text-muted small">{contact.email}</div>
                  </div>
                  <span className="text-muted">
                    {contact.phone || "No phone"}
                  </span>
                </li>
              ))}
            </ul>

            {/* no contacts match search */}
            {filteredContacts.length === 0 && contacts.length > 0 && (
              <p className="text-center text-muted mt-3">
                No contacts found. Please try again.
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default App;
