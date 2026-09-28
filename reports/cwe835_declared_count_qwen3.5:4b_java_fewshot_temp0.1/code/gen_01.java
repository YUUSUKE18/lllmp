import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null) {
            System.out.println("count=0 sum=0");
            return;
        }

        int expectedCount = 0;
        try {
            StringTokenizer st = new StringTokenizer(line1);
            if (st.hasMoreTokens()) {
                expectedCount = Integer.parseInt(st.nextToken());
            }
        } catch (NumberFormatException e) {
            // 1 行目が整数でない場合は count=0 とする（または処理をスキップ）
            // 仕様では「実際に読み取れた整数だけ」とあるので、解析エラーは無視して 0 でよい
        }

        long sum = 0;
        int actualCount = 0;

        while (true) {
            String line = br.readLine();
            if (line == null) break;

            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) {
                try {
                    long val = Long.parseLong(st.nextToken());
                    sum += val;
                    actualCount++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できないトークンはスキップ
                }
            }
        }

        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
