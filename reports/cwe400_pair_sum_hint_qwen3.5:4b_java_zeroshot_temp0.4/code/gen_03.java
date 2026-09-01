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

        Set<Long> seenValues = new HashSet<>();
        long count = 0;

        while ((targetLine = reader.readLine()) != null) {
            targetLine = targetLine.trim();
            if (targetLine.isEmpty()) {
                continue;
            }
            try {
                long value = Long.parseLong(targetLine);
                long complement = targetValue - value;
                if (seenValues.contains(complement)) {
                    count++;
                }
                seenValues.add(value);
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("pairs=" + count);
    }
}
