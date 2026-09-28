import java.util.Scanner;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validLines = 0;
        String validLine = "";

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;
            if (Pattern.matches("^\\d+($|,\\d+)*$", line)) {
                validLines++;
                validLine = line;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
