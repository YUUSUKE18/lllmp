import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundFirst = false;

        if (line != null) {
            // カンマで分割し、各要素を処理する
            String[] parts = line.split(",");
            for (String part : parts) {
                String trimmedPart = part.trim();
                if (trimmedPart.isEmpty()) {
                    continue;
                }

                try {
                    // 64bit整数として解釈
                    long n = Long.parseLong(trimmedPart);
                    count++;

                    if (!foundFirst || n > max) {
                        max = n;
                        foundFirst = true;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
        }

        // 要素が見つからなかった場合（すべて無効な入力だった場合）、count=0, max=初期値となるが、仕様を満たすため適切な処理を行う。
        if (count == 0) {
            // 入力が空または全て無効な場合、count=0, max=エラーを避けるためにデフォルト値を設定する
            max = 0; // または、入力がない場合は最大値を定義できないが、ここでは0とするのが妥当か。問題文に従い、読み取れた要素に基づいて計算する。
        }


        System.out.println("count=" + count + " max=" + max);
    }
}
