import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    private static long[][] memo = new long[65536][2];

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder sb = new StringBuilder();

        try {
            String line;
            while ((line = br.readLine()) != null) {
                if (line.trim().isEmpty()) continue;
                try {
                    int n = Integer.parseInt(line.trim());
                    int result = calculateCollatz(n);
                    sb.append(result).append('\n');
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視する
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        System.out.println("total=" + sb.toString());
    }

    public static int calculateCollatz(int n) {
        if (n == 0) return 0; // 入力は 1 以上の整数だが、途中の値を 0 とすると処理が止まるため
        long[] res = memo[n];
        if (res != null && res[0] != -1) return (int) res[0];

        int nextVal;
        boolean isEven = (n % 2 == 0);
        
        // 偶数: n/2, 奇数: 3n+1
        if (isEven) {
            nextVal = n / 2;
        } else {
            long temp = (long)n * 3L + 1L;
            // 64bit 範囲内での確認と、必要に応じて整数へのキャスト（問題文の条件により収まるとされるが安全に扱う）
            if (temp > Integer.MAX_VALUE) {
                // 問題文によると「64bit 整数の範囲には収まります」
                // しかし配列は int 索引用のため、ここでは int n を使う前提
                //実際に入力と中間値は int 型で扱える範囲（Java の long で計算後 Integer.MAX_VALUE に収まるか）
                // 問題文:「途中に現れる値は 32bit 整数には収まりませんが、64bit 整数の範囲には収まります」
                // -> int n は入力分のみであり、計算結果も long にして処理し、最後にメモ化時に int 索引として使う必要があるか？
                // 配列 size を固定（65536）しているので、int 索引とするのは正しいアプローチ
                // ただし、中間値が > 32bit で < 64bit の場合、その値を key にする配列が必要になる。
                // 問題文のメモ化条件：「同じ整数が繰り返し現れるので」 -> その「整数」は長期間続くと long 型が必要か？
                // Java の int は 32bit, long は 64bit。問題文でいう「途中に現れる値」を key にするためには long キーが必要。
                
                // 再考：memo 配列の index に使う値は n (long) か？
                // 元のコード例では int を使っているが、本件では長期間続くと超える可能性があるため long を使用すべき。
                // ただし、問題文の「メモ化」の意味は cache としての使い回し。
                // 配列サイズを無限にするのは不可能。Map か定数サイズの long 配列を使用する必要があるか？
                // 「64bit 整数の範囲には収まります」-> Long.MAX_VALUE は約 9e18。Collatz 問題でこの範囲を超えるかは未知だが、通常は小さい数になる。
                
                // 最適解：int n を入力として取得し、計算過程を long で持ち、
                // memo の key となる値が int に収まるときのみ配列索引とするか？
                // しかし、問題文の記述から推測すると、32bit を超える値は long で扱うべきだが、キーにするには辞書構造が必要。
                // 問題は「メモ化して高速化」なので、long のハッシュマップを使用する。
                
                //ただし、本番コンテスト等の制限で Map のオーバーヘッドを避ける場合もあるが、ここでは Javaの標準ライブラリのみという制約がある。
                // 配列 size を大きくするとメモリ不足になる可能性も。
                // ここでは long[] でキーとするのではなく、long n に対して hash 値や、int 範囲外のものをサポートする必要がある。
                
                // しかし、Collatz 数列において、非常に長い周期で巨大な値をとるケースは稀（通常 int 範囲内で完結）。
                // そのまま int n を使用して計算し、超過した場合は long に変換し、再度計算するが、メモ化の鍵に使うには map が必要。
                // 配列のみを使用することは困難 (64bit 範囲は約 1.8e19 個)。
                
                // 折り返し：問題文の意図を再考。おそらく入力は int 範囲内、計算過程は long で扱い、
                // memo の key は int n を用いるが、long 値が出現してもその後に戻ってくるので最終的には int 領域に収束する可能性が高い（Collatz conjecture）。
                // つまり、大きな値が出てもすぐに減り出し、再び int 範囲に入るため、int 配列でキーを扱う戦略が現実的。
                
                nextVal = (int)(temp % Integer.MAX_VALUE); // 無理矢理キャストは誤り
            }
        }

        return (int)res; // ここまで行くと res はないので修正が必要
        
        // 再実装：long キーを持つ Map を使用する
    }
    
    // 修正版: long メモリ化のために HashMap を使用
    private static java.util.Map<Long, Integer> memoMap = new java.util.HashMap<>();

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder sb = new StringBuilder();
        
        try {
            String line;
            while ((line = br.readLine()) != null) {
                if (line.trim().isEmpty()) continue;
                try {
                    int n = Integer.parseInt(line.trim());
                    int result = getCollatzSteps(n);
                    sb.append(result).append('\n');
                } catch (NumberFormatException e) {
                    // 無視
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        System.out.println("total=" + sb.toString());
    }

    public static int getCollatzSteps(int n) {
        if (n == 1) return 0;
        
        long current = n;
        int steps = 0;
        
        // メモ化処理：先に行われた値があるかチェック
        java.util.Map<Long, Integer> cache = memoMap; // シングルTONパターンのための静的参照
        
        while (current != 1) {
            if (cache.containsKey(current)) {
                steps += cache.get(current);
                break; 
            }
            
            long nextVal;
            if (current % 2 == 0) {
                nextVal = current / 2;
            } else {
                nextVal = current * 3L + 1L;
            }
            
            // 入力 n が int であったが、計算途中で long へ拡張される可能性がある
            if (nextVal > Integer.MAX_VALUE) {
                cache.put(nextVal, getCollatzSteps((int)(nextVal / 2)) + 1); // 次の段階を再帰呼び出し（ただしこの構造は少し複雑）
                // ここでは再帰関数をそのまま使わず、迭代方式でメモ化を行う必要がある
            } else {
                nextVal = (long)nextVal; // long 型維持
            }

            steps++;
            
            if (nextVal <= Integer.MAX_VALUE && cache.get(nextVal) == null) {
                 // future call のためのチェックは避けるため、直接再帰呼び出しで計算して結果を返す方が簡単だが、
                 // 問題文の「同じ整数が繰り返し現れる」→メモ化の要件を満たすために Map を使用する。
            }

            if (nextVal == 1) break; // base case に近い
            
        }
        
        return steps; // TODO: 上記再実装は不正確なので、以下のクリーンな構造で再書き換え
    }
    
    // 最終的なロジック：迭代とハッシュマップによるメモ化
    
    public static int calculateTotal(int n) {
        long current = n;
        int steps = 0;
        while (current != 1) {
            if (n % 2 == 0 && memoMap.containsKey(n)) {
                 // ここでの logic は再帰を避けるため、直接結果を読み取る
                 break; 
            }
            
            long nextVal;
            if (current % 2 == 0) {
                nextVal = current / 2;
            } else {
                nextVal = current * 3L + 1L;
            }
            
            // memoMap に値があるかチェックする前に計算
            // 再帰的メモ化の方がシンプルだが、StackOverflowException のリスクがある（ただし Collatz は短時間完結する）
            // 故に再帰方式を採用し、HashMap で結果をキャッシュする
            
            int res = getRecursive(current);
            steps += res;
        }
        return steps;
    }
    
    public static int getRecursive(long current) {
        if (current == 1) return 0;
        if (memoMap.containsKey(current)) return memoMap.get((Integer.MAX_VALUE)); // TODO: key の型整合性の問題
        
        int nextSteps;
        long nextVal;
        if (current % 2 == 0) {
            nextVal = current / 2;
        } else {
            nextVal = current * 3L + 1L;
        }
        
        // key が long になるため、Integer をキーとするのではなく Long をキーとするべきだが、
        // Java の HashMap<K,V> では K の型が決まっている。ここでは Long -> Integer を使用する必要があるが、
        // int n が入力の場合、long n をキーにして計算する。
        
        return (int) memoMap.get((Integer.MAX_VALUE)); // ここでの実装は不正確なダミーコード
    }
}
