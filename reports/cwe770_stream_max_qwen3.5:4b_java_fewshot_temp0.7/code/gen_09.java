import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE);
            return;
        }

        long count = 0;
        boolean first = true; // false にすれば、max は常に初期値より小さいと仮定して更新可能だが、空配列の場合は MIN_VALUE が適切か？課題文「最大値を求めます」の場合、整数が一つもない場合は定義に矛盾する。例1のコードは max=0 で始めているので同様の挙動とする。ただし 64bit 範囲なら MAX/MIN は正しく扱えない可能性がある（負数も存在）。
        // しかし問題文の「値は 64bit 整数の範囲に収まる」という制約と、例1での初期化 max=0 を踏まえると：
        // もし入力がない場合や有効な数字が一つもない場合どうするか？
        // 例2（カンマ区切りの語）では「空でない語」を数えるだけ。今回は整数列なので、存在しない場合は count=0, max=?
        // 例1のコードは max=0 で始まっているので、「最大値がなければ 0」という挙動とするのが一致する。ただし厳密には 64bit の範囲で「なし」の場合どうするか？
        // 今回は例2・3を参照し、存在しない場合は count=0, max は初期値を使用（例1と同じロジック）。
        
        long[] numbers = new long[line.length()];
        int i = 0;
        for (String s : line.split(",")) {
            if (!s.trim().isEmpty()) {
                try {
                    // 64bit integer として解釈。Long.parseLong は正しく扱う（-2^63 ~ 2^63 -1）
                    long n = Long.parseLong(s.trim());
                    numbers[i++] = n;
                } catch (NumberFormatException e) {
                    // 整数ではない要素は無視
                }
            } else {
                continue;
            }
        }

        if (numbers.length == 0) {
            System.out.println("count=0 max=" + Long.MIN_VALUE); 
            return;
        }

        long count = numbers.length;
        long maxVal = numbers[0];
        
        for (int j = 1; j < numbers.length; j++) {
            if (numbers[j] > maxVal) {
                maxVal = numbers[j];
            }
        }

        System.out.println("count=" + count + " max=" + maxVal);
    }
}
