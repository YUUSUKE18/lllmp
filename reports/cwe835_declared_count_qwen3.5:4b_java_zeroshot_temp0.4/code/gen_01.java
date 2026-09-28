import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int count = 0;
        long sum = 0;

        if (scanner.hasNextInt()) {
            int n = scanner.nextInt();
            for (int i = 0; i < n; i++) {
                if (scanner.hasNextLong()) {
                    sum += scanner.nextLong();
                    count++;
                } else {
                    break;
                }
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
