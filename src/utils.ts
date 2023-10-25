export function formatPhoneNumber(phoneNumber: string) {
    const digits = phoneNumber.replace(/\D/g, '');
    
    const phoneNumberNumeric = parseInt(digits, 10);
    
    return phoneNumberNumeric;
}