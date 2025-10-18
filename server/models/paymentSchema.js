import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    // Payment Details
    razorpay_order_id: {
        type: String,
        required: [true, 'Razorpay order ID is required'],
        unique: true,
        trim: true,
    },
    razorpay_payment_id: {
        type: String,
        required: [true, 'Razorpay payment ID is required'],
        unique: true,
        trim: true,
    },
    razorpay_signature: {
        type: String,
        required: [true, 'Razorpay signature is required'],
        trim: true,
    },
    
    // Amount Details
    amount: {
        type: Number,
        required: [true, 'Payment amount is required'],
        min: 0,
    },
    currency: {
        type: String,
        default: 'INR',
        enum: ['INR', 'USD', 'EUR'],
    },
    
    // Payment Status
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending',
    },
    
    // Customer Information
    customer: {
        name: {
            type: String,
            required: [true, 'Customer name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Customer email is required'],
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: [true, 'Customer phone is required'],
            trim: true,
        },
    },
    
    // Event Information
    event: {
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Events',
            required: [true, 'Event ID is required'],
        },
        eventTitle: {
            type: String,
            required: [true, 'Event title is required'],
            trim: true,
        },
        eventDate: {
            type: Date,
            required: [true, 'Event date is required'],
        },
        participants: {
            type: Number,
            required: [true, 'Number of participants is required'],
            min: 1,
        },
    },
    
    // Booking Information
    bookingId: {
        type: String,
        required: [true, 'Booking ID is required'],
        unique: true,
        trim: true,
    },
    
    // Additional Information
    notes: {
        type: String,
        trim: true,
    },
    
    // Payment Method Details
    paymentMethod: {
        type: String,
        enum: ['card', 'netbanking', 'wallet', 'upi', 'emi'],
        default: 'card',
    },
    
    // Refund Information
    refund: {
        amount: {
            type: Number,
            default: 0,
        },
        reason: {
            type: String,
            trim: true,
        },
        refundedAt: {
            type: Date,
        },
        refundId: {
            type: String,
            trim: true,
        },
    },
    
    // Timestamps
    paidAt: {
        type: Date,
    },
    expiresAt: {
        type: Date,
    },
}, {
    timestamps: true,
});

// Index for better query performance
paymentSchema.index({ razorpay_order_id: 1 });
paymentSchema.index({ razorpay_payment_id: 1 });
paymentSchema.index({ bookingId: 1 });
paymentSchema.index({ 'customer.email': 1 });
paymentSchema.index({ 'event.eventId': 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ createdAt: -1 });

// Virtual for formatted amount
paymentSchema.virtual('formattedAmount').get(function() {
    return `₹${this.amount.toLocaleString('en-IN')}`;
});

// Method to generate booking ID
paymentSchema.statics.generateBookingId = function() {
    const prefix = 'MIV';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substr(2, 5).toUpperCase();
    return `${prefix}${timestamp}${random}`;
};

// Method to check if payment is valid
paymentSchema.methods.isValid = function() {
    return this.status === 'completed' && this.paidAt;
};

// Method to check if payment is refundable
paymentSchema.methods.isRefundable = function() {
    const now = new Date();
    const eventDate = new Date(this.event.eventDate);
    const daysUntilEvent = Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24));
    
    return this.status === 'completed' && daysUntilEvent > 7; // Refundable if more than 7 days before event
};

const Payment = mongoose.model("Payments", paymentSchema);

export default Payment;