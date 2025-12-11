package com.example;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.*;

/**
 * JUnit tests for PhoneFormatter class.
 * 
 * These tests cover all 5 independent paths identified in the Control Flow
 * Graph.
 * Cyclomatic Complexity: 5
 * 
 * Path Coverage:
 * - Path 1: length == 0 (empty input or non-digits only)
 * - Path 2: 0 < length <= 3
 * - Path 3: 3 < length <= 6
 * - Path 4: 6 < length <= 9
 * - Path 5: length > 9
 */
public class PhoneFormatterTest {

    // =====================================================
    // PATH 1 TESTS: length == 0
    // =====================================================

    @Test
    @DisplayName("Path 1: Empty string input returns empty string")
    public void testPath1_EmptyInput() {
        String result = PhoneFormatter.formatPhoneNumber("");
        assertEquals("", result);
    }

    @Test
    @DisplayName("Path 1: Non-digits only input returns empty string")
    public void testPath1_NonDigitsOnly() {
        String result = PhoneFormatter.formatPhoneNumber("abc");
        assertEquals("", result);
    }

    @Test
    @DisplayName("Path 1: Special characters only returns empty string")
    public void testPath1_SpecialCharsOnly() {
        String result = PhoneFormatter.formatPhoneNumber("(+) - ");
        assertEquals("", result);
    }

    // =====================================================
    // PATH 2 TESTS: 0 < length <= 3
    // =====================================================

    @Test
    @DisplayName("Path 2: Single digit formats correctly")
    public void testPath2_OneDigit() {
        String result = PhoneFormatter.formatPhoneNumber("1");
        assertEquals("(+2) 1", result);
    }

    @Test
    @DisplayName("Path 2: Three digits format correctly")
    public void testPath2_ThreeDigits() {
        String result = PhoneFormatter.formatPhoneNumber("123");
        assertEquals("(+2) 123", result);
    }

    @Test
    @DisplayName("Path 2: Three digits with noise format correctly")
    public void testPath2_ThreeDigitsWithNoise() {
        String result = PhoneFormatter.formatPhoneNumber("1-2-3");
        assertEquals("(+2) 123", result);
    }

    // =====================================================
    // PATH 3 TESTS: 3 < length <= 6
    // =====================================================

    @Test
    @DisplayName("Path 3: Four digits format correctly")
    public void testPath3_FourDigits() {
        String result = PhoneFormatter.formatPhoneNumber("1234");
        assertEquals("(+2) 123 4", result);
    }

    @Test
    @DisplayName("Path 3: Six digits format correctly")
    public void testPath3_SixDigits() {
        String result = PhoneFormatter.formatPhoneNumber("123456");
        assertEquals("(+2) 123 456", result);
    }

    // =====================================================
    // PATH 4 TESTS: 6 < length <= 9
    // =====================================================

    @Test
    @DisplayName("Path 4: Seven digits format correctly")
    public void testPath4_SevenDigits() {
        String result = PhoneFormatter.formatPhoneNumber("1234567");
        assertEquals("(+2) 123 456 7", result);
    }

    @Test
    @DisplayName("Path 4: Nine digits format correctly")
    public void testPath4_NineDigits() {
        String result = PhoneFormatter.formatPhoneNumber("123456789");
        assertEquals("(+2) 123 456 789", result);
    }

    // =====================================================
    // PATH 5 TESTS: length > 9
    // =====================================================

    @Test
    @DisplayName("Path 5: Ten digits format correctly")
    public void testPath5_TenDigits() {
        String result = PhoneFormatter.formatPhoneNumber("1234567890");
        assertEquals("(+2) 123 456 789 0", result);
    }

    @Test
    @DisplayName("Path 5: Eleven digits format correctly (full Egyptian number)")
    public void testPath5_ElevenDigits() {
        String result = PhoneFormatter.formatPhoneNumber("01124555246");
        assertEquals("(+2) 011 245 552 46", result);
    }

    @Test
    @DisplayName("Path 5: Twelve digits truncates to 11")
    public void testPath5_TwelveDigits() {
        String result = PhoneFormatter.formatPhoneNumber("012345678901");
        assertEquals("(+2) 012 345 678 90", result);
    }

    @Test
    @DisplayName("Path 5: Input with existing country code prefix")
    public void testPath5_WithCountryCodePrefix() {
        String result = PhoneFormatter.formatPhoneNumber("(+2) 011 245 552 46");
        // After removing non-digits, we get "201124555246" (12 digits)
        assertEquals("(+2) 201 124 555 24", result);
    }

    // =====================================================
    // BOUNDARY VALUE TESTS
    // =====================================================

    @Test
    @DisplayName("BVA: Boundary at length 3 (upper bound of Path 2)")
    public void testBoundary_Length3() {
        String result = PhoneFormatter.formatPhoneNumber("012");
        assertEquals("(+2) 012", result);
    }

    @Test
    @DisplayName("BVA: Boundary at length 4 (lower bound of Path 3)")
    public void testBoundary_Length4() {
        String result = PhoneFormatter.formatPhoneNumber("0123");
        assertEquals("(+2) 012 3", result);
    }

    @Test
    @DisplayName("BVA: Boundary at length 6 (upper bound of Path 3)")
    public void testBoundary_Length6() {
        String result = PhoneFormatter.formatPhoneNumber("012345");
        assertEquals("(+2) 012 345", result);
    }

    @Test
    @DisplayName("BVA: Boundary at length 7 (lower bound of Path 4)")
    public void testBoundary_Length7() {
        String result = PhoneFormatter.formatPhoneNumber("0123456");
        assertEquals("(+2) 012 345 6", result);
    }

    @Test
    @DisplayName("BVA: Boundary at length 9 (upper bound of Path 4)")
    public void testBoundary_Length9() {
        String result = PhoneFormatter.formatPhoneNumber("012345678");
        assertEquals("(+2) 012 345 678", result);
    }

    @Test
    @DisplayName("BVA: Boundary at length 10 (lower bound of Path 5)")
    public void testBoundary_Length10() {
        String result = PhoneFormatter.formatPhoneNumber("0123456789");
        assertEquals("(+2) 012 345 678 9", result);
    }
}
