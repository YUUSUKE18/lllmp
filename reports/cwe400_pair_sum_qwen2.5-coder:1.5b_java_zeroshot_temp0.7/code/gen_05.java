import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long target = Long.parseLong(scanner.nextLine());
        int count = 0;

        while (scanner.hasNextInt()) {
            int num = scanner.nextInt();
            if (num < target) {
                count++;
            }
        }

        System.out.println("pairs=" + count);
    }
}
