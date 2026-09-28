import java.util.Scanner;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Pattern pattern = Pattern.compile("^[0-9]+(?:,[0-9]+)*$");
        int validLines = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;
            if (pattern.matches(line)) validLines++;
        }

        System.out.println("valid=" + validLines);
    }
}
