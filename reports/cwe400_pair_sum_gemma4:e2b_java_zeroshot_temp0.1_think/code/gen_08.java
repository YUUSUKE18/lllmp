import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
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
            // Handle case where the first line is not a valid number, though specification implies it will be.
            System.out.println("pairs=0");
            return;
        }

        // Map to store the frequency of each number
        Map<Long, Long> counts = new HashMap<>();

        // 2. Read subsequent lines and count frequencies
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue; // Ignore empty lines
            }

            try {
                long number = Long.parseLong(trimmedLine);
                // We only care about numbers that can potentially form a pair with the target.
                // Since the problem implies all subsequent lines are the sequence of numbers, we count them all.
                counts.put(number, counts.getOrDefault(number, 0L) + 1);
            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
                continue;
            }
        }

        // 3. Calculate the number of pairs
        long pairCount = 0;

        // Iterate through the unique numbers found in the input
        for (Map.Entry<Long, Long> entry : counts.entrySet()) {
            long x = entry.getKey();
            long countX = entry.getValue();
            long y = target - x;

            if (counts.containsKey(y)) {
                long countY = counts.get(y);

                if (x < y) {
                    // Case 1: x and y are different. Pair x with y.
                    // The number of pairs is count(x) * count(y).
                    pairCount += countX * countY;
                } else if (x == y) {
                    // Case 2: x and y are the same (x + x = target).
                    // We need to choose 2 elements from countX elements: C(countX, 2) = countX * (countX - 1) / 2.
                    pairCount += countX * (countX - 1) / 2;
                }
            }
        }

        // 4. Output the result
        System.out.println("pairs=" + pairCount);
    }
}
