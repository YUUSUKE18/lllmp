import java.util.Scanner;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String line;
        int count = 0;

        while ((line = scanner.nextLine()).trim() != null) {
            if (Pattern.matches("^\\d+(?:,\\d+)*$", line)) {
                count++;
            }
        }

        System.out.println("valid=" + count);
    }
}
