import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String firstLine = br.readLine();
        if (firstLine == null || firstLine.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        long count = 0;
        long sum = 0;

        try {
            int expectedCount = Integer.parseInt(firstLine.trim());
        } catch (NumberFormatException e) {
            // 1 行目に整数が書かれていない場合も、実際に読み取れたものが 0 個として扱う
            // ただし、仕様は「1 行目に続く整数の個数が書かれています」とあるので、
            // 解析が成功した場合はその値に準ずる処理を行うが、
            // 実際に存在する整数の個数は「実際に読み取れた整数だけ」を対象とする。
        }

        for (int i = 1; ; i++) {
            String line = br.readLine();
            if (line == null) break;
            
            try {
                long val = Long.parseLong(line.trim());
                count++;
                sum += val;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
