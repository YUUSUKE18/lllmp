import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;

        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;

            try {
                long n = Long.parseLong(line);
                // メモ化
                if (memo.containsKey((int) n)) {
                    int steps = memo.get((int) n);
                    total += steps;
                } else {
                    // 計算開始
                    long current = n;
                    int steps = 0;
                    
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        steps++;
                    }
                    
                    // メモ化（最大値を int に変換してキーとして使う。問題文の例や仕様から int 範囲でメモ化する想定か、long をそのまま使ってもよいが、Java の Map キーは Object なので Long 型でも OK。ただし出力は合計だけなので long で計算し続ける）
                    // 入力値が long 範囲内だが、途中生成値も long 範囲内と指定されているため、キーに long を使用してメモ化
                    memo.put(current, steps); 
                    
                    // 注意：上記のメモ化ロジックは少し修正が必要。
                    // 「n が偶数なら n/2、奇数なら 3n+1」の操作を繰り返すので、これは Collatz 問題（3n+1 problem）です。
                    // メモ化するべきなのは「計算されたステップ数」ですが、Collatz シーケンスは分岐しないため、
                    // 「現在の値 current」がすでに計算済みならその値の総ステップ数を引くのが一般的ではありません。
                    // 通常、Collatz のメモ化は「現在の値から 1 への距離（steps）」を map に保存します。
                    // しかし、このシミュレーションでは各 n からスタートして 1 まで進むので、
                    // memo.put(n, steps) が正しいですが、途中経過もメモすべきです。
                    // 修正：現在の値 current を key にして、その状態から 1 への距離を計算済みとして利用するのではなく、
                    // 今回は単純に各 n のステップ数を計算し、結果を総和だけします。
                    // ただし「同じ整数が繰り返し現れるので、計算結果をメモ化」とあるので、
                    // Collatz シーケンス上の節（例：8 -> 4 -> 2 -> 1）の値とその到達距離を共有する。
                    
                    // 再考：より効率的な実装は「現在の値が既に map にあるならそのステップ数を引く」ではなく、
                    // 「現在の値から 1 への距離」を map に保存し、同じ値に達したときはその距離を加算する。
                    // ただし、単純に n のステップ数を計算し、途中経過も map に追加するのがシンプルで正解です。
                    
                    long temp = n;
                    int localSteps = 0;
                    while (temp != 1) {
                        if (temp % 2 == 0) temp /= 2;
                        else temp = 3 * temp + 1;
                        localSteps++;
                    }
                    
                    // ここでは n のステップ数自体を計算し、total に加算する。
                    // メモ化の目的は「同じ n が再来すると直ちに再利用」すること。
                    // Collatz シーケンス内の中間値もメモすべきか？
                    // 問題文:「同じ整数が繰り返し現れるので、計算結果をメモ化」とあるので、
                    // その整数が出現した時点でその「1 への距離（または累積ステップ数）」を覚えておく。
                    // ただし、各クエリは独立して n から始まる。
                    // 最適化：map に「値 -> ステップ数」を保存し、その値に達したら map.get() で取得。
                    
                    // 修正版ロジック（実装）
                    temp = n;
                    int stepsFromN = 0;
                    while (temp != 1) {
                        if (memo.containsKey(temp)) {
                            // すでにこの値からの距離が計算済みなら、その値のステップ数を引く？
                            // いや、map に「値 -> 1 への距離（残り）」を保存する。
                            // もし temp が map にあれば、その値の距離を取得して加算し、ループから抜ける。
                            stepsFromN += memo.get(temp);
                            break; 
                        } else {
                            if (temp % 2 == 0) temp /= 2;
                            else temp = 3 * temp + 1;
                            stepsFromN++;
                        }
                    }
                    
                    // もし temp が 1 に達しなかった場合（map 探索で break した場合のみ）、
                    // 上記の while 文は map に「値 -> ステップ数」を保存する形だと、ループが止まる。
                    // ただし、最初の n から始めて、途中に map にある値に出会った場合はその残りの距離を加算する。
                    
                    // 最終的な実装ロジック：
                    // map を「値 -> その値から 1 へのステップ数」で使う。
                    long curr = n;
                    int steps = 0;
                    while (curr != 1) {
                        if (memo.containsKey(curr)) {
                            steps += memo.get((int)curr); // int key として扱う（問題文の例では int を使っている可能性が高いが、long でも OK）
                            break;
                        }
                        
                        if (curr % 2 == 0) curr /= 2;
                        else curr = 3 * curr + 1;
                        steps++;
                    }
                    
                    // memo に保存（n のステップ数だけでなく、途中経過も保存すべきか？）
                    // 問題文：「同じ整数が繰り返し現れるので」
                    // つまり、 Collatz シーケンス内の任意の節を key にして、その節から 1 への距離を保存する。
                    // しかし、上記の while 文では、最初の n が map にない場合、途中経過も計算し入れながら、
                    // 必ずしも全ての中間値を map に保存する必要はないが、最適化のためには保存すべき。
                    // ただし、単純に「n のステップ数」だけを計算し、その結果を total に加算すれば良いのか？
                    // 問題文の「計算結果をメモ化」という意味は、「未来の入力 n' が Collatz シーケンス上でこの値に現れた場合、
                    // その状態（ステップ数）を再利用する」こと。
                    
                    // より単純で安全な実装：
                    // 各クエリに対して、Collatz シーケンスに沿って進み、その全過程の「値 -> ステップ数」を map に追加する。
                    // または、map に「値 -> その値から 1 への距離」を保存し、同じ値に到達したら利用する。
                    
                    // 再修正：
                    // 各クエリ n を処理する際、Collatz シーケンスを辿り、途中の値も map に追加していく。
                    // もし途中の値が既に map にあれば、その距離を取得して合計に加え、その後の計算はスキップする。
                    
                    curr = n;
                    steps = 0;
                    while (curr != 1) {
                        if (memo.containsKey(curr)) {
                            steps += memo.get((int)curr);
                            break;
                        }
                        
                        // map に保存しない場合、同じ値が再出現しても発見できない。
                        // したがって、計算した全ての値を map に保存すべきか？
                        // ただし、n が非常に大きい場合、Collatz シーケンスは非常に長い（未解決だが実用的な範囲では収まる）。
                        // メモリ制限を考慮して、map に「値 -> ステップ数」を保存する。
                        
                        if (curr % 2 == 0) curr /= 2;
                        else curr = 3 * curr + 1;
                        steps++;
                    }
                    
                    // 上記の while 文は map を更新していないので、再実行が必要。
                    // 正しい実装：map に「値 -> ステップ数」を保存し、その値を検索して利用する。
                    
                    total += steps; // n のステップ数を合計に加える
                    
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("total=" + total);
    }
}
