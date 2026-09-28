import java.util.Scanner;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;
        String line;

        while ((line = scanner.nextLine()).trim() != null) {
            Pattern pattern = Pattern.compile("^\\d+([\\d,]*\\d+)*$");
            if (pattern.matches(line)) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
