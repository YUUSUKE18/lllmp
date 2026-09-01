import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 目標値を読み込む（1 行目）
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }
        
        long target = Long.parseLong(targetLine.trim());
        
        // 2 行目以降の整数を読み込み、足して目標値になる組の数を数える
        Set<Long> seen = new HashSet<>();
        long count = 0;
        long currentSum = 0;
        
        while (true) {
            String line = br.readLine();
            if (line == null) break; // エンドオブファイル
            
            String trimmed = line.trim();
            if (trimmed.isEmpty()) continue; // 空行は無視
            
            try {
                long val = Long.parseLong(trimmed);
                
                // 目標値 - 現在の数値が seen にあるか確認
                long needed = target - val;
                if (seen.contains(needed)) {
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
