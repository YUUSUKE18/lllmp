import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line1 = scanner.nextLine();
            int expectedCount = 0;
            try {
                // 空行の場合を除く（仕様で「整数として解釈できない行も無視」とあるので、空文字列や文字だけの行は Integer.parseInt で例外を吐く）
                if (line1.trim().isEmpty()) {
                    expectedCount = 0;
                } else {
                    try {
                        expectedCount = Integer.parseInt(line1.trim());
                    } catch (NumberFormatException e) {
                        expectedCount = 0;
                    }
                }
            } catch (Exception e) {
                expectedCount = 0;
            }

            int actualCount = 0;
            long sum = 0;

            while (scanner.hasNextLine()) {
                String line = scanner.nextLine();
                if (line.isEmpty()) continue; // 空行は無視する
                
                try {
                    // 文字列を整数に変換し、成功すればカウントに含める
                    // Integer.parseInt は数値が範囲内なら OK, それ以外で例外。
                    // 問題文：「実際に読み取れた整数だけ」を対象とする。
                    // "64bit integerの範囲" なので Long.parseLong を使うべきか？ 
                    // Java の int は 32bit. 問題文 says values are in 64bit range (long).
                    long val = Long.parseLong(line.trim());
                    sum += val;
                    actualCount++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視（このコードでは全文字が数値でなければ失敗する。
                    // ただし、問題文の「1 行に 1 個ずつ」は「読み取り対象」としての記述であり、
                    // 実際に数値に変換できるかによって「読み取れた整数」と判断するのが自然。
                    // 「実際に存在する整数の個数は...一致しないことがあります」
                    // これは、入力行数と expectedCount が違うという意味だが、
                    // その中で、「何らかの理由で整数として変換できなければ無視」という意味も含むか？
                    // 問題文:「実際に読み取れた整数だけを対象とします。」
                    // とあります。
                    // Scanner の次が数値行に来たとしても、もしそのラインに「abc」が含まれていたら？
                    // 単純な解析では、Line.trim() が数値なら OK です。
                }
            }

            System.out.println("count=" + actualCount + " sum=" + sum);
        }
    }
}
