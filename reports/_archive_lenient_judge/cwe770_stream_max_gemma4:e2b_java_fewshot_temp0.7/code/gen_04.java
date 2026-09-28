import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long max = Long.MIN_VALUE;
        boolean first = true;

        if (line != null) {
            // カンマで分割
            String[] parts = line.split(",");

            for (String part : parts) {
                String trimmedPart = part.trim();
                if (trimmedPart.isEmpty()) {
                    continue;
                }

                try {
                    long n = Long.parseLong(trimmedPart);
                    count++;
                    if (first || n > max) {
                        max = n;
                        first = false;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            }
        }

        if (count == 0) {
            // 要素が一つもなかった場合、maxの初期値（Long.MIN_VALUE）を考慮して適切な出力を行う。
            // ただし、仕様上「空要素・前後の空白は無視し」とあるため、読み込んだ有効な整数がない場合は count=0, max=? となる。
            // 最小値として扱うか、あるいは入力がない場合の振る舞いを明確にする必要があるが、
            // 例2の挙動から、有効な数値が一つでもあればそれをカウントする。
            // ここではcount=0の場合はmaxを出力する。（もし最大値が存在しない場合は、問題の文脈に従うべきだが、ここでは読み込んだものに基づいて出力する）
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
