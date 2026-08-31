import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long count = 0;
        long sum = 0;

        while (scanner.hasNext()) {
            if (!scanner.hasNextInt()) break;
            int value = scanner.nextInt();
            if (!scanner.hasNextLong()) break;
            long repeat = scanner.nextLong();

            if (value != 0 || repeat > 0) {
                count += repeat;
                sum += value * repeat;
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
