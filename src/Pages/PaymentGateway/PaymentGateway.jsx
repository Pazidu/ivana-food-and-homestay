import React, { useState } from "react";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LockIcon from "@mui/icons-material/Lock";
import PaymentIcon from "@mui/icons-material/Payment";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Divider,
  InputAdornment,
} from "@mui/material";

const PaymentGateway = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [processing, setProcessing] = useState(false);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      alert("Payment Successful!");
    }, 1500);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f7fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          width: "100%",
          boxShadow: 6,
          borderRadius: 4,
          p: 2,
        }}
      >
        <CardContent>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <PaymentIcon sx={{ fontSize: 48, color: "#1976d2" }} />
            <Typography variant="h5" fontWeight={700} mt={1}>
              Payment Gateway
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Secure and fast payment processing
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Cardholder Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CreditCardIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Card Number"
                variant="outlined"
                fullWidth
                value={cardNumber}
                onChange={(e) =>
                  setCardNumber(
                    e.target.value.replace(/[^0-9]/g, "").slice(0, 16)
                  )
                }
                placeholder="1234 5678 9012 3456"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CreditCardIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Expiry"
                variant="outlined"
                fullWidth
                value={expiry}
                onChange={(e) =>
                  setExpiry(e.target.value.replace(/[^0-9/]/g, "").slice(0, 5))
                }
                placeholder="MM/YY"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="CVV"
                variant="outlined"
                fullWidth
                value={cvv}
                onChange={(e) =>
                  setCvv(e.target.value.replace(/[^0-9]/g, "").slice(0, 3))
                }
                placeholder="123"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{
                  mt: 1,
                  borderRadius: 2,
                  fontWeight: 600,
                  boxShadow: 2,
                }}
                disabled={!cardNumber || !expiry || !cvv || !name || processing}
                onClick={handlePay}
              >
                {processing ? "Processing..." : "Pay Now"}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PaymentGateway;
