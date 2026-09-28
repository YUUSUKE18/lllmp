import java.util.Scanner;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = "";
        while (scanner.hasNextLine()) {
            input += scanner.nextLine();
        }
        String[] lines = input.trim().split("\\r?\\n+");
        int validLines = 0;
        for (String line : lines) {
            line = line.trim();
            if (line.isEmpty()) continue;
            if (Pattern.matches("^-\\d+([\\d,]+)$", line)) {
                validLines++;
            }
        }
        System.out.println("valid=" + validLines);
    }
}
