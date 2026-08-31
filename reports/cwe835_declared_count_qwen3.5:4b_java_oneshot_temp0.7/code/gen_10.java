import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String countLine = br.readLine();
        if (countLine == null || countLine.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        try {
            int expectedCount = Integer.parseInt(countLine.trim());
        } catch (NumberFormatException e) {
            // 数値として解釈できない場合はカウントを 0 とみなす（仕様上は存在する整数のみを対象とするため）
            System.out.println("count=0 sum=0");
            return;
        }

        long sum = 0;
        int actualCount = 0;

        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                // 空行や EOF を無視する（ただし、問題文の「実際に存在する整数だけ」という要件を満たすため）
                // 入力終了を仮定するか、または次の有効な行まで跳躍するか。
                // ここでは、空行は無視し、EOF で停止する実装とする。
                if (line == null) {
                    break;
                } else {
                    continue; 
                }
            }

            try {
                long val = Long.parseLong(line.trim());
                sum += val;
                actualCount++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
