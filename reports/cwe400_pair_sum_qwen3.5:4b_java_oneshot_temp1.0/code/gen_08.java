import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1 行目：目標値を読み込む
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }
        
        long target = Long.parseLong(targetLine.trim());
        
        // 2 行目以降の整数を読み、足し合わせの数え上げる
        // 目標値になる組数をカウントする。
        // 値と個数は 64bit 範囲内なので、long を使用します。
        long count = 0;
        Set<Long> seen = new HashSet<>();
        
        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue; // 空行を無視
            
            try {
                long num = Long.parseLong(line.trim());
                
                // 補数を見つける（target - num）
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
