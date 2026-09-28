import java.util.Scanner;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validLines = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;

            Pattern pattern = Pattern.compile("^\\d+($|,\\d+)*$");
            if (pattern.matcher(line).matches()) {
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
