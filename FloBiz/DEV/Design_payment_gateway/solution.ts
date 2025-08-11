// FloBiz Payment Gateway Design Solution

// Represents the data needed to process a payment.
interface PaymentDetails {
    amount: number;
    currency: string;
    transactionId: string;
    // we can add other fields as needed, e.g., userId, orderId, card details, etc.
}

// Represents the status of a payment transaction.
interface PaymentStatus {
    status: 'pending' | 'success' | 'failed';
    message: string;
    gatewayTransactionId: string | null;
}

/**
 * An abstract class defining the contract for all payment gateways.
 * This class serves as the core of our payment system, establishing a common
 * interface that all concrete gateway implementations must follow.
 *
 * This design adheres to the Open-Closed Principle (OCP) by making the system
 * "closed for modification" but "open for extension". New gateways can be
 * added without changing existing code.
 */

abstract class PaymentGateway {
    // A simple logging method, demonstrating the Single Responsibility Principle (SRP).
    // This method is responsible solely for logging. In a real-world app, this
    // would likely be a separate service.
    protected logTransaction(message: string): void {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] [PaymentGateway] ${message}`);
    }

    /**
     * Abstract method to process a payment. Each concrete class must provide
     * its own specific implementation based on the gateway's API.
     * @param details The payment details.
     * @returns A promise resolving to the payment status.
     */
    abstract processPayment(details: PaymentDetails): Promise<PaymentStatus>;

    /**
     * Abstract method to get the status of a payment.
     * @param transactionId The ID of the transaction to check.
     * @returns A promise resolving to the payment status.
     */
    abstract getPaymentStatus(transactionId: string): Promise<PaymentStatus>;
}

/**
 * Concrete implementation for the Paytm payment gateway.
 * This class is responsible for all logic related to the Paytm API.
 * This separation of concerns aligns with the Single Responsibility Principle (SRP).
 */
class PaytmPayment extends PaymentGateway {
    // In a real application, this would contain logic to call the Paytm API.
    async processPayment(details: PaymentDetails): Promise<PaymentStatus> {
        this.logTransaction(`Processing Paytm payment for amount ${details.amount} with ID ${details.transactionId}`);
        // Simulate an API call and response
        return {
            status: 'success',
            message: 'Payment successfully processed by Paytm.',
            gatewayTransactionId: `ptm_${details.transactionId}`
        };
    }

    // In a real application, this would call the Paytm API to check status.
    async getPaymentStatus(transactionId: string): Promise<PaymentStatus> {
        this.logTransaction(`Fetching status for Paytm transaction ID ${transactionId}`);
        // Simulate fetching status
        return {
            status: 'success',
            message: 'Paytm payment status is confirmed.',
            gatewayTransactionId: `ptm_${transactionId}`
        };
    }
}

/**
 * Concrete implementation for the PayPal payment gateway.
 * Adheres to SRP by handling only PayPal-specific logic.
 */
class PayPalPayment extends PaymentGateway {
    // Logic specific to the PayPal API.
    async processPayment(details: PaymentDetails): Promise<PaymentStatus> {
        this.logTransaction(`Processing PayPal payment for amount ${details.amount} with ID ${details.transactionId}`);
        // Simulate an API call and response
        return {
            status: 'success',
            message: 'Payment successfully processed by PayPal.',
            gatewayTransactionId: `pp_${details.transactionId}`
        };
    }

    // Logic to check the status of a payment via the PayPal API.
    async getPaymentStatus(transactionId: string): Promise<PaymentStatus> {
        this.logTransaction(`Fetching status for PayPal transaction ID ${transactionId}`);
        // Simulate fetching status
        return {
            status: 'success',
            message: 'PayPal payment status is confirmed.',
            gatewayTransactionId: `pp_${transactionId}`
        };
    }
}

/**
 * Concrete implementation for the Razorpay payment gateway.
 * Adheres to SRP by handling only Razorpay-specific logic.
 */
class RazorpayPayment extends PaymentGateway {
    // Logic specific to the Razorpay API.
    async processPayment(details: PaymentDetails): Promise<PaymentStatus> {
        this.logTransaction(`Processing Razorpay payment for amount ${details.amount} with ID ${details.transactionId}`);
        // Simulate a potential failure for demonstration
        const shouldFail = Math.random() < 0.2;
        if (shouldFail) {
            return {
                status: 'failed',
                message: 'Payment failed due to an API error.',
                gatewayTransactionId: null
            };
        }

        // Simulate an API call and response
        return {
            status: 'success',
            message: 'Payment successfully processed by Razorpay.',
            gatewayTransactionId: `rzp_${details.transactionId}`
        };
    }

    // Logic to check the status of a payment via the Razorpay API.
    async getPaymentStatus(transactionId: string): Promise<PaymentStatus> {
        this.logTransaction(`Fetching status for Razorpay transaction ID ${transactionId}`);
        // Simulate fetching status
        return {
            status: 'pending', // Razorpay payments might have a pending state
            message: 'Razorpay payment is still pending confirmation.',
            gatewayTransactionId: `rzp_${transactionId}`
        };
    }
}

/**
 * Client code that uses the PaymentGateway abstraction.
 * This class doesn't need to know the specific gateway implementation.
 * This is the core of the OCP. We can add new gateways without touching this code.
 */
class PaymentProcessor {
    constructor(private gateway: PaymentGateway) {}

    async makePayment(details: PaymentDetails): Promise<PaymentStatus> {
        return this.gateway.processPayment(details);
    }

    async checkPaymentStatus(transactionId: string): Promise<PaymentStatus> {
        return this.gateway.getPaymentStatus(transactionId);
    }
}


// --- Usage Example ---
// This part demonstrates how the system works without knowing the specific gateways.

// The system can be configured with any gateway instance at runtime.
const paytmGateway = new PaytmPayment();
const payPalGateway = new PayPalPayment();
const razorpayGateway = new RazorpayPayment();

// Create payment processors for each gateway.
const paytmProcessor = new PaymentProcessor(paytmGateway);
const payPalProcessor = new PaymentProcessor(payPalGateway);
const razorpayProcessor = new PaymentProcessor(razorpayGateway);

// A simple function to run the example
async function runExample() {
    const paymentDetails = {
        amount: 500,
        currency: 'INR',
        transactionId: 'txn_12345'
    };

    console.log('\n--- Processing payments with different gateways ---\n');

    // Process a payment with Paytm
    const paytmResult = await paytmProcessor.makePayment(paymentDetails);
    console.log('Paytm Result:', paytmResult);

    const paytmPaymentStatusResult = await paytmProcessor.checkPaymentStatus(paymentDetails.transactionId);
    console.log('Paytm payment status Result:', paytmPaymentStatusResult);
    
    // Process a payment with PayPal
    const payPalResult = await payPalProcessor.makePayment(paymentDetails);
    console.log('PayPal Result:', payPalResult);
    
    // Process a payment with Razorpay
    const razorpayResult = await razorpayProcessor.makePayment(paymentDetails);
    console.log('Razorpay Result:', razorpayResult);
}

runExample();
