import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long count = 0;
        long sum = 0;
        
        if (line != null) {
            // カンマ区切りで分割
            String[] parts = line.split(",");
            
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty()) continue;
                
                // ": " の形式を検索
                int colonIndex = part.indexOf(':');
                if (colonIndex == -1) continue;
                
                String valueStr = part.substring(0, colonIndex).trim();
                String countStr = part.substring(colonIndex + 1).trim();
                
                // 数値解析を試みる
                try {
                    long value = Long.parseLong(valueStr);
                    long repeat = Long.parseLong(countStr);
                    
                    if (repeat < 0) continue; // 回数は 0 以上
            
                    count += repeat;
                    sum += value * repeat;
                } catch (NumberFormatException e) {
                    // 数値として解釈できない場合は無視
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
