import java.util.Scanner;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int count = 0;
        // Regex: ^[\\d]+(?:,[\\d]*)*$
        // Matches one or more digits, followed by zero or more groups of (comma and zero or more digits).
        // This ensures at least one number sequence exists.
        // It allows trailing commas.
        // It does not allow internal spaces or other characters.
        Pattern pattern = Pattern.compile("^[\\d]+(?:,[\\d]*)*$");

        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            // Ignore leading/trailing whitespace by trimming
            String trimmed = line.trim();

            if (pattern.matcher(trimmed).matches()) {
                count++;
            }
        }

        System.out.println("valid=" + count);
    }
}
