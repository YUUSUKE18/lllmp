import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null) {
            System.out.println("count=0 sum=0");
            return;
        }

        int expectedCount = 0;
        try {
            expectedCount = Integer.parseInt(line1.trim());
        } catch (NumberFormatException e) {
            // 1 行目が整数でない場合は count=0 とする（または処理をスキップ）
            // 仕様では「実際に読み取れた整数だけ」とあるので、解析エラーは無視して 0 で扱うのが適切
            expectedCount = 0;
        }

        long sum = 0;
        int actualCount = 0;

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue; // 空行は無視

            try {
                long val = Long.parseLong(line.trim());
                sum += val;
                actualCount++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
