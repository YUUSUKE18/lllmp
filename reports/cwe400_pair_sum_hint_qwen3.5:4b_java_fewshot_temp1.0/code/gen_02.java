import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
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
        
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                long val = Long.parseLong(line);
                long needed = target - val;
                
                if (seen.contains(needed)) {
                    count++;
                }
                
                seen.add(val);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }
        
        System.out.println("pairs=" + count);
    }

    private static String line;
}
