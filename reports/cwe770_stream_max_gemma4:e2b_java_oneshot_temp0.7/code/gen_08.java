import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        StringTokenizer st = new StringTokenizer(line);
        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        while (st.hasMoreTokens()) {
            String token = st.nextToken().trim();
            if (!token.isEmpty()) {
                try {
                    long value = Long.parseLong(token);
                    count++;
                    if (value > maxValue) {
                        maxValue = value;
                    }
                    foundNumber = true;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
        }

        long finalMaxValue = (count == 0) ? 0 : maxValue; // 要素が一つもない場合や、全て無効な値の場合を考慮し、最大値を適切に設定する（問題文の制約上、少なくとも1つの整数が見つかればmaxValueは更新されるはずだが、安全のため）
        if (!foundNumber && count > 0) {
            // 数値が一つもなかったのにトークンはあった場合 (例: "a,b")。この場合は最大値を0とするのが妥当かもしれないが、ここでは読み取った有効な数の最大値を採用する。
            // ただし、もし入力が空でなければ、countが0の場合、max=0となる。
             finalMaxValue = 0; // このケースは通常発生しないはずだが念のため
        } else if (!foundNumber) {
            // 読み取ったトークンはあったが、有効な整数が見つからなかった場合
            finalMaxValue = 0; 
        } else {
            finalMaxValue = maxValue;
        }


        System.out.println("count=" + count + " max=" + finalMaxValue);
    }
}
