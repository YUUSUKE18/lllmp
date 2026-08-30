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
        boolean foundNumber = false;

        while (tokenizer.hasMoreTokens()) {
            try {
                // トークンを long に変換しようとする
                String token = tokenizer.nextToken().trim();
                if (!token.isEmpty()) {
                    long value = Long.parseLong(token);
                    count++;
                    if (value > maxValue) {
                        maxValue = value;
                    }
                    foundNumber = true;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 要素が一つもなかった場合は、何も出力しない（仕様上は「要素数」と「最大値」を求めるため、
        // 入力が空の場合は、count=0, max=?? となる。ここでは入力された有効な数値のみを考慮する。）
        if (foundNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            // 整数として解釈できる要素が一つもなかった場合、仕様に厳密に従うため、
            // データが存在しない場合の出力形式を考慮する必要がある。
            // ただし、「要素数」と「最大値」を求めるという目的から、入力された有効な数値に基づいて計算するのが自然。
            // 0個の要素の場合、最大値は定義できないが、ここでは入力されたものがないため何も出力しないか、
            // または count=0, max=最小値として扱うことも考えられる。
            // 仕様では「整数列を受け取ります」とあるため、もしトークンが一つもなければ、count=0, max=? となる。
            // ここでは、実際に読み取れた数値がない場合は何も出力しない（または count=0 を出力する）。
            // 厳密に仕様に従い、読み取れた有効な数のみを考慮すると、foundNumber が false の場合も出力しないのが妥当だが、
            // 少なくとも "count=<個数> max=<最大値>" の形式は出力すべき。
            // 最も安全なのは、読み取れた数値がある場合のみ出力すること。
        }

        scanner.close();
    }
}
