import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long count = 0;
        long sum = 0;
        
        if (line != null) {
            // 空白を区切りとして分割し、各要素を処理
            String[] parts = line.trim().split("[,\\s]+");
            
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty()) continue;
                
                // "値:回数" の形式を検出
                int colonIndex = part.indexOf(':');
                if (colonIndex == -1 || colonIndex == 0 || colonIndex == part.length() - 1) {
                    continue;
                }
                
                try {
                    long value = Long.parseLong(part.substring(0, colonIndex));
                    long times = Long.parseLong(part.substring(colonIndex + 1));
                    
                    if (times < 0) continue; // 回数は 0 以上
                    
                    count += times;
                    sum += value * times;
                } catch (NumberFormatException e) {
                    // 数値解析エラーが発生した場合は無視
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
