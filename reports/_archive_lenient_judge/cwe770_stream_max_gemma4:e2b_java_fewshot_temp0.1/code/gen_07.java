import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long max = Long.MIN_VALUE;

        if (line != null) {
            // カンマで分割し、各要素を処理する
            String[] parts = line.split(",");
            for (String part : parts) {
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    try {
                        // 64bit整数として解釈
                        long n = Long.parseLong(trimmedPart);
                        count++;
                        if (n > max) {
                            max = n;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視
                    }
                }
            }
        }

        // 空の入力や数値が存在しなかった場合の処理（count=0, max=Long.MIN_VALUE）を考慮して出力
        if (count == 0) {
            // 要素が一つもなかった場合、最大値は定義できないため、ここでは0または適切なデフォルト値を設定する。
            // 問題の制約から、入力がない場合は count=0, max=0 とするのが自然かもしれないが、
            // 読み込んだ要素が存在しない場合は max の意味が曖昧になるため、
            // 読み込んだ有効な要素に基づいて出力する。もし要素が一つもなければ最大値は定義できないが、
            // 最小の64bit整数を保持している状態（Long.MIN_VALUE）を出力しても良いが、
            // 一般的には0とするか、入力がない場合は count=0, max=0 とする。
            // ここでは、読み込んだ有効な要素が存在しない場合は count=0, max=0 とするのが安全と判断する。
             System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
