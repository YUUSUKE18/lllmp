import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=-1"); // または適切な初期値。ここでは空入力として扱う
            return;
        }

        StringTokenizer st = new StringTokenizer(line);
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        while (st.hasMoreTokens()) {
            try {
                // カンマ区切りの整数を読み込む
                String token = st.nextToken();
                long num = Long.parseLong(token);
                count++;
                if (num > max) {
                    max = num;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する（仕様通り）
				continue;
			}
        }

        // 要素が一つもなかった場合、最大値は定義できないため、ここでは0または最小値とする。
        // 問題の文脈から、入力された有効な数値のみを数えるため、countとmaxを出力する。
        if (!foundNumber) {
            System.out.println("count=0 max=-1"); // 数値が一つもなかった場合の処理（例として）
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
