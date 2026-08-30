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

        Set<Long> seenNumbers = new HashSet<>();
        int count = 0;

        while ((targetLine = reader.readLine()) != null) {
            targetLine = targetLine.trim();
            if (targetLine.isEmpty()) {
                continue;
            }

            try {
                long number = Long.parseLong(targetLine);
                long complement = target - number;

                if (seenNumbers.contains(complement)) {
                    count++;
                }

                seenNumbers.add(number);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
                continue;
            }
        }

        System.out.println("pairs=" + count);
    }
}
