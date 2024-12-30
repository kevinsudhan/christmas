export const sendWhatsAppMessage = async (phoneNumber: string) => {
    try {
        // Format the phone number (remove any spaces, dashes, etc.)
        const formattedNumber = phoneNumber.replace(/\D/g, '');
        
        // Add country code if not present (assuming Indian numbers)
        const fullNumber = formattedNumber.startsWith('91') 
            ? formattedNumber 
            : `91${formattedNumber}`;

        console.log('Sending WhatsApp message to:', fullNumber);
        console.log('Using Phone Number ID:', import.meta.env.VITE_WHATSAPP_PHONE_NUMBER_ID);

        // Use WhatsApp Cloud API directly
        const response = await fetch(`https://graph.facebook.com/v17.0/${import.meta.env.VITE_WHATSAPP_PHONE_NUMBER_ID}/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_WHATSAPP_ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messaging_product: "whatsapp",
                recipient_type: "individual",
                to: fullNumber,
                type: "text",
                text: {
                    preview_url: false,
                    body: "Thank you for contacting EBS. We will be with you soon!"
                }
            })
        });

        const responseData = await response.json();
        console.log('WhatsApp API Response:', responseData);

        if (!response.ok) {
            throw new Error(`Failed to send WhatsApp message: ${JSON.stringify(responseData)}`);
        }

        return true;
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        throw error;
    }
};
