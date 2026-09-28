import java.util.Scanner;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String line;
        int validLines = 0;

        while ((line = scanner.nextLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;

            Pattern pattern = Pattern.compile("^-+\\d+(-\\d+)*$");
            Matcher matcher = pattern.matcher(line);

            if (matcher.matches()) {
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
