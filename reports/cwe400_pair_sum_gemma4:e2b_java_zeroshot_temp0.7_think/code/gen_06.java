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
        String line = br.readLine();
        if (line == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(line.trim());

        // 2. Read the sequence of numbers
        List<Long> numbers = new ArrayList<>();
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }
            try {
                numbers.add(Long.parseLong(trimmedLine));
            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
                continue;
            }
        }

        if (numbers.isEmpty()) {
            System.out.println("pairs=0");
            return;
        }

        // 3. Calculate frequencies
        Map<Long, Long> frequencyMap = new HashMap<>();
        for (long num : numbers) {
            frequencyMap.put(num, frequencyMap.getOrDefault(num, 0L) + 1);
        }

        long pairCount = 0;

        // 4. Iterate through the unique numbers to find pairs
        for (Map.Entry<Long, Long> entry : frequencyMap.entrySet()) {
            long x = entry.getKey();
            long countX = entry.getValue();
            long y = target - x;

            if (frequencyMap.containsKey(y)) {
                long countY = frequencyMap.get(y);

                if (x < y) {
                    // Case 1: x and y are distinct. Count all combinations (x, y).
                    // We only process x < y to avoid double counting (x, y) and (y, x).
                    pairCount += countX * countY;
                } else if (x == y) {
                    // Case 2: x and y are the same (x + x = target). 
                    // We need to choose 2 distinct indices from countX occurrences.
                    // Combination formula: countX * (countX - 1) / 2
                    if (countX >= 2) {
                        pairCount += countX * (countX - 1) / 2;
                    }
                }
            }
        }

        // 5. Output the result
        System.out.println("pairs=" + pairCount);
    }
}
