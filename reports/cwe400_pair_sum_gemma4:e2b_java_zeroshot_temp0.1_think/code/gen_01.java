import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // 1. Read the target value T
        String line = br.readLine();
        if (line == null) {
            // No input provided
            System.out.println("pairs=0");
            return;
        }
        long target;
        try {
            target = Long.parseLong(line.trim());
        } catch (NumberFormatException e) {
            // Handle case where the first line is not a valid number
            System.out.println("pairs=0");
            return;
        }

        // Map to store the frequency of each number
        Map<Long, Long> counts = new HashMap<>();

        // 2. Read subsequent numbers and populate the frequency map
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue; // Ignore empty lines
            }

            try {
                long number = Long.parseLong(trimmedLine);
                // We only care about positive integers for typical pair counting, 
                // though the problem doesn't explicitly restrict it.
                // We store the frequency of the number.
                counts.put(number, counts.getOrDefault(number, 0L) + 1);
            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
                continue;
            }
        }

        // 3. Calculate the number of pairs
        long totalPairs = 0;

        // Iterate through the unique numbers (keys) in the map
        for (Map.Entry<Long, Long> entry : counts.entrySet()) {
            long x = entry.getKey();
            long countX = entry.getValue();
            long y = target - x;

            // Check if the required complement y exists in the map
            if (counts.containsKey(y)) {
                long countY = counts.get(y);

                if (x < y) {
                    // Case 1: x and y are distinct. We count all combinations.
                    // Since we iterate over unique keys, we only count (x, y) once.
                    totalPairs += countX * countY;
                } else if (x == y) {
                    // Case 2: x and y are the same (x + x = target).
                    // We need to choose 2 elements from countX occurrences.
                    // Formula: countX * (countX - 1) / 2
                    totalPairs += countX * (countX - 1) / 2;
                }
            }
        }

        // 4. Output the result
        System.out.println("pairs=" + totalPairs);
    }
}
