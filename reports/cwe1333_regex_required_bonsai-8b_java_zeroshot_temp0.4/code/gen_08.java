import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validLines = 0;
        String line;
        while ((line = scanner.nextLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            if (line.matches(".*[0-9]+.*")) {
                validLines++;
            }
        }
        System.out.println("valid=" + validLines);
    }
}
