import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const DeleteModal = ({ open, title, description, handleClose, handleAction }) => {
  return (
    <Dialog open={open} onClose={handleClose} datacy="delete-modal">
      <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Annuler
        </Button>
        <Button onClick={handleAction} style={{ backgroundColor: "red", color: "white" }}>
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
