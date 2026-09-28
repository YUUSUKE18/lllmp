import java.util.Scanner;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String line;
        int validCount = 0;

        while ((line = scanner.nextLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            Matcher matcher = Pattern.compile("^[\\d]+(?:,[\\d]+)*$");
            if (matcher.matches()) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
