"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress
} from "@mui/material";

interface InsightsModalProps {
  open: boolean;
  onClose: () => void;
  content: string | null;
  loading?: boolean;
}

export default function InsightsModal({ open, onClose, content, loading }: InsightsModalProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>🔍 Uvid iz narudžbi</DialogTitle>
      <DialogContent dividers>
        {loading ? (
          <CircularProgress />
        ) : (
          <Typography whiteSpace="pre-line">{content}</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="primary">
          Zatvori
        </Button>
      </DialogActions>
    </Dialog>
  );
}