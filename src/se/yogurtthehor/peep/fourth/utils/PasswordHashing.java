package se.yogurtthehor.peep.fourth.utils;

import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

public class PasswordHashing {
    private static final int iterations = 20 * 1000;
    private static final int saltLen = 32;
    private static final int desiredKeyLen = 256;

    /**
     * Computes a salted PBKDF2 hash of given plaintext password
     * suitable for storing in a database.
     * Empty passwords are not supported.
     */
    public static String getSaltedHash(String password) {
        byte[] salt = new byte[0];
        try {
            salt = SecureRandom.getInstance("SHA1PRNG").generateSeed(saltLen);
            return Base64.getEncoder().encodeToString(salt) + "$" + hash(password, salt);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return "";
    }

    /**
     * Checks whether given plaintext password corresponds
     * to a stored salted hash of the password.
     */
    public static boolean check(String password, String stored) throws Exception {
        String[] saltAndHash = stored.split("\\$");
        if (saltAndHash.length != 2) {
            throw new IllegalStateException(
                    "The stored password must have the form 'salt$hash'");
        }
        String hashOfInput = hash(password, Base64.getDecoder().decode(saltAndHash[0]));
        return hashOfInput.equals(saltAndHash[1]);
    }

    // using PBKDF2 from Sun, an alternative is https://github.com/wg/scrypt
    // cf. http://www.unlimitednovelty.com/2012/03/dont-use-bcrypt.html
    private static String hash(String password, byte[] salt) throws Exception {
        if (password == null || password.length() == 0)
            throw new IllegalArgumentException("Empty passwords are not supported.");
        SecretKeyFactory f = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
        SecretKey key = f.generateSecret(
                new PBEKeySpec(
                        password.toCharArray(), salt, iterations, desiredKeyLen
                )
        );
        return Base64.getEncoder().encodeToString(key.getEncoded());
    }
}
