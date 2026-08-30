import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }

        String line = scanner.nextLine();
        // カンマで分割し、前後の空白を無視して整数としてパースする
        String[] parts = line.split(",");

        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 前後の空白をトリム
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                // 整数としてパース
                long value = Long.parseLong(trimmedPart);
                
                // 要素数をカウント
                count++;
                
                // 最大値を更新
                if (value > maxValue) {
                    maxValue = value;
                }
                foundNumber = true;

            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 要素が見つかった場合のみ結果を出力する（仕様上、入力が空でも処理を行う必要があるが、数値が一つもない場合は最大値の初期値が不適切になるため、ここでは入力された数値に基づいて計算する）
        if (foundNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
             // 入力が空または数値が一つもなかった場合（このケースでは0要素、最大値は意味を持たないが、ここでは入力された形式に従って処理を続ける）
             // 仕様上「要素数」と「最大値」を求めるため、数値が存在しない場合は count=0, max=?? となる。
             // ただし、もし入力が完全に無効な場合（例: ""）、count=0, maxValue=Long.MIN_VALUE となるため、
             // 厳密に数値を処理した結果を出力する。
             // ここでは、有効な数値が見つからなかった場合は何も出力しないという解釈も可能だが、
             // 「要素数と最大値を求めます」という指示に従い、パースできたものに基づいて出力する。
             // 0個の要素に対して最大値が存在しないため、ここでは空行を出力しない（またはデフォルト値を出力する）。
             // 今回は入力された数値のみをカウントするため、count=0, max=??? となるが、
             // 最も安全なのは、実際に数値が見つかった場合のみ出力すること。
        }
    }
}
