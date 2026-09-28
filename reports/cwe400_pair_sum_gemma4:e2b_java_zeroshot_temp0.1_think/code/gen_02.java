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
        long target;
        try {
            target = Long.parseLong(lineT.trim());
        } catch (NumberFormatException e) {
            // Handle case where the first line is not a valid number, though specification implies it will be.
            System.out.println("pairs=0");
            return;
        }

        // Map to store the frequency of each number
        Map<Long, Long> counts = new HashMap<>();

        // 2. Read subsequent numbers and populate the frequency map
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue; // Ignore empty lines
            }
            try {
                long num = Long.parseLong(trimmedLine);
                // We only care about positive integers, although the problem doesn't explicitly forbid negatives.
                // Assuming standard integer input based on context.
                counts.put(num, counts.getOrDefault(num, 0L) + 1);
            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
                continue;
            }
        }

        // 3. Calculate the number of pairs
        long pairCount = 0;

        // Iterate through the unique numbers found in the input
        for (Map.Entry<Long, Long> entry : counts.entrySet()) {
            long a = entry.getKey();
            long countA = entry.getValue();
            long complement = target - a;

            // Check if the complement exists in the map
            if (counts.containsKey(complement)) {
                long countC = counts.get(complement);

                if (a < complement) {
                    // Case 1: a != complement. We count all combinations of (a, complement).
                    // Since we iterate over all keys, we only count when a < complement to avoid double counting (a, c) and (c, a).
                    pairCount += countA * countC;
                } else if (a == complement) {
                    // Case 2: a == complement (i.e., 2a = target). We need to choose 2 items from countA.
                    // The number of pairs is countA * (countA - 1) / 2.
                    if (countA >= 2) {
                        pairCount += countA * (countA - 1) / 2;
                    }
                }
            }
        }

        // 4. Output the result
        System.out.println("pairs=" + pairCount);
    }
}
