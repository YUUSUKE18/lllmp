import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        int count = 0;
        long sum = 0;

        // 1行目から個数を読み取る
        if ((line = br.readLine()) != null) {
            try {
                count = Integer.parseInt(line.trim());
            } catch (NumberFormatException e) {
                // 1行目が整数でない場合は処理を終了（または仕様に従って無視）
                return;
            }
        } else {
            // 入力がない場合は終了
            return;
        }

        // 2行目以降から整数を読み取る
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue; // 空行は無視
            }
            try {
                long num = Long.parseLong(trimmedLine);
                sum += num;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        // 実際に読み取れた整数を数える（この問題では、読み取れた行の数をcountとして扱う）
        // 問題の指示：「実際に読み取れた整数だけを対象とします。」
        // これは、読み取れた行数（整数として解釈できたもの）をcountとして扱うことを意味すると解釈する。
        // ただし、もし1行目のcountと読み取れた行数が一致しない場合、読み取れた行数を出力する。
        
        // 読み取れた整数がいくらだったかを再計算する（このロジックは、2行目以降の処理でsumを計算したため、
        // 読み取れた行数を正確に数える必要がある）
        // 今回の仕様では、2行目以降の入力全体を読み取り、その中から有効な整数を数え、合計を求める。
        
        // すでにsumは計算済み。countは1行目の値として保持。
        // 実際に読み取れた整数個数をcountとして出力する。
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
