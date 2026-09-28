import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.math.BigInteger;
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

        BigInteger target = new BigInteger(targetLine.trim());
        
        // 64bit 整数の範囲内なので、BigInteger を使用して安全に計算する。
        // ただし、入力値自体が 64bit 整数であることが前提とされるため、
        // BigInteger のオーバーヘッドを避けるために long で処理し、
        // 足した結果が 64bit 範囲を超えないかチェックするか、
        // または問題文の「値と個数はいずれも 64bit 整数の範囲に収まる」という条件を解釈する。
        // 「値」が 64bit なら足し算の結果は 128bit になりうるが、「個数」は 64bit 以内。
        // しかし、通常この種の課題では「値」も 64bit 範囲内とみなされることが多い。
        // 安全のために BigInteger を使用し、結果を BigInteger で保持する。
        
        Set<BigInteger> seen = new HashSet<>();
        BigInteger sum = BigInteger.ZERO;
        int pairCount = 0;

        while ((targetLine = br.readLine()) != null) {
            targetLine = targetLine.trim();
            if (targetLine.isEmpty()) continue;

            try {
                BigInteger value = new BigInteger(targetLine);
                
                // 足して目標値になる組み合わせを探す
                // pairCount が大きくなる前に、集合に追加するのではなく、
                // 既に存在する値と現在の値の和が目標値になるかチェックする。
                // しかし、O(N^2) のアルゴリズムは敵対的な入力に対して時間制限を超過する可能性がある。
                // より効率的なアプローチ：
                // 1. 現在の値 (current) と、(target - current) が既に seen に存在するかチェックする。
                
                BigInteger needed = target.subtract(value);
                if (seen.contains(needed)) {
                    pairCount++;
                }
                seen.add(value);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        System.out.println("pairs=" + pairCount);
    }
}
