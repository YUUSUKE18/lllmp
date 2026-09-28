import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 標準入力から一行読み込む
        if (!scanner.hasNextLine()) {
            // 入力がない場合は終了
            return;
        }
        String line = scanner.nextLine();
        scanner.close();

        long totalElements = 0;
        long totalSum = 0;

        // カンマで区切って各要素を処理する
        String[] parts = line.split(",");

        for (String part : parts) {
            // 空の文字列や前後の空白を無視
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            // コロンで分割して値と回数を取得
            String[] kv = trimmedPart.split(":");
            
            if (kv.length == 2) {
                try {
                    // 値 (要素の値) と 回数 (出現回数) を取得
                    long value = Long.parseLong(kv[0].trim());
                    long count = Long.parseLong(kv[1].trim());

                    // 回数が0以上であることを確認（仕様上は回数は0以上）
                    if (count >= 0) {
                        // 要素数と合計を計算
                        totalElements += count;
                        totalSum += value * count;
                    }
                } catch (NumberFormatException e) {
                    // 数値変換エラーが発生した場合は無視する
                    // 仕様上、値:回数 の形式に解釈できない要素は無視する
                }
            }
        }

        // 結果を出力
        System.out.println("count=" + totalElements + " sum=" + totalSum);
    }
}
