import java.util.Scanner;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String line;
        int validCount = 0;

        while ((line = scanner.nextLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;

            Pattern pattern = Pattern.compile("^\\d+([\\d,]*\\d+)?$");
            if (pattern.matcher(line).matches()) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
