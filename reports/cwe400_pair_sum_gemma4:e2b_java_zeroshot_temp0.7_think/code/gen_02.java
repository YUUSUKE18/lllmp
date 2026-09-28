import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

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
            // Handle case where the first line is not a valid number
            System.out.println("pairs=0");
            return;
        }

        // 2. Read the subsequent numbers
        List<Long> numbers = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }
            try {
                long number = Long.parseLong(trimmedLine);
                numbers.add(number);
            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
                continue;
            }
        }

        if (numbers.isEmpty()) {
            System.out.println("pairs=0");
            return;
        }

        // 3. Calculate frequencies of the numbers
        Map<Long, Long> counts = new HashMap<>();
        for (long num : numbers) {
            counts.put(num, counts.getOrDefault(num, 0L) + 1);
        }

        // 4. Calculate the number of pairs
        long pairCount = 0;

        // Iterate through the unique numbers found in the input
        for (Map.Entry<Long, Long> entry : counts.entrySet()) {
            long x = entry.getKey();
            long countX = entry.getValue();
            long y = target - x;

            if (counts.containsKey(y)) {
                long countY = counts.get(y);

                if (x == y) {
                    // Case 1: x + x = target (e.g., 4 + 4 = 8)
                    // We need to choose 2 elements from countX occurrences: countX * (countX - 1) / 2
                    pairCount += countX * (countX - 1) / 2;
                } else if (x < y) {
                    // Case 2: x + y = target (where x != y)
                    // To avoid double counting (e.g., counting (1, 3) and then (3, 1)), 
                    // we only count when x is strictly less than y.
                    pairCount += countX * countY;
                }
            }
        }

        // 5. Output the result
        System.out.println("pairs=" + pairCount);
    }
}
