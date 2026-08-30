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
        boolean foundValidNumber = false;

        while (tokenizer.hasMoreTokens()) {
            try {
                // カンマで区切られた整数を読み取る
                String token = tokenizer.nextToken().trim();
                if (!token.isEmpty()) {
                    long number = Long.parseLong(token);
                    count++;
                    if (number > maxValue) {
                        maxValue = number;
                    }
                    foundValidNumber = true;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 要素が見つかった場合のみ結果を出力する（仕様上、入力が空でも処理を続ける必要があるが、数値が存在しない場合は最大値の扱いが問題になるため、ここでは少なくとも1つの有効な数があった場合にのみ出力すると解釈する）
        if (foundValidNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            // 入力が空または数値が存在しなかった場合の挙動。仕様に厳密に従うと、何も値がない場合は最大値をどうするか定義されていないが、
            // 最小値として Long.MIN_VALUE を保持したまま出力する。ただし、入力が完全に空の場合、count=0, max=Long.MIN_VALUEとなる。
            System.out.println("count=0 max=" + Long.MIN_VALUE);
        }
    }
}
