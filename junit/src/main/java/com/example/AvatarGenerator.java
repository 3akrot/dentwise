package com.example;

/**
 * Avatar URL generator.
 * Ported from TypeScript: src/lib/utils.ts generateAvatar function.
 */
public class AvatarGenerator {

    private static final String BASE_URL = "https://avatar.iran.liara.run/public";

    public enum Gender {
        MALE, FEMALE
    }

    /**
     * Generates an avatar URL based on name and gender.
     * 
     * @param name   The user's name
     * @param gender The user's gender (MALE or FEMALE)
     * @return The generated avatar URL
     * @throws IllegalArgumentException if name is null or empty
     */
    public static String generateAvatar(String name, Gender gender) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be null or empty");
        }

        String username = name.replaceAll("\\s+", "").toLowerCase();

        if (gender == Gender.FEMALE) {
            return BASE_URL + "/girl?username=" + username;
        }
        // Default to boy
        return BASE_URL + "/boy?username=" + username;
    }
}
