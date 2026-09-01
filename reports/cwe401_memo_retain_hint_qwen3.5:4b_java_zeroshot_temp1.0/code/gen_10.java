import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    private static final long[] memo = new long[1073741825];
    private static boolean initialized = false;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty() || !isInteger(line.trim())) {
                continue;
            }
            
            try {
                long n = Long.parseLong(line.trim());
                memoizeAndCalculate(n);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + calculateTotal(memo));
    }

    private static boolean isInteger(String s) {
        if (s == null || s.trim().isEmpty()) return false;
        
        try {
            Long.parseLong(s.trim());
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private static void memoizeAndCalculate(long n) {
        if (initialized && n >= 0 && n < memo.length) {
            System.out.println("total=" + calculateTotal(memo));
            return;
        }
        
        long steps = collatzStep(n);
        
        while (n != 1) {
            if (!initialized && n > 0) {
                initialized = true;
            }
            
            // 64bit 範囲を超えないことを確認（仕様により収まると言われている）
            // ただし、中間値が 2^63-1 を超える可能性はありますが、long 範囲内に収まると仮定
            long nextVal = (n % 2 == 0) ? n / 2 : 3 * n + 1;
            
            if (nextVal > memo.length - 1 && !initialized) {
                // アラレイオーバーフローの可能性。メモ化用配列が大きすぎる可能性があるが、
                // 仕様通り long 範囲内で収まるなら対応が必要。
                // ここでは long 範囲内の値を直接計算するロジックを実装。
                memoizeAndCalculate(nextVal);
            } else {
                if (nextVal >= 0 && nextVal < memo.length) {
                    memo[(int)nextVal] = steps + 1;
                }
                
                n = nextVal;
                steps++;
            }
            
            // n が 1 に達した場合、そのステップ数を加算して返す
            if (n == 1) {
                break;
            }
        }
    }

    private static long calculateTotal(long[] memo) {
        // メモ化された結果を用いて全クエリの和を計算
        // しかし、入力は一度だけ処理されなければならず、memo を適切に初期化する必要がある。
        // 実際の問題では、各入力に対して独立して処理し、メモ化テーブルを更新していく形にするべき。
        
        long totalSteps = 0;
        boolean initializedTemp = false;
        
        for (long i : memo) {
            if (i != -1 && !initializedTemp) {
                initializedTemp = true; // 最初の値があったことを示す
            }
            totalSteps += i;
        }
        
        return totalSteps;
    }

    private static long collatzStep(long n) {
        long steps = 0;
        
        while (n != 1) {
            if (!initialized && n > 0) {
                initialized = true;
                // メモ化テーブルを初期化する。-1 で未計算を示す。
                for (int i = 0; i < memo.length; i++) {
                    memo[i] = -1;
                }
            }
            
            long nextVal = (n % 2 == 0) ? n / 2 : 3 * n + 1;
            
            // 64bit 整数範囲内なら計算を続ける。
            // アラレイオーバーフローを防ぐために、配列索引にできない値は直接計算する必要がある。
            if (nextVal < memo.length) {
                long subSteps = collatzStep(nextVal);
                if (subSteps != -1) {
                    return steps + 1;
                } else {
                    // アラレイオーバーフローの場合の処理が必要だが、ここでは単純に計算を継続。
                    n = nextVal;
                    steps++;
                }
            } else {
                // 配列範囲を超える場合、直接計算し続ける
                n = nextVal;
                steps++;
            }
        }
        
        return steps;
    }

    // メモ化テーブルのサイズを大きく拡張。long の正の範囲は約 9 * 10^18 なので、
    // アラレイで直接メモリ化するのは不可能。実際には map やハッシュマップを使う必要があるが、
    // 仕様の制約（Java、標準ライブラリのみ）とパフォーマンスを考慮すると、
    // 実際の Collatz 問題では値は非常に大きく、配列サイズ制限に直面する。
    // ただし、問題の文脈で「64bit 整数の範囲には収まる」とあるので、
    // 実際には long 範囲内であればメモ化可能な領域を考慮し、
    // ハッシュマップを使用するのが現実的なアプローチとなるが、今回は配列のみを使うと仮定し、
    // アラレイオーバーフローを避けるためのロジックを実装する。

    private static long collatzStepOptimized(long n) {
        if (!initialized) {
            initialized = true;
        }
        
        long steps = 0;
        while (n != 1) {
            if (n < memo.length && memo[(int)n] != -1) {
                return steps + memo[(int)n];
            }
            
            long nextVal = (n % 2 == 0) ? n / 2 : 3 * n + 1;
            if (nextVal >= 0 && nextVal < memo.length) {
                memo[(int)nextVal] = -1;
            } else {
                // メモ化不可の範囲では直接計算する必要があるが、長期的には map が必要。
                // ここでは簡略化し、配列のサイズ制限を考慮して処理する。
                n = nextVal;
            }
            steps++;
        }
        
        return steps;
    }

    private static void memoizeAndCalculateOptimized(long n) {
        long steps = 0;
        
        while (n != 1) {
            if (!initialized && n > 0) {
                initialized = true;
            }
            
            long nextVal = (n % 2 == 0) ? n / 2 : 3 * n + 1;
            
            if (nextVal < memo.length && !initialized) {
                // メモ化初期化
                for (int i = 0; i < memo.length; i++) {
                    memo[i] = -1;
                }
                
                memo[(int)nextVal] = steps + 1;
            } else if (nextVal >= 0 && nextVal < memo.length) {
                long subSteps = collatzStepOptimized(nextVal);
                if (subSteps != -1) {
                    return steps + 1;
                } else {
                    // 再帰呼び出しでオーバーフローした場合の処理
                    n = nextVal;
                    steps++;
                }
            } else {
                // アラレイ範囲を超えた場合、直接計算し続ける
                n = nextVal;
                steps++;
            }
            
            if (n == 1) {
                break;
            }
        }
    }
}
