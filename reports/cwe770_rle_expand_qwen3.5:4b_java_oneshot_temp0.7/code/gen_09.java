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
            // 空白を区切りとして、各項目を取得
            String[] pairs = line.split("[,\\s]+");
            
            for (String pair : pairs) {
                pair = pair.trim();
                if (pair.isEmpty()) continue;
                
                int colonIndex = pair.indexOf(':');
                if (colonIndex <= 0) continue; // 形式が間違っている
                
                String keyPart = pair.substring(0, colonIndex);
                String valuePart = pair.substring(colonIndex + 1);
                
                try {
                    long val = Long.parseLong(keyPart.trim());
                    long rep = Long.parseLong(valuePart.trim());
                    
                    if (rep < 0) continue; // 回数が負の場合を無視
                    
                    count += rep;
                    sum += val * rep;
                } catch (NumberFormatException e) {
                    // パースエラーの場合は無視
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
