import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) return;
        
        long target = Long.parseLong(targetLine.trim());
        
        long count = 0;
        Set<Long> seen = new HashSet<>();
        
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                long n = Long.parseLong(line);
                
                long complement = target - n;
                if (seen.contains(complement)) {
                    count++;
                }
                seen.add(n);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
            }
        }
        
        System.out.println("pairs=" + count);
    }

    private static String line;
}
