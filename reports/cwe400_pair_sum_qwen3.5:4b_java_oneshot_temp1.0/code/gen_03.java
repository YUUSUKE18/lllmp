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

        long target;
        try {
            target = Long.parseLong(targetLine.trim());
        } catch (NumberFormatException e) {
            System.out.println("pairs=0");
            return;
        }

        Set<Long> seenNumbers = new HashSet<>();
        long pairsCount = 0;
        
        while ((targetLine = br.readLine()) != null) {
            targetLine = targetLine.trim();
            if (targetLine.isEmpty()) continue;
            
            try {
                long num = Long.parseLong(targetLine);
                
                long needed = target - num;
                if (seenNumbers.contains(needed)) {
                    pairsCount++;
                }
                seenNumbers.add(num);
            } catch (NumberFormatException e) {
                // 無視する
            }
        }

        System.out.println("pairs=" + pairsCount);
    }
}
