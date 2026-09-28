import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1 行目：目標値を読み取る
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }
        
        long target = Long.parseLong(targetLine.trim());
        
        Set<Long> seen = new HashSet<>();
        long count = 0;
        
        // 2 行目以降を読み、足し合わせの組を数える
        while ((targetLine = br.readLine()) != null) {
            targetLine = targetLine.trim();
            if (targetLine.isEmpty()) continue;
            
            try {
                long num = Long.parseLong(targetLine);
                long complement = target - num;
                
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
