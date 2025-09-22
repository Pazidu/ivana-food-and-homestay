import React, { useEffect, useState } from "react";
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
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LockIcon from "@mui/icons-material/Lock";
import PaymentIcon from "@mui/icons-material/Payment";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentGateway = () => {
  const [order, setOrder] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("pendingOrder"));
    if (
      !orderData ||
      !orderData.userName ||
      !orderData.address ||
      !orderData.phone
    ) {
      alert("Guest info missing. Please go back and enter details.");
      navigate("/cart");
    } else {
      setOrder(orderData);
      setName(orderData.userName); // prefill cardholder name
    }
  }, [navigate]);

  const handlePay = async () => {
    if (!order) return;
    setProcessing(true);

    try {
      // Simulate payment delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const token = localStorage.getItem("token"); // may be null for guests

      // Save order in backend
      await axios.post(
        "http://localhost:5000/api/orders",
        order,
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );

      // Clear cart: for guests clear localStorage
      if (!token) {
        localStorage.removeItem("guestCart");
      } else {
        await axios.delete("http://localhost:5000/api/cart/clear", {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      localStorage.removeItem("pendingOrder");
      alert("Payment Successful! Order saved.");
      navigate("/foods/menu");
    } catch (error) {
      console.error("Error processing payment:", error);
      alert(
        "Payment succeeded but failed to save order or clear cart. Try again."
      );
    } finally {
      setProcessing(false);
    }
  };

  if (!order) return null; // prevent rendering until order is loaded

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
                sx={{ mt: 1, borderRadius: 2, fontWeight: 600, boxShadow: 2 }}
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
