import java.util.Scanner;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Pattern pattern = Pattern.compile("^\\s*(\\d+(?:[\\s,]+\\d+)*[\\s,]?\\d+\\s*$");
        int validCount = 0;
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (pattern.matches(line)) {
                validCount++;
            }
        }
        System.out.println("valid=" + validCount);
    }
}
