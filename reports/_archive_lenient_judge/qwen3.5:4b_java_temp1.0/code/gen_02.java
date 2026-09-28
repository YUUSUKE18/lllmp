import java.util.Scanner;
import java.util.HashSet;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) return;

        String line = scanner.nextLine();
        
        // 空要素・前後の空白は無視し、整数として解釈できない要素も無視します。
        HashSet<Integer> distinctIntegers = new HashSet<>();
        BigInteger totalSum = BigInteger.ZERO;

        String[] tokens = line.split(",");
        
        for (int i = 0; i < tokens.length; i++) {
            // 空文字列や空白のみを含むトークンはスキップする（split で発生しにくいので明示的にチェック）
            if (!tokens[i].trim().isEmpty()) {
                try {
                    int val = Integer.parseInt(tokens[i]);
                    distinctIntegers.add(val);
                    
                    BigInteger bigVal = BigInteger.valueOf(val);
                    totalSum = totalSum.add(bigVal);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                    continue;
                }
            }
        }

        int count = distinctIntegers.size();

        System.out.println("count=" + count + " sum=" + totalSum.toString());
    }
}
