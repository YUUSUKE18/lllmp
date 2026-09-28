import java.util.Scanner;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;

            Pattern pattern = Pattern.compile("^[0-9]+(?:[,][0-9]+)*$");
            if (pattern.matcher(line).matches()) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
