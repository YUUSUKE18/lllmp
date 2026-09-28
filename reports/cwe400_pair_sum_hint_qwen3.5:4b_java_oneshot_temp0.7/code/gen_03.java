import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }

        long target = Long.parseLong(targetLine.trim());

        // 各整数の位置を保持するためのデータ構造は不要だが、重複した数値がある場合を考慮して Set を使う。
        // ただし、同じ値が複数回現れる場合でも「位置が異なる」条件を満たすかどうかが重要。
        // 効率よく計算するため、Map<数値, 出現回数> とすると良いが、
        // ここでは単純に Set<数値, true> で存在確認し、再帰的に組み合わせ数を算出するのではなく、
        // より効率的な方法として「2 個の組」を直接カウントする方法を考える。
        
        // 実際には、足して目標になる組み合わせの総数は、重複がある場合も位置が異なる限り数える必要がある。
        // 例えば (target-3, 3) が存在し、3 が 2 回現れるなら、(pos1, pos3a), (pos1, pos3b), (pos2, pos3a), (pos2, pos3b) は全部含む。
        // つまり、各数値 x に対して、残りの必要数 target-x が何回現れているかを知る必要がある。
        
        // 入力を読みながら処理するのではなく、まず全入力を配列に保存し、その後 Map で計算するのが安全で高速である。
        long[] numbers = new long[200000]; // 最大サイズを想定 (実際は動的に増減させる必要があるが Java の配列制限あり)
        // メモリ制約を考えると、入力数が多すぎると配列サイズがオーバーフローする可能性があるため、
        // ArrayList や Stream で扱うか、または Map を使い分ける。
        
        // 正確に実装するためには、まず入力をすべて読み込む必要がある。
        int count = 0;
        String line;
        java.util.ArrayList<Long> list = new java.util.ArrayList<>();
        
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            try {
                long val = Long.parseLong(line.trim());
                list.add(val);
            } catch (NumberFormatException e) {
                // 無視
            }
        }
        
        int n = list.size();
        Set<Long> distinctValues = new java.util.HashSet<>();
        // 出現回数を記録する。しかし、組み合わせを直接数えるために、
        // Map<Long, Integer> counts を使うのが最適である。
        java.util.Map<Long, Integer> counts = new java.util.HashMap<>();
        
        for (long val : list) {
            counts.put(val, counts.getOrDefault(val, 0) + 1);
        }
        
        long pairs = 0;
        
        // 各数値 x について、target - x が存在するか確認する。
        for (Map.Entry<Long, Integer> entry : counts.entrySet()) {
            long x = entry.getKey();
            int freqX = entry.getValue();
            long targetMinusX = target - x;
            
            if (counts.containsKey(targetMinusX)) {
                long targetFreq = counts.get(targetMinusX);
                
                if (x == targetMinusX) {
                    // 2 * same_val の場合、C(freq, 2) の組み合わせ
                    pairs += (freqX * (freqX - 1)) / 2;
                } else {
                    // x と targetMinusX が異なる場合、freqX * freqTarget の組み合わせ
                    pairs += freqX * targetFreq;
                }
            }
        }
        
        System.out.println("pairs=" + pairs);
    }
}
