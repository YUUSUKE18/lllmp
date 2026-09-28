import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 1. Read the target value T
        if (!scanner.hasNextLong()) {
            // Handle case where input is empty
            System.out.println("pairs=0");
            return;
        }
        long target = scanner.nextLong();

        // 2. Read all subsequent integers and build the frequency map
        Map<Long, Long> frequencyMap = new HashMap<>();
        
        // Read remaining tokens (the sequence of numbers)
        while (scanner.hasNextLong()) {
            long num = scanner.nextLong();
            // Store frequency
            frequencyMap.put(num, frequencyMap.getOrDefault(num, 0L) + 1);
        }

        scanner.close();

        // 3. Calculate the number of pairs
        long pairCount = 0;

        // Iterate through the unique numbers (x) and their frequencies (count_x)
        for (Map.Entry<Long, Long> entry : frequencyMap.entrySet()) {
            long x = entry.getKey();
            long countX = entry.getValue();
            long y = target - x;

            // Check if the complement y exists in the map
            if (frequencyMap.containsKey(y)) {
                long countY = frequencyMap.get(y);

                if (x < y) {
                    // Case 1: x and y are distinct. We count all combinations of x and y.
                    // Since we iterate over unique keys, we only count (x, y) once.
                    pairCount += countX * countY;
                } else if (x == y) {
                    // Case 2: x and y are the same (x + x = target).
                    // We need to choose 2 elements from countX occurrences.
                    // Formula: countX * (countX - 1) / 2
                    pairCount += countX * (countX - 1) / 2;
                }
            }
        }

        // 4. Output the result
        System.out.println("pairs=" + pairCount);
    }
}
