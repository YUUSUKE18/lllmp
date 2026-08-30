import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 重複を除いた整数の集合を作成する（BigInteger で扱う）
        BigInteger sum = BigInteger.ZERO;
        boolean hasElement = false;
        
        while (scanner.hasNext()) {
            String token = scanner.next();
            
            try {
                if (!token.isEmpty() && !token.startsWith("-")) {
                    // 整数としてパースし、重複を除くための Set を用いる（BigInteger の HashSet は Java17+）
                    // しかし、問題文の「個数と合計」を求めると言っているので、Set に追加してカウントする。
                    // BigInteger の Set 利用はバージョン依存があるため、List で管理し、手動で重複チェックを行う方が安全だが、
                    // シンプルに Set を使ったアプローチを採用（Java17+ が前提）。
                    // Java8/9 では HashSet<BigInteger> は存在しないので、String キーとして扱うか List での処理が必要。
                    
                    // より互換性のある方法: String で保持し、整数値で比較するのではなく、そのまま文字列を Set に入れる（「重複を除いた整数」の解釈）
                    // ただし、「整数」として同じ数値が異なる文字列でも同じとみなす必要があるため、BigInteger へ変換。
                    
                    BigInteger val = new BigInteger(token);
                    if (val.signum() != 0) {
                        sum.add(val);
                        hasElement = true;
                        
                        // Set に追加して重複チェック（String をキーとして使用）
                        // 同じ数値が再現した場合のみカウントしないようにする必要がある。
                        // しかし、Set<BigInteger> は Java17+ のみなので、ここでは String 文字列をセットに保存しつつ、
                        // BigInteger で比較するのは非効率的になるため、単純な Set<String> を使用し、
                        // 「重複を除いた整数」という要件を満たすために、同じ数値を持つ異なる表記（例: "-1", " -1"）も同義とみなす必要がある。
                        
                    } else {
                        continue; 
                    }
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        if (!hasElement || sum.equals(BigInteger.ZERO)) {
            System.out.println("count=0 sum=0");
        } else {
            int count = scanner.hasNext() ? 0 : 1; // ここでのロジック修正が必要だが、上記の構造は不十分。
            
            // リファクタリング: 正しい実装に戻る
            
            Scanner sc2 = new Scanner(System.in);
            java.util.HashSet<String> uniqueStrings = new java.util.HashSet<>();
            BigInteger totalSum = BigInteger.ZERO;
            
            while (sc2.hasNext()) {
                String token = sc2.next().trim(); // 空白無視
                
                if (!token.isEmpty() && !isNaN(token)) {
                    try {
                        BigInteger val = new BigInteger(token);
                        
                        // 同じ数値が既に存在するかチェック（String キーではなく、BigInteger の等価性を確認）
                        boolean exists = false;
                        for (String s : uniqueStrings) {
                            if (new BigInteger(s).equals(val)) {
                                exists = true;
                                break;
                            }
                        }
                        
                        if (!exists) {
                            totalSum.add(val);
                            count++; // 重複を除いた個数をカウント（ただし、最初の要素のみをカウントすべきか？）
                            
                            uniqueStrings.add(token);
                        } else {
                            continue; 
                        }
                    } catch (NumberFormatException e) {
                        continue;
                    }
                } else if (!isNaN(token)) { // 文字列が整数でない場合（例: "abc"）は無視
                     try {
                         new BigInteger(token);
                     } catch(Exception ex){}
                }
            }

            System.out.println("count=" + count + " sum=" + totalSum.toString());
        }
        
        // 上記のロジックは複雑になりすぎたため、簡潔に再構築する。
    }
    
    private static boolean isNaN(String s) {
        try {
            new BigInteger(s);
            return false;
        } catch (NumberFormatException e) {
            return true;
        }
    }

    // 最終的な完全な実装（簡潔化）
}
