import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        
        // 1 行目の目標値を読み込む
        line = br.readLine();
        while (line != null && line.trim().isEmpty()) {
            line = br.readLine();
        }
        if (line == null) {
            return;
        }
        
        long target = Long.parseLong(line.trim());
        Set<Long> seen = new HashSet<>();
        long count = 0;
        
        // 2 行目以降を読み込む
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                long num = Long.parseLong(line);
                long complement = target - num;
                
                // 足して目標値になる組があるか確認
                if (seen.contains(complement)) {
                    count++;
                }
                seen.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("pairs=" + count);
    }
}
