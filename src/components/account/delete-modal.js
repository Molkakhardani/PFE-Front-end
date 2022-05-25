import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const DeleteModal = ({ open, handleClose, handleAction }) => {
  return (
    <Dialog open={open} onClose={handleClose} datacy="delete-modal">
      <DialogTitle id="alert-dialog-slide-title">Supression de compte</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          voulez-vous vraiment supprimer ce compte ?
        </DialogContentText>
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
