package com.example;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.*;

/**
 * JUnit tests for AvatarGenerator class.
 * 
 * Test Coverage:
 * - Normal cases: Valid names with different genders
 * - Edge cases: Names with spaces, special characters
 * - Invalid cases: Empty strings
 * - Exception cases: Null input
 */
public class AvatarGeneratorTest {

    private static final String BASE_URL = "https://avatar.iran.liara.run/public";

    // =====================================================
    // NORMAL CASES
    // =====================================================

    /**
     * Test 1: Normal case - Male avatar generation
     */
    @Test
    @DisplayName("Normal: Male avatar generates correct URL")
    public void testNormal_MaleAvatar() {
        String result = AvatarGenerator.generateAvatar("John", AvatarGenerator.Gender.MALE);
        assertEquals(BASE_URL + "/boy?username=john", result);
    }

    /**
     * Test 2: Normal case - Female avatar generation
     */
    @Test
    @DisplayName("Normal: Female avatar generates correct URL")
    public void testNormal_FemaleAvatar() {
        String result = AvatarGenerator.generateAvatar("Sarah", AvatarGenerator.Gender.FEMALE);
        assertEquals(BASE_URL + "/girl?username=sarah", result);
    }

    // =====================================================
    // EDGE CASES
    // =====================================================

    /**
     * Test 3: Edge case - Name with multiple spaces
     */
    @Test
    @DisplayName("Edge: Name with spaces is normalized")
    public void testEdge_NameWithSpaces() {
        String result = AvatarGenerator.generateAvatar("John Doe Smith", AvatarGenerator.Gender.MALE);
        assertEquals(BASE_URL + "/boy?username=johndoesmith", result);
    }

    /**
     * Test 4: Edge case - Name with mixed case
     */
    @Test
    @DisplayName("Edge: Mixed case name is lowercased")
    public void testEdge_MixedCaseName() {
        String result = AvatarGenerator.generateAvatar("JoHn DoE", AvatarGenerator.Gender.MALE);
        assertEquals(BASE_URL + "/boy?username=johndoe", result);
    }

    /**
     * Test 5: Edge case - Single character name
     */
    @Test
    @DisplayName("Edge: Single character name works")
    public void testEdge_SingleCharacterName() {
        String result = AvatarGenerator.generateAvatar("A", AvatarGenerator.Gender.FEMALE);
        assertEquals(BASE_URL + "/girl?username=a", result);
    }

    // =====================================================
    // INVALID CASES
    // =====================================================

    /**
     * Test 6: Invalid case - Empty string throws exception
     */
    @Test
    @DisplayName("Invalid: Empty string throws IllegalArgumentException")
    public void testInvalid_EmptyString() {
        assertThrows(IllegalArgumentException.class, () -> {
            AvatarGenerator.generateAvatar("", AvatarGenerator.Gender.MALE);
        });
    }

    /**
     * Test 7: Invalid case - Whitespace only throws exception
     */
    @Test
    @DisplayName("Invalid: Whitespace only throws IllegalArgumentException")
    public void testInvalid_WhitespaceOnly() {
        assertThrows(IllegalArgumentException.class, () -> {
            AvatarGenerator.generateAvatar("   ", AvatarGenerator.Gender.FEMALE);
        });
    }

    // =====================================================
    // EXCEPTION CASES
    // =====================================================

    /**
     * Test 8: Exception case - Null name throws exception
     */
    @Test
    @DisplayName("Exception: Null name throws IllegalArgumentException")
    public void testException_NullName() {
        assertThrows(IllegalArgumentException.class, () -> {
            AvatarGenerator.generateAvatar(null, AvatarGenerator.Gender.MALE);
        });
    }
}
