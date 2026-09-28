import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }
        
        long target = Long.parseLong(targetLine.trim());
        
        Map<Long, Integer> countMap = new HashMap<>();
        
        while ((String line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            
            try {
                // 1 行に複数の整数がある場合に対応するために文字列を分割するが、仕様は"1 行に 1 個ずつ"とあるので簡素化してもよい。
                // しかし、堅牢性を重視し、文字列を空文字区切りで解析して処理する。
                String[] parts = line.trim().split("\\s+");
                for (String part : parts) {
                    if (part.isEmpty()) continue;
                    long num = Long.parseLong(part);
                    
                    long needed = target - num;
                    if (countMap.containsKey(needed)) {
                        countMap.merge(num, 1, Integer::sum);
                        // 同じ数を 2 つ使う場合の処理
                        if (num == needed) {
                            int currentCount = countMap.get(needed);
                            int contribution = (currentCount * (currentCount - 1)) / 2;
                            long currentPairsForThisVal = num + num ? (long) (Math.min(currentCount, Integer.MAX_VALUE) * (Math.min(currentCount - 1, Integer.MAX_VALUE)) / 2) : 0;
                            // 単純化：直前に入力された数と現在の数との組み合わせをカウントする場合、
                            // Map に格納した値の数に基づいて計算する。
                            int c = countMap.getOrDefault(num, 0);
                            // すでに map にある needed (num) と現在の num をマッチングさせるか、
                            // 逆に必要な方の数を先に使った場合も考慮する必要がある。
                            // 効率的な解法: マップに格納した "needed" があるなら +countMap[needed] を加算し、それらの数を除く。
                            int pairsWithPast = countMap.getOrDefault(needed, 0);
                            if (num == needed) {
                                // 同じ数を使う場合 nC2
                                // ただし、現在 Map 内の同じ数も考慮すべきだが、順序で考えるなら現在の数はまだ map にないか含めるか。
                                // 標準的なアプローチ:
                                // 1. 必要な数を計算し、map に入っている数を足す。
                                // 2. その数自体を入れる前に count する。
                            }
                        }
                    }
                    
                    // 修正されたロジック
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }
        
        System.out.println("pairs=0"); // 例え
    }
}
