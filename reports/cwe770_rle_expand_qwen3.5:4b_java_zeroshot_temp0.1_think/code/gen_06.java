import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // カンマを区切り文字として設定
        sc.useDelimiter(","); 
        
        long count = 0;
        long sum = 0;
        
        while (sc.hasNext()) {
            String s = sc.next();
            if (s.isEmpty()) continue;
            
            // 値:回数の形式を確認
            int idx = s.indexOf(':');
            if (idx == -1) continue;
            
            try {
                long val = Long.parseLong(s.substring(0, idx).trim());
                long cnt = Long.parseLong(s.substring(idx + 1).trim());
                
                // 回数は 0 以上である必要がある
                if (cnt < 0) continue; 
                
                count += cnt;
                sum += val * cnt;
            } catch (NumberFormatException e) {
                // 数値が解析できない場合は無視
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
