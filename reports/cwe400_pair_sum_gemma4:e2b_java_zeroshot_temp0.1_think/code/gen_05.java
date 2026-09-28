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
            // Handle case where the first line is not a valid number
            System.out.println("pairs=0");
            return;
        }

        // 2. Read the sequence of numbers A_i
        Map<Long, Long> frequencyMap = new HashMap<>();
        String line;

        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            try {
                long num = Long.parseLong(line);
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

            if (x == y) {
                // Case 1: x + x = target (x = target / 2)
                // We need to choose 2 elements from countX elements: countX * (countX - 1) / 2
                if (countX >= 2) {
                    pairCount += countX * (countX - 1) / 2;
                }
            } else if (x < y) {
                // Case 2: x + y = target (x != y)
                // We only count pairs where x < y to avoid double counting (since we iterate over all x)
                if (frequencyMap.containsKey(y)) {
                    long countY = frequencyMap.get(y);
                    // Number of pairs is countX * countY
                    pairCount += countX * countY;
                }
            }
        }

        // 4. Output the result
        System.out.println("pairs=" + pairCount);
    }
}
