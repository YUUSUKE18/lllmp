import java.util.Scanner;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = "";
        while (scanner.hasNextLine()) {
            input += scanner.nextLine();
        }
        scanner.close();

        String trimmedInput = input.trim();
        if (trimmedInput.isEmpty()) {
            System.out.println("valid=0");
            return;
        }

        Pattern pattern = Pattern.compile("\\d+\\d*[,]\\d+\\d*");
        String[] parts = trimmedInput.split(",");
        int validLines = 0;

        for (String part : parts) {
            if (Pattern.matches("\\d+\\d*\\.?\\d*\\.?$", part)) {
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
