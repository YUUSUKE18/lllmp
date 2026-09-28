import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        
        String targetLine = reader.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }

        long targetValue;
        try {
            targetValue = Long.parseLong(targetLine.trim());
        } catch (NumberFormatException e) {
            System.out.println("pairs=0");
            return;
        }

        Set<Long> seenNumbers = new HashSet<>();
        int pairCount = 0;

        while ((String line = reader.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                long number = Long.parseLong(line.trim());
                
                long complement = targetValue - number;
                if (seenNumbers.contains(complement)) {
                    pairCount++;
                }
                seenNumbers.add(number);
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("pairs=" + pairCount);
    }
}
