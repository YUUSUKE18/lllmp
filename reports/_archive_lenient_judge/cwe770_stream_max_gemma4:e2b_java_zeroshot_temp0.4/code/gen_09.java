import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }

        String line = scanner.nextLine();
        StringTokenizer tokenizer = new StringTokenizer(line);

        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundFirst = false;

        while (tokenizer.hasMoreTokens()) {
            try {
                // カンマ区切りの整数を読み取る
                String token = tokenizer.nextToken().trim();
                if (!token.isEmpty()) {
                    long value = Long.parseLong(token);
                    count++;
                    if (!foundFirst || value > maxValue) {
                        maxValue = value;
                        foundFirst = true;
                    }
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 要素が一つもなかった場合は、count=0, max=??? となるが、
        // 仕様上、入力された有効な要素のみを考慮するため、
        // countが0の場合は最大値の出力は意味を持たない。
        // ただし、入力が空の場合でも、読み取ったものに基づいて計算する。

        if (count == 0) {
            // 入力が完全に無効または空だった場合。このケースでは max の定義が曖昧だが、
            // 読み取れた要素がないため、ここでは count=0, max=0 または他の適切な値を出力する。
            // 最も安全なのは、値が存在しない場合は最大値を設定しないことだが、
            // ここでは入力された有効な数値セットに基づいて計算を行う。
            // count=0 の場合、maxValue は初期値のまま (Long.MIN_VALUE) になるため、
            // 便宜上、count=0 なら max=0 とする（または問題の意図に従う）。
            // 今回は、入力された要素が全て無視された場合は、何も出力しないか、
            // count=0, max=0 とするのが自然だが、ここでは読み取れた有効な数のみを対象とする。
        }

        if (count > 0) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
             // 要素が一つもなかった場合（count=0）、最大値は定義できないため、
             // 0個の要素に対して最大値は無意味だが、ここでは最も安全な形式で出力する。
             // ただし、仕様上「要素数」と「最大値」を求めるので、もし要素がなければ count=0, max=（未定義）となる。
             // 今回は、読み取れた有効な数値のみに基づいて計算した結果を出力する。
             System.out.println("count=0 max=" + Long.MIN_VALUE); // または 0 を出力する選択肢もあるが、ここでは最大値の初期値をそのまま使用する。
        }

        scanner.close();
    }
}
