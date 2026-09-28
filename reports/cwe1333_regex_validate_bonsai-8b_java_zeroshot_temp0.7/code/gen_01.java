import java.util.Scanner;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int valid = 0;
        String line;
        while ((line = scanner.nextLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            if (Pattern.matches("^[\\d,]+$", line)) {
                valid++;
            }
        }
        System.out.println("valid=" + valid);
    }
}
