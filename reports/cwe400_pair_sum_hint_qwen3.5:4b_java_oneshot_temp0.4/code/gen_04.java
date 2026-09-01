import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 目標値を読み込む
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }
        
        long target = Long.parseLong(targetLine.trim());
        
        Set<Long> seen = new HashSet<>();
        long count = 0;
        
        // 2 行目以降を読み込む
        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                break;
            }
            
            try {
                long n = Long.parseLong(line.trim());
                
                // 目標値 - n が seen にあるか確認
                long complement = target - n;
                if (seen.contains(complement)) {
                    count++;
                }
                
                seen.add(n);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("pairs=" + count);
    }
}
