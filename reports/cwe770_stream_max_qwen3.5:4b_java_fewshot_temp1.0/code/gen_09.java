import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean first = true;

        if (line != null && !line.isEmpty()) {
            //カンマで区切り、空文字列を除去し空白を整える処理を行う
            String[] parts = line.split(","); 
            for(String part : parts){
                String token = part.trim();
                long n = Long.parseLong(token);
                count++;
                
                if (first || max < n) { // 最初の要素の場合と、n が最大値より大きい場合に更新する。
                    max = n;
                    first = false;
                }
            }
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
