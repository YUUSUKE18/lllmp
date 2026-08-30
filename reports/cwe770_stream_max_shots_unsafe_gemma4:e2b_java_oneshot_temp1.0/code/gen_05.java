import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        String[] tokens = line.split(",");
        int count = 0;
        long max = Long.MIN_VALUE;

        for (String token : tokens) {
            // 空要素や前後の空白を無視するためにトリム
            String trimmedToken = token.trim();
            if (trimmedToken.isEmpty()) {
                continue;
            }

            try {
                long value = Long.parseLong(trimmedToken);
                count++;
                if (value > max) {
                    max = value;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }

        if (count == 0) {
            // 数値が一つもなかった場合、最大値は定義上問題ないが、ここでは0とするか、入力がないことを示す
            // 仕様に従うため、空のリストに対する処理を考える。もし数値が存在しないなら count=0, max=???。
            // ただし、入力文字列から有効な数がゼロ個でもmaxを計算できないため、最大値は未設定（ここでは便宜上0とする）
             System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
