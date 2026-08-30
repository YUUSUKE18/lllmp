import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }

        long target = Long.parseLong(targetLine.trim());
        Set<Long> seen = new HashSet<>();
        long count = 0;

        while ((targetLine = br.readLine()) != null) {
            String trimmed = targetLine.trim();
            if (trimmed.isEmpty()) continue;
            
            try {
                long n = Long.parseLong(trimmed);
                long complement = target - n;
                if (seen.contains(complement)) {
                    count++;
                }
                seen.add(n);
            } catch (NumberFormatException e) {
            }
        }

        System.out.println("pairs=" + count);
    }
}
