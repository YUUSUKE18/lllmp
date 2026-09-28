import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String targetLine = br.readLine();
        if (targetLine == null) return;
        
        long target;
        try {
            target = Long.parseLong(targetLine.trim());
        } catch (NumberFormatException e) {
            return;
        }

        Set<Long> seen = new HashSet<>();
        long count = 0;
        long sum = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                long val = Long.parseLong(line);
                
                // 既に計算済みの値の中で、(target - val) が存在するか確認
                long needed = target - val;
                if (seen.contains(needed)) {
                    count++;
                }
                
                seen.add(val);
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("pairs=" + count);
    }
}
