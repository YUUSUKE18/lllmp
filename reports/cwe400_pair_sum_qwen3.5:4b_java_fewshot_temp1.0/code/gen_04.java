import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) return;
        
        long target = Long.parseLong(targetLine.trim());
        
        HashSet<Long> seen = new HashSet<>();
        long pairCount = 0;
        
        while ((targetLine = br.readLine()) != null) {
            targetLine = targetLine.trim();
            if (targetLine.isEmpty()) continue;
            
            try {
                long val = Long.parseLong(targetLine);
                long complement = target - val;
                
                if (seen.contains(complement)) {
                    pairCount++;
                }
                seen.add(val);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("pairs=" + pairCount);
    }
}
