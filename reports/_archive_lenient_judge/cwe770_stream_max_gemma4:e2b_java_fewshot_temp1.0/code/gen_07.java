import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean first = true;

        if (line != null) {
            // カンマで分割し、各要素を処理する
            String[] parts = line.split(",");
            for (String part : parts) {
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    try {
                        long n = Long.parseLong(trimmedPart);
                        count++;
                        if (first || n > max) {
                            max = n;
                            first = false;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視
                    }
                }
            }
        }

        // データが存在しない場合（空の入力や全て無効な値の場合）、maxが初期値のままになる可能性があるため、countに基づいて処理する。
        if (count == 0) {
             // 入力が全くなかったか、有効な整数が一つもなかった場合。
             // この場合、最大値は定義できないが、仕様上は読み取ったものに基づいて出力する必要がある。
             // 今回は「要素数」と「最大値」を出力する。もし要素がないなら count=0, maxの扱いについて考える必要があるが、
             // 読み込んだ有効な数値がない場合は、maxは初期値(Long.MIN_VALUE)のままになるため、それをそのまま出力するのが最も厳密かもしれない。
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
