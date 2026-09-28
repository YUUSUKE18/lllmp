import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long count = 0;
        long sum = 0;
        
        if (line != null && !line.isEmpty()) {
            // カンマ区切りで分割し、各要素を処理
            String[] parts = line.split(",");
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty()) continue;
                
                try {
                    int colonIndex = part.indexOf(':');
                    if (colonIndex <= 0 || colonIndex >= part.length() - 1) continue; // 形式が正しくない
                    
                    String keyStr = part.substring(0, colonIndex).trim();
                    String valueStr = part.substring(colonIndex + 1).trim();
                    
                    long val = Long.parseLong(keyStr);
                    long rep = Long.parseLong(valueStr);
                    
                    if (val == 0 && rep == 0) { // 0:0 は有効だが、要素としてカウントするか？要件より"整数列を表す"のでカウントすべきか。通常はカウント対象。ただし例では明示的に除くものなし。ここではカウントする。
                        // 要件：7:3,2:2 -> 7,7,7,2,2 (5個)
                    }
                    
                    count += rep;
                    sum += val * rep;
                } catch (NumberFormatException e) {
                    // 解析エラーの場合は無視
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
