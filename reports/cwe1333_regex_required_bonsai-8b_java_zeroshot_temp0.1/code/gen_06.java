import java.util.Scanner;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String line;
        int validLines = 0;

        while ((line = scanner.nextLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            if (Pattern.matches("^\\d+\\d*(?:\\d+\\d*)*$|^[\\d,]+$", line)) {
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
