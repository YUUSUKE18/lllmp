import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int count = 0;
        // Compile regex once for efficiency
        Pattern pattern = Pattern.compile("^(?!.*,,)[0-9]+(?:,[0-9]+)*(?:,)?$");

        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            if (isValid(line, pattern)) {
                count++;
            }
        }
        System.out.println("valid=" + count);
    }

    private static boolean isValid(String line, Pattern pattern) {
        String trimmed = line.trim();
        // Empty line check
        if (trimmed.isEmpty()) {
            return false;
        }
        // Check regex
        return pattern.matcher(trimmed).matches();
    }
}
