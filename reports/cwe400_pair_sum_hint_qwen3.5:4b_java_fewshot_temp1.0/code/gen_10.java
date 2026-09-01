import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1 行目を読み取る（目標値）
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }

        long target = Long.parseLong(targetLine.trim());

        // 2 行目以降を読み込む
        // BigInteger を使って安全に足し算を行う
        java.math.BigInteger bigTarget = BigInteger.valueOf(target);
        Set<Long> seen = new HashSet<>();
        long count = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue; // 空行は無視
            
            try {
                long val = Long.parseLong(line.trim());
                
                BigInteger bVal = BigInteger.valueOf(val);
                
                // 足し算の答えが bigTarget になるように、seen にある要素から
                // (bigTarget - bVal) が存在するか確認
                BigInteger needed = bigTarget.subtract(bVal);
                if (seen.contains(needed.longValue())) {
                    count++;
                }
                
                seen.add(val);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("pairs=" + count);
    }
}
