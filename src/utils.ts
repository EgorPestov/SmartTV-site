export function formatPhoneNumber(phoneNumber: string) {
    const digits = phoneNumber.replace(/\D/g, '');
    const phoneNumberWithout7 = digits.startsWith('7') ? digits.substring(1) : digits;
    const phoneNumberNumeric = parseInt(phoneNumberWithout7, 10);
    
    return phoneNumberNumeric;
}