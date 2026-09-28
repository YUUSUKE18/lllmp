import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=-9223372036854775808"); // 0要素の場合、longの最小値を出力（問題文に最大値の制約がないため）
            return;
        }

        String[] parts = line.split(",");
        int count = 0;
        long maxVal = Long.MIN_VALUE;

        for (String part : parts) {
            // 前後の空白を無視（split(",")で区切られた後、trim()で処理する）
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
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        // 要素がない場合、最大値の初期値（Long.MIN_VALUE）を出力しても良いが、
        // 通常は「存在しない」を表現するために特別な値や定義されたデフォルト値を設定する。
        // ここでは読み込んだ要素数と最大値をそのまま出力する。
        if (count == 0) {
             // 要素が一つもパースされなかった場合、count=0 と maxValは初期値のまま。
             // 問題文の制約に基づき、もし入力された数値がない場合は、max値が未定義となる。
             // 例として、入力が空文字列であった場合の挙動を考慮し、ここでは読み込んだものだけを出力する。
        }

        System.out.println("count=" + count + " max=" + maxVal);
    }
}
