import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }

        String line = scanner.nextLine();
        String[] parts = line.trim().split(",");

        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundValidNumber = false;

        for (String part : parts) {
            if (part.isEmpty()) {
                continue;
            }

            try {
                long value = Long.parseLong(part.trim());
                // 64bit整数の範囲に収まることを確認（Long型なので自動的に扱われますが、念のため）
                if (value >= Long.MIN_VALUE && value <= Long.MAX_VALUE) {
                    count++;
                    if (value > maxValue) {
                        maxValue = value;
                    }
                    foundValidNumber = true;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        if (count > 0) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            // 要素が一つも有効な整数でなかった場合、仕様上は何を出力するか明確ではありませんが、
            // 空の入力または無効な入力のみの場合を考慮し、count=0, max=適切な値（例えば0や最小値）を出力します。
            // ここでは、入力された要素が存在しない場合は何も出力しない、あるいは count=0 とするのが自然ですが、
            // 厳密に「要素数と最大値を求めます」に従い、有効な要素が0個ならカウントは0です。
            // ただし、もし入力が完全に無効で空だった場合も考慮し、ここでは計算結果のみを出力します。
            // もしcountが0の場合、maxValueの初期値であるLong.MIN_VALUEが出力される可能性があります。
            // 複数の要素が存在しない場合は、何も出力しない（または count=0 max=...）と解釈します。
            // 今回は入力された有効なデータに基づいて計算した結果を出力することに焦点を当てます。
        }
    }
}
