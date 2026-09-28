import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 重複除去した整数のリストを作成する (Set は自動的に重複を除外し、ソートされないので順序を保つ必要はないが、合計計算には集合要素の利用で十分)
        java.util.Set<Integer> distinctIntegers = new java.util.HashSet<>();
        
        while (scanner.hasNext()) {
            String token = scanner.next().trim();
            
            // 空白のみまたは整数でない文字列は無視する (このロジックでは next() は区切り文字で読み込むため、空行や余白はスキップされるが、非数値チェックが必要)
            if (!token.matches("-?[0-9]+")) {
                continue; 
            }

            try {
                int num = Integer.parseInt(token);
                distinctIntegers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない場合は無視する
                continue;
            }
        }
        
        long count = distinctIntegers.size();
        BigInteger sum = new BigInteger("0");
        
        for (int num : distinctIntegers) {
            sum = sum.add(BigInteger.valueOf(num));
        }

        System.out.println("count=" + count + " sum=" + sum.toString());
    }
}
