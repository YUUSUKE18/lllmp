import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.TreeSet;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) return;
        
        long target = Long.parseLong(targetLine.trim());
        int index = 0;
        TreeSet<Long> seen = new TreeSet<>();
        long count = 0;
        
        while ((targetLine = br.readLine()) != null) {
            targetLine = targetLine.trim();
            if (targetLine.isEmpty()) continue;
            
            try {
                long n = Long.parseLong(targetLine);
                
                // Target - n が seen に存在するか確認
                if (seen.contains(target - n)) {
                    count++;
                }
                
                // 現在の数値を seen に追加
                seen.add(n);
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("pairs=" + count);
    }
}
