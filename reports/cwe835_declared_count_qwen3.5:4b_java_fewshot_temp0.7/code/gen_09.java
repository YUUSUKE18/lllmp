import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null) return;

        try {
            int expectedCount = Integer.parseInt(line1.trim());
        } catch (NumberFormatException e) {
            // 期待された個数が解析できない場合は処理を無効にする（またはデフォルト値で継続）
            // ここでは読み取れなかった場合、実際に読み取れる整数だけをカウントするモードとする
            expectedCount = -1; 
        }

        int count = 0;
        long sum = 0;
        
        try {
            while ((line1 = br.readLine()) != null) {
                line1 = line1.trim();
                if (line1.isEmpty()) continue;

                try {
                    long n = Long.parseLong(line1);
                    count++;
                    sum += n;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視
                }
            }
        } catch (Exception e) {
            // エラー発生時の処理
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
