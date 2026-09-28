import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // 1. Read the target value
        String line = br.readLine();
        if (line == null) {
            System.out.println("pairs=0");
            return;
        }
        long target;
        try {
            target = Long.parseLong(line.trim());
        } catch (NumberFormatException e) {
            // Handle case where the first line is not a valid number, though specification implies it will be.
            System.out.println("pairs=0");
            return;
        }

        // 2. Read the remaining numbers and populate frequency map
        Map<Long, Long> frequencyMap = new HashMap<>();
        
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }
            try {
                long num = Long.parseLong(trimmedLine);
                // Store frequency
                frequencyMap.put(num, frequencyMap.getOrDefault(num, 0L) + 1);
            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
                continue;
            }
        }

        // 3. Calculate the number of pairs
        long pairCount = 0;

        // Iterate over the unique numbers found in the input
        for (Map.Entry<Long, Long> entry : frequencyMap.entrySet()) {
            long x = entry.getKey();
            long countX = entry.getValue();
            long y = target - x;

            // Check if the complement y exists in the map
            if (frequencyMap.containsKey(y)) {
                long countY = frequencyMap.get(y);

                if (x < y) {
                    // Case 1: x and y are distinct. Count all combinations.
                    // We only count when x < y to avoid double counting (x, y) and (y, x).
                    pairCount += countX * countY;
                } else if (x == y) {
                    // Case 2: x and y are the same (x + x = target).
                    // We need to choose 2 distinct elements from countX occurrences.
                    // Formula: countX * (countX - 1) / 2
                    pairCount += countX * (countX - 1) / 2;
                }
            }
        }

        // 4. Output the result
        System.out.println("pairs=" + pairCount);
    }
}
