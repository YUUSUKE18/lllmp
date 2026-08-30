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

        long target = Long.parseLong(targetLine.trim());
        Set<Long> seen = new HashSet<>();
        int count = 0;

        while ((reader.readLine() != null)) {
            String line = reader.readLine();
            if (line == null || line.trim().isEmpty()) {
                continue;
            }

            try {
                long num = Long.parseLong(line.trim());
                long complement = target - num;
                if (seen.contains(complement)) {
                    count++;
                }
                seen.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("pairs=" + count);
    }
}
