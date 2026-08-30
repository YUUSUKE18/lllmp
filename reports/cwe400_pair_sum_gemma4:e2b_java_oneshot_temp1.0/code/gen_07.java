import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目: 目標値
        String targetLine = br.readLine();
        if (targetLine == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(targetLine.trim());

        List<Long> numbers = new ArrayList<>();
        String line;
        
        // 2行目以降を読み込む
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            try {
                long num = Long.parseLong(line);
                numbers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        long count = 0;
        int n = numbers.size();

        // 2個の組（位置が異なる2個）の数を求める
        // 2つの数 a と b があり、a + b = target となるペアの数を数える。
        // 2つの要素 a_i と a_j (i != j) が存在し、a_i + a_j = target となるペアを数える。

        // まず、出現する各数の頻度をマッピングする
        java.util.HashMap<Long, Integer> frequencyMap = new java.util.HashMap<>();
        for (long num : numbers) {
            frequencyMap.put(num, frequencyMap.getOrDefault(num, 0) + 1);
        }

        long totalPairs = 0;

        // 各ユニークな数についてペアを計算
        for (java.util.Map.Entry<Long, Integer> entry : frequencyMap.entrySet()) {
            long a = entry.getKey();
            int countA = entry.getValue();
            long b = target - a;

            if (a < b) {
                if (frequencyMap.containsKey(b)) {
                    int countB = frequencyMap.get(b);
                    // aとbが異なる場合、aの出現回数とbの出現回数を掛ける
                    totalPairs += (long) countA * countB;
                }
            } else if (a == b) {
                // a + a = target の場合 (2a = target)
                // 同じ数同士のペアを数える。countA * (countA - 1) / 2
                if (target % 2 == 0) {
                    // ここで、aがtarget/2である場合のみ考慮する
                    if (a * 2 == target) {
                        totalPairs += (long) countA * (countA - 1) / 2;
                    }
                }
            }
        }
        
        // 懸念点: 問題文の「2 個の組（位置が異なる 2 個）の個数」の解釈。
        // これは、リストの中から (numbers[i], numbers[j]) の組で i != j かつ numbers[i] + numbers[j] = target となる組の総数を意味する。

        // 別の方法：全ペアを数え、重複を考慮する
        // 2つの要素 a_i と a_j が存在し、a_i + a_j = target となる組を数える。
        
        long finalCount = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    finalCount++;
                }
            }
        }
        
        System.out.println("pairs=" + finalCount);
    }
}
