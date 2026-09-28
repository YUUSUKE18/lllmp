import java.util.Scanner;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String line;
        int validCount = 0;
        while ((line = scanner.nextLine()).trim().isEmpty()) {
            line = scanner.nextLine().trim();
        }
        while (line != null && !line.isEmpty()) {
            line = line.trim();
            if (Pattern.matches("\\d+(?:\\d+\\,\\d+)*", line)) {
                validCount++;
            }
            line = scanner.nextLine().trim();
        }
        System.out.println("valid=" + validCount);
    }
}
