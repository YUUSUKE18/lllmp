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
        long pairCount = 0;

        while ((String line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            try {
                long num = Long.parseLong(line.trim());
                long needed = target - num;
                if (seen.contains(needed)) {
                    pairCount++;
                }
                seen.add(num);
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("pairs=" + pairCount);
    }
}
