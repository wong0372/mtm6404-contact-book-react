import { useState, useEffect } from "react";

// hold form data
export const EditForm = ({ contact, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  // track if form is currently submitting
  const [isSubmitting, setIsSubmitting] = useState(false);

  // update form data when contact prop changes
  useEffect(() => {
    if (contact) {
      setFormData({
        firstName: contact.firstName || "",
        lastName: contact.lastName || "",
        email: contact.email || "",
        phone: contact.phone || "",
      });
    }
  }, [contact]);

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("Submitting updated contact:", formData);

    onUpdate(formData)
      .catch((error) => {
        console.error("Error in update callback:", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* first and last name */}
      <div className="row mb-3">
        <div className="col-md-6 mb-3 mb-md-0">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* email */}
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email Address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          placeholder="Enter email address"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
      </div>

      {/* phone */}
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone Number
        </label>
        <input
          type="tel"
          className="form-control"
          id="phone"
          name="phone"
          placeholder="Enter phone number"
          value={formData.phone}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
      </div>

      {/* button */}
      <div className="d-flex mt-4">
        <button
          type="submit"
          className="btn btn-primary me-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update Contact"}
        </button>
        {onCancel && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default EditForm;
