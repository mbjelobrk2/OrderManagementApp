"use client";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

export default function InsightsModal({ open, onClose, content, loading }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth={false}
      scroll="paper"
      disableScrollLock={true} // ✅ lets background scroll
      BackdropProps={{
        sx: { backgroundColor: "rgba(0,0,0,0.5)" }, // ✅ greyed out background
      }}
      PaperProps={{
        sx: {
          borderRadius: 3,
          padding: 2,
          width: "500px",
          maxHeight: "80vh",
          overflow: "hidden",
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          fontSize: "1.2rem",
          fontWeight: 600,
          pb: 1,
        }}
      >
        📊 Uvid u narudžbe
      </DialogTitle>

      <Divider sx={{ mb: 1 }} />

      {/* Content */}
      <DialogContent dividers sx={{ maxHeight: "55vh", overflowY: "auto" }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Typography
            variant="body2"
            sx={{
              whiteSpace: "pre-wrap",
              lineHeight: 1.6,
            }}
          >
            {content || "No insights available."}
          </Typography>
        )}
      </DialogContent>

      {/* Footer */}
      <DialogActions sx={{ pt: 1 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          Zatvori
        </Button>
      </DialogActions>
    </Dialog>
  );
}
