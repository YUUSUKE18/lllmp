import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String line;
        int count = 0;
        while ((line = scanner.nextLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            if (line.matches(".*[0-9,].*")) {
                count++;
            }
        }
        System.out.println("valid=" + count);
    }
}
