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

        // 2. Read the remaining numbers and build frequency map
        Map<Long, Long> frequencyMap = new HashMap<>();
        String line;

        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }

            try {
                long number = Long.parseLong(line);
                // Store frequency
                frequencyMap.put(number, frequencyMap.getOrDefault(number, 0L) + 1);
            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
                continue;
            }
        }

        // 3. Calculate the number of pairs
        long pairCount = 0;

        // Iterate through the unique numbers found in the input
        for (Map.Entry<Long, Long> entry : frequencyMap.entrySet()) {
            long x = entry.getKey();
            long countX = entry.getValue();
            long y = target - x;

            if (frequencyMap.containsKey(y)) {
                long countY = frequencyMap.get(y);

                if (x < y) {
                    // Case 1: x and y are distinct. Count all combinations.
                    pairCount += countX * countY;
                } else if (x == y) {
                    // Case 2: x and y are the same (x + x = target). Count pairs of identical numbers.
                    // We need to choose 2 items from countX items: countX * (countX - 1) / 2
                    pairCount += countX * (countX - 1) / 2;
                }
            }
        }

        // 4. Output the result
        System.out.println("pairs=" + pairCount);
    }
}
