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
            // 1 行目が整数でない場合は、読み取れる整数の数が 0 とみなす（またはエラー処理）
            // 仕様では「実際に存在する整数の個数」とあるので、解析不能な場合は無視して 0 から始めるのが妥当。
        }

        long sum = 0;
        int count = 0;

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue; // 空行は無視

            try {
                long val = Long.parseLong(line.trim());
                sum += val;
                count++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
