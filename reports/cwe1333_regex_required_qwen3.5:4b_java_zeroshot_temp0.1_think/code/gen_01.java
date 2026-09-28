import java.util.Scanner;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int count = 0;
        // Regex: Start with one or more digits, followed by zero or more groups of (comma + one or more digits), optionally ending with a comma.
        Pattern pattern = Pattern.compile("^[0-9]+(,[0-9]+)*,?$");

        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            // Trim leading and trailing whitespace as per specification
            String trimmed = line.trim();

            // Check validity using regex
            if (pattern.matcher(trimmed).matches()) {
                count++;
            }
        }

        System.out.println("valid=" + count);
    }
}
