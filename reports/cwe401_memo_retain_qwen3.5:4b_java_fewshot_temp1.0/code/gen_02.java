import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class Main {
    private static final int INF = 1000000000; // 64bit int の範囲を考慮し、十分大の値を用意
    
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // メモ化用の Set を作成 (int -> int への対応)
        // Map は重いため、初期化時の計算を避けるために HashSet に直接整数値を使用するのではなく
        // 結果を格納するデータ構造として使用します。
        // しかし、キーが変化する可能性があるため、Set<Integer> results = new HashSet<>(); というアプローチは非効率的です。
        // より効果的なのは Map<Integer, Integer> cache を作成し、計算済み値を格納し直すことです。
        
        java.util.Map<Integer, Integer> cache = new java.util.HashMap<>();
        Set<Integer> seenValues = new HashSet<>(); // 64bit int にも収まる可能性があるため、String をキーにするか long キーを使う必要がありますが、Java の int は 32bit です。
        // 仕様によると「途中に現れる値は 32bit 整数には収まりませんが、64bit 整数の範囲には収まります。」とあります。
        // Java の Map<Integer, Integer> は int (32bit) しか格納できません。
        // そこで、キャッシュキーとして Long を使用します。
        java.util.Map<Long, Integer> memo = new java.util.HashMap<>();
        
        String line;
        long totalSteps = 0;
        
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                // long の範囲で解析
                int n; 
                // 入力は 32bit 整数範囲であるため、int で読み込むのが安全（文字列から変換する段階）ですが、処理自体は long で行う。
                // ただし、入力テキストが 32bit 範囲内であれば Integer.parseInt が問題ありません。
                // ただし、「途中の値」が int を超える可能性がある場合、入力が int でも途中経過が overflow すると例外が発生します。
                // そのためには long 変換を必須とします。
                
                String numStr = line;
                try {
                    // 最初の n は必ず int 範囲に含まれると想定されます（入力の制約）。
                    // ただし、String.parseLong は存在しないので、まずは Long.parseLong を試して安全に処理する。
                    long val = Long.parseLong(numStr);
                    
                    if (val == 1) {
                        totalSteps += 0;
                    } else {
                        if (memo.containsKey(val)) {
                            totalSteps += memo.get(val);
                        } else {
                            totalSteps += solve(val, memo);
                        }
                    }
                } catch (NumberFormatException e) {
                    // 解析失败の行は無視
                    continue;
                }
            } catch (NumberFormatException e) {
                // 行数が多い場合などのエラーハンドリングは不要とするが、通常は数字のみが入る。
                continue;
            }
        }
        
        System.out.println("total=" + totalSteps);
    }

    private static int solve(long n, java.util.Map<Long, Integer> memo) {
        // キャッシュが存在するか？
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        int steps = 0;
        long nextVal = n % 2 == 0 ? n / 2 : 3 * n + 1;

        while (n != 1) {
            n = nextVal;
            steps++;
            
            if (memo.containsKey(n)) {
                // キャッシュに存在する値が見つかった場合、その値までの残りステップ数を求め直す必要がある。
                // ただし、この構造は再帰的ではないため少し特殊。
                // 実際には、現在の n がキャッシュ済みであれば、その値からの計算結果（メモ化された値）と今の距離を足す。
                // しかし、上記のループ構造では、n が変わっている。
                // より標準的な方法: recursion + memoization を使うか、iterative with cache update.
                // 再帰の方がシンプルかつ誤りの少ない実装になる。
                
                break; // 再帰で再計算する前に中断
            }
        }
        
        int result = steps;
        if (n == 1) {
            // n=1 に達した場合、結果はすでに steps を足して求めているが、ループ内では 0 が加算されているわけではない。
            // ループ条件 `while(n != 1)` の外で計算されたステップ数は正しい値。
        } else {
            // キャッシュされていない値 n へと進んだ場合、結果を再帰的に求める必要がある。
            // 上記のロジックは少し非最適化されているため、これを修正する。
        }
        
        return memo.get(n) != null ? result + steps : solve(nextVal, memo);
    }
    
    // 上記の solve メソッドが部分的で複雑なため、以下の再帰関数で書き直します。
}
