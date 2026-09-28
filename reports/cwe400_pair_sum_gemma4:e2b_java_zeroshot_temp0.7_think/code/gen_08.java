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
        if (lineT == null || lineT.trim().isEmpty()) {
            // Handle case where target line is missing or empty
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(lineT.trim());

        // Map to store the frequency of each number encountered so far
        Map<Long, Long> frequencyMap = new HashMap<>();
        long pairCount = 0;

        // 2. Process subsequent lines (the sequence of numbers)
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue; // Ignore empty lines
            }

            try {
                long currentNum = Long.parseLong(trimmedLine);

                // Calculate the required complement
                long complement = target - currentNum;

                // Check if the complement has been seen before
                if (frequencyMap.containsKey(complement)) {
                    // If it has, add its frequency to the total count
                    pairCount += frequencyMap.get(complement);
                }

                // Update the frequency map for the current number
                frequencyMap.put(currentNum, frequencyMap.getOrDefault(currentNum, 0L) + 1);

            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
                continue;
            }
        }

        // 3. Output the result
        System.out.println("pairs=" + pairCount);
    }
}
