import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Map;
import java.util.TreeMap;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 目標値を読み込む（空行をスキップして）
        String targetLine = br.readLine();
        while (targetLine != null && targetLine.trim().isEmpty()) {
            targetLine = br.readLine();
        }
        if (targetLine == null) return;
        long target = Long.parseLong(targetLine.trim());
        
        // 出現頻度をカウントする（TreeMap を使用し、ソートされたキーで反転検索に便利だが実際は HashSet も可。ただし重複を扱う必要があるため Map）
        // ただし、効率的には「要素の値と位置」を管理する必要があるが、Java では HashSet で存在チェック + 再計算が必要。
        // ここでは TreeMap を使用し、「出现过数」と「出現した位置リスト」を管理せず、単に出現回数をカウントし、後に処理。
        // しかし、重複元素がある場合（例：target=4, 2+2）の場合があるので、正確には「同じ値のペアも考慮する必要がある」。
        
        // より効率的なアプローチ：
        // - 一度全ての整数を読み込む（大規模入力に対してメモリ制限があるかもしれないが、64bit 整数範囲なので最大約 9e18 だが個数は無限。実際はファイルサイズやインプット制限に従う）
        // - ここで、TreeMap<Integer, Integer> counts を使用し、出現回数をカウントする。
        // しかし、2+2 のようなケースを正しくカウントするには、同じ値に対する組み合わせも考慮する必要がある。
        
        // 代替：単に List に格納して、二重ループで検索するか？だが O(n^2) は敵対的入力に対して遅い。
        // 効率的なアルゴリズム：「逆数配列」や「ハッシュマップでの累積」として、すでに出現した要素と現在の総和を維持するのではなく、
        // 「出現回数をカウントし、同じ値の場合は C(k,2) を加算」するのが正しい。
        
        // しかし、「位置が異なる 2 個の組」とあるので、同じ索引の 2 つは許されないが、同一値の異なる索引は OK。
        // 正確に：「足して目標値になる 2 つの整数（同じ位置でも良いか？いや、問題文「位置が異なる」なので同じ索引は禁止）」
        // → 同位置は禁止だが、同じ値で異なる索引は OK。
        
        // アルゴリズム：
        // - 出現回数をカウントする Map<Integer, Integer> counts を使用する。
        // - まず全ての整数を読み込み、counts に集計する。
        // 次に、「target = a + b」となる組を数える。
        // a が定まれば、b = target - a の個数は counts.get(b) で得られる。
        // しかし、a を反復すると 0 <= i < n (counts の size) で計算する必要があるが、これは O(n) で OK。
        
        // 注意点：同値の要素を考慮する必要がある例：
        // target=4, [2, 2] → 1 組（索引 0 と 1）
        // target=4, [2, 2, 2] → C(3,2) = 3 組
        // したがって、同じ値に対して「その出現回数を考慮した組み合わせ」を足す必要がある。
        
        // より正確：各値 a について、b = target - a を検索。もし a == b の場合、counts.get(a) * (counts.get(a) - 1) / 2 を加算。
        // もし a != b の場合、counts.get(a) * counts.get(b) を加算。ただし a と b を重複して計算してしまうため、集合として処理する必要がある。
        
        // 実装：
        // - counts を Map<Integer, Long> （出現回数は多いため long で）として構築。
        // - Set<Integer> processed = new HashSet<>();
        // - 各 key a から b = target - a を計算。
        //   - もし processed に入っていないなら処理する。
        //   - b == a の場合：cnt = counts.get(a), pairs += cnt * (cnt - 1) / 2; processed.add(a);
        //   - b != a の場合：if counts に存在するなら pairs += cnt_a * cnt_b; processed.add(a); processed.add(b)? いや、同じ値で複数回来るかもしれないので Set で重複を避ける。
        
        // しかし、a と b が異なる場合、b を key としてカウントする必要があるが、b を既に処理している場合を除外するため、Set に a と b の両方を追加するか？
        // より単純：「key が target/2 以下のものだけを処理」または「symmetry を考慮して半分に減らす」。
        
        // または、「pairs = sum over all distinct a: (if a == b then C(cnt,a) else cnt_a * cnt_b)」を計算し、a < b の組み合わせのみをカウントする。
        // 実際には：
        // totalPairs = 0;
        // Set<Integer> keys = counts.keySet();
        // for (int key : keys) {
        //   int targetMinusKey = target - key;
        //   if (!counts.containsKey(targetMinusKey)) continue;
        //   long cntKey = counts.get(key);
        //   long cntTargetMinusKey = counts.get(targetMinusKey);
        //   if (key == targetMinusKey) {
        //     totalPairs += cntKey * (cntKey - 1) / 2;
        //   } else {
        //     if (key < targetMinusKey) {
        //       totalPairs += cntKey * cntTargetMinusKey;
        //     } else if (key > targetMinusKey) {
        //       // ここで key > targetMinusKey の場合、すでに targetMinusKey を処理してカウント済みなので無視
        //     }
        //   }
        // }
        
        // ただし、このアプローチは「重複値」を正しく扱う。
        
        // しかし、入力された整数の個数 n が非常に大きい場合（例：10^7），map のサイズも 10^7 に達しすぎる可能性があり、メモリ制限を越えるかもしれない。
        // でも、仕様では「64bit 整数の範囲」なので、値自体は巨大だが、個数は不明。通常 competitive programming では 10^5 または 10^6 程度が上限とされる。
        // ここでは TreeMap は重すぎるため、HashMap を使用。
        
        Map<Integer, Long> counts = new java.util.HashMap<>();
        while (true) {
            String line = br.readLine();
            if (line == null) break;
            String[] parts = line.trim().split("\\s+");
            for (String part : parts) {
                if (!part.isEmpty()) {
                    try {
                        int val = Integer.parseInt(part); // 64bit 整数？仕様では「値も 64bit」だが、Java の整数は signed 32bit。
                        // 問題文：「値と個数はいずれも 64bit 整数の範囲に収まる」→ 値は long とすべき
                    } catch (NumberFormatException e) {
                        // 無視
                    }
                }
            }
        }
        
        // 修正：値が 64bit であるため、long を使用
        Map<Long, Long> counts = new java.util.HashMap<>();
        while (true) {
            String line = br.readLine();
            if (line == null) break;
            String[] parts = line.trim().split("\\s+");
            for (String part : parts) {
                if (!part.isEmpty()) {
                    try {
                        long val = Long.parseLong(part);
                        counts.put(val, counts.getOrDefault(val, 0L) + 1);
                    } catch (NumberFormatException e) {
                        // 無視
                    }
                }
            }
        }
        
        // 実際、上記のループは「2 行目以降」を処理するが、空行や整数でない行もスキップしている。
        // しかし、入力形式は「1 行目に目標値、2 行目以降に整数（1 行に 1 個）」とあるが、実際には「2 行目以降」全体にわたって複数行にある。
        // したがって、全ての行を処理する必要がある。
        
        long pairCount = 0;
        Set<Long> processed = new java.util.HashSet<>();
        for (Map.Entry<Long, Long> entry : counts.entrySet()) {
            long a = entry.getKey();
            long b = target - a;
            
            if (!counts.containsKey(b)) continue;
            
            long cntA = entry.getValue();
            long cntB = counts.get(b);
            
            if (a == b) {
                pairCount += cntA * (cntA - 1) / 2;
            } else {
                // a < b で済ませる
                if (a < b) {
                    pairCount += cntA * cntB;
                }
                // a > b の場合はすでに処理済み（b の際にカウント済み）なので無視
            }
        }
        
        System.out.println("pairs=" + pairCount);
    }
}
