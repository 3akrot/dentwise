package com.example;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.*;

/**
 * JUnit tests for PhoneFormatter class.
 * 
 * Test Coverage Strategy:
 * - Normal cases: Valid phone numbers of varying lengths
 * - Edge cases: Boundary values at length transitions
 * - Invalid cases: Non-digit inputs, empty strings
 * - Exception cases: Null input handling
 * 
 * Cyclomatic Complexity: 5 (5 independent paths)
 */
public class PhoneFormatterTest {

    // =====================================================
    // NORMAL CASES
    // =====================================================

    /**
     * Test 1: Normal case - Full Egyptian phone number (11 digits)
     * Path 5: length > 9
     */
    @Test
    @DisplayName("Normal: Full Egyptian phone number formats correctly")
    public void testNormal_FullEgyptianNumber() {
        String result = PhoneFormatter.formatPhoneNumber("01124555246");
        assertEquals("(+2) 011 245 552 46", result);
    }

    /**
     * Test 2: Normal case - 6 digits (medium length)
     * Path 3: 3 < length <= 6
     */
    @Test
    @DisplayName("Normal: Six digit number formats correctly")
    public void testNormal_SixDigits() {
        String result = PhoneFormatter.formatPhoneNumber("123456");
        assertEquals("(+2) 123 456", result);
    }

    // =====================================================
    // EDGE CASES (Boundary Values)
    // =====================================================

    /**
     * Test 3: Edge case - Exactly 3 digits (boundary between Path 2 and 3)
     * Path 2: 0 < length <= 3
     */
    @Test
    @DisplayName("Edge: Boundary at exactly 3 digits")
    public void testEdge_ThreeDigits() {
        String result = PhoneFormatter.formatPhoneNumber("123");
        assertEquals("(+2) 123", result);
    }

    /**
     * Test 4: Edge case - Exactly 9 digits (boundary between Path 4 and 5)
     * Path 4: 6 < length <= 9
     */
    @Test
    @DisplayName("Edge: Boundary at exactly 9 digits")
    public void testEdge_NineDigits() {
        String result = PhoneFormatter.formatPhoneNumber("123456789");
        assertEquals("(+2) 123 456 789", result);
    }

    /**
     * Test 5: Edge case - Single digit (minimum valid input)
     * Path 2: 0 < length <= 3
     */
    @Test
    @DisplayName("Edge: Single digit minimum valid input")
    public void testEdge_SingleDigit() {
        String result = PhoneFormatter.formatPhoneNumber("5");
        assertEquals("(+2) 5", result);
    }

    // =====================================================
    // INVALID CASES
    // =====================================================

    /**
     * Test 6: Invalid case - Empty string input
     * Path 1: length == 0
     */
    @Test
    @DisplayName("Invalid: Empty string returns empty string")
    public void testInvalid_EmptyString() {
        String result = PhoneFormatter.formatPhoneNumber("");
        assertEquals("", result);
    }

    /**
     * Test 7: Invalid case - Non-digit characters only
     * Path 1: length == 0 (after filtering)
     */
    @Test
    @DisplayName("Invalid: Non-digit characters return empty string")
    public void testInvalid_NonDigitsOnly() {
        String result = PhoneFormatter.formatPhoneNumber("abc!@#$%");
        assertEquals("", result);
    }

    // =====================================================
    // EXCEPTION CASES
    // =====================================================

    /**
     * Test 8: Exception case - Null input throws NullPointerException
     * Tests robustness of the method against null input
     */
    @Test
    @DisplayName("Exception: Null input throws NullPointerException")
    public void testException_NullInput() {
        assertThrows(NullPointerException.class, () -> {
            PhoneFormatter.formatPhoneNumber(null);
        });
    }
}
