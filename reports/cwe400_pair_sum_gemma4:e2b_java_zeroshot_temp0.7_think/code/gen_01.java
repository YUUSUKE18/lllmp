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
        long target = Long.parseLong(lineT.trim());

        // 2. Read the sequence of numbers A
        Map<Long, Long> counts = new HashMap<>();
        String line;
        
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }
            try {
                long number = Long.parseLong(trimmedLine);
                // Store frequency
                counts.put(number, counts.getOrDefault(number, 0L) + 1);
            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
                continue;
            }
        }

        // 3. Calculate the number of pairs
        long pairCount = 0;

        // Iterate over the unique numbers found
        for (Map.Entry<Long, Long> entry : counts.entrySet()) {
            long x = entry.getKey();
            long countX = entry.getValue();
            
            long y = target - x;

            // Check if the complement y exists in the map
            if (counts.containsKey(y)) {
                long countY = counts.get(y);

                if (x == y) {
                    // Case 1: x + x = target (x = target / 2)
                    // We need to choose 2 distinct elements from countX occurrences.
                    // Number of pairs = countX * (countX - 1) / 2
                    if (countX >= 2) {
                        pairCount += countX * (countX - 1) / 2;
                    }
                } else if (x < y) {
                    // Case 2: x + y = target (x != y)
                    // To avoid double counting (e.g., counting (x, y) and then (y, x)), 
                    // we enforce x < y.
                    pairCount += countX * countY;
                }
            }
        }

        // 4. Output the result
        System.out.println("pairs=" + pairCount);
    }
}
