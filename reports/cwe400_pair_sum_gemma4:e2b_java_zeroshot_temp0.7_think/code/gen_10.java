import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // 1. Read the target value
        String targetLine = br.readLine();
        if (targetLine == null) {
            System.out.println("pairs=0");
            return;
        }
        long target;
        try {
            target = Long.parseLong(targetLine.trim());
        } catch (NumberFormatException e) {
            // Handle case where the first line is malformed, though specification implies it exists.
            System.out.println("pairs=0");
            return;
        }

        // 2. Read subsequent numbers
        List<Long> numbers = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue; // Ignore empty lines
            }
            try {
                long num = Long.parseLong(trimmedLine);
                numbers.add(num);
            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
                continue;
            }
        }

        // 3. Calculate the number of pairs
        if (numbers.isEmpty()) {
            System.out.println("pairs=0");
            return;
        }

        // Use a frequency map to count occurrences of each number
        Map<Long, Long> frequencyMap = new HashMap<>();
        for (long num : numbers) {
            frequencyMap.put(num, frequencyMap.getOrDefault(num, 0L) + 1);
        }

        long pairCount = 0;

        // Iterate through the unique numbers in the map
        for (Map.Entry<Long, Long> entry : frequencyMap.entrySet()) {
            long x = entry.getKey();
            long countX = entry.getValue();
            long y = target - x;

            // Check if the complement y exists in the map
            if (frequencyMap.containsKey(y)) {
                long countY = frequencyMap.get(y);

                if (x < y) {
                    // Case 1: x and y are different (x + y = T)
                    // The number of pairs is the product of their frequencies.
                    pairCount += countX * countY;
                } else if (x == y) {
                    // Case 2: x and y are the same (2x = T)
                    // We need to choose 2 elements from countX elements.
                    // The number of pairs is countX * (countX - 1) / 2.
                    pairCount += countX * (countX - 1) / 2;
                }
            }
        }

        // 4. Output the result
        System.out.println("pairs=" + pairCount);
    }
}
