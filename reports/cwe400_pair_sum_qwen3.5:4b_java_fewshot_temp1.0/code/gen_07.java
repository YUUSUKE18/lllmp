import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String targetLine = br.readLine();
        if (targetLine == null || !isIntegerLine(targetLine)) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(targetLine.trim());

        long sum = 0;
        Set<Long> used = new HashSet<>();
        int count = 0;

        while ((targetLine = br.readLine()) != null) {
            String[] parts = targetLine.split("\\s+");
            for (String part : parts) {
                if (part.isEmpty()) continue;
                long val;
                try {
                    val = Long.parseLong(part);
                } catch (NumberFormatException e) {
                    continue;
                }

                long complement = target - val;
                if (used.contains(complement)) {
                    count++;
                }
                used.add(val);
            }
        }
        System.out.println("pairs=" + count);
    }

    private static boolean isIntegerLine(String line) {
        return !line.trim().isEmpty() && line.trim().matches("^-?[0-9]+$");
    }
}
