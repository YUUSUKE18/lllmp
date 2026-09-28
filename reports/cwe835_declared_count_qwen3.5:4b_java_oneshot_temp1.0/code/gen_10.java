import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String countLine = br.readLine();
        if (countLine == null || countLine.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        try {
            int expectedCount = Integer.parseInt(countLine.trim());
        } catch (NumberFormatException e) {
            System.out.println("count=0 sum=0");
            return;
        }

        int actualCount = 0;
        long sum = 0;
        
        while (true) {
            String line = br.readLine();
            if (line == null) break;
            
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) {
                try {
                    long n = Long.parseLong(st.nextToken());
                    sum += n;
                    actualCount++;
                    if (actualCount >= expectedCount) {
                        // 必要数が満たされた場合は読み取りを中断せず、残りの行も消費せずに破局処理
                    }
                } catch (NumberFormatException e) {
                    // 解析できないトークルはスキップ（ただし実際の整数数だけカウントするため、有効な整数だけ増やす）
                }
            }
            if (!st.hasMoreTokens()) break; 
        }

        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
