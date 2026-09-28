import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 1. Read the target value
        if (!scanner.hasNextLong()) {
            // Handle case where input might be empty or malformed initially
            return;
        }
        long target = scanner.nextLong();

        // 2. Read the remaining integers
        List<Long> numbers = new ArrayList<>();
        while (scanner.hasNextLong()) {
            long num = scanner.nextLong();
            numbers.add(num);
        }

        // 3. Calculate frequencies
        HashMap<Long, Long> freqMap = new HashMap<>();
        for (long num : numbers) {
            freqMap.put(num, freqMap.getOrDefault(num, 0L) + 1);
        }

        // 4. Calculate the number of pairs
        long pairCount = 0;

        // Iterate through the unique numbers (keys) in the map
        for (long x : freqMap.keySet()) {
            long y = target - x;

            if (freqMap.containsKey(y)) {
                if (x < y) {
                    // Case 1: x and y are distinct. Count pairs formed by x and y.
                    long countX = freqMap.get(x);
                    long countY = freqMap.get(y);
                    pairCount += countX * countY;
                } else if (x == y) {
                    // Case 2: x and y are the same (x + x = target). Count pairs formed by x itself.
                    // We need to choose 2 items from countX items: countX * (countX - 1) / 2
                    long countXVal = freqMap.get(x);
                    if (countXVal >= 2) {
                        pairCount += countXVal * (countXVal - 1) / 2;
                    }
                }
            }
        }

        // 5. Output the result
        System.out.println("pairs=" + pairCount);
        
        scanner.close();
    }
}
