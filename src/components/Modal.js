import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EntryForm from "./EntryForm";

const style = {};

const UpdateModal = ({ open, handleClose, Update, entry }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            border: "2px solid #000",
            boxShadow: 24,

            backgroundColor: "white",
            padding: "3rem",
          }}
        >
          <EntryForm ele={entry} onSubmit={Update} />
        </div>
      </Modal>
    </div>
  );
};
export default UpdateModal;
