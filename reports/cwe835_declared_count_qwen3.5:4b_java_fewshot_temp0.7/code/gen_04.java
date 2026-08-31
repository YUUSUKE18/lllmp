import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String firstLine = br.readLine();
        if (firstLine == null || firstLine.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        int expectedCount = Integer.parseInt(firstLine.trim());
        long sum = 0;
        int count = 0;

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            try {
                StringTokenizer st = new StringTokenizer(line);
                int numCount = 0;
                long currentSum = 0;
                while (st.hasMoreTokens()) {
                    String token = st.nextToken();
                    // 64bit integer 範囲を確認する (Long.MAX_VALUE 以上なら異常だが、問題文より収まるため safeParse のようなロジックは不要)
                    // ただし、Integer.parseInt は range 制限があるが Long.parseLong は 64bit 対応。
                    // 問題文: "64bit 整数の範囲" -> long を使用
                    try {
                        long val = Long.parseLong(token);
                        currentSum += val;
                        numCount++;
                    } catch (NumberFormatException e) {
                        // 数値が解析できない場合は無視
                    }
                }
                count += numCount;
                sum += currentSum;
            } catch (NumberFormatException e) {
                // 行全体が整数列として解釈できない場合も無視 (例: "abc")
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
