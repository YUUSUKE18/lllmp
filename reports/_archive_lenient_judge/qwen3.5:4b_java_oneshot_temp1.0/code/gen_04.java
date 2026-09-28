import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<String> uniqueElements = new HashSet<>();
        for (String f : line.split(",")) {
            String trimmed = f.trim();
            if (!trimmed.isEmpty() && isInteger(trimmed)) {
                try {
                    BigInteger n = new BigInteger(trimmed);
                    // 文字列として保持して後で解析することで重複を正確に検出するため（数値等位でも同じ）
                    uniqueElements.add(n.toString()); 
                    
                    long countPerValue = (long)uniqueElements.stream().filter(v -> v.equals(f.trim())).count(); // この方法は inefficient なので修正が必要か？No, Set に追加済み。再考
                
                } catch (Exception e) { /* ignore */ }
            } else if (!trimmed.isEmpty()) {
                 try { 
                    BigInteger n = new BigInteger(trimmed);
                     uniqueElements.add(n.toString()); 
                 
                // 上記のロジックを修正する: Set に直接 BigInte を加える方法が最適だが、Java の API でセットに直接 Integer オブジェクトを入れる。
            } else if (!trimmed.isEmpty()) {
                 try {
                    long n = Long.parseLong(trimmed);
                     uniqueElements.add(n.toString()); // 文字列で重複チェックし、計算時に数値を使う
            
                catch (NumberFormatException e) {}
        }

// シンプルに再構築: Set<String> で保持するのではなく, Map<Integer, Integer> を使うのが効率的だが Long に変換可能か確認. 
// BigInteger とセットにする方法に変更。
        
Set<BigInteger> uniqueBigIntegers = new HashSet<>(); // 重複を除去用
long totalCountSumCount;

try {
    long[] counts = null; 
} catch (Exception e) {} 

// 最終的なアプローチ: Set<String> で文字列として保持し、一意の数をカウント。ただし数値計算は BigInteger で行う。


String line2 = br.readLine(); // 実際には一行のみ読み込む必要があるが、入力例を想定して処理
long sumAll;
