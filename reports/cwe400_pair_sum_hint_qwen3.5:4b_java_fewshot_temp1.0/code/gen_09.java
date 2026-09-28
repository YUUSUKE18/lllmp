import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
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
            if (targetLine.trim().isEmpty()) continue;
            
            try {
                long n = Long.parseLong(targetLine.trim());
                long complement = target - n;
                
                // 既にセットに存在するかチェック
                if (seen.contains(complement)) {
                    count++;
                } else {
                    seen.add(n);
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("pairs=" + count);
    }
}
