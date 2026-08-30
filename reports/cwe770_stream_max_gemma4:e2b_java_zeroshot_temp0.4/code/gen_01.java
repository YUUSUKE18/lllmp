import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }

        String line = scanner.nextLine();
        String[] parts = line.split(",");

        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 前後の空白を無視して整数として解釈できるか試みる
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                long value = Long.parseLong(trimmedPart);
                // 64bit整数の範囲に収まることを前提とするが、ここでは単に最大値を求める
                count++;
                if (value > maxValue) {
                    maxValue = value;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        if (foundNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            // 整数が一つもなかった場合、仕様に厳密に従うため何も出力しないか、あるいは0と最小値を出力するかの判断が必要だが、
            // ここでは要素が存在しない場合は何も出力しない（またはcount=0, max=MIN_VALUEとなる）とする。
            // 仕様は「要素数と最大値を求める」なので、要素が0個なら count=0, max=?? となる。
            // 整数として解釈できたものが一つもない場合、count=0, maxValueの初期値(Long.MIN_VALUE)が残る。
            // ただし、入力が空行や無効なデータのみの場合を考慮し、数値を読み取れた場合にのみ出力する。
            // ここでは読み取れた要素がある場合にのみ出力する。もし要素が0個なら、count=0, max=...となる。
            // 念のため、読み取れた要素が一つもない場合は何も出力しない（または count=0 を出力する）とする。
            // 問題文の意図を尊重し、数値が見つかった場合にのみ出力する。
        }

        scanner.close();
    }
}
