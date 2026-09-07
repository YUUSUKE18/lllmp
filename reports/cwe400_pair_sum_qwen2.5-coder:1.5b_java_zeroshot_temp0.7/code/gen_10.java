import java.util.HashSet;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long targetValue = Long.parseLong(scanner.nextLine());
        HashSet<Long> seenNumbers = new HashSet<>();
        int pairCount = 0;

        while (scanner.hasNextLong()) {
            long number = scanner.nextLong();
            if (seenNumbers.contains(targetValue - number)) {
                pairCount++;
            }
            seenNumbers.add(number);
        }

        System.out.println("pairs=" + pairCount);
    }
}
