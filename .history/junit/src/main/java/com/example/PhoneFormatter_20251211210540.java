package com.example;

/**
 * Phone number formatter for Egyptian phone numbers.
 * Ported from TypeScript: src/lib/utils.ts formatPhoneNumber function.
 * 
 * Control Flow Graph has 5 independent paths based on input length.
 */
public class PhoneFormatter {

    /**
     * Formats a phone number with Egyptian country code (+2).
     * 
     * @param phonenumber The raw phone number input (may contain non-digits)
     * @return Formatted phone number string
     * 
     *         Path 1: length == 0 → returns ""
     *         Path 2: length <= 3 → returns "(+2) XXX"
     *         Path 3: length <= 6 → returns "(+2) XXX XXX"
     *         Path 4: length <= 9 → returns "(+2) XXX XXX XXX"
     *         Path 5: length > 9 → returns "(+2) XXX XXX XXX XX"
     */
    public static String formatPhoneNumber(String phonenumber) {
        // Node 1: Remove all non-digits
        phonenumber = phonenumber.replaceAll("[^0-9]", "").trim();

        // Node 2: Decision - length == 0 (Path 1)
        if (phonenumber.length() == 0) {
            return "";
        }

        // Node 4: Decision - length <= 3 (Path 2)
        if (phonenumber.length() <= 3) {
            return "(+2) " + phonenumber;
        }

        // Node 6: Decision - length <= 6 (Path 3)
        if (phonenumber.length() <= 6) {
            return "(+2) " + phonenumber.substring(0, 3) + " " + phonenumber.substring(3);
        }

        // Node 8: Decision - length <= 9 (Path 4)
        if (phonenumber.length() <= 9) {
            return "(+2) " + phonenumber.substring(0, 3) + " " +
                    phonenumber.substring(3, 6) + " " + phonenumber.substring(6);
        }

        // Node 10: Default return - length > 9 (Path 5)
        return "(+2) " + phonenumber.substring(0, 3) + " " +
                phonenumber.substring(3, 6) + " " +
                phonenumber.substring(6, 9) + " " +
                phonenumber.substring(9, Math.min(11, phonenumber.length()));
    }
}
