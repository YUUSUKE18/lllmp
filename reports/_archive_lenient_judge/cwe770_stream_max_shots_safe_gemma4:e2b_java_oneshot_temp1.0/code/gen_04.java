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

        StringTokenizer st = new StringTokenizer(line);
        long count = 0;
        long maxVal = Long.MIN_VALUE;
        boolean foundAny = false;

        while (st.hasMoreTokens()) {
            try {
                // すべてのトークンを読み取り、整数として解釈できるか試みる
                String token = st.nextToken();
                // トークンが有効な整数表現であるか確認（カンマ区切りなので、念のため空白やカンマをスキップして再評価は不要だが、
                // ここでは純粋にトークンをlongとして解釈することを試みる）
                long value = Long.parseLong(token.trim());
                
                count++;
                if (value > maxVal) {
                    maxVal = value;
                }
                foundAny = true;

            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                // 仕様に基づき、数値として解釈できないものは無視する。
                continue;
            }
        }

        if (!foundAny) {
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + maxVal);
        }
    }
}
