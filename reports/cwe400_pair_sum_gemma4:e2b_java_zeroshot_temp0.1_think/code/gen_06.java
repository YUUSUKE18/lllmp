import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // 1. Read the target value T
        String lineT = br.readLine();
        if (lineT == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(lineT.trim());

        // 2. Read the remaining numbers and populate the frequency map
        Map<Long, Long> counts = new HashMap<>();
        String line;

        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            try {
                long number = Long.parseLong(line);
                // Store frequency
                counts.put(number, counts.getOrDefault(number, 0L) + 1);
            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
                continue;
            }
        }

        // 3. Calculate the number of pairs
        long pairCount = 0;

        // Iterate over the unique numbers (keys) in the map
        for (Map.Entry<Long, Long> entry : counts.entrySet()) {
            long x = entry.getKey();
            long countX = entry.getValue();
            long y = target - x;

            // Check if the complement y exists in the map
            if (counts.containsKey(y)) {
                long countY = counts.get(y);

                if (x < y) {
                    // Case 1: x and y are distinct. Count all combinations.
                    // We only count pairs (x, y) once by enforcing x < y.
                    pairCount += countX * countY;
                } else if (x == y) {
                    // Case 2: x and y are the same (x + x = target).
                    // We need to choose 2 elements from countX occurrences.
                    // Formula: n * (n - 1) / 2
                    pairCount += countX * (countX - 1) / 2;
                }
            }
        }

        // 4. Output the result
        System.out.println("pairs=" + pairCount);
    }
}
