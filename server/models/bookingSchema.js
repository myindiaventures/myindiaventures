import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    // Booking Details
    bookingId: {
        type: String,
        required: [true, 'Booking ID is required'],
        unique: true,
        trim: true,
    },
    
    // Booking Status
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed', 'refunded'],
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
        emergencyContact: {
            name: {
                type: String,
                trim: true,
            },
            phone: {
                type: String,
                trim: true,
            },
            relation: {
                type: String,
                trim: true,
            },
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
        eventLocation: {
            type: String,
            required: [true, 'Event location is required'],
            trim: true,
        },
        eventDuration: {
            type: String,
            required: [true, 'Event duration is required'],
            trim: true,
        },
    },
    
    // Booking Details
    participants: {
        type: Number,
        required: [true, 'Number of participants is required'],
        min: 1,
        max: 20, // Maximum participants per booking
    },
    
    // Pricing Information
    pricing: {
        basePrice: {
            type: Number,
            required: [true, 'Base price is required'],
            min: 0,
        },
        totalAmount: {
            type: Number,
            required: [true, 'Total amount is required'],
            min: 0,
        },
        discount: {
            type: Number,
            default: 0,
            min: 0,
        },
        tax: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    
    // Payment Information
    payment: {
        paymentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Payments',
        },
        status: {
            type: String,
            enum: ['pending', 'completed', 'failed', 'refunded'],
            default: 'pending',
        },
        method: {
            type: String,
            enum: ['card', 'netbanking', 'wallet', 'upi', 'emi'],
        },
        transactionId: {
            type: String,
            trim: true,
        },
    },
    
    // Special Requirements
    specialRequirements: {
        dietary: {
            type: String,
            trim: true,
        },
        medical: {
            type: String,
            trim: true,
        },
        accessibility: {
            type: String,
            trim: true,
        },
        other: {
            type: String,
            trim: true,
        },
    },
    
    // Booking Timeline
    timeline: {
        bookedAt: {
            type: Date,
            default: Date.now,
        },
        confirmedAt: {
            type: Date,
        },
        cancelledAt: {
            type: Date,
        },
        completedAt: {
            type: Date,
        },
    },
    
    // Cancellation Information
    cancellation: {
        reason: {
            type: String,
            trim: true,
        },
        refundAmount: {
            type: Number,
            default: 0,
        },
        refundStatus: {
            type: String,
            enum: ['pending', 'processed', 'completed', 'failed'],
        },
        refundedAt: {
            type: Date,
        },
    },
    
    // Communication
    communications: [{
        type: {
            type: String,
            enum: ['email', 'sms', 'whatsapp', 'call'],
        },
        message: {
            type: String,
            required: true,
        },
        sentAt: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ['sent', 'delivered', 'failed'],
            default: 'sent',
        },
    }],
    
    // Additional Information
    notes: {
        type: String,
        trim: true,
    },
    
    // Referral Information
    referral: {
        source: {
            type: String,
            trim: true,
        },
        code: {
            type: String,
            trim: true,
        },
    },
}, {
    timestamps: true,
});

// Indexes for better query performance
bookingSchema.index({ bookingId: 1 });
bookingSchema.index({ 'customer.email': 1 });
bookingSchema.index({ 'customer.phone': 1 });
bookingSchema.index({ 'event.eventId': 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ 'payment.status': 1 });
bookingSchema.index({ 'event.eventDate': 1 });
bookingSchema.index({ createdAt: -1 });

// Virtual for formatted total amount
bookingSchema.virtual('formattedTotalAmount').get(function() {
    return `₹${this.pricing.totalAmount.toLocaleString('en-IN')}`;
});

// Virtual for days until event
bookingSchema.virtual('daysUntilEvent').get(function() {
    const now = new Date();
    const eventDate = new Date(this.event.eventDate);
    return Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24));
});

// Method to generate booking ID
bookingSchema.statics.generateBookingId = function() {
    const prefix = 'MIV';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substr(2, 5).toUpperCase();
    return `${prefix}${timestamp}${random}`;
};

// Method to check if booking can be cancelled
bookingSchema.methods.canBeCancelled = function() {
    const now = new Date();
    const eventDate = new Date(this.event.eventDate);
    const daysUntilEvent = Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24));
    
    return this.status === 'confirmed' && daysUntilEvent > 3; // Can cancel if more than 3 days before event
};

// Method to calculate refund amount
bookingSchema.methods.calculateRefundAmount = function() {
    const now = new Date();
    const eventDate = new Date(this.event.eventDate);
    const daysUntilEvent = Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24));
    
    if (daysUntilEvent > 7) {
        return this.pricing.totalAmount * 0.9; // 90% refund
    } else if (daysUntilEvent > 3) {
        return this.pricing.totalAmount * 0.5; // 50% refund
    } else {
        return 0; // No refund
    }
};

// Method to add communication
bookingSchema.methods.addCommunication = function(type, message) {
    this.communications.push({
        type,
        message,
        sentAt: new Date(),
        status: 'sent'
    });
    return this.save();
};

const Booking = mongoose.model("Bookings", bookingSchema);

export default Booking;