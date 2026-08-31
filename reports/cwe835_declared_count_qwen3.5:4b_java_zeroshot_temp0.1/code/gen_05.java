import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextInt()) {
            int count = scanner.nextInt();
        } else {
            return;
        }

        long sum = 0;
        while (scanner.hasNextLong()) {
            try {
                long value = scanner.nextLong();
                sum += value;
            } catch (Exception e) {
                break;
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
