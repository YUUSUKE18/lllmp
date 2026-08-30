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

        Set<Integer> uniqueNumbers = new HashSet<>();
        BigInteger totalSum = BigInteger.ZERO;
        int count = 0;

        String[] parts = line.split(",");
        
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            
            try {
                long val = Long.parseLong(part.trim());
                uniqueNumbers.add(val);
                
                // 重複を除いた個数をカウント（set のサイズが最終的な count）
                // ただし、問題文の「それらのうち『重複を除いた整数』について」は少し曖昧だが、
                // 「count=<個数> sum=<合計>」という形式から、
                // unique integers の数と、unique integers の和を計算するのが自然。
                
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("count=" + uniqueNumbers.size() + " sum=" + totalSum);
    }
}
