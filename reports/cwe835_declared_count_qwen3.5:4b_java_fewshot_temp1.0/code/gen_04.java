import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1 行目：整数の個数を読み込む（ただし、実際の読み取りは後で行う）
        String line1 = br.readLine();
        int declaredCount = 0;
        if (line1 != null && !line1.trim().isEmpty()) {
            try {
                declaredCount = Integer.parseInt(line1.trim());
            } catch (NumberFormatException e) {
                // 解析できない場合は 0 とみなす（実際には問題文の要件より重要ではないが処理を安定させる）
            }
        }

        long sum = 0;
        int actualCount = 0;

        // 2 行目以降を読み込み、有効な整数を検出する
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }

            try {
                long value = Long.parseLong(line);
                sum += value;
                actualCount++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
