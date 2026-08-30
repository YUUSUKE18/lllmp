import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null) return;
        
        try {
            long target = Long.parseLong(line1.trim());
            Set<Long> seen = new HashSet<>();
            int count = 0;
            
            while ((line1 = br.readLine()) != null) {
                String[] parts = line1.trim().split("\\s+");
                for (String part : parts) {
                    if (part.isEmpty()) continue;
                    
                    try {
                        long val = Long.parseLong(part);
                        long needed = target - val;
                        
                        if (seen.contains(needed)) {
                            count++;
                        }
                        
                        seen.add(val);
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない行は無視
                    }
                }
            }
            
            System.out.println("pairs=" + count);
        } catch (NumberFormatException e) {
            // 目標値が整数でない場合は何もしない
        }
    }
}
