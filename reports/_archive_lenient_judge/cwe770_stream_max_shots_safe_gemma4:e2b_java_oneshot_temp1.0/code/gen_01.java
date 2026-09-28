import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=-1"); // 空入力の場合の処理（仕様に厳密に従うため、ここでは一般的な範囲外として-1を仮定するか、問題文で未定義の場合の挙動を考慮するが、整数列がない場合は0要素、最大値は未定義だが、ここでは便宜上0とする）
            return;
        }

        String[] parts = line.split(",");

        long count = 0;
        long maxVal = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 前後の空白を無視して整数として解釈を試みる
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                long value = Long.parseLong(trimmedPart);
                count++;
                if (value > maxVal) {
                    maxVal = value;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }

        // 整数が見つからなかった場合や、全ての要素が不正だった場合の安全策。
        if (!foundNumber) {
             System.out.println("count=0 max=-1"); // データがない場合はcount=0, max=?の出力だが、ここでは最大値の定義を考慮して適切な値を出す必要がある。問題文で未定義のため、読み取った数だけをカウントし、maxはデータがなければ適切に扱うべきだが、今回は「整数として解釈できない要素も無視する」ため、実質的にデータがない場合は0要素となる。
             // 厳密に仕様に従うと、数として解釈できたもののみをカウントする。もし要素が空だった場合、count=0, max=？。安全のため、入力された要素の総数をそのまま count とし、maxは初期値（Long.MIN_VALUE）または適切なデフォルト値を採用するのが一般的だが、ここでは「整数として解釈できたもの」を数える方針で進める。
             // 念のため、もし何も数値が見つからなかった場合でも、入力された要素の総数を返すようにする：しかし仕様は「整数として解釈できない要素も無視する」ため、countは抽出された有効な整数の数になるべき。
        }


        // countとmaxValを出力
        System.out.println("count=" + count + " max=" + (foundNumber ? maxVal : Long.MIN_VALUE));
    }
}
