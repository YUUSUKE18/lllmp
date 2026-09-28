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
            // 空白を区切り文字として分割 (例: "7:3,2:2" -> ["7:3", "2:2"])
            String[] parts = line.trim().split(",");
            
            for (String part : parts) {
                if (part.isEmpty() || part.contains(":")) {
                    try {
                        int colonIndex = part.indexOf(':');
                        String valueStr = part.substring(0, colonIndex).trim();
                        String countStr = part.substring(colonIndex + 1).trim();
                        
                        // 値と回数のパース
                        long val = Long.parseLong(valueStr);
                        long repeat = Long.parseLong(countStr);
                        
                        // 無効な要素（文字列が整数でない場合など）はスキップ
                        if (val <= 0 || repeat < 0) {
                            continue; 
                        }
                        
                        count += repeat;
                        sum += val * repeat;
                    } catch (NumberFormatException e) {
                        // 数値としてパースできない場合は無視
                    }
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
