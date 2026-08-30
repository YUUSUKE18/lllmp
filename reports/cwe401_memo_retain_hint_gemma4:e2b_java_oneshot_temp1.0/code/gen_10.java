import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 最初の行を読み、クエリの数を把握する
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("total=0");
            return;
        }

        // 読み込んだ行を整数として解析し、残りの入力（クエリ）を処理する
        String[] parts = line.trim().split("\\s+");
        
        // 最初の入力がクエリ数（または最初の数）であると仮定し、残りの行をクエリとみなす
        // 仕様に合わせて、入力全体をクエリのシーケンスとして扱う。
        // 通常、このような問題では最初の行がクエリ数や単一の初期値だが、
        // ここでは「標準入力に、1 以上の整数が 1 行に 1 個ずつ並びます（クエリ）」という指示に基づき、
        // 入力全体を処理対象とする。
        
        // 各行をクエリとして処理する
        long totalSteps = 0;
        
        // メモ化のためのマップ。計算結果を保存する
        Map<Long, Long> memo = new HashMap<>();
        
        // 1行ずつ読み進める
        String nextLine;
        while ((nextLine = br.readLine()) != null) {
            String trimmedLine = nextLine.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(trimmedLine);
                
                if (n == 1) {
                    // nが1のときは0手数
                    long steps = 0;
                } else {
                    // 計算とメモ化
                    if (!memo.containsKey(n)) {
                        // 再帰的または反復的に計算し、メモ化する
                        long current = n;
                        long count = 0;
                        // 3x+1 または n/2 の操作を1に到達するまで繰り返す
                        while (current != 1) {
                            if (current % 2 == 0) {
                                current /= 2;
                            } else {
                                current = 3 * current + 1;
                            }
                            count++;
                        }
                        memo.put(n, count);
                    }
                    steps = memo.get(n);
                }
                
                totalSteps += steps;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        // 最終結果の出力
        System.out.println("total=" + totalSteps);
    }
}
