// Test script to verify Razorpay configuration
import Razorpay from "razorpay";

console.log("🔍 Checking Razorpay Configuration...");

// Check environment variables
const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

console.log("RAZORPAY_KEY_ID:", keyId ? "✅ Set" : "❌ Missing");
console.log("RAZORPAY_KEY_SECRET:", keySecret ? "✅ Set" : "❌ Missing");

if (!keyId || !keySecret) {
    console.log("\n❌ Razorpay configuration incomplete!");
    console.log("Please set the following environment variables:");
    console.log("- RAZORPAY_KEY_ID");
    console.log("- RAZORPAY_KEY_SECRET");
    process.exit(1);
}

// Test Razorpay instance creation
try {
    const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
    });
    console.log("\n✅ Razorpay instance created successfully!");
    console.log("Key ID:", keyId);
} catch (error) {
    console.log("\n❌ Failed to create Razorpay instance:", error.message);
    process.exit(1);
}

console.log("\n🎉 Razorpay configuration is valid!");