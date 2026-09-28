import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
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
            // Handle case where the first line is not a valid number, though specification implies it will be.
            System.out.println("pairs=0");
            return;
        }

        // 2. Read the remaining numbers
        Map<Long, Long> frequencyMap = new HashMap<>();
        String line;

        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            try {
                long number = Long.parseLong(line);
                // Update frequency map
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
            long num1 = entry.getKey();
            long count1 = entry.getValue();

            long num2 = target - num1;

            // Check if the complement exists
            if (frequencyMap.containsKey(num2)) {
                long count2 = frequencyMap.get(num2);

                if (num1 < num2) {
                    // Case 1: num1 and num2 are distinct. We count all combinations.
                    // Since we iterate over unique keys, we only count (num1, num2) once.
                    pairCount += count1 * count2;
                } else if (num1 == num2) {
                    // Case 2: num1 == num2 (i.e., 2 * num1 = target).
                    // We need to choose 2 elements from count1 occurrences.
                    // The number of pairs is count1 * (count1 - 1) / 2.
                    pairCount += count1 * (count1 - 1) / 2;
                }
            }
        }

        // 4. Output the result
        System.out.println("pairs=" + pairCount);
    }
}
