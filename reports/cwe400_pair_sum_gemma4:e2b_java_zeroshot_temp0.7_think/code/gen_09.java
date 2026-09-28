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
            // Handle case where the first line is not a valid number (though specification implies it will be)
            System.out.println("pairs=0");
            return;
        }

        // Map to store the frequency of each number
        Map<Long, Long> frequencyMap = new HashMap<>();
        
        // 2. Read subsequent numbers and populate frequency map
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue; // Ignore empty lines
            }
            try {
                long num = Long.parseLong(trimmedLine);
                // We count the occurrences of each number
                frequencyMap.put(num, frequencyMap.getOrDefault(num, 0L) + 1);
            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
                continue;
            }
        }

        long pairCount = 0;

        // 3. Calculate the number of pairs
        // Iterate over the unique numbers found in the input
        for (Map.Entry<Long, Long> entry : frequencyMap.entrySet()) {
            long x = entry.getKey();
            long countX = entry.getValue();
            long y = target - x;

            // We only need to check pairs (x, y) where x <= y to avoid double counting
            if (x > y) {
                continue;
            }

            if (x == y) {
                // Case 1: x + x = target (i.e., 2x = target)
                // We need to choose 2 elements from countX occurrences.
                // Number of pairs = countX * (countX - 1) / 2
                if (countX >= 2) {
                    pairCount += countX * (countX - 1) / 2;
                }
            } else {
                // Case 2: x + y = target, where x != y
                // Check if y exists in the map
                if (frequencyMap.containsKey(y)) {
                    long countY = frequencyMap.get(y);
                    // Number of pairs = countX * countY
                    pairCount += countX * countY;
                }
            }
        }

        // 4. Output the result
        System.out.println("pairs=" + pairCount);
    }
}
