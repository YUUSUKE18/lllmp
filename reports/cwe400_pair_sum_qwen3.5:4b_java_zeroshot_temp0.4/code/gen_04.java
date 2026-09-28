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

        long target;
        try {
            target = Long.parseLong(targetLine.trim());
        } catch (NumberFormatException e) {
            System.out.println("pairs=0");
            return;
        }

        Set<Long> seen = new HashSet<>();
        int pairCount = 0;

        while ((line = reader.readLine()) != null) {
            String[] parts = line.trim().split("\\s+");
            for (String part : parts) {
                if (part.isEmpty()) continue;
                try {
                    long value = Long.parseLong(part);
                    long complement = target - value;
                    if (seen.contains(complement)) {
                        pairCount++;
                    }
                    seen.add(value);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行または要素は無視
                }
            }
        }

        System.out.println("pairs=" + pairCount);
    }
}
