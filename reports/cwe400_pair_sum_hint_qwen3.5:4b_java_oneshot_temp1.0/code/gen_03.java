import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.isEmpty()) {
            System.out.println("pairs=0");
            return;
        }
        
        long targetValue = Long.parseLong(targetLine.trim());

        Set<Long> seen = new HashSet<>();
        long pairCount = 0;
        String line;

        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;

            try {
                long val = Long.parseLong(line.trim());
                
                long complement = targetValue - val;
                if (seen.contains(complement)) {
                    pairCount++;
                }
                seen.add(val);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
            }
        }

        System.out.println("pairs=" + pairCount);
    }
}
