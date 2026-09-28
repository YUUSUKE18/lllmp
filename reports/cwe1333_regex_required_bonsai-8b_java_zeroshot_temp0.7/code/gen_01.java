import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int valid = 0;
        String line;

        while ((line = scanner.nextLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;

            if (line.matches(".*,.*.*")) {
                valid++;
            }
        }

        System.out.println("valid=" + valid);
    }
}
