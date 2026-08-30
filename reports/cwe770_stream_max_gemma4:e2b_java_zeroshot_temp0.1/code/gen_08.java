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
                // 64bit整数の範囲内であることを確認（Long型なので自動的に保証されるが、念のため）
                if (value >= Long.MIN_VALUE && value <= Long.MAX_VALUE) {
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

        if (foundNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            // 数値が一つもなかった場合の処理（仕様上、何も出力しないか、あるいは0 0などだが、ここではデータが存在しないと見なす）
            // 仕様には「要素数と最大値を求める」とあるため、要素がなければ count=0 max=??? となる。
            // 最大値は初期値のままになるが、入力された数値がない場合は、count=0, max=Long.MIN_VALUEとなる。
            // 厳密に「要素数と最大値」を求めるので、要素が存在しない場合は count=0, max=適切な値（ここでは計算対象がないため、実質的に意味がない）だが、
            // 入力された数値のみに基づいて計算するため、count=0, max=Long.MIN_VALUEが正しい状態となる。
            System.out.println("count=0 max=" + Long.MIN_VALUE);
        }

        scanner.close();
    }
}
