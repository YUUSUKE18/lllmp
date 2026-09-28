import java.util.Scanner;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Pattern pattern = Pattern.compile("\\d+\\.\\d+|\\d+");
        String line;
        while (scanner.hasNextLine()) {
            line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;
            if (!pattern.matcher(line).find()) continue;
            int count = 0;
            for (String token : line.split(",")) {
                if (token.isEmpty()) continue;
                if (token.matches("\\d+\\.\\d+")) count++;
                else if (token.matches("\\d+")) count++;
            }
            if (count >= 2) {
                System.out.println("valid=2");
            }
        }
    }
}
