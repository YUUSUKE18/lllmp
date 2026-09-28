import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String line;
        int validCount = 0;

        while ((line = scanner.nextLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;

            if (line.matches("\\d+\\.?\\d*(?:\\d+\\,\\d+)?")) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
