import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String line;
        while ((line = scanner.nextLine()).trim().isEmpty()) {
            line = scanner.nextLine();
        }
        if (line.matches("\\d+\\.\\d+")) {
            System.out.println("valid=1");
        } else if (line.matches("\\d+")) {
            System.out.println("valid=1");
        } else if (line.matches("\\d+\\.\\d+\\d+")) {
            System.out.println("valid=1");
        } else {
            System.out.println("valid=0");
        }
    }
}
