import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userEditAction } from "../reducers/user/userActions";

const EditForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);

  const [userName, setUserName] = useState(userInfo?.userName);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {};
    if (userName) updatedData.userName = userName;

    dispatch(userEditAction({ token, updatedData })).then(() => {
      onClose(); // Ferme le formulaire après validation
    });
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label>User Name</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="edit-button">
        Save
      </button>
      <button type="button" className="edit-button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default EditForm;
