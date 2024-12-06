// controllers/paymentController.js

const Payment = require('../models/Payment');

// Create a payment for an order
const createPayment = async (req, res) => {
  const { orderId, paymentMethod, amount, transactionId } = req.body;
  
  try {
    const payment = new Payment({
      orderId,
      paymentMethod,
      amount,
      transactionId,
      status: 'Completed',
      createdAt: new Date(),
    });

    await payment.save();
    res.status(201).json(payment); // Changed status to 201 for resource creation
  } catch (error) {
    console.error("Error processing payment:", error); // Added error logging
    res.status(500).json({ message: "Error processing payment", error: error.message }); // Sent error message instead of the entire error object
  }
};

// Get payment details by order ID
const getPaymentByOrderId = async (req, res) => {
  const { orderId } = req.params;
  
  try {
    const payment = await Payment.findOne({ orderId });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found for the given order ID" });
    }
    res.status(200).json(payment);
  } catch (error) {
    console.error("Error fetching payment details:", error); // Added error logging
    res.status(500).json({ message: "Error fetching payment details", error: error.message }); // Sent error message instead of the entire error object
  }
};

// Export the controller functions
module.exports = {
  createPayment,
  getPaymentByOrderId,
};
