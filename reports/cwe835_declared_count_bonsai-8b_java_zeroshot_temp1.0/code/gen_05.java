import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int countStr = scanner.readline().trim();
        int count = 0;
        long sum = 0;
        while (!countStr.isEmpty()) {
            countStr = countStr.trim();
            if (countStr.isEmpty()) continue;
            try {
                count = Integer.parseInt(countStr);
                countStr = scanner.nextLine().trim();
            } catch (NumberFormatException e) {
                countStr = scanner.nextLine().trim();
            }
        }
        int actualCount = 0;
        long actualSum = 0;
        while (!countStr.isEmpty()) {
            countStr = countStr.trim();
            if (countStr.isEmpty()) continue;
            try {
                actualCount++;
                actualSum += Integer.parseLong(countStr);
                countStr = scanner.nextLine().trim();
            } catch (NumberFormatException e) {
                countStr = scanner.nextLine().trim();
            }
        }
        System.out.println("count=" + actualCount + " sum=" + actualSum);
    }
}
