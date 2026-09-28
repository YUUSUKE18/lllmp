import java.util.Scanner;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String line;
        while (scanner.hasNextLine()) {
            line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;
            Pattern pattern = Pattern.compile("^-+\\d+(-\\d+)?$");
            Matcher matcher = pattern.matcher(line);
            if (matcher.matches()) {
                if (matcher.group(1).length() > 1) {
                    System.out.println("valid=2");
                }
            }
        }
    }
}
