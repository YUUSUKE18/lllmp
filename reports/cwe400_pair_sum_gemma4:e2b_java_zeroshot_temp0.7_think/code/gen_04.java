import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 1. Read the target value
        if (!scanner.hasNextLong()) {
            // Handle case where input might be empty
            return;
        }
        long target = scanner.nextLong();

        // 2. Read the sequence of numbers and build the frequency map
        Map<Long, Long> counts = new HashMap<>();
        
        // Read remaining input tokens as numbers
        while (scanner.hasNextLong()) {
            long num = scanner.nextLong();
            // We only care about positive integers if the problem implies it, 
            // but since the constraints allow 64-bit integers, we process all provided numbers.
            counts.put(num, counts.getOrDefault(num, 0L) + 1);
        }
        
        scanner.close();

        long totalPairs = 0;

        // 3. Iterate through the unique numbers in the map to find pairs
        for (Map.Entry<Long, Long> entry : counts.entrySet()) {
            long x = entry.getKey();
            long countX = entry.getValue();
            
            // Calculate the required complement y
            long y = target - x;

            // Check if y exists in the map
            if (counts.containsKey(y)) {
                long countY = counts.get(y);

                if (x < y) {
                    // Case 1: x and y are distinct (x != y). Count all combinations.
                    // We only count when x < y to ensure each pair {x, y} is counted exactly once.
                    totalPairs += countX * countY;
                } else if (x == y) {
                    // Case 2: x and y are the same (2x = target). Count combinations of the same number.
                    // We need to choose 2 distinct numbers from countX occurrences: C(countX, 2)
                    if (countX >= 2) {
                        totalPairs += countX * (countX - 1) / 2;
                    }
                }
            }
        }

        // 4. Output the result
        System.out.println("pairs=" + totalPairs);
    }
}
